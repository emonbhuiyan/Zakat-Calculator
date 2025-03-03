let assets = [];
let goldItems = [];
let silverItems = [];

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
        `<li class="list-group-item d-flex justify-content-between">
            ${item.type} - ${item.amount} ${item.currency}
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
        `<li class="list-group-item d-flex justify-content-between">
            Gold: ${item.weight}g | Pure: ${item.pureGold.toFixed(2)}g | Zakatable: ${item.zakatableGold.toFixed(2)}g
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
        `<li class="list-group-item d-flex justify-content-between">
            Silver: ${item.weight}g | Zakatable: ${item.zakatableSilver.toFixed(2)}g
            <button class="btn btn-sm btn-danger" onclick="deleteSilver(${index})"><i class="fas fa-trash-alt"></i></button>
        </li>`
    ).join('');
}

function deleteSilver(index) {
    silverItems.splice(index, 1);
    updateSilverList();
}

async function getExchangeRate(base, target) {
    const rates = {
        "USD": 1, "EUR": 0.92, "GBP": 0.79, "SAR": 3.75, "EGP": 30.9, "BDT": 110, "INR": 82, "PKR": 278, "IDR": 15500, "TRY": 31
    };
    return rates[target] / rates[base];
}

async function calculateZakat() {
    let mainCurrency = document.getElementById("mainCurrency").value;
    let totalCash = 0;
    let totalZakatCash = 0;
    let totalGoldWeight = goldItems.reduce((sum, item) => sum + item.weight, 0);
    let totalSilverWeight = silverItems.reduce((sum, item) => sum + item.weight, 0);
    
    for (let asset of assets) {
        let rate = await getExchangeRate(asset.currency, mainCurrency);
        let convertedAmount = asset.amount * rate;
        totalCash += convertedAmount;
    }

    totalZakatCash = totalCash * 0.025;
    
    document.getElementById("result").innerHTML = `
        <div class="alert alert-success">
            <strong>Total Zakat Calculation:</strong><br>
            <i class="fas fa-money-bill-wave"></i> Cash Zakat: ${totalZakatCash.toFixed(2)} ${mainCurrency} <br>
            <i class="fas fa-balance-scale"></i> Gold Weight: ${totalGoldWeight.toFixed(2)}g <br>
            <i class="fas fa-balance-scale"></i> Silver Weight: ${totalSilverWeight.toFixed(2)}g <br>
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
    let printContent = document.getElementById("result").innerHTML;
    let originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}