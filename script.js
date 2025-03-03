let assetEntries = [];
let goldEntries = [];
let silverEntries = [];

function addAsset() {
    // ... (existing addAsset function) ...
}

function displayAssets() {
    // ... (existing displayAssets function) ...
}

function removeAsset(index) {
    // ... (existing removeAsset function) ...
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
    // ... (existing calculation logic) ...