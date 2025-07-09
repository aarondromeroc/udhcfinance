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
    // Prevent Barba from handling elements with data-no-barba attribute
    if (element.hasAttribute("data-no-barba")) {
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
    // Allow form submission to proceed normally
    // Barba will not interfere due to preventCustom configuration
    console.log("Form submitted:", e.target);
  },
  true
);
