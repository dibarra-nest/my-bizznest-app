const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////////////////////////
// Make mobile navigation work

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

///////////////////////////////////////////////////////////
// Smooth scrolling animation (IF PROJECT IS ALL CONTAINED WITHIN MAIN REPO)

// const allLinks = document.querySelectorAll('a:link');

// allLinks.forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = link.getAttribute('href');

//     // Scroll back to top
//     if (href === '#')
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });

//     // Scroll to other links
//     if (href !== '#' && href.startsWith('#')) {
//       const sectionEl = document.querySelector(href);
//       sectionEl.scrollIntoView({ behavior: 'smooth' });
//     }

//     // Close mobile naviagtion
//     if (link.classList.contains('main-nav-link'))
//       headerEl.classList.toggle('nav-open');
//   });
// });

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach((img) => imgObserver.observe(img));
