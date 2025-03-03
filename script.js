let assets = [];
let liabilities = [];
let goldItems = [];
let silverItems = [];

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

async function getExchangeRate(fromCurrency, toCurrency, date = null) {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    // If no date is provided or the date is today, use "latest"
    const apiDate = !date || date === today ? "latest" : date;

    // Convert currency codes to lowercase
    const fromCurrencyLower = fromCurrency.toLowerCase();
    const toCurrencyLower = toCurrency.toLowerCase();

    // Primary URL (cdn.jsdelivr.net)
    const primaryUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${apiDate}/v1/currencies/${fromCurrencyLower}.json`;

    // Fallback URL (currency-api.pages.dev)
    const fallbackUrl = `https://${apiDate}.currency-api.pages.dev/v1/currencies/${fromCurrencyLower}.json`;

    try {
        // Try the primary URL first
        const response = await fetch(primaryUrl);
        const data = await response.json();

        if (data[fromCurrencyLower] && data[fromCurrencyLower][toCurrencyLower]) {
            return data[fromCurrencyLower][toCurrencyLower]; // Return the exchange rate
        } else {
            console.error(`Exchange rate not found for ${fromCurrencyLower} to ${toCurrencyLower}`);
            throw new Error("Primary API failed"); // Trigger fallback
        }
    } catch (primaryError) {
        console.error("Primary API failed, trying fallback:", primaryError);

        try {
            // Try the fallback URL
            const fallbackResponse = await fetch(fallbackUrl);
            const fallbackData = await fallbackResponse.json();

            if (fallbackData[fromCurrencyLower] && fallbackData[fromCurrencyLower][toCurrencyLower]) {
                return fallbackData[fromCurrencyLower][toCurrencyLower]; // Return the exchange rate
            } else {
                console.error(`Fallback API failed for ${fromCurrencyLower} to ${toCurrencyLower}`);
                return 1; // Fallback rate
            }
        } catch (fallbackError) {
            console.error("Fallback API failed:", fallbackError);
            return 1; // Fallback rate
        }
    }
}

function addAsset() {
    let assetTypeInput = document.getElementById("assetType");
    let assetAmountInput = document.getElementById("assetAmount");
    let assetCurrencyInput = document.getElementById("assetCurrency");
    let errorMessage = document.getElementById("assetError"); // Error message container

    let type = assetTypeInput.value.trim();
    let amount = parseFloat(assetAmountInput.value);
    let currency = assetCurrencyInput.value;

    // Validate input: Ensure asset type is not empty, amount is valid, and currency is selected
    if (!type || /^\d+$/.test(type) || isNaN(amount) || amount <= 0 || !currency || currency === "select") {
        errorMessage.innerHTML = "⚠️ Please enter a valid asset type (not just numbers), enter a positive amount, and select a currency.";
        return;
    }

    // Clear the error message if inputs are valid
    errorMessage.innerHTML = "";

    // Add asset to the list
    assets.push({ type, amount, currency });
    updateAssetList();

    // Reset input fields after adding
    assetTypeInput.value = "";
    assetAmountInput.value = "";
    assetCurrencyInput.value = "select";
}

function updateAssetList() {
    let assetList = document.getElementById("assetList");
    assetList.innerHTML = assets.map((item, index) =>
        `<li class="list-group-item d-flex justify-content-between bg-light">
            <i class="fas fa-wallet text-primary" style="margin-top: 6px;"></i> ${item.type} - ${item.amount} ${item.currency}
            <button class="btn btn-sm btn-danger" onclick="deleteAsset(${index})"><i class="fas fa-trash-alt"></i></button>
        </li>`
    ).join('');
}

function deleteAsset(index) {
    assets.splice(index, 1);
    updateAssetList();
}

function getTotalAssets() {
    return assets.reduce((sum, asset) => sum + asset.amount, 0); 
}

function addLiability() {
    let liabilityTypeInput = document.getElementById("liabilityType");
    let liabilityAmountInput = document.getElementById("liabilityAmount");
    let liabilityCurrencyInput = document.getElementById("liabilityCurrency");
    let errorMessage = document.getElementById("liabilityError"); // Error message container

    let type = liabilityTypeInput.value.trim();
    let amount = parseFloat(liabilityAmountInput.value);
    let currency = liabilityCurrencyInput.value;

    // Validate input
    if (!type || /^\d+$/.test(type) || isNaN(amount) || amount <= 0 || !currency || currency === "select") {
        errorMessage.innerHTML = "⚠️ Please enter a valid liability type (not just numbers), enter a positive amount, and select a currency.";
        return;
    }

    // Clear error message
    errorMessage.innerHTML = "";

    // Add liability
    liabilities.push({ type, amount, currency });
    console.log("Liabilities after adding:", liabilities); // Debugging

    updateLiabilityList();

    // Reset inputs
    liabilityTypeInput.value = "";
    liabilityAmountInput.value = "";
    liabilityCurrencyInput.value = "select";
}


