let assetEntries = [];

function addAsset() {
    let type = document.getElementById("assetType").value;
    let amount = parseFloat(document.getElementById("assetAmount").value) || 0;
    let currency = document.getElementById("assetCurrency").value;

    assetEntries.push({ type, amount, currency });
    displayAssets();

    document.getElementById("assetAmount").value = "";
}

function displayAssets() {
    let tableBody = document.getElementById("assetList").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    assetEntries.forEach((entry, index) => {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = entry.type;
        cell2.innerHTML = entry.amount.toFixed(2);
        cell3.innerHTML = entry.currency;
        cell4.innerHTML = `<button class="btn btn-danger btn-sm" onclick="removeAsset(${index})">Remove</button>`;
    });
}

function removeAsset(index) {
    assetEntries.splice(index, 1);
    displayAssets();
}

function calculateZakat() {
    let goldCarat = parseInt(document.getElementById("goldCarat").value);
    let goldWeight = parseFloat(document.getElementById("goldWeight").value) || 0;
    let silverWeight = parseFloat(document.getElementById("silverWeight").value) || 0;
    let mainCurrency = document.getElementById("mainCurrency").value;

    let pureGoldWeight = goldWeight * (goldCarat / 24);
    let totalCash = 0;

    assetEntries.forEach(entry => {
        totalCash += entry.amount;
    });
    // ... rest of calculation logic ...
    // ... result display in table format ...
}
function resetForm() {
    assetEntries = [];
    displayAssets();
    // ... rest of reset logic ...
}

function printResult() {
    window.print();
}