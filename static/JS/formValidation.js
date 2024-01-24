const times = new Date();

function checkDate(...check) {
  let dateIn = document.querySelector(`#${check[1]} input[type=date]`);

  let checkY = parseInt(check[0].split("-")[0]);
  let checkM = parseInt(check[0].split("-")[1]);
  let checkD = parseInt(check[0].split("-")[2]);

  let nowY = times.getFullYear();
  let nowM = (times.getMonth() + 1).toString().padStart(2, "0");
  let nowD = times.getDate().toString().padStart(2, "0");

  dateIn.style.outlineOffset = "-2px";
  // prevent user from choosing past date
  if (checkY >= nowY && checkM == nowM && checkD >= nowD) {
    dateIn.style.outline = "1px solid green";
    return 1;
  } else if (checkY >= nowY && checkM > nowM) {
    dateIn.style.outline = "1px solid green";
    return 1;
  } else {
    dateIn.style.outline = "1px solid red";
    return 0;
  }
}

function checkNumber(...params) {
  let inpVal = parseInt(params[0].value);

  params[0].style.outlineOffset = "-2px";
  if (typeof inpVal === "number") {
    if (params[0].value > 0 && params[0].value <= params[2]) {
      params[0].style.outline = "1px solid green";
      return 1;
    } else {
      params[0].style.outline = "1px solid red";
      return 0;
    }
  } else {
    params[0].style.outline = "1px solid red";
    return 0;
  }
}

function checkTxt(...params) {
  params[0].style.outlineOffset = "-2px";

  // only letters and white spacess
  if (/^[a-zA-Z].*[\s\.]*$/.test(params[0].value)) {
    params[0].style.outline = "1px solid green";
    return 1;
  } else {
    params[0].style.outline = "1px solid red";
    return 0;
  }
}

export function formValidation(e) {
  let inps = document.querySelectorAll(`#${e.target.parentElement.id} input`);
  let slcs = document.querySelectorAll(`#${e.target.parentElement.id} select`);

  let inpTrue = 0;
  let slcTrue = 0;

  inps.forEach((inp) => {
    if (inp.type == "date") {
      inpTrue += checkDate(inp.value, e.target.parentElement.id);
    } else if (inp.type == "number") {
      let maxValue;
      if (e.target.parentElement.id == "check") {
        maxValue = 20 - parseInt(document.querySelector("#searchtime").value);
      } else {
        maxValue = parseInt(
          document.querySelector("#maxseats").innerHTML.split(":")[1]
        );
      }
      inpTrue += checkNumber(inp, e.target.parentElement.id, maxValue);
    } else if (inp.type == "text") {
      inpTrue += checkTxt(inp);
    }
  });

  slcs.forEach((slc) => {
    slc.style.outlineOffset = "-2px";
    if (slc.value != "none") {
      slc.style.outline = "1px solid green";
      slcTrue += 1;
    } else {
      slc.style.outline = "1px solid red";
    }
  });
  if (inpTrue == inps.length - 1 && slcTrue == slcs.length) {
    return true;
  } else {
    return false;
  }
}
