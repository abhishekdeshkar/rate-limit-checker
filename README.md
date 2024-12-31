# 
# Rate Limit Checker

The **Rate Limit Checker** is a Node.js tool designed to test and analyze the rate-limiting settings of an existing URL. It sends requests at a specified rate and increments the rate until the server responds with `429 Too Many Requests` or `403 Forbidden`, indicating the rate limit has been reached. This tool helps developers understand the rate-limiting behavior of APIs or web services.

---

## Installation

Follow the steps below to clone and set up the project:

1. Clone the repository:

```bash
git clone https://github.com/abhishekdeshkar/rate-limit-checker.git 
```

2. Navigate to the project directory:

```bash
cd rate-limit-checker
```

3. Install the required dependencies:

```bash
npm install
```
---

### How to Run

Run the script using Node.js with configurable command-line arguments. Below are the supported arguments:

| Argument        | Alias   | Type   | Default | Description                                                                       |
|-----------------|---------|--------|---------|-----------------------------------------------------------------------------------|
| `--url`         | `-u`    | String | None    | The URL to send requests to (required).                                          |
| `--initialRate` | `-i`    | Number | 100     | The initial number of requests per second.                                       |
| `--increment`   | `--inc` | Number | 100     | The number of requests to add to the rate after each round if no limit is found. |
| `--duration`    | `-d`    | Number | 10      | The duration of each test in seconds.                                            |
| `--help`        | `-h`    | -      | -       | Displays help information about the arguments.                                   |

### Example Command

To test a URL with an initial rate of 50 requests per second, incrementing by 100 requests every 10 seconds, run the following command:

```bash
node index.js --url https://kgen.io/ --initialRate 50 --increment 100 --duration 10 
```

### Explanation of Example Command

- `--url https://kgen.io/`: Specifies the API endpoint to test.
- `--initialRate 50`: Starts the test with 50 requests per second.
- `--increment 100`: Adds 100 requests per second after each test round.
- `--duration 10`: Each test round lasts for 10 seconds.

---

### Output

1. Displays a progress bar for the requests being sent during each test round.
2. Outputs the results of each test round, including:
   - The number of successful requests.
   - The number of `429 Too Many Requests` responses.
   - The number of `403 Forbidden` responses.
3. Stops and displays the final rate when a `429` or `403` response is detected.

### Sample Output

```plaintext
Starting rate-limiting test for URL: https://example.com/

Testing with 50 requests per second for 10 seconds...
[:=======================         ] 75% 5.0s remaining
Results for 50 RPS:
- Successful requests: 500
- Rate-limited (429) responses: 0
- Forbidden (403) responses: 0

Testing with 150 requests per second for 10 seconds...
[:===============================] 100% 10.0s remaining
Results for 150 RPS:
- Successful requests: 1300
- Rate-limited (429) responses: 20
- Forbidden (403) responses: 0

Rate limit or forbidden access detected! Test complete.
```

### Features

- Configurable request rates, increments, and durations.
- Progress bar to visualize the ongoing requests.
- Detects rate-limiting behavior via `429 Too Many Requests` and `403 Forbidden` responses.
- Logs results for each test round for easy analysis.

---

### Dependencies

The following Node.js packages are used in this project:

- **axios**: To send HTTP requests.
- **yargs**: To parse command-line arguments.
- **progress**: To display a progress bar for the requests.

Install these dependencies automatically using the `npm install` command as described above.

---

### Contribution

Feel free to fork the repository and submit pull requests for any improvements or new features.

---

### License

This project is licensed under the [MIT License](LICENSE).

---

Happy testing! 🚀
