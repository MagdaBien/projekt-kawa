export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
    products: 'products',
  },
};

export const select = {
  containerOf: {
    pages: '#pages',
    contact: '.contact-wrapper',
    product: '.product-wrapper',
    home: '.home-wrapper',
  },
  nav: {
    links: '.main-nav a',
    sideNav: '.home a, .product a, .contact a',
  },
  templateOf: {
    Product: '#template-product',
  },
};

export const classNames = {
  nav: {
    active: 'active',
  },
  pages: {
    active: 'active',
  },
};

export const templates = {
  Product: Handlebars.compile(
    document.querySelector(select.templateOf.Product).innerHTML
  ),
};
