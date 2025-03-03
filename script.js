const exchangeRateApiKey = "67ca1d11b03dff9c3d66179a";
let goldList = [], assets = [];
let silverWeight = 0, goldRate = 0, silverRate = 0;
let exchangeRates = {};

async function fetchMarketRates() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/USD`);
    const data = await response.json();
    exchangeRates = data.conversion_rates;

    goldRate = 65;  // Example per gram USD
    silverRate = 0.85;  // Example per gram USD

    document.getElementById("marketRates").innerHTML = `
        <strong>Current Market Rates:</strong><br>
        Gold: <span class="highlight">$${goldRate} per gram</span><br>
        Silver: <span class="highlight">$${silverRate} per gram</span>
    `;
}

function addGold() {
    let carat = parseInt(document.getElementById("goldCarat").value);
    let weight = parseFloat(document.getElementById("goldWeight").value);
    if (weight > 0) goldList.push({ carat, weight });
}

function addSilver() {
    silverWeight = parseFloat(document.getElementById("silverWeight").value);
}

function addAsset() {
    let name = document.getElementById("assetName").value;
    let value = parseFloat(document.getElementById("assetValue").value);
    let currency = document.getElementById("assetCurrency").value;
    if (value > 0) assets.push({ name, value, currency });
}

function calculateZakat() {
    let mainCurrency = document.getElementById("mainCurrency").value;
    let totalAssets = 0;

    let pureGold = goldList.reduce((sum, gold) => sum + (gold.weight * (gold.carat / 24)), 0);
    let zakatableGold = pureGold * 0.025;
    let zakatableSilver = silverWeight * 0.025;

    let goldValue = pureGold * goldRate;
    let silverValue = silverWeight * silverRate;

    assets.forEach(asset => {
        let converted = asset.value / (exchangeRates[asset.currency] || 1) * (exchangeRates[mainCurrency] || 1);
        totalAssets += converted;
    });

    let totalZakat = (zakatableGold * goldRate) + (zakatableSilver * silverRate) + (totalAssets * 0.025);

    document.getElementById("result").innerHTML = `
        <h3>Zakat Calculation</h3>
        <table class="table table-bordered">
            <tr><th>Gold Zakat</th><td>${zakatableGold.toFixed(2)} g ($${goldValue.toFixed(2)})</td></tr>
            <tr><th>Silver Zakat</th><td>${zakatableSilver.toFixed(2)} g ($${silverValue.toFixed(2)})</td></tr>
            <tr><th>Cash/Assets Zakat</th><td>${totalAssets.toFixed(2)} ${mainCurrency}</td></tr>
            <tr><th>Total Zakat</th><td>${totalZakat.toFixed(2)} ${mainCurrency}</td></tr>
        </table>
    `;
}

fetchMarketRates();
