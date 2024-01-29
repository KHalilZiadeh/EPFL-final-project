const roomData = document.getElementById("card");
const roomUse = document.getElementById("roomuse");

/* interactive form */
const times = new Date();
const TRUE = "true";

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
  firstOption.selected = TRUE;
  firstOption.disabled = TRUE;
  firstOption.hidden = TRUE;

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
          opt.innerHTML = "room: " + i.toString();
          parent.append(opt);
        }
      } else {
        // create the options for the check form
        const opts = ["interview", "meeting", "presentation"];
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
  // if there is no message and there is no (room selected and form) or ther is a form with input
  // to prevent messages from overlapping, and show the message when the user break the front end validation
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
