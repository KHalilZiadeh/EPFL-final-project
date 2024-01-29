import { shuffleImgs } from "./imgShuffler.js";
import { createOptions } from "./createFunctions.js";
import { formValidation } from "./formValidation.js";

const img = document.getElementById("image");
const TRUE = "true";
const VISIBLE = "visible";

window.onload = shuffleImgs(img);

/* check before reserve form */

export function createFirstOption(str) {
  let firstOption = document.createElement("option");
  firstOption.innerHTML = str;
  firstOption.selected = TRUE;
  firstOption.disabled = TRUE;
  firstOption.hidden = TRUE;
  firstOption.value = "none";

  return firstOption;
}

function checkTab(e, tabId) {
  if (e.target.id == tabId) {
    document.querySelector("#check .container label").innerHTML = "room: ";
    let selOpt = document.querySelector("#check .container #searchoption");
    let firstOption = createFirstOption("select room");

    document
      .querySelectorAll("#check .container #searchoption option")
      .forEach((option) => {
        option.remove();
      });

    createOptions("searchoption");
    selOpt.prepend(firstOption);
  } else {
    let div = document.querySelector("#check .container");
    div.style.visibility = VISIBLE;
    div.lastElementChild.firstElementChild.selected = TRUE;

    document.querySelector("#check .container label").innerHTML = "use: ";
    let selOpt = document.querySelector("#check .container #searchoption");
    let firstOption = createFirstOption("select use");

    document
      .querySelectorAll("#check .container #searchoption option")
      .forEach((option) => {
        option.remove();
      });
    createOptions("searchoption");
    selOpt.prepend(firstOption);
  }
}

const tabs = document.querySelectorAll(".search ul li");
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    if (!e.target.classList.contains("active")) {
      tabs.forEach((tab) => {
        tab.classList.toggle("active");
      });
    }
    const tabId = "liroom";
    checkTab(e, tabId);
  });
});

const searchTime = document.querySelector("#searchtime");
const submitSearch = document.querySelector("#searchsubmit");

searchTime.addEventListener("change", () => {
  document.querySelector("#duration").value = 1;
});

submitSearch.addEventListener("click", (e) => {
  e.preventDefault();
  if (formValidation(e)) {
    e.target.classList.add("block-click");

    const searchUrl = "/validate";

    const searchOption = document.getElementById("searchoption").value;
    const dateOption = document.getElementById("dateoption").value;
    const duration = Math.ceil(
      parseFloat(document.getElementById("duration").value)
    ).toString();

    let queries = `?term=${searchOption}&date=${dateOption}&start=${searchTime.value}&duration=${duration}`;

    fetch(searchUrl + queries)
      .then((res) => {
        if (res.ok) {
          return res.text();
        }
      })
      .then((text) => {
        let stats = text.slice(1, text.length - 2).split(",");
        let colors = [];
        stats.forEach((color) => {
          color = color.slice(
            color.indexOf("'") + 1,
            color.lastIndexOf("'") != color.indexOf("'")
              ? color.lastIndexOf("'")
              : color.length
          );
          colors.push(color);
        });
        colors.forEach((clr, indx) => {
          clr.toLowerCase() == TRUE
            ? (document.querySelector(
                `span[data-id="${(indx + 1).toString()}"]`
              ).style.backgroundColor = "#27ae60")
            : clr == "False"
            ? (document.querySelector(
                `span[data-id="${(indx + 1).toString()}"]`
              ).style.backgroundColor = "#e74c3c")
            : (document.querySelector(
                `span[data-id="${indx + 1}"]`
              ).style.backgroundColor = "#3498db");
        });
        document.getElementById("explain").style.visibility = VISIBLE;
      })
      .then(() => {
        setTimeout(() => {
          let inps = document.querySelectorAll(
            `#${e.target.parentElement.id} input`
          );
          let slcs = document.querySelectorAll(
            `#${e.target.parentElement.id} select`
          );

          inps.forEach((inp) => {
            inp.style.outline = "None";
            inp.style.outlineOffset = "None";
          });
          slcs.forEach((slc) => {
            slc.style.outline = "None";
            slc.style.outlineOffset = "None";
          });
        }, 1000);
        e.target.classList.remove("block-click");
      });
  }
});
/* check before reserve form */
