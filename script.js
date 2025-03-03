const exchangeRateApiKey = "67ca1d11b03dff9c3d66179a";

let goldList = [];
let silverWeight = 0;
let goldRate = 0, silverRate = 0;

async function fetchMarketRates() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/USD`);
    const data = await response.json();
    
    goldRate = 65;  // Example per gram USD (update manually if needed)
    silverRate = 0.85;  // Example per gram USD (update manually if needed)

    document.getElementById("marketRates").innerHTML = `
        <strong>Current Market Rates:</strong><br>
        Gold: <span class="highlight">$${goldRate} per gram</span><br>
        Silver: <span class="highlight">$${silverRate} per gram</span>
    `;
}

function addGold() {
    let carat = parseInt(document.getElementById("goldCarat").value);
    let weight = parseFloat(document.getElementById("goldWeight").value);
    
    if (weight > 0) {
        goldList.push({ carat, weight });
        document.getElementById("goldWeight").value = "";
    }
}

function addSilver() {
    silverWeight = parseFloat(document.getElementById("silverWeight").value);
    document.getElementById("silverWeight").value = "";
}

function calculateZakat() {
    let pureGold = goldList.reduce((sum, gold) => {
        let purity = gold.carat / 24;
        return sum + (gold.weight * purity);
    }, 0);

    let zakatableGold = pureGold * 0.025;
    let zakatableSilver = silverWeight * 0.025;

    let goldValue = pureGold * goldRate;
    let silverValue = silverWeight * silverRate;

    let resultHTML = `
        <h3>Zakat Calculation Results</h3>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Asset</th>
                    <th>Total Weight</th>
                    <th>Zakatable Weight (2.5%)</th>
                    <th>Value in USD</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Gold</td>
                    <td>${pureGold.toFixed(2)} grams</td>
                    <td>${zakatableGold.toFixed(2)} grams</td>
                    <td>$${goldValue.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Silver</td>
                    <td>${silverWeight.toFixed(2)} grams</td>
                    <td>${zakatableSilver.toFixed(2)} grams</td>
                    <td>$${silverValue.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    `;

    document.getElementById("result").innerHTML = resultHTML;
}

function resetForm() {
    goldList = [];
    silverWeight = 0;
    document.getElementById("result").innerHTML = "";
}

function printResult() {
    window.print();
}

fetchMarketRates();
