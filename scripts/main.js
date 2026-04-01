/// Header script ///

/******* SEARCH BAR *******/

//== notification ==//

document.addEventListener("click", (e) => {
  const notifBtn = document.getElementById("notif");
  const blocNotif = document.getElementById("bloc-notif");

  if (notifBtn.contains(e.target)) {
    blocNotif.classList.toggle("active");
    return; // Exit to prevent closing immediately
  }

  if (!blocNotif.contains(e.target)) {
    blocNotif.classList.remove("active");
  }
});

//== End notification ==//

//== theme mode ==//

const switchEl = document.getElementById("switch");
const label = document.getElementById("label");

switchEl.addEventListener("click", function () {
  switchEl.classList.toggle("active");

  // ==> add it later
  // document.body.classList.toggle("dark");

  label.textContent = switchEl.classList.contains("active")
    ? "Dark mode"
    : "Light mode";
});

//== end theme mode ==//

//== account ==//

document.addEventListener("click", (e) => {
  const accBtn = document.querySelector(".acc-sec");
  const blocAcc = document.getElementById("acc-bloc");

  if (accBtn.contains(e.target)) {
    blocAcc.classList.toggle("active");
    return;
  }

  if (!blocAcc.contains(e.target)) {
    blocAcc.classList.remove("active");
  }
});

//== end account ==//

/******* END SEARCH BAR *******/

/******* NAV BAR *******/

document.addEventListener("click", (e) => {
  const cartBtn = document.querySelector(".cart-btn");
  const blocCart = document.querySelector(".cart-bloc");

  if (cartBtn.contains(e.target)) {
    blocCart.classList.toggle("active");
    return;
  }

  if (!blocCart.contains(e.target)) {
    blocCart.classList.remove("active");
  }
});

/******* END NAV BAR *******/

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

/* ── Move to a slide ── */
function goTo(index) {
  current = ((index % total) + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

/* ── Start auto-sliding every 4s ── */
function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => goTo(current + 1), 4000);
}

/* ── Pause on click, resume 3s after last interaction ── */
function onUserInteraction() {
  clearInterval(carouselTimer);
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => startCarousel(), 3000);
}

/* one listener on parent catches ALL clicks inside every slide */
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

/* ── Bar color based on score ── */
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

/* ── Main ── */
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

/* ── game chips dynamically ── */
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

/* ── Game auto-cycle  ── */
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

//***** END HERO SECTION ****//

/// END Main ///