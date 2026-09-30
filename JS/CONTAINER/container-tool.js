
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
   PAGE ARROWS
========================= */

const pagePrevButton =
  document.getElementById(
    "U9-page-container-tool-pages-prev"
  );


const pageNextButton =
  document.getElementById(
    "U9-page-container-tool-pages-next"
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
   PAGE MAP
========================= */

const pageItems = [

  {
    page: homePage,
    button: homeButton
  },

  {
    page: shopPage,
    button: shopButton
  },

  {
    page: auctionPage,
    button: auctionButton
  },

  {
    page: test1Page,
    button: test1Button
  },

  {
    page: test2Page,
    button: test2Button
  }

];


/* =========================
   PAGE SETTINGS
========================= */

const pageWindowSize = 3;

let pageWindowStart = 0;

let pageWindowAnimating = false;

const pageWindowAnimationDuration = 450;


/* =========================
   PAGE MENU
========================= */

const pageMenu =
  document.getElementById(
    "U9-page-container-tool-pages"
  );


/* =========================
   CREATE VIEWPORT
========================= */

const pageViewport =
  document.createElement(
    "div"
  );


pageViewport.id =
  "U9-page-container-tool-page-viewport";


/* =========================
   CREATE TRACK
========================= */

const pageTrack =
  document.createElement(
    "div"
  );


pageTrack.id =
  "U9-page-container-tool-page-track";


/* =========================
   MOVE PAGE BUTTONS
   INTO TRACK
========================= */

pageItems.forEach(
  function (item) {

    if (
      item.button
    ) {

      pageTrack.appendChild(
        item.button
      );

    }

  }
);


/* =========================
   BUILD PAGE MENU
========================= */

if (
  pageMenu &&
  pagePrevButton &&
  pageNextButton
) {

  pageMenu.insertBefore(
    pageViewport,
    pageNextButton
  );

}


pageViewport.appendChild(
  pageTrack
);


/* =========================
   GET PAGE OFFSET
========================= */

function getPageOffset(
  startIndex
) {

  let offset = 0;


  for (
    let index = 0;
    index < startIndex;
    index++
  ) {

    const button =
      pageItems[index]?.button;


    if (!button) {

      continue;

    }


    offset +=
      button.offsetWidth;


    offset +=
      6;

  }


  return offset;

}


/* =========================
   SET TRACK POSITION
========================= */

function setPageTrackPosition(
  animate = true
) {

  if (
    !pageTrack
  ) {

    return;

  }


  const offset =
    getPageOffset(
      pageWindowStart
    );


  pageTrack.style.transition =
    animate
      ? "transform 0.45s ease"
      : "none";


  pageTrack.style.transform =
    `translate3d(-${offset}px, 0, 0)`;


  if (
    !animate
  ) {

    requestAnimationFrame(
      function () {

        pageTrack.style.transition =
          "transform 0.45s ease";

      }
    );

  }

}


/* =========================
   UPDATE PAGE WINDOW
========================= */

function updatePageWindow(
  newStart
) {

  const maxStart =
    Math.max(
      0,
      pageItems.length -
      pageWindowSize
    );


  if (
    newStart < 0
  ) {

    newStart = 0;

  }


  if (
    newStart > maxStart
  ) {

    newStart = maxStart;

  }


  pageWindowStart =
    newStart;


  setPageTrackPosition(
    true
  );

}


/* =========================
   INITIAL PAGE WINDOW
========================= */

function renderPageWindow() {

  pageItems.forEach(
    function (item) {

      if (
        item.button
      ) {

        item.button.style.display =
          "flex";

      }

    }
  );


  setPageTrackPosition(
    false
  );

}


/* =========================
   SHOW PAGE
========================= */

function showPage(
  page
) {

  pageItems.forEach(
    function (item) {

      if (
        item.page
      ) {

        item.page.style.display =
          "none";

      }


      if (
        item.button
      ) {

        item.button.classList.remove(
          "active"
        );

      }

    }
  );


  const activeItem =
    pageItems.find(
      function (item) {

        return item.page ===
          page;

      }
    );


  if (
    !activeItem
  ) {

    console.error(
      "Page not found:",
      page
    );

    return;

  }


  activeItem.page.style.display =
    "block";


  activeItem.button.classList.add(
    "active"
  );

}


/* =========================
   DEFAULT PAGE
========================= */

showPage(
  homePage
);


/* =========================
   INITIAL RENDER
========================= */

requestAnimationFrame(
  function () {

    renderPageWindow();

  }
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
   NEXT PAGE WINDOW
========================= */

pageNextButton.addEventListener(
  "click",
  function () {

    if (
      pageWindowAnimating
    ) {

      return;

    }


    const maxStart =
      Math.max(
        0,
        pageItems.length -
        pageWindowSize
      );


    if (
      pageWindowStart >=
      maxStart
    ) {

      return;

    }


    pageWindowAnimating =
      true;


    updatePageWindow(
      pageWindowStart + 1
    );


    window.setTimeout(
      function () {

        pageWindowAnimating =
          false;

      },
      pageWindowAnimationDuration
    );

  }
);


/* =========================
   PREVIOUS PAGE WINDOW
========================= */

pagePrevButton.addEventListener(
  "click",
  function () {

    if (
      pageWindowAnimating
    ) {

      return;

    }


    if (
      pageWindowStart <=
      0
    ) {

      return;

    }


    pageWindowAnimating =
      true;


    updatePageWindow(
      pageWindowStart - 1
    );


    window.setTimeout(
      function () {

        pageWindowAnimating =
          false;

      },
      pageWindowAnimationDuration
    );

  }
);


/* =========================
   HOME
========================= */

homeButton.addEventListener(
  "click",
  function () {

    showPage(
      homePage
    );

  }
);


/* =========================
   SHOP
========================= */

shopButton.addEventListener(
  "click",
  function () {

    showPage(
      shopPage
    );

  }
);


/* =========================
   AUCTION
========================= */

auctionButton.addEventListener(
  "click",
  function () {

    showPage(
      auctionPage
    );

  }
);


/* =========================
   TEST 1
========================= */

test1Button.addEventListener(
  "click",
  function () {

    showPage(
      test1Page
    );

  }
);


/* =========================
   TEST 2
========================= */

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


/* =========================
   WINDOW RESIZE
========================= */

window.addEventListener(
  "resize",
  function () {

    setPageTrackPosition(
      false
    );

  }
);
