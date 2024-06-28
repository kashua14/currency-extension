
# Currency Converter Chrome Extension

A Chrome extension that converts prices in different currencies to your nation's currency. This extension uses the IP Geolocation API to detect the user's local currency and the Exchange Rate API to convert the specified amount.

## Features

- Convert any amount from one currency to another.
- Automatically detects the user's local currency.
- Allows searching and selecting from all available world currencies.
- Clean and modern user interface inspired by Apple's design aesthetics.

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/yourusername/currency-converter-extension.git
   cd currency-converter-extension
   ```

2. **Download dependencies**:
   - Download the [Select2 CSS](https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css) and [Select2 JS](https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js) files.
   - Place them in the `css` and `js` directories respectively.

3. **Create a `config.json` file**:
   - Create a `config.json` file in the root directory with your API key from [IP Geolocation](https://ipgeolocation.io/).

   ```json
   {
     "API_KEY": "YOUR_API_KEY"
   }
   ```

4. **Load the extension in Chrome**:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode" in the top right corner.
   - Click "Load unpacked" and select the directory where you cloned the repository.

## Usage

1. Click on the Currency Converter extension icon in the Chrome toolbar.
2. Enter the amount you want to convert.
3. Select the currency from which you are converting.
4. Click the "Convert" button to see the converted amount in your local currency.

## Configuration

### `config.json`

- **API_KEY**: Your API key from [IP Geolocation](https://ipgeolocation.io/).

## Technologies Used

- **JavaScript**: The main programming language used.
- **HTML**: For the structure of the popup.
- **CSS**: For styling the popup.
- **Select2**: For the searchable currency dropdown.
- **IP Geolocation API**: To detect the user's local currency.
- **Exchange Rate API**: To convert the specified amount to the user's local currency.

## Project Structure

```md
currency-converter/
├── css/
│   └── select2.min.css
├── js/
│   └── select2.min.js
├── config.json
├── manifest.json
├── popup.html
├── popup.js
├── styles.css
└── README.md
```

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, feel free to contact [Joshua Kasasira] at [joshkasasira@gmail.com].
