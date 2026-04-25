/// Header script ///

/******* SEARCH BAR *******/

document.addEventListener("DOMContentLoaded", function () {
  const notifBtn = document.getElementById("notif");
  const blocNotif = document.getElementById("bloc-notif");

  const accBtn = document.querySelector(".acc-sec");
  const blocAcc = document.getElementById("acc-bloc");

  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const headerActions = document.getElementById("headerActions");

  const cartBtn = document.querySelector(".cart-btn");
  const blocCart = document.querySelector(".cart-bloc");

  // =============================
  // NOTIFICATION
  // =============================
  if (notifBtn && blocNotif) {
    notifBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      blocNotif.classList.toggle("active");
      blocAcc && blocAcc.classList.remove("active");
      blocCart && blocCart.classList.remove("active");
    });
  }

  // =============================
  // ACCOUNT
  // =============================
  if (accBtn && blocAcc) {
    accBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      blocAcc.classList.toggle("active");
      blocNotif && blocNotif.classList.remove("active");
      blocCart && blocCart.classList.remove("active");
    });
  }

  // =============================
  // CART
  // =============================
  if (cartBtn && blocCart) {
    cartBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      blocCart.classList.toggle("active");
      blocNotif && blocNotif.classList.remove("active"); // short-circuit evaluation methode
      blocAcc && blocAcc.classList.remove("active");
    });
  }

  // =============================
  // MOBILE MENU
  // =============================
  if (mobileMenuToggle && headerActions) {
    mobileMenuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      headerActions.classList.toggle("active");
    });
  }

  // =============================
  // GLOBAL CLICK (CLOSE ALL)
  // =============================
  document.addEventListener("click", function () {
    blocNotif && blocNotif.classList.remove("active");
    blocAcc && blocAcc.classList.remove("active");
    blocCart && blocCart.classList.remove("active");
  });

  // =============================
  // CLOSE MOBILE MENU ON RESIZE
  // =============================
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1200 && headerActions) {
      headerActions.classList.remove("active");
    }
  });
});

/******* END SEARCH BAR *******/

/// End Header script ///

//============================================

/// Main ///

//******* HERO SECTION *******//

/* ============================================
   CAROUSEL
============================================ */
let current = 0;
const total = 3;

const track = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");

let carouselTimer; /* auto-slide interval                        */
let resumeTimeout; /* waits 3s after last click then restarts    */

/* - Move to a slide - */
function goTo(index) {
  current = ((index % total) + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

/* - Start auto-sliding every 4s - */
function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => goTo(current + 1), 4000);
}

/* - Pause on click - */
function onUserInteraction() {
  clearInterval(carouselTimer);
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => startCarousel(), 3000);
}

document
  .querySelector(".carousel")
  .addEventListener("click", onUserInteraction);

/* start on page load */
startCarousel();

/* ============================================
   TEST SECTION — SLIDE 3
============================================ */
let games = [
  {
    name: "Cyberpunk 2077",
    verdict: "yes",
    msg: "Your rig exceeds recommended requirements.",
    cpu: 92,
    gpu: 88,
    ram: 85,
    vram: 90,
  },
  {
    name: "GTA VI",
    verdict: "med",
    msg: "Meets minimum — expect medium settings.",
    cpu: 75,
    gpu: 62,
    ram: 80,
    vram: 60,
  },
  {
    name: "The Finals",
    verdict: "yes",
    msg: "Ready to play at ultra settings.",
    cpu: 88,
    gpu: 95,
    ram: 90,
    vram: 88,
  },
  {
    name: "Alan Wake 2",
    verdict: "no",
    msg: "GPU below minimum requirement.",
    cpu: 70,
    gpu: 38,
    ram: 75,
    vram: 35,
  },
  {
    name: "Starfield",
    verdict: "med",
    msg: "Meets minimum — SSD strongly advised.",
    cpu: 80,
    gpu: 68,
    ram: 85,
    vram: 65,
  },
  {
    name: "Baldur's Gate 3",
    verdict: "yes",
    msg: "Exceeds recommended requirements.",
    cpu: 85,
    gpu: 80,
    ram: 95,
    vram: 78,
  },
];

/* - Bar color based on score - */
function getBarColor(value) {
  if (value >= 80) return "#39ff50";
  if (value >= 55) return "#ffb800";
  return "#ff4444";
}

let badgeLabels = { yes: "YES", med: "MED", no: "NO" };

