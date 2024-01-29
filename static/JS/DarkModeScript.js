const times = new Date();

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
  const dateInputCheckForm = document.getElementById("dateoption");
  const year = times.getFullYear();
  const month = (times.getMonth() + 1).toString().padStart(2, "0");
  const day = times.getDate().toString().padStart(2, "0");

  dateInputCheckForm.min = `${year}-${month}-${day}`;
  dateInputCheckForm.value = `${year}-${month}-${day}`;
});
/* clearing sessionStorage onload */
