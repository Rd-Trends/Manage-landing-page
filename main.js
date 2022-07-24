"use strict";
const navToggler = document.querySelector(".navigation__toggler");
const navTogglerIcoon = document.querySelector(".navigation__toggler img");
const mobileMenu = document.querySelector(".menu--mobile-nav-menu");
const overlay = document.querySelector(".overlay");
const footerCTAForm = document.querySelector(".footer__CTA form");
const email = document.querySelector(".footer__CTA-input");
const errorMEssage = document.querySelector(".error-message");
let dots = document.querySelector(".dots");

navToggler.addEventListener("click", toggleNavbar);

function toggleNavbar() {
  if (mobileMenu.classList.contains("menu--mobile-nav-menu-active")) {
    mobileMenu.classList.remove("menu--mobile-nav-menu-active");
    navTogglerIcoon.src = "./images/icon-hamburger.svg";
    overlay.style.display = "none";
  } else {
    mobileMenu.classList.add("menu--mobile-nav-menu-active");
    navTogglerIcoon.src = "./images/icon-close.svg";
    overlay.style.display = "block";
  }
}

footerCTAForm.addEventListener("submit", submitForm);

email.addEventListener("keydown", emailChange);

function submitForm(e) {
  e.preventDefault();
  if (!email.value) {
    showError("your email address must be provided");
    return;
  }
  if (validateEmail(email)) {
    alert("registration completed");
    document.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    email.value = "";
  }
}

function validateEmail(email) {
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.value.match(mailFormat)) {
    return true;
  } else {
    showError("please insert a valid email");
    email.focus();
    return false;
  }
}

function showError(err) {
  errorMEssage.textContent = err;
  email.classList.add("footer__CTA-input--error");
  return;
}

function emailChange(e) {
  if (e.target.classList.contains("footer__CTA-input--error")) {
    e.target.classList.remove("footer__CTA-input--error");
    errorMEssage.textContent = "";
    return;
  }
}

function navigation(slider) {
  function markup(remove) {
    dotMarkup(remove);
  }

  function removeElement(elment) {
    elment.parentNode.removeChild(elment);
  }

  function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
  }

  function dotMarkup(remove) {
    if (remove) {
      dots && removeElement(dots);
      return;
    }
    slider.track.details.slides.forEach((_e, idx) => {
      var dot = createDiv("dot");
      dot.addEventListener("click", () => slider.moveToIdx(idx));
      dots.appendChild(dot);
    });
  }

  function updateClasses() {
    var slide = slider.track.details.rel;
    Array.from(dots.children).forEach(function (dot, idx) {
      idx === slide
        ? dot.classList.add("dot--active")
        : dot.classList.remove("dot--active");
    });
  }

  slider.on("created", () => {
    markup();
    updateClasses();
  });
  slider.on("optionsChanged", () => {
    markup(true);
    markup();
    updateClasses();
  });
  slider.on("slideChanged", () => {
    updateClasses();
  });
  slider.on("destroyed", () => {
    markup(true);
  });
}

var slider = new KeenSlider(
  "#my-keen-slider",
  {
    mode: "free-snap",
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 25 },
      },
    },
    slides: {
      perView: 1,
      spacing: 16,
    },
  },
  [navigation]
);
