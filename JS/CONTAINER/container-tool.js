
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

let pageWindowStart = 0;

const pageWindowSize = 3;


/* =========================
   PAGE ANIMATION
========================= */

let pageWindowAnimating = false;

const pageAnimationDuration = 280;


/* =========================
   RENDER PAGE WINDOW
========================= */

function renderPageWindow() {

  pageItems.forEach(
    function (item, index) {

      const visible =
        index >= pageWindowStart &&
        index <
          pageWindowStart +
          pageWindowSize;


      item.button.style.display =
        visible
          ? "flex"
          : "none";


      item.button.style.transform =
        "translateX(0)";

      item.button.style.opacity =
        "1";

    }
  );

}


/* =========================
   GET VISIBLE BUTTONS
========================= */

function getVisibleButtons() {

  return pageButtons.filter(
    function (button, index) {

      return (
        index >= pageWindowStart &&
        index <
          pageWindowStart +
          pageWindowSize
      );

    }
  );

}


/* =========================
   SLIDE PAGE WINDOW
========================= */

function slidePageWindow(
  direction
) {

  if (
    pageWindowAnimating
  ) {

    return;

  }


  const maxStart =
    pageItems.length -
    pageWindowSize;


  if (
    direction === "left" &&
    pageWindowStart >= maxStart
  ) {

    return;

  }


  if (
    direction === "right" &&
    pageWindowStart <= 0
  ) {

    return;

  }


  pageWindowAnimating =
    true;


  const oldStart =
    pageWindowStart;


  const newStart =
    direction === "left"
      ? oldStart + 1
      : oldStart - 1;


  const oldButtons =
    pageButtons.slice(
      oldStart,
      oldStart +
        pageWindowSize
    );


  const newButtons =
    pageButtons.slice(
      newStart,
      newStart +
        pageWindowSize
    );


  /* =========================
     PREPARE NEW BUTTONS
  ========================= */

  newButtons.forEach(
    function (button) {

      button.style.display =
        "flex";

      button.style.opacity =
        "0";

      button.style.transform =
        direction === "left"
          ? "translateX(35px)"
          : "translateX(-35px)";

    }
  );


  /* =========================
     OLD BUTTONS
  ========================= */

  const oldAnimations =
    oldButtons.map(
      function (button) {

        return button.animate(
          [
            {
              transform:
                "translateX(0)",
              opacity: 1
            },

            {
              transform:
                direction === "left"
                  ? "translateX(-35px)"
                  : "translateX(35px)",
              opacity: 0
            }

          ],
          {
            duration:
              pageAnimationDuration,

            easing:
              "ease",

            fill:
              "forwards"
          }
        );

      }
    );


  /* =========================
     NEW BUTTONS
  ========================= */

  const newAnimations =
    newButtons.map(
      function (button) {

        return button.animate(
          [
            {
              transform:
                direction === "left"
                  ? "translateX(35px)"
                  : "translateX(-35px)",

              opacity: 0
            },

            {
              transform:
                "translateX(0)",

              opacity: 1
            }

          ],
          {
            duration:
              pageAnimationDuration,

            easing:
              "ease",

            fill:
              "forwards",

            delay: 0
          }
        );

      }
    );


  /* =========================
     WAIT ANIMATION
  ========================= */

  Promise.all(
    [
      ...oldAnimations.map(
        function (animation) {
          return animation.finished;
        }
      ),

      ...newAnimations.map(
        function (animation) {
          return animation.finished;
        }
      )
    ]
  )
    .then(
      function () {

        pageWindowStart =
          newStart;


        /* =========================
           FINAL STATE
        ========================= */

        pageItems.forEach(
          function (item, index) {

            const visible =
              index >= pageWindowStart &&
              index <
                pageWindowStart +
                pageWindowSize;


            item.button.style.display =
              visible
                ? "flex"
                : "none";


            item.button.style.transform =
              "translateX(0)";

            item.button.style.opacity =
              "1";

          }
        );


        pageWindowAnimating =
          false;

      }
    )
    .catch(
      function (error) {

        console.error(
          "Page window animation failed:",
          error
        );


        pageWindowStart =
          newStart;


        renderPageWindow();


        pageWindowAnimating =
          false;

      }
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

renderPageWindow();


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

    slidePageWindow(
      "left"
    );

  }
);


/* =========================
   PREVIOUS PAGE WINDOW
========================= */

pagePrevButton.addEventListener(
  "click",
  function () {

    slidePageWindow(
      "right"
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
