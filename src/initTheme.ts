let value = localStorage.getItem("theme");

if (!value) {
  const prefersDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  if (prefersDarkTheme) {
    value = "dark";
  } else {
    value = "light";
  }
}

document.documentElement.dataset.theme = value;
