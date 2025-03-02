function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function setTheme(color) {
    document.documentElement.style.setProperty('--main-color', color);
}
