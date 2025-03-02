let goldItems = [];

function addGoldItem() {
    const goldList = document.getElementById("gold-list");
    const newItem = document.createElement("div");
    newItem.innerHTML = `
        <input type="number" class="gold-weight" placeholder="Gold Weight (g)">
        <select class="gold-carat">
            <option value="24">24K</option>
            <option value="22">22K</option>
            <option value="18">18K</option>
            <option value="14">14K</option>
            <option value="10">10K</option>
        </select>
        <button onclick="removeGoldItem(this)">Remove</button>
    `;
    goldList.appendChild(newItem);
}

function removeGoldItem(button) {
    button.parentElement.remove();
}

function calculateZakat() {
    let totalGold = 0;
    let goldWeights = document.querySelectorAll(".gold-weight");
    let goldCarats = document.querySelectorAll(".gold-carat");

    goldWeights.forEach((input, index) => {
        let weight = parseFloat(input.value) || 0;
        let carat = parseFloat(goldCarats[index].value) || 24;
        totalGold += (weight * carat) / 24;  // Convert to pure gold
    });

    let silver = parseFloat(document.getElementById("silver").value) || 0;
    let cash = parseFloat(document.getElementById("cash").value) || 0;

    // Nisab thresholds (gold 85g, silver 595g)
    let goldNisab = 85;
    let silverNisab = 595;

    let zakat = 0;
    if (totalGold >= goldNisab || silver >= silverNisab || cash > 0) {
        let totalWealth = totalGold + silver + cash;
        zakat = totalWealth * 0.025;
    }

    document.getElementById("zakat-result").innerText = zakat.toFixed(2);
}

function resetCalculator() {
    document.getElementById("gold-list").innerHTML = "";
    document.getElementById("silver").value = "";
    document.getElementById("cash").value = "";
    document.getElementById("zakat-result").innerText = "0";
}
