import gsap from "gsap";
import barba from "@barba/core";
import SplitType from "split-type";
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

// Update copyright year function
function updateCopyrightYear() {
  $(".copyright-year").text(new Date().getFullYear());
}

// Reinitialize Webflow scripts function
function reinitializeWebflowScripts(pageName) {
  // Reinitialize IX2 interactions
  if (window.Webflow && window.Webflow.require) {
    window.Webflow.require("ix2").init();
  }

  // Comprehensive form reinitialization
  setTimeout(() => {
    if (window.Webflow && window.Webflow.require) {
      const forms = window.Webflow.require("forms");
      if (forms && forms.ready) {
        forms.ready();
      }

      // Also try to reinitialize any existing forms
      const existingForms = document.querySelectorAll("form.w-form");
      existingForms.forEach((form) => {
        if (form && typeof form.reset === "function") {
          // Reset form state
          form.reset();
        }
      });
    }
  }, 200);

  // Trigger DOM events to ensure Webflow components are properly initialized
  document.dispatchEvent(new Event("DOMContentLoaded"));
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

// Barba config: prevent Barba from handling forms
barba.init({
  preventCustom: (href, element) => {
    // Prevent Barba from handling form submissions
    if (element.tagName === "FORM") return true;
    // Prevent Barba from handling elements with data-no-barba attribute (optional)
    if (element.hasAttribute("data-no-barba")) return true;
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
        reinitializeWebflowScripts("home");
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
        reinitializeWebflowScripts("about");
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
        reinitializeWebflowScripts("focus");
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
        reinitializeWebflowScripts("portfolio");
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
        reinitializeWebflowScripts("team");
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
        reinitializeWebflowScripts("writing");
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
        reinitializeWebflowScripts("blog-template");
      },
    },
    {
      name: "contact",
      to: {
        namespace: ["contact"],
      },
      once() {
        toFrthView();
        updateCopyrightYear();
      },
      enter() {
        updateCopyrightYear();
        toFrthView();
      },
      afterEnter() {
        reinitializeWebflowScripts("contact");
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

// Re-initialize Webflow scripts after each Barba transition
barba.hooks.beforeEnter(() => {
  // If you use SplitType or other custom scripts, re-run them here
  // splitText();

  // Re-initialize Webflow interactions and forms
  if (window.Webflow) {
    if (window.Webflow.destroy) window.Webflow.destroy();
    if (window.Webflow.ready) window.Webflow.ready();
    if (window.Webflow.require) {
      try {
        window.Webflow.require("ix2").init();
        const forms = window.Webflow.require("forms");
        if (forms && forms.ready) forms.ready();
      } catch (e) {
        // Ignore errors if not present
      }
    }
  }
  document.dispatchEvent(new Event("readystatechange"));
});

// Optional: On first load, re-initialize as well
barba.hooks.once(() => {
  // splitText();
  // navigation();
  // brandClick();
  if (window.Webflow) {
    if (window.Webflow.destroy) window.Webflow.destroy();
    if (window.Webflow.ready) window.Webflow.ready();
    if (window.Webflow.require) {
      try {
        window.Webflow.require("ix2").init();
        const forms = window.Webflow.require("forms");
        if (forms && forms.ready) forms.ready();
      } catch (e) {}
    }
  }
  document.dispatchEvent(new Event("readystatechange"));
});

// No need to add any submit event listeners for forms!
