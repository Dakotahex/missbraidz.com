// Mobile header menu
const primaryHeader = document.querySelector('.primary-header');
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener('click', () => {
  primaryNav.hasAttribute("data-visible")
    ? navToggle.setAttribute('aria-expanded', false)
    : navToggle.setAttribute('aria-expanded', true);
  primaryNav.toggleAttribute("data-visible");
  primaryHeader.toggleAttribute('data-overlay');
});

// Carousel
// Resize carousel slide height
const mobileWidth = 800;    // This is 50em

let carouselsNode = document.querySelectorAll('.carousel');
const carousels = Array.prototype.slice.call(carouselsNode);

const findAndSetHeights = () => {
  const viewportWidth = window.innerWidth;
  if (viewportWidth < mobileWidth) {
    // Find all first carousel sliders
    firstSlides = new Array();
    carousels.forEach(findFirstChild);
    // Set height of each parent class carousel
    firstSlides.forEach(setCarouselHeight)
  }
}

const setCarouselHeight = (carouselSlide) => {
  const slideHeight = carouselSlide.offsetHeight;
  carouselSlide.closest('.carousel').style.height = slideHeight * 0.0625 + 4 + 'rem';
}

const findFirstChild = (div) => {
  b = div.querySelector('.carousel__slide');
  firstSlides.push(b);
}

window.addEventListener("resize", findAndSetHeights);
findAndSetHeights()

// Carousel Functionality

// Selecting correct dom elements
const selectDomElements = (parent) => {
  const track = parent.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const dotsNav = parent.querySelector('.carousel__nav');
  const dots = Array.from(dotsNav.children);

  const slideWidth = slides[0].getBoundingClientRect().width;

  // arrange slides next to one another
  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 20 * index + 'px';
  }
  slides.forEach(setSlidePosition);

  // When i click the nav indicators move to that slide
  dotsNav.addEventListener('click', e => {
    // What indicator was clicked
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
  })


  // Move slider to target slide
  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  }

  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
  }
}

// Execute Carousel Functionality
carousels.forEach(selectDomElements);

// When a user swipes left or right
// let touchstartX = 0;
// let touchendX = 0;

// function checkDirection() {
//   if (touchendX < touchstartX) alert('swiped left!');
//   if (touchendX > touchstartX) alert('swiped right!');
// };

// document.addEventListener('touchstart', e => {
//   touchstartX = e.changedTouches[0].screenX;
// });

// document.addEventListener('touchend', e => {
//   touchendX = e.changedTouches[0].screenX;
//   checkDirection();
// });





// FAQ accordian
// Checks for button
if (document.querySelector('.question')) {

  // Selects all buttons
  document.querySelectorAll('.question').forEach(function (e) {

    // Bind click events to each e
    e.addEventListener('click', function (i) {

      // Check for child element
      if (i.target.parentNode.querySelector('.faq-answer')) {
        let faqAnswer = i.target.parentNode.querySelector('.faq-answer')
        faqAnswer.hasAttribute("data-visible")
          ? e.setAttribute('aria-expanded', false)
          : e.setAttribute('aria-expanded', true);
        faqAnswer.toggleAttribute('data-visible');
      }
    })
  })
}