import { updateUI } from "./upadtIU.js";
import { stopImgs } from "./imgShuffler.js";
import { createOptions } from "./createFunctions.js";
import { getHistory } from "./historyClear.js";

const rooms = document.querySelectorAll(".map span");
const img = document.getElementById("image");
const theH3 = document.getElementById("roomx");
const roomSeats = document.getElementById("maxseats");
const roomUse = document.getElementById("roomuse");

rooms.forEach((room) => {
  room.addEventListener("click", function (e) {
    rooms.forEach((room) => (room.style.backgroundColor = "#3498db"));
    let status = document.getElementById("explain").style.display;
    const flexStatus = "flex";
    if (status == flexStatus) {
      document.getElementById("explain").style.visibility = "hidden";
    }

    const roomUrl = "/getroomdata?id=";
    let id = e.target.innerHTML;

    sessionStorage.setItem("room", id.slice(id.length - 1));
    stopImgs();
    // fetch room data from the backend
    fetch(roomUrl + id)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        updateUI(data, img, theH3, roomSeats, roomUse);
      })
      .then(() => {
        let useOptions = document.querySelector("#use");
        if (useOptions != undefined) {
          useOptions.append(createOptions("use"));

          let maxSeats = roomSeats.innerHTML.slice(
            roomSeats.innerHTML.indexOf(":") + 1
          );
          document.querySelector("#seats").value = 1;
          // update max seats value
          document.querySelector("#seats").max = parseInt(maxSeats);
        }
      })
      .then(() => {
        // if user was in history and clicked on a room the history will update
        // but if he was in the form it will not
        if (visual.firstElementChild != null) {
          if (visual.firstElementChild.nodeName.toLocaleLowerCase() != "form") {
            getHistory(id[id.length - 1]);
          }
        }
      });
  });
});
