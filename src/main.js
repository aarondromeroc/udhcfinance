import gsap from "gsap";
import barba from "@barba/core";
import SplitType from "split-type";
import * as THREE from "three";
import { team } from "./team";
import { myThree } from "./scene";
import { navigation, brandClick } from "./navigation";

/**
 * Global
 */

// Split type
const { toFstView, toSndView, toTrdView, toFrthView } = myThree();

function splitText() {
  if (typeof SplitType !== "undefined") {
    const lines = new SplitType(".split-text", {
      types: "lines",
      lineClass: "line-parent",
    });

    const linesParent = new SplitType(".line-parent", {
      types: "lines",
    });
  }
}

// Text animation

function animateText(selector, options) {
  gsap.from(selector, {
    ...options,
  });
}

/**
 * Pages
 */

//Home

function homePageLoad() {
  toFstView();
  animateText(".line", {
    yPercent: 100,
    ease: "power1.out",
    duration: 0.8,
    stagger: 0.04,
  });
}

// About

function aboutPageLoad() {
  toSndView();
  animateText(".line", {
    yPercent: 100,
    delay: 0.5,
    ease: "power1.out",
    duration: 0.8,
    stagger: 0.02,
  });
}

//Focus
function focusPageLoad() {
  toTrdView();
  $(".details_block").each(function () {
    gsap.from(
      $(this).find(".line"),
      {
        yPercent: 100,
        duration: 0.8,
        stagger: 0.2,
        ease: "power1.out",
      },
      "<+=0.5"
    );
  });
}

//Portfolio

function portfolioPageLoad(params) {
  gsap.from(".container.cc--portfolio", {
    yPercent: 50,
    duration: 0.8,
    ease: "power1.out",
  });
}

function prettyUrl() {
  $(".portfolio_url").each(function () {
    let oldUrl = $(this).text();
    let newUrl = oldUrl
      .replace("https://", "")
      .replace("/", "")
      .replace("www.", "")
      .replace("login", "");
    $(this).text(newUrl);
  });
}

//Team

function teamPageLoad() {
  toFrthView();
  let teamLoad = gsap.timeline({});

  teamLoad.from(".line", {
    yPercent: 100,
    duration: 1,
    stagger: 0.04,
    ease: "power1.out",
  });
  teamLoad.from(
    ".swiper-slide",
    {
      yPercent: 10,
      stagger: {
        each: 0.04,
        from: "left",
      },
      duration: 0.6,
      ease: "power1.out",
    },
    "<+=0.5"
  );
}

