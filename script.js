let assets = [];
let goldItems = [];
let silverWeight = 0;

function addAsset() {
    let type = document.getElementById("assetType").value.trim();
    let amount = parseFloat(document.getElementById("assetAmount").value);
    let currency = document.getElementById("assetCurrency").value;

    if (type && amount > 0) {
        assets.push({ type, amount, currency });
        updateAssetList();
        document.getElementById("assetType").value = "";
        document.getElementById("assetAmount").value = "";
    }
}

function updateAssetList() {
    let list = document.getElementById("assetList");
    list.innerHTML = "";
    assets.forEach((asset, index) => {
        list.innerHTML += `<li class="list-group-item d-flex justify-content-between">
            <span><i class="fas fa-wallet"></i> ${asset.type}: ${asset.amount} ${asset.currency}</span>
            <button class="btn btn-danger btn-sm" onclick="removeAsset(${index})"><i class="fas fa-trash"></i></button>
        </li>`;
    });
}

function removeAsset(index) {
    assets.splice(index, 1);
    updateAssetList();
}

function addGold() {
    let carat = parseFloat(document.getElementById("goldCarat").value);
    let weight = parseFloat(document.getElementById("goldWeight").value);

    if (weight > 0) {
        goldItems.push({ carat, weight });
        updateGoldList();
        document.getElementById("goldWeight").value = "";
    }
}

function updateGoldList() {
    let list = document.getElementById("goldList");
    list.innerHTML = "";
    goldItems.forEach((gold, index) => {
        list.innerHTML += `<li class="list-group-item d-flex justify-content-between">
            <span><i class="fas fa-ring"></i> ${gold.weight}g (${gold.carat}K)</span>
            <button class="btn btn-danger btn-sm" onclick="removeGold(${index})"><i class="fas fa-trash"></i></button>
        </li>`;
    });
}

function removeGold(index) {
    goldItems.splice(index, 1);
    updateGoldList();
}

function addSilver() {
    let weight = parseFloat(document.getElementById("silverWeight").value);
    if (weight > 0) {
        silverWeight += weight;
        updateSilverList();
        document.getElementById("silverWeight").value = "";
    }
}

function updateSilverList() {
    let list = document.getElementById("silverList");
    list.innerHTML = `<li class="list-group-item d-flex justify-content-between">
        <span><i class="fas fa-coins"></i> ${silverWeight}g</span>
        <button class="btn btn-danger btn-sm" onclick="resetSilver()"><i class="fas fa-trash"></i></button>
    </li>`;
}

function resetSilver() {
    silverWeight = 0;
    updateSilverList();
}

function calculateZakat() {
    let totalGold = goldItems.reduce((sum, gold) => sum + (gold.weight * (gold.carat / 24)), 0);
    let totalSilver = silverWeight;
    let totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);
    
    let zakatableGold = totalGold >= 87.48 ? totalGold : 0;
    let zakatableSilver = totalSilver >= 612.36 ? totalSilver : 0;
    let zakatDue = (zakatableGold + zakatableSilver + totalAssets) * 0.025;

    document.getElementById("result").innerHTML = `
        <table class="table table-bordered mt-3">
            <thead>
                <tr>
                    <th><i class="fas fa-coins"></i> Category</th>
                    <th><i class="fas fa-balance-scale"></i> Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Zakatable Gold</td>
                    <td>${zakatableGold.toFixed(2)} grams</td>
                </tr>
                <tr>
                    <td>Zakatable Silver</td>
                    <td>${zakatableSilver.toFixed(2)} grams</td>
                </tr>
                <tr>
                    <td>Total Assets</td>
                    <td>${totalAssets.toFixed(2)}</td>
                </tr>
                <tr class="table-warning">
                    <td><b>Zakat Due (2.5%)</b></td>
                    <td><b>${zakatDue.toFixed(2)}</b></td>
                </tr>
            </tbody>
        </table>
    `;
}

function resetForm() {
    assets = [];
    goldItems = [];
    silverWeight = 0;
    updateAssetList();
    updateGoldList();
    updateSilverList();
    document.getElementById("result").innerHTML = "";
}

function printResult() {
    window.print();
}
