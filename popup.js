document.addEventListener("DOMContentLoaded", async function () {
  const amountInput = document.getElementById("amount");
  const currencyInput = $("#currency");
  const convertButton = document.getElementById("convert-button");
  let apiKey;

  // Load the API key from the config file
  await fetch("config.json")
    .then((response) => response.json())
    .then((config) => {
      apiKey = config.API_KEY;
    })
    .catch((error) => {
      console.error("Error loading config file:", error);
    });

  amountInput.addEventListener("input", updateButtonText);
  currencyInput.on("change", updateButtonText);

  document
    .getElementById("currency-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const amount = amountInput.value;
      const currency = currencyInput.val();
      const resultDiv = document.getElementById("result");

      if (!amount || !currency) {
        resultDiv.textContent = "Please enter a valid amount and currency.";
        return;
      }

      const userCurrency = await getUserCurrency();
      const convertedAmount = await convertCurrency(
        amount,
        currency,
        userCurrency
      );
      if (convertedAmount) {
        resultDiv.textContent = `Converted Amount: ${convertedAmount}`;
      } else {
        resultDiv.textContent = "Error converting currency. Please try again.";
      }
    });

  async function getUserCurrency() {
    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`
    );
    const data = await response.json();
    return data.currency.code;
  }

  async function convertCurrency(amount, fromCurrency, toCurrency) {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const data = await response.json();

    if (data && data.rates && data.rates[toCurrency]) {
      const convertedValue = (amount * data.rates[toCurrency]).toFixed(2);
      return formatCurrency(convertedValue, toCurrency);
    }

    return null;
  }

  function formatCurrency(amount, currency) {
    return new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency: currency,
    }).format(amount);
  }

  async function updateButtonText()  {
    const amount = amountInput.value || "";
    const currency = currencyInput.val() || "Currency";
    const userCurrency = await getUserCurrency();
    convertButton.textContent = `Convert ${currency} ${amount} to ${userCurrency}`;
  }

  async function fetchCurrencies() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const currencies = {};

    data.forEach((country) => {
      const currencyCodes = Object.keys(country.currencies || {});
      currencyCodes.forEach((code) => {
        currencies[code] = country.currencies[code].name;
      });
    });

    return currencies;
  }

  function populateCurrencyDropdown(currencies) {
    const options = Object.entries(currencies)
      .map(
        ([code, name]) => `<option value="${code}">${name} (${code})</option>`
      )
      .join("");
    currencyInput.html(options);
    currencyInput.select2({
      placeholder: "Select a currency",
      allowClear: true,
      dropdownParent: $(".container"),
    });

    currencyInput.val("USD").trigger("change");
  }

  const currencies = await fetchCurrencies();
  populateCurrencyDropdown(currencies);

  await updateButtonText();
});
