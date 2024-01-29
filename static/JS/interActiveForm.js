import { formValidation } from "./formValidation.js";
import { shuffleImgs } from "./imgShuffler.js";

const roomData = document.getElementById("card");
const img = document.getElementById("image");
const theH3 = document.getElementById("roomx");
const roomSeats = document.getElementById("maxseats");
const roomUse = document.getElementById("roomuse");

/* interactive form */
const times = new Date();
const reserveBtn = document.getElementById("reserve");
const visual = document.querySelector("#visual");

export function createForm(...data) {
  let form = document.createElement("form");
  form.id = data[1];
  form.method = "GET";
  data[0].append(form);
  form.addEventListener("keypress", (e) => {
    // prevent submitting on enter
    if (e.key === "Enter") e.preventDefault();
  });
  return form;
}

// create date input
export function createDate(form) {
  const reservDate = document.createElement("input");
  reservDate.type = "date";
  reservDate.id = "date";

  const year = times.getFullYear();
  const month = (times.getMonth() + 1).toString().padStart(2, "0");
  const day = times.getDate().toString().padStart(2, "0");

  reservDate.min = `${year}-${month}-${day}`;

  reservDate.value = `${year}-${month}-${day}`;
  form.append(reservDate);
}

export function createLabel(id, str) {
  let label = document.createElement("label");
  label.setAttribute("for", id);
  label.innerHTML = str;
  return label;
}

export function createSelector(id) {
  let select = document.createElement("select");
  select.name = id;
  select.id = id;
  return select;
}

export function firstOption(txt) {
  let firstOption = document.createElement("option");
  firstOption.innerHTML = txt;
  firstOption.selected = "true";
  firstOption.disabled = "true";
  firstOption.hidden = "true";

  return firstOption;
}

export function createOptions(...data) {
  const parent = document.querySelector(`#${data[0]}`);
  parent.innerHTML = "";

  switch (data[0]) {
    case "use":
      for (let i = 0; i < roomUse.children.length; i++) {
        let opt = document.createElement("option");
        opt.value = roomUse.children[i].innerHTML;
        opt.innerHTML = roomUse.children[i].innerHTML;
        parent.append(opt);
      }

      break;
    case "start":
    case "end":
      for (let i = data[1]; i <= data[2]; i++) {
        let opt = document.createElement("option");
        i < 10 ? (opt.value = "0" + i) : (opt.value = i);
        opt.innerHTML = i + ":00";
        parent.append(opt);
      }
      if (parent.id == "start") {
        let firstOptionEle = firstOption("hour");
        parent.append(firstOptionEle);
      }
      break;
    case "searchoption":
      if (document.querySelector("#liroom.active")) {
        for (let i = 1; i <= 5; i++) {
          let opt = document.createElement("option");
          opt.value = "room_id:" + i.toString();
          opt.innerHTML = "room: " + i;
          parent.append(opt);
        }
      } else {
        // create the options for the check form
        let opts = ["interview", "meeting", "presentation"];
        opts.forEach((opti) => {
          let opt = document.createElement("option");
          opt.value = opti;
          opt.innerHTML = opti;
          parent.append(opt);
        });
      }
      break;
    case "searchtime":
      let firstOptionEle = firstOption("hour");
      parent.append(firstOptionEle);
      for (i = 8; i <= 19; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i + ":00";
        parent.append(opt);
      }
  }
}

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

export function createSubmitButton() {
  let sumbitBtn = document.createElement("input");
  sumbitBtn.type = "submit";
  sumbitBtn.id = "submit";
  sumbitBtn.value = "submit";

  return sumbitBtn;
}

export function checkMessage(message) {
  let room = sessionStorage.getItem("room");
  let form = document.querySelector("form#reserv");
  let inpVal = document.querySelector("#username");
  let msg = document.querySelector("p#message");
  if (!msg && (!(room && form) || (form && inpVal))) {
    let theP = document.createElement("p");
    theP.id = "message";
    theP.innerHTML = message;
    roomData.append(theP);
  }
}

export function removeMessage() {
  if (roomData.querySelector("p#message"))
    roomData.querySelector("p#message").remove();
}

// create label and input/selector wrapper
export function createWrapper(...data) {
  let label = createLabel(data[0], data[1]);
  let selector = createSelector(data[0]);
  let wrapper = document.createElement("div");

  wrapper.id = data[2];
  wrapper.append(label, selector);
  data[3].append(wrapper);

  return selector;
}

reserveBtn.addEventListener("click", () => {
  visual.innerHTML = "";
  if (
    sessionStorage.getItem("room") &&
    !document.querySelector("form#reserve")
  ) {
    removeMessage();

    const theForm = createForm(visual, "reserve");

    createDate(theForm);

    let startSelector = createWrapper("start", "from: ", "st", theForm);

    let options = createOptions("start", 8, 19);
    startSelector.append(options);

    startSelector.addEventListener("change", () => {
      if (!document.querySelector("#end")) {
        let endSelector = createWrapper("end", "to:", "en", theForm);

        let options = createOptions("end", +startSelector.value + 1, 20);
        endSelector.append(options);

        let label = createLabel("seats", "for: ");
        let userSeats = howManySeats();
        let wrapper = document.createElement("div");
        wrapper.id = "sn";
        wrapper.append(label, userSeats);

        theForm.append(wrapper);

        let useOptions = createWrapper("use", "to: ", "us", theForm);

        options = createOptions("use");
        useOptions.append(options);

        let userInput = createUserInput();
        theForm.append(userInput);

        let submitBtn = createSubmitButton();
        theForm.append(submitBtn);

        submitBtn.addEventListener("click", (e) => {
          e.preventDefault();
          removeMessage();
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

              fetch(submitUrl)
                .then((res) => {
                  if (res.ok) {
                    return res.text();
                  }
                })
                .then((respo) => {
                  console.log(respo);
                  const TRUE = "true";
                  if (respo === TRUE) {
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
                  console.log(respo);
                  if (respo == "true") {
                    setTimeout(() => {
                      let theP = (document.createElement("p").innerHTML =
                        "Your reservation was submitted");
                      visual.append(theP);
                      setTimeout(() => {
                        visual.innerHTML = "";
                        theH3.innerHTML = "need an office";
                        roomSeats.innerHTML = "with spaceshare you do";
                        roomUse.innerHTML = "";
                      }, 1000);
                    }, 1000);
                  } else {
                    checkMessage(respo);
                    setTimeout(() => {
                      removeMessage();
                    }, 1000);
                  }
                });
            } else {
              checkMessage("Please fill your name first");
            }
          }
        });
      } else {
        document
          .querySelector("#end")
          .append(createOptions("end", +startSelector.value + 1, 20));
      }
    });
  } else {
    checkMessage("Please select a room first");
  }
});

/* interactive form */
