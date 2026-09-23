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

    showPage(
      homePage
    );


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


const messagePage =
  document.getElementById(
    "U9-page-message"
  );


const inboxPage =
  document.getElementById(
    "U9-page-inbox"
  );


const giftPage =
  document.getElementById(
    "U9-page-gift"
  );


const historyPage =
  document.getElementById(
    "U9-page-history"
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


const messageButton =
  document.getElementById(
    "U9-page-container-tool-message"
  );


const inboxButton =
  document.getElementById(
    "U9-page-container-tool-inbox"
  );


const giftButton =
  document.getElementById(
    "U9-page-container-tool-gift"
  );


const historyButton =
  document.getElementById(
    "U9-page-container-tool-history"
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

  messagePage.style.display =
    "none";

  inboxPage.style.display =
    "none";

  giftPage.style.display =
    "none";

  historyPage.style.display =
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


messageButton.addEventListener(
  "click",
  function () {

    messageButton.classList.remove(
      "message-bounce"
    );

    void messageButton.offsetWidth;

    messageButton.classList.add(
      "message-bounce"
    );

    showPage(
      messagePage
    );

  }
);


inboxButton.addEventListener(
  "click",
  function () {

    inboxButton.classList.remove(
      "inbox-shake"
    );

    void inboxButton.offsetWidth;

    inboxButton.classList.add(
      "inbox-shake"
    );

    showPage(
      inboxPage
    );

  }
);


giftButton.addEventListener(
  "click",
  function () {

    giftButton.classList.remove(
      "gift-bounce"
    );

    void giftButton.offsetWidth;

    giftButton.classList.add(
      "gift-bounce"
    );

    showPage(
      giftPage
    );

  }
);


historyButton.addEventListener(
  "click",
  function () {

    historyButton.classList.remove(
      "history-shake"
    );

    void historyButton.offsetWidth;

    historyButton.classList.add(
      "history-shake"
    );

    showPage(
      historyPage
    );

  }
);

