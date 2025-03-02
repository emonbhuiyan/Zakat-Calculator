const translations = {
    en: {
        title: "Zakat Calculator",
        type: "Type",
        gold: "Gold",
        silver: "Silver",
        cash: "Cash",
        investments: "Investments",
        savings: "Bank Savings",
        amount: "Amount",
        carat: "Carat",
        currency: "Currency",
        add: "Add to List",
        cashTable: "Cash, Investments, and Bank Savings",
        goldSilverTable: "Gold and Silver",
        mainCurrency: "Main Currency",
        calculate: "Calculate Zakat",
        generatePdf: "Generate PDF",
    },
    bn: {
        title: "যাকাত ক্যালকুলেটর",
        type: "ধরন",
        gold: "স্বর্ণ",
        silver: "রূপা",
        cash: "নগদ অর্থ",
        investments: "বিনিয়োগ",
        savings: "ব্যাংক সঞ্চয়",
        amount: "পরিমাণ",
        carat: "ক্যারেট",
        currency: "মুদ্রা",
        add: "তালিকায় যোগ করুন",
        cashTable: "নগদ অর্থ, বিনিয়োগ এবং ব্যাংক সঞ্চয়",
        goldSilverTable: "স্বর্ণ এবং রূপা",
        mainCurrency: "প্রধান মুদ্রা",
        calculate: "যাকাত হিসাব করুন",
        generatePdf: "পিডিএফ তৈরি করুন",
    },
};

function translatePage(lang) {
    document.querySelectorAll("[data-translate]").forEach(el => {
        let key = el.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

// Example: Translate to Bengali (bn)
// translatePage("bn");
