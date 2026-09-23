/* =========================
   CONTAINER TOOL
========================= */

const tool =
  document.getElementById(
    "U9-page-container-tool"
  );


const menuButton =
  document.getElementById(
    "U9-page-container-tool-menu"
  );


/* =========================
   MENU
========================= */

menuButton.addEventListener(
  "click",
  function () {

    tool.classList.toggle(
      "menu-open"
    );


    menuButton.classList.remove(
      "menu-heartbeat"
    );


    void menuButton.offsetWidth;


    menuButton.classList.add(
      "menu-heartbeat"
    );


    if (
      !tool.classList.contains(
        "menu-open"
      )
    ) {

      showPage(
        homePage
      );

    }

  }
);

/* =========================
   PAGE ELEMENTS
========================= */

const homePage =
  document.getElementById(
    "U9-page-home"
  );


const shopPage =
  document.getElementById(
    "U9-page-shop"
  );


const auctionPage =
  document.getElementById(
    "U9-page-auction"
  );


const test1Page =
  document.getElementById(
    "U9-page-test1"
  );


const test2Page =
  document.getElementById(
    "U9-page-test2"
  );


/* =========================
   PAGE BUTTONS
========================= */

const homeButton =
  document.getElementById(
    "U9-page-container-tool-home"
  );


const shopButton =
  document.getElementById(
    "U9-page-container-tool-shop-page"
  );


const auctionButton =
  document.getElementById(
    "U9-page-container-tool-auction"
  );


const test1Button =
  document.getElementById(
    "U9-page-container-tool-test1"
  );


const test2Button =
  document.getElementById(
    "U9-page-container-tool-test2"
  );


/* =========================
   SHOW PAGE
========================= */

function showPage(
  page
) {

  homePage.style.display =
    "none";

  shopPage.style.display =
    "none";

  auctionPage.style.display =
    "none";

  test1Page.style.display =
    "none";

  test2Page.style.display =
    "none";

  page.style.display =
    "block";

}


/* =========================
   DEFAULT PAGE
========================= */

showPage(
  homePage
);


/* =========================
   PAGE BUTTON EVENTS
========================= */

homeButton.addEventListener(
  "click",
  function () {

    showPage(
      homePage
    );

  }
);


shopButton.addEventListener(
  "click",
  function () {

    showPage(
      shopPage
    );

  }
);


auctionButton.addEventListener(
  "click",
  function () {

    showPage(
      auctionPage
    );

  }
);


test1Button.addEventListener(
  "click",
  function () {

    showPage(
      test1Page
    );

  }
);


test2Button.addEventListener(
  "click",
  function () {

    showPage(
      test2Page
    );

  }
);

