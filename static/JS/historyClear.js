import { removeMessage } from "./interActiveForm.js";
import { checkMessage } from "./interActiveForm.js";

const roomData = document.getElementById("card");

/* get history */
export function getHistory(id) {
  const historyUrl = "/history?room=";
  fetch(historyUrl + id)
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
    })
    .then((res) => {
      res = res.slice(res.indexOf("["), res.lastIndexOf("]") - 1);
      if (res.length > 0) {
        visual.innerHTML = "";
        let theHist = document.createElement("ul");
        // history header
        let parentHead = document.createElement("li");
        parentHead.id = "fixed";
        parentHead.className = "fixed";
        let headers = ["id", "user", "date", "hours"];
        headers.forEach((head) => {
          let header = document.createElement("span");
          header.innerHTML = head;
          parentHead.append(header);
        });
        theHist.append(parentHead);
        roomData.append(theHist);

        // create history elements
        let resData = res.slice(1, res.length).split(",");
        console.log(resData);
        for (let i = 0; i < resData.length; i++) {
          resData[i] = resData[i]
            .slice(
              resData[i].indexOf('"') + 1,
              resData[i].lastIndexOf('"') != resData[i].indexOf('"')
                ? resData[i].lastIndexOf('"')
                : resData[i].length
            )
            .split("=");
        }

        // get month name
        resData.forEach((data) => {
          let reg = document.createElement("li");
          data.forEach((spanTxt, index) => {
            let span = document.createElement("span");
            if (index == 2) {
              let time = spanTxt.split("-");
              switch (time[1]) {
                case "01":
                  spanTxt = "Jan-" + time[2];
                  break;
                case "02":
                  spanTxt = "Feb-" + time[2];
                  break;
                case "03":
                  spanTxt = "Mar-" + time[2];
                  break;
                case "04":
                  spanTxt = "Apr-" + time[2];
                  break;
                case "05":
                  spanTxt = "May-" + time[2];
                  break;
                case "06":
                  spanTxt = "Jun-" + time[2];
                  break;
                case "07":
                  spanTxt = "Jul-" + time[2];
                  break;
                case "08":
                  spanTxt = "Aug-" + time[2];
                  break;
                case "09":
                  spanTxt = "Sep-" + time[2];
                  break;
                case "10":
                  spanTxt = "Oct-" + time[2];
                  break;
                case "11":
                  spanTxt = "Nov-" + time[2];
                  break;
                case "12":
                  spanTxt = "Dec-" + time[2];
                  break;
              }
            }
            span.innerHTML = spanTxt;
            reg.append(span);
          });
          theHist.append(reg);
        });
        visual.append(theHist);
      } else {
        visual.innerHTML = "";
        let thep = document.createElement("p");
        thep.innerHTML = "NO HISTORY FOUND";
        visual.append(thep);
      }
    });
}
/* get history */

/* history and clear buttons */
const historyBtn = document.getElementById("history");
const clearBtn = document.getElementById("clear");

historyBtn.addEventListener("click", () => {
  if (sessionStorage.getItem("room")) {
    visual.innerHTML = "";

    removeMessage();
    getHistory(`${sessionStorage.getItem("room")}`);
  } else {
    checkMessage("Please select a room first");
  }
});

clearBtn.addEventListener("click", () => {
  // check if user is using the form or veiwing history
  if (visual.querySelector("ul")) visual.innerHTML = "";
  let clearUrl = "/clear";
  fetch(clearUrl);
});
/* history and clear buttons */
