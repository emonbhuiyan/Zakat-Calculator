document.getElementById("generatePdf").addEventListener("click", function () {
    let content = document.querySelector("main").innerHTML;
    let win = window.open("", "_blank");
    win.document.write("<html><head><title>Zakat Report</title></head><body>");
    win.document.write(content);
    win.document.write("</body></html>");
    win.document.close();
    win.print();
});
