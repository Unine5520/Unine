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
   NORMAL MODALS
========================= */

const normalModals = [

  {
    modal:
      document.getElementById(
        "U9-message-normal-modal"
      ),

    close:
      document.getElementById(
        "U9-message-normal-modal-close"
      ),

    button:
      document.getElementById(
        "U9-page-container-tool-message"
      )
  },

  {
    modal:
      document.getElementById(
        "U9-inbox-normal-modal"
      ),

    close:
      document.getElementById(
        "U9-inbox-normal-modal-close"
      ),

    button:
      document.getElementById(
        "U9-page-container-tool-inbox"
      )
  },

  {
    modal:
      document.getElementById(
        "U9-gift-normal-modal"
      ),

    close:
      document.getElementById(
        "U9-gift-normal-modal-close"
      ),

    button:
      document.getElementById(
        "U9-page-container-tool-gift"
      )
  },

  {
    modal:
      document.getElementById(
        "U9-history-normal-modal"
      ),

    close:
      document.getElementById(
        "U9-history-normal-modal-close"
      ),

    button:
      document.getElementById(
        "U9-page-container-tool-history"
      )
  }

];


/* =========================
   NORMAL MODAL CHECK
========================= */

function getOpenNormalModal() {

  return normalModals.find(
    function (item) {

      return (
        item.modal &&
        (
          item.modal.classList.contains(
            "modal-open"
          ) ||

          item.modal.classList.contains(
            "modal-closing"
          )
        )
      );

    }
  );

}


/* =========================
   CLOSE NORMAL MODAL
========================= */

function closeOpenNormalModal() {

  const activeModal =
    getOpenNormalModal();


  if (
    !activeModal
  ) {

    return false;

  }


  if (
    activeModal.modal.classList.contains(
      "modal-open"
    ) &&
    activeModal.close
  ) {

    activeModal.close.click();

  }


  return true;

}


/* =========================
   NORMAL MODAL BUTTON LOCK
========================= */

normalModals.forEach(
  function (item) {

    if (!item.button) {

      return;

    }


    item.button.addEventListener(
      "click",
      function (event) {

        const activeModal =
          getOpenNormalModal();


        if (
          activeModal &&
          activeModal.button !==
          item.button
        ) {

          event.preventDefault();

          event.stopImmediatePropagation();

        }

      },
      true
    );

  }
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
   PAGE WINDOW
========================= */

let pageWindowStart = 0;

const pageWindowSize = 3;


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


    /* CLOSE NORMAL MODAL */

    const normalModalWasOpen =
      closeOpenNormalModal();


    if (
      normalModalWasOpen
    ) {

      return;

    }


    /* TOGGLE MENU */

    tool.classList.toggle(
      "menu-open"
    );


    /* MENU ANIMATION */

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
      pageWindowStart <
      pageItems.length -
      pageWindowSize
    ) {

      pageWindowStart++;

      renderPageWindow();

    }

  }
);


/* =========================
   PREVIOUS PAGE WINDOW
========================= */

pagePrevButton.addEventListener(
  "click",
  function () {

    if (
      pageWindowStart >
      0
    ) {

      pageWindowStart--;

      renderPageWindow();

    }

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