// Barba JS
barba.init({
  preventCustom: (href, element) => {
    // Prevent Barba from handling form submissions
    if (element.tagName === "FORM") {
      return true;
    }
    // Prevent Barba from handling form elements
    if (element.closest("form")) {
      return true;
    }
    // Prevent Barba from handling elements with data-no-barba attribute
    if (element.hasAttribute("data-no-barba")) {
      return true;
    }
    // Prevent Barba from handling submit buttons
    if (element.type === "submit") {
      return true;
    }
    // Prevent Barba from handling elements with data-barba-prevent attribute
    if (element.hasAttribute("data-barba-prevent")) {
      return true;
    }
    return false;
  },
  preventRunning: true,
  transitions: [
    {
      name: "home",
      to: {
        namespace: ["home"],
      },
      once() {
        homePageLoad();
      },
      enter() {
        homePageLoad();
      },
      afterEnter() {
        // Reinitialize Webflow scripts after page change
        window.Webflow &&
          window.Webflow.require &&
          window.Webflow.require("ix2").init();
        window.Webflow && window.Webflow.ready && window.Webflow.ready();
        document.dispatchEvent(new Event("DOMContentLoaded"));
      },
    },
    {
      name: "about",
      to: {
        namespace: ["about"],
      },
      once() {
        aboutPageLoad();
      },
      enter() {
        aboutPageLoad();
      },
      afterEnter() {
        // Reinitialize Webflow scripts after page change
        window.Webflow &&
          window.Webflow.require &&
          window.Webflow.require("ix2").init();
        window.Webflow && window.Webflow.ready && window.Webflow.ready();
        document.dispatchEvent(new Event("DOMContentLoaded"));
      },
    },
    {
      name: "focus",
      to: {
        namespace: ["focus"],
      },
      once() {
        focusPageLoad();
      },
      enter() {
        focusPageLoad();
      },
      afterEnter() {
        // Reinitialize Webflow scripts after page change
        window.Webflow &&
          window.Webflow.require &&
          window.Webflow.require("ix2").init();
        window.Webflow && window.Webflow.ready && window.Webflow.ready();
        document.dispatchEvent(new Event("DOMContentLoaded"));
      },
    },
    {
      name: "portfolio",
      to: {
        namespace: ["portfolio"],
      },
      once() {
        portfolioPageLoad();
        prettyUrl();
      },
      beforeEnter() {
        prettyUrl();
      },
      enter() {
        portfolioPageLoad();
      },
      afterEnter() {
        // Reinitialize Webflow scripts after page change
        window.Webflow &&
          window.Webflow.require &&
          window.Webflow.require("ix2").init();
        window.Webflow && window.Webflow.ready && window.Webflow.ready();
        document.dispatchEvent(new Event("DOMContentLoaded"));
      },
    },
    {
      name: "team",
      to: {
        namespace: ["team"],
      },
      once() {
        team();
      },
      beforeEnter() {
        team();
      },
      afterEnter() {
        // Reinitialize Webflow scripts after page change
        window.Webflow &&
          window.Webflow.require &&
          window.Webflow.require("ix2").init();
        window.Webflow && window.Webflow.ready && window.Webflow.ready();
        document.dispatchEvent(new Event("DOMContentLoaded"));
      },
    },
    {
      name: "writing",
      to: {
        namespace: ["writing"],
      },
      once() {
        toFrthView();
      },
      enter() {
        toFrthView();
      },
      afterEnter() {
        // Reinitialize Webflow scripts after page change
        window.Webflow &&
          window.Webflow.require &&
          window.Webflow.require("ix2").init();
        window.Webflow && window.Webflow.ready && window.Webflow.ready();
        document.dispatchEvent(new Event("DOMContentLoaded"));
      },
    },
    {
      name: "blog-template",
      to: {
        namespace: ["blog-template"],
      },
      once() {
        toFrthView();
      },
      enter() {
        toFrthView();
      },
      afterEnter() {
        // Reinitialize Webflow scripts after page change
        window.Webflow &&
          window.Webflow.require &&
          window.Webflow.require("ix2").init();
        window.Webflow && window.Webflow.ready && window.Webflow.ready();
        document.dispatchEvent(new Event("DOMContentLoaded"));
      },
    },
  ],
  views: [
    {
      namespace: "team",
      once() {
        team();
      },
      beforeEnter() {
        team();
      },
    },
  ],
});

//Global functions
barba.hooks.beforeEnter(() => {
  splitText();
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
  document.dispatchEvent(new Event("readystatechange"));
});

barba.hooks.once(() => {
  splitText();
  navigation();
  brandClick();
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
  document.dispatchEvent(new Event("readystatechange"));
});

// Form submission handler to ensure forms work with Barba
document.addEventListener(
  "submit",
  function (e) {
    // Prevent Barba from interfering with form submissions
    e.stopPropagation();

    // Allow the form to submit normally
    const form = e.target;

    // Log form submission for debugging
    console.log("Form submitted:", form);
    console.log("Form action:", form.action);
    console.log("Form method:", form.method);

    // Ensure the form can submit normally
    // Don't prevent default - let the form submit as intended
  },
  true
);

// Additional form protection - prevent any click events on form elements from being intercepted
document.addEventListener(
  "click",
  function (e) {
    // If the clicked element is inside a form, prevent Barba from handling it
    if (e.target.closest("form") || e.target.tagName === "FORM") {
      e.stopPropagation();
    }
  },
  true
);
