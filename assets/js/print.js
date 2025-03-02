function printSummary() {
    let printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write("<html><head><title>Zakat Summary</title></head><body>");
    printWindow.document.write("<h2>Zakat Calculation Summary</h2>");
    printWindow.document.write("<p>" + document.getElementById("result").innerText + "</p>");
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
}