function updateLiabilityList() {
    let list = document.getElementById("liabilityList");
    list.innerHTML = "";

    liabilities.forEach((liability, index) => {
        let listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between bg-light";
        listItem.innerHTML = `
            <i class="fas fa-hand-holding-usd text-danger" style="margin-top: 6px;"></i> 
            ${liability.type} - ${liability.amount} ${liability.currency}
            <button class="btn btn-sm btn-danger" onclick="removeLiability(${index})">
                <i class="fas fa-trash-alt"></i>
            </button>`;
        list.appendChild(listItem);
    });

    updateTotalAssets();
}


function removeLiability(index) {
    liabilities.splice(index, 1);
    updateLiabilityList();
}

function getTotalLiabilities() {
    return liabilities.reduce((sum, l) => sum + l.amount, 0);
}

// Ensure this function updates total assets after deducting liabilities
function updateTotalAssets() {
    let totalAssets = getTotalAssets() - getTotalLiabilities();
    console.log(`Total Assets after Liabilities: ${totalAssets.toFixed(2)}`); // Debugging output
    return totalAssets;
}

function addGold() {
    let goldCaratInput = document.getElementById("goldCarat");
    let goldWeightInput = document.getElementById("goldWeight");
    let errorMessage = document.getElementById("goldError"); // Error message container

    let carat = parseInt(goldCaratInput.value);
    let weight = parseFloat(goldWeightInput.value);

    // Check if carat is invalid (empty or "select") or weight is <= 0
    if (isNaN(carat) || goldCaratInput.value === "select" || weight <= 0 || isNaN(weight)) {
        errorMessage.textContent = "⚠️ Please select a valid gold carat and enter a valid weight.";
        return;
    }

    // Clear the error message if inputs are valid
    errorMessage.innerHTML = "";

    let pureGold = (weight * carat) / 24;
    let zakatableGold = pureGold * 0.025;

    goldItems.push({ weight, pureGold, zakatableGold });
    updateGoldList();

    // Reset input fields after adding
    goldCaratInput.value = "select"; // Reset the carat dropdown
    goldWeightInput.value = "";
}

function updateGoldList() {
    let goldList = document.getElementById("goldList");
    goldList.innerHTML = goldItems.map((item, index) =>
        `<li class="list-group-item d-flex justify-content-between bg-warning">
            <i class="fas fa-ring text-gold" style="margin-top: 6px;"></i> Gold: ${item.weight}g | Pure Gold: ${item.pureGold.toFixed(2)}g | Zakatable Gold: ${item.zakatableGold.toFixed(2)}g
            <button class="btn btn-sm btn-danger" onclick="deleteGold(${index})"><i class="fas fa-trash-alt"></i></button>
        </li>`
    ).join('');
}

function deleteGold(index) {
    goldItems.splice(index, 1);
    updateGoldList();
}

function addSilver() {
    let silverWeightInput = document.getElementById("silverWeight");
    let alertBox = document.getElementById("silverAlert"); // Make sure this div exists
    let weight = parseFloat(silverWeightInput.value);

    if (isNaN(weight) || weight <= 0) {
        alertBox.textContent = "⚠️ Please enter a valid silver weight.";
        return; // Stop function execution
    }

    // Clear any previous alert
    alertBox.innerHTML = "";

    let zakatableSilver = weight * 0.025;

    silverItems.push({ weight, zakatableSilver });
    updateSilverList();

    // Clear the input field after adding
    silverWeightInput.value = "";
}

function updateSilverList() {
    let silverList = document.getElementById("silverList");
    silverList.innerHTML = silverItems.map((item, index) =>
        `<li class="list-group-item d-flex justify-content-between bg-secondary text-white">
            <i class="fas fa-coins text-silver" style="margin-top: 6px;"></i> Silver: ${item.weight}g | Zakatable: ${item.zakatableSilver.toFixed(2)}g
            <button class="btn btn-sm btn-danger" onclick="deleteSilver(${index})"><i class="fas fa-trash-alt"></i></button>
        </li>`
    ).join('');
}

function deleteSilver(index) {
    silverItems.splice(index, 1);
    updateSilverList();
}

