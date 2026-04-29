const popup = document.getElementById("recoverPopup");
const openBtn = document.querySelector(".forget-password");
const closeBtn = document.querySelector(".close-btn");

openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("active");
  }
});
