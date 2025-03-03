let assetEntries = [];
let goldEntries = [];
let silverEntries = [];

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

function addGold() {
    let carat = parseInt(document.getElementById("goldCarat").value);
    let weight = parseFloat(document.getElementById("goldWeight").value) || 0;
    goldEntries.push({ carat, weight });
    displayGold();
    document.getElementById("goldWeight").value = "";
}

function displayGold() {
    let tableBody = document.getElementById("goldList").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    goldEntries.forEach((entry, index) => {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);

        cell1.innerHTML = entry.carat;
        cell2.innerHTML = entry.weight.toFixed(2);
        cell3.innerHTML = `<button class="btn btn-danger btn-sm" onclick="removeGold(${index})">Remove</button>`;
    });
}

function removeGold(index) {
    goldEntries.splice(index, 1);
    displayGold();
}

function addSilver() {
    let weight = parseFloat(document.getElementById("silverWeight").value) || 0;
    silverEntries.push({ weight });
    displaySilver();
    document.getElementById("silverWeight").value = "";
}

function displaySilver() {
    let tableBody = document.getElementById("silverList").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    silverEntries.forEach((entry, index) => {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);

        cell1.innerHTML = entry.weight.toFixed(2);
        cell2.innerHTML = `<button class="btn btn-danger btn-sm" onclick="removeSilver(${index})">Remove</button>`;
    });
}

function removeSilver(index) {
    silverEntries.splice(index, 1);
    displaySilver();
}

function calculateZakat() {
    let mainCurrency = document.getElementById("mainCurrency").value;
    let totalCash = 0;
    let totalPureGold = 0;
    let totalSilver = 0;

    assetEntries.forEach(entry => {
        totalCash += entry.amount;
    });

    goldEntries.forEach(gold => {
        totalPureGold += gold.weight * (gold.carat / 24);
    });

    silverEntries.forEach(silver => {
        totalSilver += silver.weight;
    });

    const nisabGold = 87.48;
    const nisabSilver = 612.36;

    let zakatAmount = 0;

    if (totalPureGold >= nisabGold) {
        zakatAmount += totalPureGold * 0.025;
    }

    if (totalSilver >= nisabSilver) {
        zakatAmount += totalSilver * 0.025;
    }

    if (totalCash > 0) {
        zakatAmount += totalCash * 0.025;
    }

    let resultText = `<table class="table"><thead><tr><th>Asset Type</th><th>Amount</th><th>Currency</th><th>Zakat (2.5%)</th></tr></thead><tbody>`;

    assetEntries.forEach(entry => {
        let zakat = (entry.amount * 0.025).toFixed(2);
        resultText += `<tr><td>${entry.type}</td><td>${entry.amount.toFixed(2)}</td><td>${entry.currency}</td><td>${zakat}</td></tr>`;
    });

    let goldZakat = (totalPureGold * 0.025).toFixed(2);
    let silverZakat = (totalSilver * 0.025).toFixed(2);

    resultText += `<tr><td>Gold</td><td>${totalPureGold.toFixed(2)} grams</td><td>-</td><td>${goldZakat} grams</td></tr>`;
    resultText += `<tr><td>Silver</td><td>${totalSilver.toFixed(2)} grams</td><td>-</td><td>${silverZakat} grams</td></tr>`;
    resultText += `<tr><td>Total</td><td>-</td><td>${mainCurrency}</td><td>${zakatAmount.toFixed(2)}</td></tr>`;
    resultText += `</tbody></table>`;

    document.getElementById("result").innerHTML = resultText;

    if (totalPureGold >= nisabGold || totalSilver >= nisabSilver) {
        document.getElementById("goldSilverRateMessage").style.display = "block";
    } else {
        document.getElementById("goldSilverRateMessage").style.display = "none";
    }
}

function resetForm() {
    assetEntries = [];
    goldEntries = [];
    silverEntries = [];
    displayAssets();
    displayGold();
    displaySilver();
    document.getElementById("result").innerHTML = "";
    document.getElementById("goldSilverRateMessage").style.display = "none";
}

function printResult() {
    window.print();
}