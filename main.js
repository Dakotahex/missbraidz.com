// Mobile header menu
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");
const menuOpen = document.querySelector('.menu-open')
const menuClose = document.querySelector('.menu-close')

navToggle.addEventListener('click', () => {
  primaryNav.hasAttribute("data-visible")
    ? navToggle.setAttribute('aria-expanded', false)
    : navToggle.setAttribute('aria-expanded', true);
  primaryNav.toggleAttribute("data-visible");
  menuClose.toggleAttribute("data-visible");
  menuOpen.toggleAttribute("data-hidden");
  primaryHeader.toggleAttribute('data-overlay');
  checkMenuStatus();
});


// Stop Scroll covering content when using anchors
const navHeight = document.querySelector('.primary-header').offsetHeight;

document.documentElement.style.setProperty('--scroll-padding', navHeight + 'px');



// Hide nav-bar on scroll down, show on scroll up
let lastScrollTop = 0;
const primaryHeader = document.querySelector('.primary-header')

const moveNavbar = function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    primaryHeader.style.top = "-" + navHeight + 'px';
  } else {
    primaryHeader.style.top = "0px";
  }
  lastScrollTop = scrollTop;
};


// While mobile menu is open stop navbar from moving.
const checkMenuStatus = function () {
  let menuStatus = menuClose.hasAttribute("data-visible");
  console.log(menuStatus)

  if (menuStatus == true) {
    window.removeEventListener("scroll", moveNavbar)
  } else {
    window.addEventListener("scroll", moveNavbar)
  }
}

window.addEventListener("scroll", moveNavbar)


// Buttons Linking
const goToAbout = function () {
  window.location.href = "http://www.missbraidz.com/about";
};

const goToContact = function () {
  window.location.href = "http://www.missbraidz.com/contact";
};

const goToEvents = function () {
  window.location.href = "http://www.missbraidz.com/events";
};

const goToServices = function () {
  window.location.href = "http://www.missbraidz.com/services";
};

const goToHome = function () {
  window.location.href = "http://www.missbraidz.com";
};

const goToBookings = function () {
  window.location.href = "http://www.missbraidz.com/bookings";
};



// Changes for mobile viewing
const mobileWidth = 800;    // This is 50em
const viewportWidth = findViewportWidth()

if (viewportWidth <= mobileWidth) {
  swapOrder()
}

// Swapping the order of elements
function swapOrder() {
  var arr = [1, 0];
  var toSwap = document.getElementsByClassName("swapped");
  if (toSwap[0] === undefined) {
    return;
  }
  var items = toSwap[0].children;
  var elements = document.createDocumentFragment();

  arr.forEach(function (idx) {
    elements.appendChild(items[idx].cloneNode(true));
  });

  toSwap[0].innerHTML = null;
  toSwap[0].appendChild(elements);
}





// Carousel
// Resize carousel slide height
let carouselsNode = document.querySelectorAll('.carousel');
const carousels = Array.prototype.slice.call(carouselsNode);

const findAndSetHeights = () => {
  if (viewportWidth <= mobileWidth) {
    // Find all first carousel sliders
    carouselChildren = new Array();
    carousels.forEach(findCurrentChild);
    // Set height of each parent class carousel
    carouselChildren.forEach(setCarouselHeight)
  }
}

function findViewportWidth() {
  return window.innerWidth;
}

const setCarouselHeight = (carouselSlide) => {
  const slideHeight = carouselSlide.offsetHeight;
  carouselSlide.closest('.carousel').style.height = slideHeight * 0.0625 + 4 + 'rem';
}

const findCurrentChild = (div) => {
  b = div.querySelector('.current-slide');
  carouselChildren.push(b);
}

window.addEventListener("resize", findAndSetHeights);
findAndSetHeights()




// Carousel Functionality

