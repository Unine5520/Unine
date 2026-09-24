/* =========================
   HOME PAGE PRODUCTS
========================= */

const products =
  document.querySelectorAll(
    "#U9-page-home-products > [id^=\"U9-page-home-product-\"]"
  );


products.forEach(
  function (product) {

    const image =
      product.querySelector(
        "img"
      );


    if (!image) {

      return;

    }


    /* =========================
       LOAD PRODUCT
    ========================= */

    function loadProduct() {

      if (
        image.complete &&
        image.naturalWidth > 0
      ) {

        product.classList.add(
          "loaded"
        );

      }

    }


    /* =========================
       IMAGE LOAD
    ========================= */

    image.addEventListener(
      "load",
      function () {

        product.classList.add(
          "loaded"
        );

      }
    );


    /* =========================
       CHECK LOADED
    ========================= */

    loadProduct();

  }
);
