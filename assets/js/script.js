document.addEventListener("DOMContentLoaded", function () {
    const typeSelect = document.getElementById("type");
    const amountField = document.getElementById("amountField");
    const amountInput = document.getElementById("amount");
    const caratField = document.getElementById("caratField");
    const caratSelect = document.getElementById("carat");
    const currencyField = document.getElementById("currencyField");
    const currencySelect = document.getElementById("currency");
    const addWealthBtn = document.getElementById("addWealth");
    const cashList = document.getElementById("cashList").querySelector("tbody");
    const goldSilverList = document.getElementById("goldSilverList").querySelector("tbody");

    typeSelect.addEventListener("change", function () {
        amountField.style.display = "block";
        currencyField.style.display = "block";
        addWealthBtn.style.display = "block";

        if (this.value === "gold" || this.value === "silver") {
            caratField.style.display = (this.value === "gold") ? "block" : "none";
        } else {
            caratField.style.display = "none";
        }
    });

    addWealthBtn.addEventListener("click", function () {
        const type = typeSelect.value;
        const amount = parseFloat(amountInput.value) || 0;
        const currency = currencySelect.value;
        let carat = caratSelect.value;
        let pureGold = amount;

        if (!type || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        if (type === "gold") {
            const purity = parseFloat(carat) / 24;
            pureGold = (amount * purity).toFixed(2);
        }

        if (type === "gold" || type === "silver") {
            addGoldSilverRow(type, amount, carat, pureGold);
        } else {
            addCashRow(type, amount, currency);
        }

        // Reset fields
        amountInput.value = "";
        typeSelect.value = "";
        caratField.style.display = "none";
        amountField.style.display = "none";
        currencyField.style.display = "none";
        addWealthBtn.style.display = "none";
    });

    function addCashRow(type, amount, currency) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${type}</td>
            <td>${amount}</td>
            <td>${currency}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeRow(this)">Remove</button></td>
        `;
        cashList.appendChild(row);
    }

    function addGoldSilverRow(type, amount, carat, pureGold) {
        const zakatableGold = (pureGold * 0.025).toFixed(2); // 2.5% for Zakat
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${type}</td>
            <td>${amount}g</td>
            <td>${carat}K</td>
            <td>${pureGold}g</td>
            <td>${zakatableGold}g</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeRow(this)">Remove</button></td>
        `;
        goldSilverList.appendChild(row);
    }

    window.removeRow = function (button) {
        button.closest("tr").remove();
    };

    document.getElementById("calculateZakat").addEventListener("click", function () {
        let totalZakat = 0;

        document.querySelectorAll("#goldSilverList tbody tr").forEach(row => {
            totalZakat += parseFloat(row.children[4].innerText) || 0;
        });

        document.querySelectorAll("#cashList tbody tr").forEach(row => {
            totalZakat += parseFloat(row.children[1].innerText) * 0.025; // 2.5% on cash
        });

        document.getElementById("result").innerHTML = `<h2>Zakat Due: ${totalZakat.toFixed(2)}</h2>`;
    });
});
