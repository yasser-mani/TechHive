document.addEventListener("DOMContentLoaded", () => {
  const signUpBtn = document.getElementById("signUpBtn");
  const signInBtn = document.getElementById("signInBtn");
  const container = document.getElementById("main-container");

  // Desktop Logic
  if (signUpBtn && signInBtn) {
    signUpBtn.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInBtn.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }

  // Mobile Logic
  if (window.innerWidth <= 768) {
    const loginForm = document.querySelector(".sign-in-container form");
    const signupForm = document.querySelector(".sign-up-container form");

    loginForm.insertAdjacentHTML(
      "beforeend",
      '<span class="mobile-toggle" id="mob-to-signup">Need an account? Sign Up</span>'
    );
    signupForm.insertAdjacentHTML(
      "beforeend",
      '<span class="mobile-toggle" id="mob-to-login">Have an account? Log In</span>'
    );

    document.getElementById("mob-to-signup").addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });
    document.getElementById("mob-to-login").addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }

  // Popup Logic
  const openRecover = document.getElementById("openRecover");
  const closeRecover = document.getElementById("closeRecover");
  const recoverPopup = document.getElementById("recoverPopup");

  if (openRecover && recoverPopup) {
    openRecover.addEventListener("click", (e) => {
      e.preventDefault();
      recoverPopup.classList.add("active");
    });

    closeRecover.addEventListener("click", () => {
      recoverPopup.classList.remove("active");
    });

    // Close popup if clicking outside
    recoverPopup.addEventListener("click", (e) => {
      if (e.target === recoverPopup) {
        recoverPopup.classList.remove("active");
      }
    });
  }
});