document.addEventListener("DOMContentLoaded", function () {
    setDateLimits();
});

function setDateLimits() {
    const dateInput = document.getElementById("exchangeRateDate");

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Calculate the date 365 days ago
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const oneYearAgoFormatted = oneYearAgo.toISOString().split("T")[0];

    // Set the min and max attributes
    dateInput.setAttribute("max", today); // Maximum date is today
    dateInput.setAttribute("min", oneYearAgoFormatted); // Minimum date is 365 days ago
}

function validateDate() {
    const dateInput = document.getElementById("exchangeRateDate");
    const dateError = document.getElementById("dateError");

    // Get the selected date
    const selectedDate = dateInput.value;

    if (!selectedDate) {
        dateError.textContent = ""; // Clear error if no date is selected
        return;
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Calculate the date 365 days ago
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const oneYearAgoFormatted = oneYearAgo.toISOString().split("T")[0];

    // Validate the selected date
    if (selectedDate > today) {
        dateError.textContent = "⚠️ Please select a date that is not in the future.";
        dateInput.value = ""; // Clear the input
    } else if (selectedDate < oneYearAgoFormatted) {
        dateError.textContent = "⚠️ Please select a date within the last 365 days.";
        dateInput.value = ""; // Clear the input
    } else {
        dateError.textContent = ""; // Clear error if the date is valid
    }
}

function clearDateField() {
    document.getElementById("exchangeRateDate").value = ""; // Clear input value
    document.getElementById("dateError").textContent = ""; // Clear error message
}

function formatDate(dateString) {
    if (!dateString || dateString === "latest") {
        const today = new Date();
        return today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    }

    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

async function calculateZakat() {
    const mainCurrency = document.getElementById("mainCurrency").value;
    const dateInput = document.getElementById("exchangeRateDate").value;
    const date = dateInput || "latest"; // Use "latest" if no date is selected

    // Get the error message container
    const errorMessage = document.getElementById("calculationError");

    // Validate input data
    if (assets.length === 0 && goldItems.length === 0 && silverItems.length === 0) {
        errorMessage.innerHTML = `<div class="alert alert-danger">⚠️ Please add at least one asset, gold, or silver to calculate Zakat.</div>`;
        document.getElementById("result").innerHTML = ""; // Clear the result section
        return; // Stop execution if no data is entered
    } else {
        errorMessage.innerHTML = ""; // Clear the error message if data is valid
    }

    // Initialize totals
    let totalCash = 0;
    let totalLiabilities = 0;
    let totalZakatCash = 0;

    // Calculate total pure gold and zakatable gold
    const totalPureGoldWeight = goldItems.reduce((sum, item) => sum + item.pureGold, 0);
    const totalZakatableGoldWeight = goldItems.reduce((sum, item) => sum + item.zakatableGold, 0);

    // Calculate total silver and zakatable silver
    const totalSilverWeight = silverItems.reduce((sum, item) => sum + item.weight, 0);
    const totalZakatableSilverWeight = silverItems.reduce((sum, item) => sum + item.zakatableSilver, 0);

    console.log("Gold Items:", goldItems);
    console.log("Silver Items:", silverItems);
    console.log("Assets:", assets);
    console.log("Liabilities:", liabilities);

    // Convert all assets to the main currency
    if (assets.length > 0) {
        const convertedAssets = await Promise.all(
            assets.map(async (asset) => {
                const rate = await getExchangeRate(asset.currency, mainCurrency, date);
                if (!rate || rate <= 0) {
                    console.warn(`Invalid exchange rate for ${asset.currency} to ${mainCurrency}. Using default 1.`);
                    return asset.amount; // Fallback in case of API failure
                }
                return asset.amount * rate;
            })
        );
        totalCash = convertedAssets.reduce((sum, amount) => sum + amount, 0);
    }

    // Convert all liabilities to the main currency and sum them
    if (liabilities.length > 0) {
        const convertedLiabilities = await Promise.all(
            liabilities.map(async (liability) => {
                const rate = await getExchangeRate(liability.currency, mainCurrency, date);
                if (!rate || rate <= 0) {
                    console.warn(`Invalid exchange rate for ${liability.currency} to ${mainCurrency}. Using default 1.`);
                    return liability.amount; // Fallback in case of API failure
                }
                return liability.amount * rate;
            })
        );
        totalLiabilities = convertedLiabilities.reduce((sum, amount) => sum + amount, 0);
    }

    // Deduct liabilities from total cash/assets
    let netZakatableAssets = totalCash - totalLiabilities;
    netZakatableAssets = netZakatableAssets > 0 ? netZakatableAssets : 0; // Ensure it's not negative

    // Calculate Zakat on net assets (2.5% of net assets)
    totalZakatCash = netZakatableAssets * 0.025;

    console.log("Total Cash:", totalCash.toFixed(2), mainCurrency);
    console.log("Total Liabilities:", totalLiabilities.toFixed(2), mainCurrency);
    console.log("Net Zakatable Assets:", netZakatableAssets.toFixed(2), mainCurrency);
    console.log("Total Zakat on Cash:", totalZakatCash.toFixed(2), mainCurrency);
    console.log("Total Pure Gold Weight:", totalPureGoldWeight.toFixed(2), "g");
    console.log("Total Zakatable Gold Weight:", totalZakatableGoldWeight.toFixed(2), "g");
    console.log("Total Silver Weight:", totalSilverWeight.toFixed(2), "g");
    console.log("Total Zakatable Silver Weight:", totalZakatableSilverWeight.toFixed(2), "g");

    // Format the date
    const formattedDate = formatDate(date);

    // Display the result in a structured table format
    document.getElementById("result").innerHTML = `
        <div class="alert alert-info">
            <h4 class="text-center"><i class="fas fa-calculator"></i> Zakat Calculation</h4>
            <p class="text-center"><i class="fas fa-calendar-alt"></i> <strong>Zakat Calculation Date: ${formattedDate}</strong></p>

            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead class="table-secondary text-center">
                        <tr>
                            <th colspan="2">Assets & Liabilities</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr class="alert alert-dark text-center">
                            <td><strong>Category</strong></td>
                            <td><strong>Amount</strong></td>
                        </tr>
                        <tr>
                            <td><i class="fas fa-wallet"></i> Total Cash/Assets</td>
                            <td class="text-center">${totalCash.toFixed(2)} ${mainCurrency}</td>
                        </tr>
                        <tr>
                            <td><i class="fas fa-file-invoice-dollar"></i> Total Liabilities</td>
                            <td  class="text-center">${totalLiabilities.toFixed(2)} ${mainCurrency}</td>
                        </tr>
                        <tr class="table-light">
                            <td><i class="fas fa-balance-scale-left"></i> Net Zakatable Assets</td>
                            <td  class="text-center">${netZakatableAssets.toFixed(2)} ${mainCurrency}</td>
                        </tr>
                        <tr class="table-warning">
                            <td class="text-end"><i class="fas fa-money-bill-wave"></i><strong> Cash Zakat (2.5%)</strong></td>
                            <td class="text-start"><strong>${totalZakatCash.toFixed(2)} ${mainCurrency}</strong></td>
                        </tr>
                    </tbody>
                </table>

                <table class="table table-bordered table-hover">
                    <thead class="table-secondary text-center">
                        <tr>
                            <th colspan="2">Gold & Silver</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr class="alert alert-dark text-center">
                            <td><strong>Item</strong></td>
                            <td><strong>Weight (gram)</strong></td>
                        </tr>
                        <tr>
                            <td><i class="fas fa-balance-scale"></i> Total Pure Gold Weight</td>
                            <td class="text-center">${totalPureGoldWeight.toFixed(2)}g</strong></td>
                        </tr>
                        <tr class="table-warning">
                            <td class="text-end"><i class="fas fa-gem"></i><strong> Zakatable Gold Weight (2.5%)</strong></td>
                            <td><strong>${totalZakatableGoldWeight.toFixed(2)}g</td>
                        </tr>
                        <tr>
                            <td><i class="fas fa-balance-scale-right"></i> Total Silver Weight</td>
                            <td class="text-center">${totalSilverWeight.toFixed(2)}g</td>
                        </tr>
                        <tr class="table-warning">
                            <td class="text-end"><i class="fas fa-coins"></i><strong> Zakatable Silver Weight (2.5%)</strong></td>
                            <td><strong>${totalZakatableSilverWeight.toFixed(2)}g</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="alert alert-danger text-center">
                <i class="fas fa-exclamation-triangle"></i> <strong>Important:</strong> Please check the latest gold and silver prices from the market before finalizing your Zakat calculation.
            </div>
        </div>
    `;
}




function resetForm() {
    assets = [];
    goldItems = [];
    silverItems = [];

    updateAssetList();
    updateGoldList();
    updateSilverList();

    document.getElementById("result").innerHTML = "";

    // Reset all input fields
    document.querySelectorAll("input").forEach(input => input.value = "");
}

function printFullPage() {
    window.print();
}

function printResult() {
    let printContent = document.getElementById("result").innerHTML;
    let originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}

