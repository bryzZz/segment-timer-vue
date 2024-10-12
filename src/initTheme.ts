let value = localStorage.getItem("theme");

if (!value) value = "light";

document.documentElement.dataset.theme = value;
