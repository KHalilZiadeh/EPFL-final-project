export function updateUI(...data) {
  let info = data[0].split("\\");
  let img = data[1];
  let theH3 = data[2];
  let roomSeats = data[3];
  let roomUse = data[4];
  img.src = info[3];
  // get room id
  theH3.innerHTML = `Room: ${sessionStorage.getItem("room")}`;
  // get max seats
  roomSeats.innerHTML = `for: ${info[1].slice(
    info[1].indexOf(":") + 1
  )} person`;
  // get uses
  let uses = info[2]
    .slice(info[2].indexOf("[") + 1, info[2].lastIndexOf("]"))
    .split(",");

  roomUse.innerHTML = "";
  for (let i = 0; i < uses.length; i++) {
    let theLi = document.createElement("li");
    theLi.innerHTML = uses[i];
    roomUse.append(theLi);
  }
}
