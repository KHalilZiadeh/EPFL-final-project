/* image interVal */
let imgInterval;

export function shuffleImgs(img) {
  imgInterval = setInterval(() => {
    const roomUrl = "/getroomdata?id=";
    let id = Math.floor(Math.random() * 5) + 1;
    fetch(roomUrl + id.toString())
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        img.src = res.split("\\")[3];
      });
  }, 2000);
}

export function stopImgs() {
  clearInterval(imgInterval);
}

/* image interVal */
