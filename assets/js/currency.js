async function fetchExchangeRates() {
    try {
        let response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        let data = await response.json();
        return data.rates;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        return null;
    }
}
