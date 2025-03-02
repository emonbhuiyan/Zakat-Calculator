async function fetchExchangeRate() {
    let currency = document.getElementById("currency").value;
    let date = document.getElementById("exchange-date").value;
    let url = `https://api.exchangerate-api.com/v4/latest/USD`; // Free API for now

    if (date) {
        url = `https://api.exchangerate-api.com/v4/${date}/USD`;
    }

    try {
        let response = await fetch(url);
        let data = await response.json();
        let rate = data.rates[currency];
        document.getElementById("exchange-rate").value = rate ? rate.toFixed(2) : "N/A";
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
    }
}
