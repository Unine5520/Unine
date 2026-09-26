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
   MODAL ELEMENTS
========================= */

const messageModal =
  document.getElementById(
    "U9-message-normal-modal"
  );


const messageModalClose =
  document.getElementById(
    "U9-message-normal-modal-close"
  );


const inboxModal =
  document.getElementById(
    "U9-inbox-normal-modal"
  );


const inboxModalClose =
  document.getElementById(
    "U9-inbox-normal-modal-close"
  );


const giftModal =
  document.getElementById(
    "U9-gift-normal-modal"
  );


const giftModalClose =
  document.getElementById(
    "U9-gift-normal-modal-close"
  );


const historyModal =
  document.getElementById(
    "U9-history-normal-modal"
  );


const historyModalClose =
  document.getElementById(
    "U9-history-normal-modal-close"
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
   NORMAL TOOL BUTTONS
========================= */

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


  page.style.display =
    "block";


  homeButton.classList.remove(
    "active"
  );


  if (
    page === homePage
  ) {

    homeButton.classList.add(
      "active"
    );

  }

}


/* =========================
   DEFAULT PAGE
========================= */

showPage(
  homePage
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

  }
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


/* =========================
   MESSAGE MODAL
========================= */

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


    messageModal.style.display =
      "flex";

  }
);


messageModalClose.addEventListener(
  "click",
  function () {

    messageModal.style.display =
      "none";

  }
);


/* =========================
   INBOX MODAL
========================= */

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


    inboxModal.style.display =
      "flex";

  }
);


inboxModalClose.addEventListener(
  "click",
  function () {

    inboxModal.style.display =
      "none";

  }
);


/* =========================
   GIFT MODAL
========================= */

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


    giftModal.style.display =
      "flex";

  }
);


giftModalClose.addEventListener(
  "click",
  function () {

    giftModal.style.display =
      "none";

  }
);


/* =========================
   HISTORY MODAL
========================= */

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


    historyModal.style.display =
      "flex";

  }
);


historyModalClose.addEventListener(
  "click",
  function () {

    historyModal.style.display =
      "none";

  }
);
