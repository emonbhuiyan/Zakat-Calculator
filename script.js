function calculateZakat() {
    // ... (existing code to get input values) ...
    let goldCarat = parseInt(document.getElementById("goldCarat").value);
    let goldWeight = parseFloat(document.getElementById("goldWeight").value) || 0;
    let silverWeight = parseFloat(document.getElementById("silverWeight").value) || 0;
    let mainCurrency = document.getElementById("mainCurrency").value;

    let pureGoldWeight = goldWeight * (goldCarat / 24);
    let totalCash = cashAmount + bankAmount + investmentAmount;

    // ... (existing nisab and zakat calculation) ...

    if (pureGoldWeight >= nisabGold) {
        zakatAmount += pureGoldWeight * 0.025;
        resultText += `Pure Gold Weight: ${pureGoldWeight.toFixed(2)} grams, Zakat: ${(pureGoldWeight * 0.025).toFixed(2)}<br>`;
    }
    document.getElementById("pureGoldWeightDisplay").innerHTML = `Pure Gold: ${pureGoldWeight.toFixed(2)} grams`;

    if (silverWeight >= nisabSilver) {
        zakatAmount += silverWeight * 0.025;
        resultText += `Silver Weight: ${silverWeight.toFixed(2)} grams, Zakat: ${(silverWeight * 0.025).toFixed(2)}<br>`;
    }
    document.getElementById("pureSilverWeightDisplay").innerHTML = `Silver: ${silverWeight.toFixed(2)} grams`;

    // ... (existing result display) ...
}

function resetForm() {
    // ... (existing reset code) ...
    document.getElementById("pureGoldWeightDisplay").innerHTML = "";
    document.getElementById("pureSilverWeightDisplay").innerHTML = "";
}

// ... (existing currency logic and printResult function) ...