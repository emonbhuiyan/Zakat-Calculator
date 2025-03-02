const translations = {
    en: { title: "Zakat Calculator", wealth_calculation: "Wealth Calculation", gold_calculation: "Gold Calculation" },
    bn: { title: "যাকাত ক্যালকুলেটর", wealth_calculation: "সম্পদের হিসাব", gold_calculation: "স্বর্ণের হিসাব" },
    ar: { title: "حاسبة الزكاة", wealth_calculation: "حساب الثروة", gold_calculation: "حساب الذهب" },
    ur: { title: "زکات کیلکولیٹر", wealth_calculation: "دولت کا حساب", gold_calculation: "سونے کا حساب" },
    hi: { title: "ज़कात कैलकुलेटर", wealth_calculation: "धन की गणना", gold_calculation: "सोने की गणना" },
    fa: { title: "ماشین حساب زکات", wealth_calculation: "محاسبه ثروت", gold_calculation: "محاسبه طلا" },
    tr: { title: "Zekat Hesaplayıcı", wealth_calculation: "Varlık Hesaplama", gold_calculation: "Altın Hesaplama" }
};

function changeLanguage(lang) {
    document.querySelectorAll("[data-lang]").forEach(element => {
        let key = element.getAttribute("data-lang");
        element.innerText = translations[lang][key];
    });
}
