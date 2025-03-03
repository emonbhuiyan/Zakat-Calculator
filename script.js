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
    calculateGoldSilverWeights();
    document.getElementById("goldWeight").value = "";
}

function addSilver() {
    let weight = parseFloat(document.getElementById("silverWeight").value) || 0;
    silverEntries.push({ weight });
    calculateGoldSilverWeights();
    document.getElementById("silverWeight").value = "";
}

function calculateGoldSilverWeights() {
    let totalPureGold = 0;
    goldEntries.forEach(gold => {
        totalPureGold += gold.weight * (gold.carat / 24);
    });
    document.getElementById("pureGoldWeightDisplay").innerHTML = `Pure Gold: ${totalPureGold.toFixed(2)} grams`;
    document.getElementById("zakatableGoldWeightDisplay").innerHTML = `Zakatable Gold: ${(totalPureGold * 0.025).toFixed(2)} grams`;

    let totalSilver = 0;
    silverEntries.forEach(silver => {
        totalSilver += silver.weight;
    });
    document.getElementById("pureSilverWeightDisplay").innerHTML = `Silver: ${totalSilver.toFixed(2)} grams`;
    document.getElementById("zakatableSilverWeightDisplay").innerHTML = `Zakatable Silver: ${(totalSilver * 0.025).toFixed(2)} grams`;

    if (totalPureGold >= 87.48 || totalSilver >= 612.36) {
        document.getElementById("goldSilverRateMessage").style.display = "block";
    } else {
        document.getElementById("goldSilverRateMessage").style.display = "none";
    }
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

    let resultText = `<table class="table"><thead><tr><th>Asset Type</th><th>Amount</th><th>Currency</th></tr></thead><tbody>`;

    assetEntries.forEach(entry => {
        resultText += `<tr><td>${entry.type}</td><td>${entry.amount.toFixed(2)}</td><td>${entry.currency}</td></tr>`;
    });

    resultText += `</tbody></table>`;

    resultText += `<p>Pure Gold: ${totalPureGold.toFixed(2)} grams, Zakat: ${(totalPureGold * 0.025).toFixed(2)}</p>`;
    resultText += `<p>Silver: ${totalSilver.toFixed(2)} grams, Zakat: ${(totalSilver * 0.025).toFixed(2)}</p>`;
    resultText += `<p>Total Cash: ${totalCash.toFixed(2)}, Zakat: ${(totalCash * 0.025).toFixed(2)}</p>`;
    resultText += `<p>Total Zakat Amount (${mainCurrency}): ${zakatAmount.toFixed(2)}</p>`;

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
    calculateGoldSilverWeights();
    document.getElementById("result").innerHTML = "";
    document.getElementById("goldSilverRateMessage").style.display = "none";
}

function printResult() {
    window.print();
}