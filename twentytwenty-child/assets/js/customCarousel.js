const PLAY_SVG = `<svg width="4em" height="4em" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg>`;
const STOP_SVG = `<svg width="4em" height="4em" viewBox="0 0 16 16" class="bi bi-pause-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
</svg>`;

const MOBILE_WIDTH = 500;
let isMobile = $(window).width() <= MOBILE_WIDTH;

const mySwiper = new Swiper(".swiper-container", {
  loop: true,
  effect: "fade",
  autoplay: isMobile
    ? false
    : {
        delay: 5000,
        disableOnInteraction: false,
      },
  pagination: {
    el: ".swiper-pagination",
    renderBullet: function (index, className) {
      return `<span class=${className}>
        <div class="progress-bar-active"></div>
        <span class="progress-bar-title"></span>
        </span>`;
    },
  },
});

let interval;
let timeout;
let touchStart = 0;
let milSecPassed = 0;
let timeLeft = 5000;
let paginations = $(".progress-bar-title");
let labels = $(".pagination-labels span");
let pauseButton = document.querySelector(".pause-btn");
let barTitles = document.querySelectorAll(".progress-bar-title");

const togglePauseButton = () => {
  clearInterval(interval);
  clearTimeout(timeout);
  if (!mySwiper.autoplay.running) {
    pauseButton.innerHTML = STOP_SVG;
    mySwiper.autoplay.start();
    timeout = setTimeout(() => {
      mySwiper.slideNext();
    }, 5000 - milSecPassed);
    activateProgressBar();
  } else {
    pauseButton.innerHTML = PLAY_SVG;
    mySwiper.autoplay.stop();
  }
};

const accumulateWidth = (progressBar) => {
  const computedStyle = getComputedStyle(progressBar);
  width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
  if (width > 100) return;
  progressBar.style.setProperty("--width", width + 1);
};

const activateProgressBar = () => {
  if (!isMobile) {
    if (interval) {
      clearInterval(interval);
    }
    let progressBar = document.querySelector(
      ".swiper-pagination-bullet-active .progress-bar-active"
    );

    milSecPassed = 0;
    interval = setInterval(() => {
      accumulateWidth(progressBar);
      milSecPassed += 50;
    }, 50);
  }
};

mySwiper.on("slideChange", function () {
  if (isMobile) {
    document
      .querySelector(".swiper-pagination-bullet-active .progress-bar-active")
      .style.setProperty("--width", 100);
  } else {
    $(".progress-bar-active").attr("style", "");
    activateProgressBar();
    if (!mySwiper.autoplay.running) {
      pauseButton.innerHTML = STOP_SVG;
      mySwiper.autoplay.start();
    }
  }
});

mySwiper.on("touchStart", function (swiper, event) {
  if (isMobile) {
    touchStart = event.clientX;
  }
});

mySwiper.on("touchMove", function (swiper, event) {
  if (isMobile) {
    let current = event.touches[0].clientX;
    document
      .querySelector(".swiper-pagination-bullets")
      .style.setProperty("--swipe-movement", current - touchStart + "px");
  }
});

mySwiper.on("touchEnd", function (swiper, event) {
  if (isMobile) {
    const percentageUnit = 82;

    document
      .querySelector(".swiper-pagination-bullets")
      .style.setProperty(
        "--swipe-movement",
        ((swiper.activeIndex + 3) % 4) * percentageUnit + "%"
      );
  }
});

pauseButton.addEventListener("click", togglePauseButton);
if (isMobile) {
  document
    .querySelector(".swiper-pagination-bullet-active .progress-bar-active")
    .style.setProperty("--width", 100);
} else {
  activateProgressBar();
}

window.addEventListener("resize", function (event) {
  let newWidth = window.innerWidth;
  if (newWidth <= MOBILE_WIDTH) {
    isMobile = true;
    for (let i = 0; i < 4; i++) {
      paginations[i].setAttribute("data-id", i);
    }
    clearInterval(interval);
    clearTimeout(timeout);
    mySwiper.autoplay.stop();
  } else {
    isMobile = false;
    mySwiper.autoplay.start();
    pauseButton.innerHTML = STOP_SVG;
  }
});

activateProgressBar();

for (let i = 0; i < 4; i++) {
  paginations[i].innerHTML = labels[i].innerHTML;
  paginations[i].setAttribute("data-id", i);
}

for (let i = 0; i < barTitles.length; i++) {
  barTitles[i].addEventListener("click", function () {
    let currSlideIdx = +barTitles[i].getAttribute("data-id") + 1;
    mySwiper.slideTo(currSlideIdx);
  });
}
