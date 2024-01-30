let checkBtn = document.querySelector("header ul li:first-child button");
checkBtn.addEventListener("click", () => {
  document.querySelector(".search").style.display = "block";
  document.querySelector(".search").style.order = "2";
  document.querySelector("#card").style.display = "none";
  document.querySelector("#card").style.order = "3";
});

let reservBtn = document.querySelector("header ul li:last-child button");
reservBtn.addEventListener("click", () => {
  document.querySelector(".search").style.display = "none";
  document.querySelector(".search").style.order = "3";
  document.querySelector("#card").style.display = "block";
  document.querySelector("#card").style.order = "2";
});
