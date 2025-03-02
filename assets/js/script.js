document.getElementById("type").addEventListener("change", function () {
    let selectedType = this.value;
    let amountField = document.getElementById("amountField");
    let caratField = document.getElementById("caratField");
    let currencyField = document.getElementById("currencyField");
    let addWealthButton = document.getElementById("addWealth");

    amountField.style.display = "none";
    caratField.style.display = "none";
    currencyField.style.display = "none";
    addWealthButton.style.display = "none";

    if (selectedType === "gold" || selectedType === "silver") {
        amountField.style.display = "block";
        caratField.style.display = selectedType === "gold" ? "block" : "none";
        addWealthButton.style.display = "block";
    } else if (selectedType === "cash" || selectedType === "investments" || selectedType === "savings") {
        amountField.style.display = "block";
        currencyField.style.display = "block";
        addWealthButton.style.display = "block";
    }
});

document.getElementById("calculateZakat").addEventListener("click", function () {
    let zakatNisabGold = 87.48;
    let zakatNisabSilver = 612.36;
    let zakatableGold = 0;
    let zakatableSilver = 0;

    document.querySelectorAll("#goldSilverList tbody tr").forEach(row => {
        let weight = parseFloat(row.cells[1].textContent);
        let purity = parseFloat(row.cells[3].textContent) / 100;
        zakatableGold += weight * purity;
    });

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h4>Zakat Due:</h4>
    <p><strong>Gold:</strong> ${zakatableGold.toFixed(2)}g</p>
    <p><strong>Nisab:</strong> ${zakatNisabGold}g Gold or ${zakatNisabSilver}g Silver</p>`;
});
