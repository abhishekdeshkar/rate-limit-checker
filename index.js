const axios = require('axios');
const yargs = require('yargs');
const ProgressBar = require('progress');

// Parse command-line arguments
const argv = yargs
  .option('url', {
    alias: 'u',
    description: 'URL to send requests to',
    type: 'string',
    demandOption: true,
  })
  .option('initialRate', {
    alias: 'i',
    description: 'Initial number of requests per second',
    type: 'number',
    default: 100,
  })
  .option('increment', {
    alias: 'inc',
    description: 'Number of requests to increment each round',
    type: 'number',
    default: 100,
  })
  .option('duration', {
    alias: 'd',
    description: 'Duration of each test in seconds',
    type: 'number',
    default: 10,
  })
  .help()
  .alias('help', 'h').argv;

// Configuration from command-line arguments
const url = argv.url;
const initialRate = argv.initialRate;
const increment = argv.increment;
const duration = argv.duration;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendRequests(rate) {
  const totalRequests = rate * duration;
  const interval = 1000 / rate;
  let responses = { success: 0, rateLimited: 0, forbidden: 0 };

  const bar = new ProgressBar('[:bar] :percent :etas', {
    total: totalRequests,
    width: 30,
  });

  const requests = Array.from({ length: totalRequests }).map(async (_, idx) => {
    await delay(idx * interval); // Stagger requests
    try {
      await axios.get(url);
      responses.success++;
    } catch (err) {
      if (err.response) {
        if (err.response.status === 429) {
          responses.rateLimited++;
        } else if (err.response.status === 403) {
          responses.forbidden++;
        }
      }
    } finally {
      bar.tick();
    }
  });

  await Promise.all(requests);
  return responses;
}

async function rateLimitChecker() {
  let rate = initialRate;

  console.log(`Starting rate-limiting test for URL: ${url}`);

  while (true) {
    console.log(`\nTesting with ${rate} requests per second for ${duration} seconds...`);
    const responses = await sendRequests(rate);

    console.log(`Results for ${rate} RPS:`);
    console.log(`- Successful requests: ${responses.success}`);
    console.log(`- Rate-limited (429) responses: ${responses.rateLimited}`);
    console.log(`- Forbidden (403) responses: ${responses.forbidden}`);

    if (responses.rateLimited > 0 || responses.forbidden > 0) {
      console.log('\nRate limit or forbidden access detected! Test complete.');
      break;
    }

    rate += increment;
  }
}

rateLimitChecker().catch((err) => {
  console.error('Error:', err.message);
});