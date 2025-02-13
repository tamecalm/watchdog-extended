# watchdog-extended/watchdog-extended/README.md

# Watchdog Extended

Watchdog Extended is a multi-user Telegram bot designed to monitor the uptime of various services. It offers both free and paid subscription plans, integrates with multiple payment gateways, and provides a web dashboard for users to manage their monitors and view uptime statistics.

## Features

- **Multi-User Support**: Each user can manage their own monitors and settings.
- **Subscription Plans**: Users can choose between free and premium plans.
- **Payment Gateways**: Supports Flutterwave, Paystack, and cryptocurrency payments for premium subscriptions.
- **Web Dashboard**: A user-friendly interface to monitor uptime statistics and manage settings.
- **Telegram Bot Interface**: Users can interact with the bot to manage monitors, view stats, and handle subscriptions.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/tamecalm/watchdog-extended.git
   cd watchdog-extended
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add your configuration settings (API keys, database connection strings, etc.).

4. Start the application:
   ```
   npm start
   ```

## Usage

- **Telegram Bot Commands**:
  - `/help`: Get a list of available commands.
  - `/manageMonitors`: Add, remove, or list your monitored services.
  - `/settings`: Manage your notification preferences and account details.
  - `/stats`: Retrieve and display uptime statistics for your monitors.
  - `/subscriptions`: View and manage your subscription plans.

- **Web Dashboard**:
  - Access the dashboard at `http://localhost:3000` (or your configured port).
  - Log in to manage your monitors, view statistics, and handle payments.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.