/* =========================
   HOME PAGE PRODUCTS
========================= */

const product1 =
  document.getElementById(
    "U9-page-home-product-1"
  );


const product2 =
  document.getElementById(
    "U9-page-home-product-2"
  );


const product1Image =
  product1.querySelector(
    "img"
  );


const product2Image =
  product2.querySelector(
    "img"
  );


/* =========================
   PRODUCT 1
========================= */

function loadProduct1() {

  if (
    product1Image.complete &&
    product1Image.naturalWidth > 0
  ) {

    product1.classList.add(
      "loaded"
    );

  }

}


product1Image.addEventListener(
  "load",
  function () {

    product1.classList.add(
      "loaded"
    );

  }
);


loadProduct1();


/* =========================
   PRODUCT 2
========================= */

function loadProduct2() {

  if (
    product2Image.complete &&
    product2Image.naturalWidth > 0
  ) {

    product2.classList.add(
      "loaded"
    );

  }

}


product2Image.addEventListener(
  "load",
  function () {

    product2.classList.add(
      "loaded"
    );

  }
);


loadProduct2();
