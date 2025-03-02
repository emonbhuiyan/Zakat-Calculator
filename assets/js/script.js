function calculateZakat() {
    let cash = parseFloat(document.getElementById("cash").value) || 0;
    let goldWeight = parseFloat(document.getElementById("gold").value) || 0;
    let goldKarat = parseFloat(document.getElementById("gold-karat").value);
    let exchangeRate = parseFloat(document.getElementById("exchange-rate").value) || 1;

    // Convert gold weight based on purity
    let pureGold = goldWeight * (goldKarat / 24); // Convert to 24K equivalent

    // Total wealth calculation
    let totalWealth = cash + (pureGold * exchangeRate);

    // Nisab threshold (85g gold or 595g silver, approximate value in USD)
    let nisabThreshold = 500; // Placeholder, later will use real values

    // Check if zakat is due
    if (totalWealth >= nisabThreshold) {
        let zakatAmount = totalWealth * 0.025; // 2.5% Zakat
        document.getElementById("result").innerHTML = `Zakat Due: ${zakatAmount.toFixed(2)} in selected currency`;
    } else {
        document.getElementById("result").innerHTML = "No Zakat is due.";
    }
}
