
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
    button: homeButton,
    name: "Home"
  },

  {
    page: shopPage,
    button: shopButton,
    name: "Shop"
  },

  {
    page: auctionPage,
    button: auctionButton,
    name: "Auction"
  },

  {
    page: test1Page,
    button: test1Button,
    name: "Test1"
  },

  {
    page: test2Page,
    button: test2Button,
    name: "Test2"
  }

];


/* =========================
   PAGE BUTTON LIST
========================= */

const pageButtons = [

  homeButton,

  shopButton,

  auctionButton,

  test1Button,

  test2Button

];


/* =========================
   PAGE WINDOW
========================= */

let pageWindowStart =
  0;


const pageWindowSize =
  3;


/* =========================
   PAGE MENU / TRACK
========================= */

const pageMenu =
  document.getElementById(
    "U9-page-container-tool-pages"
  );


const pageViewport =
  document.createElement(
    "div"
  );


pageViewport.id =
  "U9-page-container-tool-page-viewport";


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

pageButtons.forEach(
  function (button) {

    pageTrack.appendChild(
      button
    );

  }
);


/* =========================
   INSERT VIEWPORT
========================= */

if (
  pageMenu &&
  pageNextButton
) {

  pageMenu.insertBefore(
    pageViewport,
    pageNextButton
  );

}


/* =========================
   INSERT TRACK
   INTO VIEWPORT
========================= */

pageViewport.appendChild(
  pageTrack
);


/* =========================
   PAGE WINDOW ANIMATION
========================= */

const pageWindowAnimationDuration =
  450;


let pageWindowAnimating =
  false;


/* =========================
   GET PAGE OFFSET
========================= */

function getPageOffset(
  startIndex
) {

  let offset =
    0;


  for (
    let index = 0;
    index < startIndex;
    index++
  ) {

    const button =
      pageButtons[index];


    if (!button) {

      continue;

    }


    offset +=
      button.offsetWidth;


    if (
      index <
      startIndex
    ) {

      offset += 6;

    }

  }


  return offset;

}


/* =========================
   SET PAGE TRACK POSITION
========================= */

function setPageTrackPosition(
  animate = true
) {

  const offset =
    getPageOffset(
      pageWindowStart
    );


  if (!animate) {

    pageTrack.style.transition =
      "none";

  }

  else {

    pageTrack.style.transition =
      "transform 0.45s ease";

  }


  pageTrack.style.transform =
    `translateX(-${offset}px)`;


  if (!animate) {

    requestAnimationFrame(
      function () {

        requestAnimationFrame(
          function () {

            pageTrack.style.transition =
              "transform 0.45s ease";

          }
        );

      }
    );

  }

}


/* =========================
   RENDER PAGE WINDOW
========================= */

function renderPageWindow() {

  setPageTrackPosition(
    true
  );

}


/* =========================
   UPDATE PAGE WINDOW
========================= */

function updatePageWindow(
  newStart
) {

  const maxStart =
    pageItems.length -
    pageWindowSize;


  if (
    newStart < 0
  ) {

    newStart =
      0;

  }


  if (
    newStart > maxStart
  ) {

    newStart =
      maxStart;

  }


  pageWindowStart =
    newStart;


  setPageTrackPosition(
    true
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

      item.page.style.display =
        "none";


      item.button.classList.remove(
        "active"
      );

    }
  );


  const activeItem =
    pageItems.find(
      function (item) {

        return item.page ===
          page;

      }
    );


  if (!activeItem) {

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
   INITIAL PAGE WINDOW
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
      pageItems.length -
      pageWindowSize;


    if (
      pageWindowStart >=
      maxStart
    ) {

      return;

    }


    pageWindowAnimating =
      true;


    pageWindowStart++;


    setPageTrackPosition(
      true
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


    pageWindowStart--;


    setPageTrackPosition(
      true
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
