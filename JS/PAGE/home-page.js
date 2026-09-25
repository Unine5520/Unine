/* =========================
   HOME PAGE PRODUCTS
========================= */


/* =========================
   PRODUCT CONTAINER
========================= */

const productsContainer =
  document.getElementById(
    "U9-page-home-products"
  );


/* =========================
   PRODUCT SVG
========================= */

const productIcon = `
  <svg
    class="U9-page-home-product-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12 3v18"></path>
    <path d="M3 12h18"></path>
    <path d="M5 5l14 14"></path>
    <path d="M19 5L5 19"></path>
  </svg>
`;


/* =========================
   LOAD PRODUCTS
========================= */

async function loadProducts() {

  if (!productsContainer) {

    console.error(
      "U9-page-home-products not found."
    );

    return;

  }


  /* =========================
     GET PRODUCTS
  ========================= */

  let response;

  try {

    response = await fetch(
      "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/products"
    );

  } catch (error) {

    console.error(
      "Failed to connect to products function:",
      error
    );

    return;

  }


  /* =========================
     CHECK RESPONSE
  ========================= */

  if (!response.ok) {

    console.error(
      "Products function error:",
      response.status,
      response.statusText
    );

    return;

  }


  /* =========================
     GET JSON
  ========================= */

  let products;

  try {

    products =
      await response.json();

  } catch (error) {

    console.error(
      "Failed to read products response:",
      error
    );

    return;

  }


  /* =========================
     CHECK PRODUCTS
  ========================= */

  if (!Array.isArray(products)) {

    console.error(
      "Invalid products response:",
      products
    );

    return;

  }


  /* =========================
     CLEAR PRODUCTS
  ========================= */

  productsContainer.innerHTML = "";


  /* =========================
     CREATE PRODUCTS
  ========================= */

  products.forEach(
    function (product) {


      /* =========================
         PRODUCT CARD
      ========================= */

      const card =
        document.createElement(
          "div"
        );

      card.className =
        "U9-page-home-product";

      card.dataset.productId =
        product.id;


      /* =========================
         PRODUCT IMAGE
      ========================= */

      const image =
        document.createElement(
          "img"
        );

      image.src =
        product.image_url || "";

      image.alt =
        product.name || "Product";


      /* =========================
         PRODUCT INFO
      ========================= */

      const info =
        document.createElement(
          "div"
        );

      info.className =
        "U9-page-home-product-info";


      /* =========================
         PRODUCT ICON
      ========================= */

      const icon =
        document.createElement(
          "div"
        );

      icon.className =
        "U9-page-home-product-icon-container";

      icon.innerHTML =
        productIcon;


      /* =========================
         PRODUCT NAME
      ========================= */

      const name =
        document.createElement(
          "div"
        );

      name.className =
        "U9-page-home-product-name";

      name.textContent =
        product.name || "";


      /* =========================
         PRODUCT PRICE
      ========================= */

      const price =
        document.createElement(
          "div"
        );

      price.className =
        "U9-page-home-product-price";

      price.textContent =
        product.price ?? "";


      /* =========================
         PRODUCT DISCOUNT
      ========================= */

      const discount =
        document.createElement(
          "div"
        );

      discount.className =
        "U9-page-home-product-discount";

      if (
        Number(product.discount) > 0
      ) {

        discount.textContent =
          `-${product.discount}%`;

      }


      /* =========================
         PRODUCT DESCRIPTION
      ========================= */

      const description =
        document.createElement(
          "div"
        );

      description.className =
        "U9-page-home-product-description";

      description.textContent =
        product.description || "";


      /* =========================
         BUILD INFO
      ========================= */

      info.appendChild(
        icon
      );

      info.appendChild(
        name
      );

      info.appendChild(
        price
      );

      info.appendChild(
        discount
      );

      info.appendChild(
        description
      );


      /* =========================
         BUILD CARD
      ========================= */

      card.appendChild(
        image
      );

      card.appendChild(
        info
      );


      /* =========================
         IMAGE LOAD
      ========================= */

      image.addEventListener(
        "load",
        function () {

          card.classList.add(
            "loaded"
          );

        }
      );


      /* =========================
         IMAGE ERROR
      ========================= */

      image.addEventListener(
        "error",
        function () {

          card.classList.add(
            "image-error"
          );

          console.error(
            "Failed to load product image:",
            product.image_url
          );

        }
      );


      /* =========================
         CHECK IMAGE
      ========================= */

      if (
        image.complete &&
        image.naturalWidth > 0
      ) {

        card.classList.add(
          "loaded"
        );

      }


      /* =========================
         ADD PRODUCT
      ========================= */

      productsContainer.appendChild(
        card
      );

    }
  );

}


/* =========================
   START
========================= */

loadProducts();
