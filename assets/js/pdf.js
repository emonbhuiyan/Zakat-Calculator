function downloadPDF() {
    let resultText = document.getElementById("result").innerText;
    let doc = new jsPDF();
    doc.text("Zakat Calculation Summary", 10, 10);
    doc.text(resultText, 10, 20);
    doc.save("zakat-summary.pdf");
}
