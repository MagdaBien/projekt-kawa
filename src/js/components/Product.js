import { select, templates } from '../settings.js';
import { utils } from '../utils.js';

class Product {
  constructor(id, data) {
    const thisProduct = this;

    thisProduct.id = id;
    thisProduct.data = data;

    thisProduct.renderProductList();
  }

  // generate HTML for product and insert this element into the menu
  renderProductList() {
    const thisProduct = this;
    const generatedHTML = templates.Product(thisProduct.data); // generate HTML based on templete
    thisProduct.element = utils.createDOMFromHTML(generatedHTML); // create element using utils.....
    const productContainer = document.querySelector(select.containerOf.product); // find menu container
    productContainer.appendChild(thisProduct.element); // add element to menu
  }
}

export default Product;
