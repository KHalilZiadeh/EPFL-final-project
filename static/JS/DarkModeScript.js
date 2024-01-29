/* Checking for the DarkMode */
if (localStorage.getItem("dark")) {
  document.querySelectorAll("i").forEach((icon) => {
    icon.classList.toggle("clicked");
  });
  document.querySelector("body").classList.toggle("dark");
  document.querySelector("header").classList.toggle("dark");
}
document.querySelectorAll("i").forEach((icon) => {
  icon.addEventListener("click", () => {
    document.querySelectorAll("i").forEach((icon) => {
      icon.classList.toggle("clicked");
    });
    if (icon.classList.contains("moon")) {
      localStorage.setItem("dark", 1);
    } else {
      localStorage.removeItem("dark");
    }
    document.querySelector("body").classList.toggle("dark");
    document.querySelector("header").classList.toggle("dark");
  });
});
/* Checking for the DarkMode */

/* clearing sessionStorage onload */

// changed from window.onload to addEventListener
window.addEventListener("load", () => {
  if (sessionStorage.getItem("room")) {
    sessionStorage.removeItem("room");
  }
});
/* clearing sessionStorage onload */
