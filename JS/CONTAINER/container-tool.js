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
   NORMAL MODAL BUTTONS
========================= */

const messageNormalButton =
  document.getElementById(
    "U9-page-container-tool-message"
  );


const inboxNormalButton =
  document.getElementById(
    "U9-page-container-tool-inbox"
  );


const giftNormalButton =
  document.getElementById(
    "U9-page-container-tool-gift"
  );


const historyNormalButton =
  document.getElementById(
    "U9-page-container-tool-history"
  );


/* =========================
   LOGIN BUTTON
========================= */

const headerLoginButton =
  document.getElementById(
    "U9-page-header-login"
  );


/* =========================
   CHECK LOGIN
========================= */

async function checkNormalModalLogin() {

  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  /* =========================
     NO SESSION
  ========================= */

  if (!sessionToken) {

    return false;

  }


  try {

    /* =========================
       REQUEST
    ========================= */

    const response =
      await fetch(
        "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/me",
        {

          method:
            "GET",

          headers: {

            "Authorization":
              `Bearer ${sessionToken}`

          }

        }
      );


    /* =========================
       RESPONSE
    ========================= */

    if (!response.ok) {

      return false;

    }


    const result =
      await response.json();


    /* =========================
       AUTHENTICATED
    ========================= */

    if (
      result &&
      result.authenticated ===
        true
    ) {

      return true;

    }


    return false;

  }

  catch (error) {

    console.error(
      "Check normal modal login error:",
      error
    );


    return false;

  }

}


/* =========================
   OPEN LOGIN
========================= */

function openNormalModalLogin() {

  if (!headerLoginButton) {

    return;

  }


  headerLoginButton.click();

}


/* =========================
   NORMAL MODAL ACCESS
========================= */

async function handleNormalModalAccess(
  event,
  openModal
) {


  /* =========================
     STOP NORMAL MODAL JS
  ========================= */

  event.preventDefault();

  event.stopImmediatePropagation();


  /* =========================
     CLOSE CONTAINER MENU
  ========================= */

  tool.classList.remove(
    "menu-open"
  );


  /* =========================
     CHECK LOGIN
  ========================= */

  const authenticated =
    await checkNormalModalLogin();


  /* =========================
     NOT LOGGED IN
  ========================= */

  if (!authenticated) {

    openNormalModalLogin();

    return;

  }


  /* =========================
     OPEN NORMAL MODAL
  ========================= */

  openModal();

}


/* =========================
   MESSAGE
========================= */

messageNormalButton.addEventListener(
  "click",
  function (event) {

    handleNormalModalAccess(
      event,
      openMessageModal
    );

  },
  true
);


/* =========================
   INBOX
========================= */

inboxNormalButton.addEventListener(
  "click",
  function (event) {

    handleNormalModalAccess(
      event,
      openInboxModal
    );

  },
  true
);


/* =========================
   GIFT
========================= */

giftNormalButton.addEventListener(
  "click",
  function (event) {

    handleNormalModalAccess(
      event,
      openGiftModal
    );

  },
  true
);


/* =========================
   HISTORY
========================= */

historyNormalButton.addEventListener(
  "click",
  function (event) {

    handleNormalModalAccess(
      event,
      openHistoryModal
    );

  },
  true
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
