/* clearing sessioStorage onload */
window.onload = () => {
  if (sessionStorage.getItem("room")) {
    sessionStorage.removeItem("room");
  }
};
/* clearing sessioStorage onload */
