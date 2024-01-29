import { settings, select, classNames } from "./settings.js";
import Product from "./components/Product.js";

const app = {
  initData: function () {
    const thisApp = this;
    const url = settings.db.url + "/" + settings.db.products;
    this.data = {};
    fetch(url)
      .then((rawResponse) => {
        return rawResponse.json();
      })
      .then((parsedResponse) => {
        this.data.products = parsedResponse;
        thisApp.initProducts();
      });
  },

  initProducts: function () {
    const thisApp = this;

    for (let productData in thisApp.data.products) {
      new Product(
        thisApp.data.products[productData].id,
        thisApp.data.products[productData]
      );
    }
  },

  initPages: function () {
    const thisApp = this;
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace("#/", "");

    let pageMatchingHash = "home";

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener("click", function (event) {
        const clickedElement = this;
        event.preventDefault();

        // get page id from href attributr
        const id = clickedElement.getAttribute("href").replace("#", "");

        // run thisApp.activatePage whit that id
        thisApp.activatePage(id);

        // change URL hash
        window.location.hash = "#/" + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;
    // add class active to matching page, remove from non-matching
    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
      if (page.id == "product" && pageId == "home") {
        page.classList.add(classNames.pages.active);
        //console.log(page, classNames.pages.active);
      }
    }

    // add class active to matching LINK (in menu), remove from non-matching
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute("href") == "#" + pageId
      );
    }
  },

  init: function () {
    const thisApp = this;
    thisApp.initData();
    thisApp.initPages();
  },
};

app.init();
