import { formValidation } from "./formValidation.js";
import { shuffleImgs } from "./imgShuffler.js";
import * as functions from "./createFunctions.js";

const img = document.getElementById("image");
const theH3 = document.getElementById("roomx");
const roomSeats = document.getElementById("maxseats");
const roomUse = document.getElementById("roomuse");

/* interactive form */
const reserveBtn = document.getElementById("reserve");
const visual = document.querySelector("#visual");
const TRUE = "true";

function howManySeats() {
  let maxSeats = roomSeats.innerHTML.slice(
    roomSeats.innerHTML.indexOf(":") + 1
  );
  let userSeats = document.createElement("input");
  userSeats.type = "number";
  userSeats.id = "seats";
  userSeats.value = 1;
  userSeats.min = 1;
  userSeats.max = parseInt(maxSeats);
  userSeats.required = true;

  return userSeats;
}

function createUserInput() {
  const userName = document.createElement("input");
  userName.type = "text";
  userName.id = "username";
  userName.name = "username";
  userName.placeholder = "Enter your name";
  return userName;
}

function createQuery() {
  let roomId = sessionStorage.getItem("room");
  let userName = document.getElementById("username").value;
  let seats = document.getElementById("seats").value;
  let useValue = document.getElementById("use").value;
  let date = document.getElementById("date").value;
  let start = document.getElementById("start").value;
  let end = document.getElementById("end").value;
  let inArr = [roomId, userName, seats, useValue, date, start, end];
  let urlAr = [
    "room=",
    "&username=",
    "&seats=",
    "&type=",
    "&date=",
    "&start=",
    "&end=",
  ];

  // concantinating the url and the queries
  let submitUrl = "/validate?";
  urlAr.forEach((query, ind) => {
    submitUrl += query + inArr[ind];
  });
  return submitUrl;
}

reserveBtn.addEventListener("click", () => {
  visual.innerHTML = "";
  if (
    sessionStorage.getItem("room") &&
    !document.querySelector("form#reserve")
  ) {
    functions.removeMessage();

    const theForm = functions.createForm(visual, "reserve");

    functions.createDate(theForm);

    let startSelector = functions.createWrapper(
      "start",
      "from: ",
      "st",
      theForm
    );

    const startHour = 8;
    const endHour = 20;
    let options = functions.createOptions("start", startHour, startHour + 11);
    startSelector.append(options);

    startSelector.addEventListener("change", () => {
      if (!document.querySelector("#end")) {
        let endSelector = functions.createWrapper("end", "to:", "en", theForm);

        let options = functions.createOptions(
          "end",
          +startSelector.value + 1,
          endHour
        );
        endSelector.append(options);

        let label = functions.createLabel("seats", "for: ");
        let userSeats = howManySeats();
        let wrapper = document.createElement("div");
        wrapper.id = "sn";
        wrapper.append(label, userSeats);

        theForm.append(wrapper);

        let useOptions = functions.createWrapper("use", "to: ", "us", theForm);

        options = functions.createOptions("use");
        useOptions.append(options);

        let userInput = createUserInput();
        theForm.append(userInput);

        let submitBtn = functions.createSubmitButton();
        theForm.append(submitBtn);

        submitBtn.addEventListener("click", (e) => {
          e.preventDefault();
          functions.removeMessage();
          if (formValidation(e)) {
            e.target.classList.add("block-click");
            let roomId = sessionStorage.getItem("room");
            let userName = document.getElementById("username").value;
            let seats = document.getElementById("seats").value;
            let useValue = document.getElementById("use").value;
            let date = document.getElementById("date").value;
            let start = document.getElementById("start").value;
            let end = document.getElementById("end").value;

            if (
              roomId &&
              userName &&
              seats &&
              useValue &&
              date &&
              start &&
              end
            ) {
              const submitUrl = createQuery();

              fetch(submitUrl)
                .then((res) => {
                  if (res.ok) {
                    return res.text();
                  }
                })
                .then((respo) => {
                  if (respo === TRUE) {
                    // remove the form after 1 second
                    setTimeout(() => {
                      visual.innerHTML = "";
                      sessionStorage.removeItem("room");
                      shuffleImgs(img);
                    }, 1000);
                    return TRUE;
                  } else {
                    return respo;
                  }
                })
                .then((respo) => {
                  if (respo == TRUE) {
                    // View the the message after the form is removed
                    setTimeout(() => {
                      let theP = (document.createElement("p").innerHTML =
                        "Your reservation was submitted");
                      visual.append(theP);
                      // Clear the visual component after 1 second from showing the message
                      setTimeout(() => {
                        visual.innerHTML = "";
                        theH3.innerHTML = "need an office";
                        roomSeats.innerHTML = "with spaceshare you do";
                        roomUse.innerHTML = "";
                      }, 1000);
                    }, 1000);
                  } else {
                    functions.checkMessage(respo);
                    setTimeout(() => {
                      functions.removeMessage();
                    }, 1000);
                  }
                });
            } else {
              functions.checkMessage("Please fill your name first");
            }
          }
        });
      } else {
        document
          .querySelector("#end")
          .append(
            functions.createOptions("end", +startSelector.value + 1, endHour)
          );
      }
    });
  } else {
    functions.checkMessage("Please select a room first");
  }
});

/* interactive form */
