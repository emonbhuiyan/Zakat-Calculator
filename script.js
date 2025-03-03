// script.js
function calculateZakat() {
    let goldCarat = parseInt(document.getElementById("goldCarat").value);
    let goldWeight = parseFloat(document.getElementById("goldWeight").value) || 0;
    let silverWeight = parseFloat(document.getElementById("silverWeight").value) || 0;
    let cashAmount = parseFloat(document.getElementById("cashAmount").value) || 0;
    let bankAmount = parseFloat(document.getElementById("bankAmount").value) || 0;
    let investmentAmount = parseFloat(document.getElementById("investmentAmount").value) || 0;

    let pureGoldWeight = goldWeight * (goldCarat / 24);
    let totalCash = cashAmount + bankAmount + investmentAmount;

    const nisabGold = 87.48;
    const nisabSilver = 612.36;

    let zakatAmount = 0;
    let resultText = "";
    let liable = false;

    if (pureGoldWeight >= nisabGold || silverWeight >= nisabSilver || totalCash > 0) {
        liable = true;
    }

    if (pureGoldWeight >= nisabGold) {
        zakatAmount += pureGoldWeight * 0.025;
        resultText += `Zakatable Gold Weight: ${pureGoldWeight.toFixed(2)} grams, Zakat: ${(pureGoldWeight * 0.025).toFixed(2)}<br>`;
    }
    if (silverWeight >= nisabSilver) {
        zakatAmount += silverWeight * 0.025;
        resultText += `Zakatable Silver Weight: ${silverWeight.toFixed(2)} grams, Zakat: ${(silverWeight * 0.025).toFixed(2)}<br>`;
    }
    if (totalCash > 0) {
        zakatAmount += totalCash * 0.025;
        resultText += `Cash, Bank, Investments: ${(totalCash).toFixed(2)}, Zakat: ${(totalCash * 0.025).toFixed(2)}<br>`;
    }

    if (liable) {
        resultText = `Total Zakat: ${zakatAmount.toFixed(2)}<br>` + resultText;
        resultText += `Nisab Gold: ${nisabGold} grams, Nisab Silver: ${nisabSilver} grams`;
    } else {
        resultText = "You are not obligated to pay Zakat.<br>";
        resultText += `Nisab Gold: ${nisabGold} grams, Nisab Silver: ${nisabSilver} grams`;
    }

    document.getElementById("result").innerHTML = resultText;
}

function resetForm() {
    document.getElementById("goldWeight").value = "";
    document.getElementById("silverWeight").value = "";
    document.getElementById("cashAmount").value = "";
    document.getElementById("bankAmount").value = "";
    document.getElementById("investmentAmount").value = "";
    document.getElementById("result").innerHTML = "";

    //hide currency select fields
    document.getElementById('cashCurrency').style.display = 'none';
    document.getElementById('bankCurrency').style.display = 'none';
    document.getElementById('investmentCurrency').style.display = 'none';
}

function printResult() {
    window.print();
}

// Currency logic
const cashCurrency = document.getElementById('cashCurrency');
const bankCurrency = document.getElementById('bankCurrency');
const investmentCurrency = document.getElementById('investmentCurrency');

const cashAmountInput = document.getElementById('cashAmount');
const bankAmountInput = document.getElementById('bankAmount');
const investmentAmountInput = document.getElementById('investmentAmount');

cashAmountInput.addEventListener('focus', () => {cashCurrency.style.display = 'inline-block';});
cashAmountInput.addEventListener('blur', () => {if(!cashAmountInput.value){cashCurrency.style.display = 'none';}});

bankAmountInput.addEventListener('focus', () => {bankCurrency.style.display = 'inline-block';});
bankAmountInput.addEventListener('blur', () => {if(!bankAmountInput.value){bankCurrency.style.display = 'none';}});

investmentAmountInput.addEventListener('focus', () => {investmentCurrency.style.display = 'inline-block';});
investmentAmountInput.addEventListener('blur', () => {if(!investmentAmountInput.value){investmentCurrency.style.display = 'none';}});