// Selecting dom elements
const selectDomElements = (parent) => {
  const track = parent.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const dotsNav = parent.querySelector('.carousel__nav');
  const dots = Array.from(dotsNav.children);

  const slideWidth = slides[0].getBoundingClientRect().width;

  // arrange slides next to one another
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 50 * index + 'px';
  }
  slides.forEach(setSlidePosition);

  let targetDot;
  let targetSlide;

  const findTargetSlide = function (parent, num) {
    let ans;
    let x = parent.querySelector(".carousel__track")
    let y = x.querySelector(".current-slide")
    if (num > 0) {
      ans = y.nextElementSibling;
    } else {
      ans = y.previousElementSibling;
    };
    return ans
  };

  const findTargetDot = function (parent, num) {
    let result;
    let i = parent.querySelector(".carousel__nav")
    let j = i.querySelector(".current-slide")
    if (num > 0) {
      result = j.nextElementSibling;
    } else {
      result = j.previousElementSibling;
    };
    return result;
  };

  const executeMovement = function (targetSlide, targetDot) {
    let currentSlide = findCurrentSlide(track);
    let currentDot = findCurrentDot(dots);

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot)
    findAndSetHeights();
  };

  const findCurrentSlide = function (track) {
    return track.querySelector('.current-slide');
  };

  const findCurrentDot = function (dots) {
    return dotsNav.querySelector('.current-slide');
  };

  const findTargetIndex = function (dots, targetDot) {
    return dots.findIndex(dot => dot === targetDot);
  };

  // Move slider to target slide
  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  };

  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  };

  // When a user swipes left or right
  let touchstartX = 0;
  let touchendX = 0;

  function checkDirection() {
    if (touchendX < touchstartX) {
      // alert('swiped left!');
      targetSlide = findTargetSlide(parent, 1);
      targetDot = findTargetDot(parent, 1);
    };

    if (touchendX > touchstartX) {
      // alert('swiped right!');
      targetSlide = findTargetSlide(parent, 0);
      targetDot = findTargetDot(parent, 0);
    };

    if (!targetSlide) return;
    if (!targetDot) return;

    executeMovement(targetSlide, targetDot);
  };

  parent.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
  });

  parent.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
  });
};

// Execute Carousel Functionality
carousels.forEach(selectDomElements);




// FAQ accordian
// Checks for button
if (document.querySelector('.question')) {

  // Selects all buttons
  document.querySelectorAll('.question').forEach(function (e) {

    // Bind click events to each e
    e.addEventListener('click', function (i) {

      // Check for child element
      if (i.target.parentNode.querySelector('.faq-answer')) {
        let faqAnswer = i.target.parentNode.querySelector('.faq-answer');
        faqAnswer.hasAttribute("data-visible")
          ? e.setAttribute('aria-expanded', false)
          : e.setAttribute('aria-expanded', true);
        faqAnswer.toggleAttribute('data-visible');
      };
    });
  });
};




// Loop
const imageWrapper = document.querySelector('.image-wrapper');

if (imageWrapper != null) {
  // alert('found image wrapper')
  const imageItems = document.querySelectorAll('.image-wrapper > *');
  const imageLength = imageItems.length;

  // Determines how many images are shown
  const perView = Math.ceil(findViewportWidth() / 175);

  let totalScroll = 0;
  const delay = 2000;

  imageWrapper.style.setProperty('--per-view', perView);
  for (let i = 0; i < perView; i++) {
    imageWrapper.insertAdjacentHTML('beforeend', imageItems[i].outerHTML);
  }

  let autoScroll = setInterval(scrolling(), delay);

  function scrolling() {
    totalScroll++;
    if (totalScroll == imageLength + 1) {
      clearInterval(autoScroll);
      totalScroll = 1;
      imageWrapper.style.transition = '0s';
      imageWrapper.style.left = '0';
      autoScroll = setInterval(scrolling(), delay);
    }
    const widthEl = document.querySelector('.image-wrapper > :first-child').offsetWidth + 24;
    imageWrapper.style.left = `-${totalScroll * widthEl}px`;
    imageWrapper.style.transition = '.9s';
  };
};


// Google captcha v3
function onSubmit(token) {
  document.getElementById("#contact-form").submit();
}


