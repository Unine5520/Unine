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

    content:
      document.getElementById(
        "U9-message-normal-modal-content"
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

    content:
      document.getElementById(
        "U9-inbox-normal-modal-content"
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

    content:
      document.getElementById(
        "U9-gift-normal-modal-content"
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

    content:
      document.getElementById(
        "U9-history-normal-modal-content"
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
   NORMAL MODAL STATE
========================= */

let normalModalActionRunning =
  false;


let allowNormalModalClick =
  false;


/* =========================
   GET ACTIVE NORMAL MODAL
========================= */

function getActiveNormalModal() {

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
   WAIT FOR MODAL CLOSE
========================= */

function waitForNormalModalClose(
  item,
  callback
) {

  if (
    !item ||
    !item.content
  ) {

    callback();

    return;

  }


  let finished =
    false;


  function finish() {

    if (finished) {

      return;

    }


    finished = true;


    item.content.removeEventListener(
      "transitionend",
      handleTransitionEnd
    );


    callback();

  }


  function handleTransitionEnd(
    event
  ) {

    if (
      event.propertyName !==
      "transform"
    ) {

      return;

    }


    finish();

  }


  item.content.addEventListener(
    "transitionend",
    handleTransitionEnd
  );


  /*
     SAFETY FALLBACK

     In case transitionend is
     not fired by the browser.
  */

  setTimeout(
    function () {

      finish();

    },
    500
  );

}


/* =========================
   CLOSE ACTIVE MODAL
========================= */

function closeActiveNormalModal(
  callback
) {

  const activeModal =
    getActiveNormalModal();


  if (
    !activeModal
  ) {

    callback();

    return;

  }


  /*
     ALREADY CLOSING

     Wait for the existing
     closing animation.
  */

  if (
    activeModal.modal.classList.contains(
      "modal-closing"
    )
  ) {

    waitForNormalModalClose(
      activeModal,
      callback
    );

    return;

  }


  /*
     CLOSE USING THE MODAL'S
     OWN CLOSE BUTTON

     This keeps each normal
     modal's own JS responsible
     for its close animation
     and scroll unlock.
  */

  if (
    activeModal.close
  ) {

    activeModal.close.click();

  }


  waitForNormalModalClose(
    activeModal,
    callback
  );

}


/* =========================
   OPEN NORMAL MODAL
========================= */

function openNormalModal(
  target
) {

  if (
    !target ||
    !target.button
  ) {

    return;

  }


  /*
     Allow the normal modal's
     own JS to receive this click.
  */

  allowNormalModalClick =
    true;


  target.button.click();


  /*
     Reset after the click
     finishes propagating.
  */

  setTimeout(
    function () {

      allowNormalModalClick =
        false;

    },
    0
  );

}


/* =========================
   SWITCH NORMAL MODAL
========================= */

function switchNormalModal(
  target
) {

  if (
    normalModalActionRunning
  ) {

    return;

  }


  normalModalActionRunning =
    true;


  closeActiveNormalModal(
    function () {

      openNormalModal(
        target
      );


      normalModalActionRunning =
        false;

    }
  );

}


/* =========================
   NORMAL MODAL BUTTONS
========================= */

normalModals.forEach(
  function (item) {

    if (
      !item.button
    ) {

      return;

    }


    item.button.addEventListener(
      "click",
      function (event) {


        /*
           This click was generated
           internally after the previous
           modal finished closing.
        */

        if (
          allowNormalModalClick
        ) {

          return;

        }


        const activeModal =
          getActiveNormalModal();


        /*
           No modal is open.

           Let the modal's own JS
           handle the click normally.
        */

        if (
          !activeModal
        ) {

          return;

        }


        /*
           The current modal is already
           the requested modal.

           Do nothing.
        */

        if (
          activeModal.button ===
          item.button
        ) {

          event.preventDefault();

          event.stopImmediatePropagation();

          return;

        }


        /*
           Another modal is open.

           Close current modal first,
           then open the clicked modal.
        */

        event.preventDefault();

        event.stopImmediatePropagation();


        switchNormalModal(
          item
        );

      },
      true
    );

  }
);


/* =========================
   MENU
========================= */

menuButton.addEventListener(
  "click",
  function (event) {


    /*
       If a normal modal is open,
       close it first.

       Then open the menu.
    */

    const activeModal =
      getActiveNormalModal();


    if (
      activeModal &&
      !normalModalActionRunning
    ) {

      event.preventDefault();

      event.stopImmediatePropagation();


      normalModalActionRunning =
        true;


      closeActiveNormalModal(
        function () {


          /*
             Automatically open
             the Container Tool menu.

             Home / Shop and the
             other page buttons will
             be available normally.
          */

          tool.classList.add(
            "menu-open"
          );


          /*
             MENU ANIMATION
          */

          menuButton.classList.remove(
            "menu-heartbeat"
          );


          void menuButton.offsetWidth;


          menuButton.classList.add(
            "menu-heartbeat"
          );


          normalModalActionRunning =
            false;

        }
      );


      return;

    }


    /*
       Normal menu behavior
       when no modal is open.
    */

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

  },
  true
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
