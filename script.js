let assets = [];
let goldItems = [];
let silverItems = [];
const API_KEY = "67ca1d11b03dff9c3d66179a"; // Your ExchangeRate-API Key

async function getExchangeRate(base, target) {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`);
        const data = await response.json();
        return data.conversion_rates[target] || 1; // Fallback in case target currency is not found
    } catch (error) {
        console.error("Exchange rate API error:", error);
        return 1; // Fallback in case of API failure
    }
}

function addAsset() {
    let type = document.getElementById("assetType").value;
    let amount = parseFloat(document.getElementById("assetAmount").value);
    let currency = document.getElementById("assetCurrency").value;

    if (type && amount > 0) {
        assets.push({ type, amount, currency });
        updateAssetList();
    }
}

function updateAssetList() {
    let assetList = document.getElementById("assetList");
    assetList.innerHTML = assets.map((item, index) =>
        `<li class="list-group-item d-flex justify-content-between bg-light">
            <i class="fas fa-wallet text-primary"></i> ${item.type} - ${item.amount} ${item.currency}
            <button class="btn btn-sm btn-danger" onclick="deleteAsset(${index})"><i class="fas fa-trash-alt"></i></button>
        </li>`
    ).join('');
}

function deleteAsset(index) {
    assets.splice(index, 1);
    updateAssetList();
}

function addGold() {
    let carat = parseInt(document.getElementById("goldCarat").value);
    let weight = parseFloat(document.getElementById("goldWeight").value);

    if (weight > 0) {
        let pureGold = (weight * carat) / 24;
        let zakatableGold = pureGold * 0.025;

        goldItems.push({ weight, pureGold, zakatableGold });
        updateGoldList();
    }
}

function updateGoldList() {
    let goldList = document.getElementById("goldList");
    goldList.innerHTML = goldItems.map((item, index) =>
        `<li class="list-group-item d-flex justify-content-between bg-warning">
            <i class="fas fa-ring text-gold"></i> Gold: ${item.weight}g | Pure: ${item.pureGold.toFixed(2)}g | Zakatable: ${item.zakatableGold.toFixed(2)}g
            <button class="btn btn-sm btn-danger" onclick="deleteGold(${index})"><i class="fas fa-trash-alt"></i></button>
        </li>`
    ).join('');
}

function deleteGold(index) {
    goldItems.splice(index, 1);
    updateGoldList();
}

function addSilver() {
    let weight = parseFloat(document.getElementById("silverWeight").value);

    if (weight > 0) {
        let zakatableSilver = weight * 0.025;

        silverItems.push({ weight, zakatableSilver });
        updateSilverList();
    }
}

function updateSilverList() {
    let silverList = document.getElementById("silverList");
    silverList.innerHTML = silverItems.map((item, index) =>
        `<li class="list-group-item d-flex justify-content-between bg-secondary text-white">
            <i class="fas fa-coins text-silver"></i> Silver: ${item.weight}g | Zakatable: ${item.zakatableSilver.toFixed(2)}g
            <button class="btn btn-sm btn-danger" onclick="deleteSilver(${index})"><i class="fas fa-trash-alt"></i></button>
        </li>`
    ).join('');
}

function deleteSilver(index) {
    silverItems.splice(index, 1);
    updateSilverList();
}

async function calculateZakat() {
    let mainCurrency = document.getElementById("mainCurrency").value;
    let totalCash = 0;
    let totalZakatCash = 0;
    let totalPureGoldWeight = goldItems.reduce((sum, item) => sum + item.pureGold, 0); // Pure gold weight
    let totalZakatableGoldWeight = goldItems.reduce((sum, item) => sum + item.zakatableGold, 0);
    let totalSilverWeight = silverItems.reduce((sum, item) => sum + item.weight, 0);
    let totalZakatableSilverWeight = silverItems.reduce((sum, item) => sum + item.zakatableSilver, 0);

    for (let asset of assets) {
        let rate = await getExchangeRate(asset.currency, mainCurrency);
        let convertedAmount = asset.amount * rate;
        totalCash += convertedAmount;
    }

    totalZakatCash = totalCash * 0.025;
    
    document.getElementById("result").innerHTML = `
        <div class="alert alert-success">
            <h4><i class="fas fa-calculator"></i> Zakat Calculation</h4>
            <p><i class="fas fa-wallet"></i> Total Cash/Assets: <strong>${totalCash.toFixed(2)} ${mainCurrency}</strong></p>
            <p><i class="fas fa-money-bill-wave"></i> Cash Zakat: <strong>${totalZakatCash.toFixed(2)} ${mainCurrency}</strong></p>
            <p><i class="fas fa-balance-scale"></i> Total Gold Weight (Pure Gold): <strong>${totalPureGoldWeight.toFixed(2)}g</strong></p>
            <p><i class="fas fa-gem"></i> Zakatable Gold Weight: <strong>${totalZakatableGoldWeight.toFixed(2)}g</strong></p>
            <p><i class="fas fa-balance-scale-right"></i> Silver Weight: <strong>${totalSilverWeight.toFixed(2)}g</strong></p>
            <p><i class="fas fa-coins"></i> Zakatable Silver Weight: <strong>${totalZakatableSilverWeight.toFixed(2)}g</strong></p>
            <div class="alert alert-warning mt-3">
                <i class="fas fa-exclamation-triangle"></i> <strong>Important:</strong> Please check the latest gold and silver prices from the market before finalizing your Zakat calculation.
            </div>
        </div>
    `;
}


function resetForm() {
    assets = [];
    goldItems = [];
    silverItems = [];
    updateAssetList();
    updateGoldList();
    updateSilverList();
    document.getElementById("result").innerHTML = "";
}

function printResult() {
    window.print();
}
