let goldItems = [];

function addGoldItem() {
    let weight = parseFloat(document.getElementById("weight").value);
    let carat = parseFloat(document.getElementById("carat").value);
    
    if (isNaN(weight) || weight <= 0) {
        alert("Please enter a valid weight.");
        return;
    }

    let pureGold = (weight * carat) / 24;
    goldItems.push({ weight, carat, pureGold });

    updateTable();
    document.getElementById("weight").value = "";
}

function updateTable() {
    let tableBody = document.getElementById("goldTableBody");
    tableBody.innerHTML = "";
    
    let totalPureGold = 0;
    goldItems.forEach((item, index) => {
        totalPureGold += item.pureGold;
        tableBody.innerHTML += `
            <tr>
                <td>${item.weight}g</td>
                <td>${item.carat}K</td>
                <td>${item.pureGold.toFixed(2)}g</td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteItem(${index})"><i class="fas fa-trash"></i></button></td>
            </tr>
        `;
    });

    document.getElementById("totalPureGold").textContent = totalPureGold.toFixed(2);
}

function deleteItem(index) {
    goldItems.splice(index, 1);
    updateTable();
}

function resetCalculator() {
    goldItems = [];
    updateTable();
}