let bgColors = {
  yes: "linear-gradient(to right, #1e293b 30%, rgba(42, 190, 91,  0.43) 50%)",
  med: "linear-gradient(to right, #1e293b 30%, rgba(255, 180, 0,  0.38) 50%)",
  no: "linear-gradient(to right, #1e293b 30%, rgba(255, 60,  60, 0.38) 50%)",
};

let accentColors = { yes: "#39ff7a", med: "#ffb800", no: "#ff4444" };

let shadowColors = {
  yes: "0px 0 28px -2px #39ff7a",
  med: "0px 0 28px -2px #ffb800",
  no: "0px 0 28px -2px #ff4444",
};

let hoverColors = {
  yes: "rgba(57, 255, 122, 0.2)",
  med: "rgba(255, 184, 0, 0.2)",
  no: "rgba(255, 68, 68, 0.2)",
};

/* - Main - */
function mainTest(index) {
  let g = games[index];

  let slide3 = document.querySelector(".slide-3");
  let titleSpans = document.querySelectorAll(".title-3 span");
  let dividers = document.querySelectorAll(".d-3");
  let greenBtn = document.querySelector(".hero-btn--green");
  let badge = document.getElementById("badge");

  let accent = accentColors[g.verdict];

  slide3.style.backgroundImage = bgColors[g.verdict];
  titleSpans.forEach(function (span) {
    span.style.color = accent;
  });

  dividers.forEach(function (div) {
    div.style.background = accent;
  });

  greenBtn.style.boxShadow = shadowColors[g.verdict];
  greenBtn.style.borderColor = accentColors[g.verdict];
  greenBtn.style.classList = accentColors[g.verdict];
  greenBtn.backgroundColor = shadowColors[g.verdict];

  greenBtn.addEventListener("mouseenter", () => {
    greenBtn.style.background = hoverColors[g.verdict];
  });

  greenBtn.addEventListener("mouseleave", () => {
    greenBtn.style.background = "none";
  });

  badge.textContent = badgeLabels[g.verdict];
  badge.className = "verdict-badge " + g.verdict;

  document.getElementById("vGame").textContent = g.name;
  document.getElementById("vMsg").textContent = g.msg;

  ["cpu", "gpu", "ram", "vram"].forEach(function (key) {
    let value = g[key];
    let capKey = key.charAt(0).toUpperCase() + key.slice(1);
    let barEl = document.getElementById("bar" + capKey);
    let valEl = document.getElementById("val" + capKey);

    setTimeout(function () {
      barEl.style.width = value + "%";
      barEl.style.background = getBarColor(value);
    }, 30);

    valEl.textContent = value + "%";
    valEl.style.color = getBarColor(value);
  });

  document.querySelectorAll(".game-chip").forEach(function (chip, i) {
    chip.classList.toggle("active", i === index);
  });
}

/* - game chips dynamically - */
let gameRow = document.getElementById("gameRow");
let activeIdx = 0;
let autoTimer;

games.forEach(function (game, index) {
  let chip = document.createElement("button");
  chip.className = "game-chip" + (index === 0 ? " active" : "");
  chip.textContent = game.name;

  chip.addEventListener("click", function () {
    activeIdx = index;
    mainTest(index);
    resetAutoPlay();
  });

  gameRow.appendChild(chip);
});

/* - Game auto-cycle  - */
function resetAutoPlay() {
  clearInterval(autoTimer);
  autoTimer = setInterval(function () {
    activeIdx = (activeIdx + 1) % games.length;
    mainTest(activeIdx);
  }, 4000);
}

mainTest(0);
resetAutoPlay();

/******* END TEST SEC *******/

//== end carousel ==//

//******* FILTER SECTION *******//
const filterItems = document.querySelectorAll(".filter-item");
const heroFilter = document.querySelector(".hero-filter");

filterItems.forEach((filterOption) => {
  filterOption.addEventListener("click", (e) => {
    const isActive = e.currentTarget.classList.contains("active");

    filterItems.forEach((option) => {
      option.classList.remove("active");
    });

    if (!isActive) {
      e.currentTarget.classList.add("active");
    }
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".hero-filter")) {
    filterItems.forEach((option) => {
      option.classList.remove("active");
    });
  }
});

//***** END FILTER SECTION ****//

//***** END HERO SECTION ****//

//***** TREND BUILD SECTION ****//

const buildReaction = document.querySelectorAll(".build_reaction svg");

buildReaction.forEach((reac, index) => {
  reac.addEventListener("click", (re) => {
    if (!index === 1 || !index === 4 || !index === 7) {
      return;
    } else {
      re.target.classList.toggle("clicked");
    }
  });
});
//***** END TREND BUILD SECTION ****//

/// END Main ///
