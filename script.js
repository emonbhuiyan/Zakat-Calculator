const API_KEY = "67ca1d11b03dff9c3d66179a";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

let assets = [];
let goldItems = [];
let silverItems = [];
let exchangeRates = {};

// Fetch exchange rates
async function fetchExchangeRates(baseCurrency) {
    try {
        const response = await fetch(API_URL + baseCurrency);
        const data = await response.json();
        exchangeRates = data.conversion_rates;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }
}

// Add an asset (cash, bank, investment)
function addAsset() {
    const type = document.getElementById("assetType").value;
    const amount = parseFloat(document.getElementById("assetAmount").value);
    const currency = document.getElementById("assetCurrency").value;

    if (amount > 0) {
        assets.push({ type, amount, currency });

        let row = `<tr>
            <td>${type}</td>
            <td>${amount.toFixed(2)}</td>
            <td>${currency}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeAsset(${assets.length - 1})">X</button></td>
        </tr>`;

        document.querySelector("#assetList tbody").innerHTML += row;
    }
}

// Remove asset
function removeAsset(index) {
    assets.splice(index, 1);
    document.querySelector("#assetList tbody").innerHTML = "";
    assets.forEach((item, i) => {
        document.querySelector("#assetList tbody").innerHTML += `<tr>
            <td>${item.type}</td>
            <td>${item.amount.toFixed(2)}</td>
            <td>${item.currency}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeAsset(${i})">X</button></td>
        </tr>`;
    });
}

// Add gold
function addGold() {
    const carat = parseInt(document.getElementById("goldCarat").value);
    const weight = parseFloat(document.getElementById("goldWeight").value);

    if (weight > 0) {
        const zakatableGold = weight * (carat / 24);
        goldItems.push({ carat, weight, zakatableGold });

        let row = `<tr>
            <td>${carat}K</td>
            <td>${weight.toFixed(2)}</td>
            <td>${zakatableGold.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeGold(${goldItems.length - 1})">X</button></td>
        </tr>`;

        document.querySelector("#goldList tbody").innerHTML += row;
    }
}

// Remove gold
function removeGold(index) {
    goldItems.splice(index, 1);
    document.querySelector("#goldList tbody").innerHTML = "";
    goldItems.forEach((item, i) => {
        document.querySelector("#goldList tbody").innerHTML += `<tr>
            <td>${item.carat}K</td>
            <td>${item.weight.toFixed(2)}</td>
            <td>${item.zakatableGold.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeGold(${i})">X</button></td>
        </tr>`;
    });
}

// Add silver
function addSilver() {
    const weight = parseFloat(document.getElementById("silverWeight").value);

    if (weight > 0) {
        silverItems.push(weight);

        let row = `<tr>
            <td>${weight.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeSilver(${silverItems.length - 1})">X</button></td>
        </tr>`;

        document.querySelector("#silverList tbody").innerHTML += row;
    }
}

// Remove silver
function removeSilver(index) {
    silverItems.splice(index, 1);
    document.querySelector("#silverList tbody").innerHTML = "";
    silverItems.forEach((weight, i) => {
        document.querySelector("#silverList tbody").innerHTML += `<tr>
            <td>${weight.toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeSilver(${i})">X</button></td>
        </tr>`;
    });
}

// Calculate Zakat
async function calculateZakat() {
    const mainCurrency = document.getElementById("mainCurrency").value;
    await fetchExchangeRates(mainCurrency);

    let totalWealth = 0;

    // Convert assets to main currency
    for (let asset of assets) {
        const rate = exchangeRates[asset.currency] || 1;
        totalWealth += asset.amount / rate;
    }

    // Convert gold & silver to main currency
    const goldTotal = goldItems.reduce((sum, item) => sum + item.zakatableGold, 0);
    const silverTotal = silverItems.reduce((sum, item) => sum + item, 0);

    let goldInMainCurrency = 0;
    let silverInMainCurrency = 0;

    if (exchangeRates["XAU"]) {
        goldInMainCurrency = goldTotal * exchangeRates["XAU"];
    } else {
        document.getElementById("goldSilverRateMessage").style.display = "block";
    }

    if (exchangeRates["XAG"]) {
        silverInMainCurrency = silverTotal * exchangeRates["XAG"];
    } else {
        document.getElementById("goldSilverRateMessage").style.display = "block";
    }

    totalWealth += goldInMainCurrency + silverInMainCurrency;

    // Nisab calculation
    let nisabGoldValue = 87.48 * (exchangeRates["XAU"] || 0);
    let nisabSilverValue = 612.36 * (exchangeRates["XAG"] || 0);

    let nisab = Math.min(nisabGoldValue, nisabSilverValue);
    let zakatDue = totalWealth > nisab ? (totalWealth * 0.025) : 0;

    document.getElementById("result").innerHTML = `
        <div class="alert alert-success">
            <h4>Total Wealth: ${totalWealth.toFixed(2)} ${mainCurrency}</h4>
            <h4>Zakat Due: ${zakatDue.toFixed(2)} ${mainCurrency}</h4>
        </div>`;
}

// Reset
function resetForm() {
    assets = [];
    goldItems = [];
    silverItems = [];
    document.querySelector("#assetList tbody").innerHTML = "";
    document.querySelector("#goldList tbody").innerHTML = "";
    document.querySelector("#silverList tbody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
}

// Print
function printResult() {
    window.print();
}
