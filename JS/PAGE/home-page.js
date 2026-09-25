
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
    viewBox="0 0 352.326 352.327"
    aria-hidden="true"
  >
    <g>
      <g>

        <path d="M204.994,193.713c-4.475,0-8.194,1.516-10.757,4.385c-2.3,2.571-3.564,6.068-3.564,9.847c0,6.939,4.532,14.41,14.482,14.41c4.474,0,8.194-1.516,10.757-4.386c2.298-2.571,3.562-6.067,3.562-9.846C219.475,201.183,214.943,193.713,204.994,193.713z"/>

        <path d="M147.903,158.913c4.487,0,8.217-1.513,10.787-4.373c2.3-2.562,3.567-6.045,3.567-9.808c0-6.918-4.542-14.363-14.517-14.363c-10.17,0-14.722,7.124-14.722,14.183C133.018,151.469,137.676,158.913,147.903,158.913z"/>

        <path d="M176.164,62.745c-62.539,0-113.418,50.879-113.418,113.418c0,62.539,50.879,113.418,113.418,113.418
        s113.418-50.879,113.418-113.418C289.582,113.624,238.703,62.745,176.164,62.745z
        M127.072,126.31c5.051-5.505,12.198-8.415,20.668-8.415c18.203,0,27.728,13.497,27.728,26.828
        c0,7.001-2.477,13.542-6.973,18.419c-5.073,5.501-12.25,8.41-20.755,8.41c-18.122,0-27.604-13.497-27.604-26.829
        C120.136,137.725,122.599,131.186,127.072,126.31z
        M144.096,222.29c-1.101,1.229-3.351,2.234-5.001,2.234h-11.697c-1.65,0-2.097-1.004-0.994-2.229l82.535-91.765
        c1.104-1.227,3.355-2.255,5.006-2.285l11.584-0.212c1.649-0.03,2.099,0.951,0.998,2.18L144.096,222.29z
        M225.354,226.182c-4.977,5.396-12.018,8.25-20.359,8.25c-17.778,0-27.08-13.239-27.08-26.316
        c0-6.865,2.417-13.28,6.805-18.063c4.955-5.399,11.965-8.255,20.274-8.255c17.856,0,27.198,13.24,27.198,26.317
        C232.192,214.981,229.764,221.397,225.354,226.182z"/>

        <path d="M322.759,223.797c5.22-16.073,29.567-29.82,29.567-47.634c0-17.814-24.348-31.562-29.567-47.635
        c-5.409-16.659,6.021-42.056-4.07-55.922c-10.192-14.005-37.947-10.933-51.952-21.125
        C252.87,41.389,247.272,13.989,230.612,8.58c-16.073-5.219-36.636,13.487-54.449,13.487
        c-17.814,0-38.376-18.707-54.45-13.487c-16.659,5.409-22.256,32.81-36.123,42.901
        c-14.005,10.192-41.759,7.12-51.952,21.125c-10.091,13.867,1.338,39.264-4.071,55.923
        C24.348,144.602,0,158.35,0,176.164c0,17.812,24.348,31.561,29.567,47.635
        c5.409,16.659-6.021,42.056,4.071,55.922c10.192,14.005,37.947,10.934,51.952,21.125
        c13.866,10.092,19.464,37.492,36.124,42.901c16.073,5.219,36.635-13.488,54.449-13.488
        c17.813,0,38.376,18.707,54.45,13.487c16.659-5.409,22.256-32.811,36.123-42.901
        c14.005-10.191,41.759-7.12,51.952-21.125
        C328.78,265.853,317.35,240.457,322.759,223.797z
        M176.164,306.582c-71.913,0-130.418-58.505-130.418-130.418
        c0-71.914,58.505-130.418,130.418-130.418s130.418,58.505,130.418,130.418
        S248.077,306.582,176.164,306.582z"/>

      </g>
    </g>
  </svg>
`;

const saveIcon = `
  <svg
    class="U9-page-home-product-save-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
    />
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

  for (const product of products) {


    /* =========================
       PRODUCT CARD
    ========================= */

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "U9-page-home-product loading";

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
       PRODUCT SAVE
    ========================= */

    const saveButton =
      document.createElement(
        "button"
      );

    saveButton.className =
      "U9-page-home-product-save";

    saveButton.type =
      "button";

    saveButton.setAttribute(
      "aria-label",
      "Save product"
    );

    saveButton.innerHTML =
      saveIcon;


    /* =========================
       CHECK SAVE STATUS
    ========================= */

    try {

      const saveStatus =
        await fetch(
          "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/product-save?product_id=" +
          encodeURIComponent(
            product.id
          ),
          {
            method: "GET",
            credentials: "include"
          }
        );


      if (saveStatus.ok) {

        const saveData =
          await saveStatus.json();


        if (
          saveData.saved
        ) {

          saveButton.classList.add(
            "saved"
          );

        }

      }

    } catch (error) {

      console.error(
        "Failed to check product save status:",
        error
      );

    }


    /* =========================
       PRODUCT SAVE
    ========================= */

    saveButton.addEventListener(
      "click",
      async function () {

        const productId =
          product.id;

        saveButton.disabled = true;

        try {

          const isSaved =
            saveButton.classList.contains(
              "saved"
            );

          const response =
            await fetch(
              "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/product-save",
              {
                method: isSaved
                  ? "DELETE"
                  : "POST",

                credentials: "include",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                  product_id:
                    productId
                })
              }
            );


          if (!response.ok) {

            const errorData =
              await response.json()
                .catch(function () {
                  return {};
                });

            console.error(
              "Product save error:",
              response.status,
              errorData
            );

            return;

          }


          const data =
            await response.json();


          if (data.saved) {

            saveButton.classList.add(
              "saved"
            );

          } else {

            saveButton.classList.remove(
              "saved"
            );

          }

        } catch (error) {

          console.error(
            "Failed to save product:",
            error
          );

        } finally {

          saveButton.disabled = false;

        }

      }
    );


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
      saveButton
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

        card.classList.remove(
          "loading"
        );

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

        card.classList.remove(
          "loading"
        );

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

      card.classList.remove(
        "loading"
      );

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

}


/* =========================
   START
========================= */

loadProducts();
