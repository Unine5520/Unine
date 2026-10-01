/* =========================================================
   U9 CONTAINER TOOL
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const containerTool =
  document.getElementById(
    "U9-page-container-tool"
  );


const menuButton =
  document.getElementById(
    "Menu-button"
  );


/* =========================================================
   PAGE ELEMENTS
========================================================= */

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


/* =========================================================
   PAGE BUTTONS
========================================================= */

const homeButton =
  document.getElementById(
    "homeButton"
  );


const shopButton =
  document.getElementById(
    "shopButton"
  );


const auctionButton =
  document.getElementById(
    "auctionButton"
  );


const test1Button =
  document.getElementById(
    "test1Button"
  );


const test2Button =
  document.getElementById(
    "test2Button"
  );


/* =========================================================
   NORMAL TOOL BUTTONS
========================================================= */

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


/* =========================================================
   NORMAL MODALS
========================================================= */

const messageModal =
  document.getElementById(
    "U9-message-normal-modal"
  );


const inboxModal =
  document.getElementById(
    "U9-inbox-normal-modal"
  );


const giftModal =
  document.getElementById(
    "U9-gift-normal-modal"
  );


const historyModal =
  document.getElementById(
    "U9-history-normal-modal"
  );


/* =========================================================
   PAGE LIST
========================================================= */

const pages = [

  homePage,

  shopPage,

  auctionPage,

  test1Page,

  test2Page

].filter(Boolean);


/* =========================================================
   SHOW PAGE
========================================================= */

function showPage(page) {

  if (!page) {

    return;

  }


  pages.forEach(
    function (item) {

      item.style.display =
        "none";

    }
  );


  page.style.display =
    "block";

}


/* =========================================================
   HOME
========================================================= */

if (homeButton) {

  homeButton.addEventListener(
    "click",
    function () {

      showPage(homePage);

    }
  );

}


/* =========================================================
   SHOP
========================================================= */

if (shopButton) {

  shopButton.addEventListener(
    "click",
    function () {

      showPage(shopPage);

    }
  );

}


/* =========================================================
   AUCTION
========================================================= */

if (auctionButton) {

  auctionButton.addEventListener(
    "click",
    function () {

      showPage(auctionPage);

    }
  );

}


/* =========================================================
   TEST 1
========================================================= */

if (test1Button) {

  test1Button.addEventListener(
    "click",
    function () {

      showPage(test1Page);

    }
  );

}


/* =========================================================
   TEST 2
========================================================= */

if (test2Button) {

  test2Button.addEventListener(
    "click",
    function () {

      showPage(test2Page);

    }
  );

}


/* =========================================================
   NORMAL MODAL CONNECTION
========================================================= */


/* =========================================================
   MESSAGE
========================================================= */

if (
  messageButton &&
  messageModal
) {

  messageButton.addEventListener(
    "click",
    function () {

      messageModal.dispatchEvent(
        new Event("U9:open")
      );

    }
  );

}


/* =========================================================
   INBOX
========================================================= */

if (
  inboxButton &&
  inboxModal
) {

  inboxButton.addEventListener(
    "click",
    function () {

      inboxModal.dispatchEvent(
        new Event("U9:open")
      );

    }
  );

}


/* =========================================================
   GIFT
========================================================= */

if (
  giftButton &&
  giftModal
) {

  giftButton.addEventListener(
    "click",
    function () {

      giftModal.dispatchEvent(
        new Event("U9:open")
      );

    }
  );

}


/* =========================================================
   HISTORY
========================================================= */

if (
  historyButton &&
  historyModal
) {

  historyButton.addEventListener(
    "click",
    function () {

      historyModal.dispatchEvent(
        new Event("U9:open")
      );

    }
  );

}


/* =========================================================
   MENU BUTTON
========================================================= */

if (menuButton) {

  menuButton.addEventListener(
    "click",
    function () {

      menuButton.classList.toggle(
        "active"
      );

    }
  );

}


/* =========================================================
   INITIAL PAGE
========================================================= */

showPage(homePage);
