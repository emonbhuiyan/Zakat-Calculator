async function getExchangeRate(fromCurrency, toCurrency) {
    const apiKey = '67ca1d11b03dff9c3d66179a'; // Replace with your API key
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}?access_key=${apiKey}`);
    const data = await response.json();
    return data.rates[toCurrency];
  }