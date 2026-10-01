/* =========================
   INBOX NORMAL MODAL
========================= */


/* =========================
   ELEMENTS
========================= */

const inboxButton =
  document.getElementById(
    "U9-page-container-tool-inbox"
  );


const inboxModal =
  document.getElementById(
    "U9-inbox-normal-modal"
  );


const inboxModalContent =
  document.getElementById(
    "U9-inbox-normal-modal-content"
  );


const inboxModalClose =
  document.getElementById(
    "U9-inbox-normal-modal-close"
  );


/* =========================
   SCROLL LOCK
========================= */

function lockInboxScroll() {

  document.documentElement.style.overflow =
    "hidden";

  document.body.style.overflow =
    "hidden";

}


function unlockInboxScroll() {

  document.documentElement.style.overflow =
    "";

  document.body.style.overflow =
    "";

}


/* =========================
   OPEN
========================= */

function openInboxModal() {


  inboxModal.classList.remove(
    "modal-closing"
  );


  inboxModal.classList.add(
    "modal-open"
  );


  lockInboxScroll();


}


/* =========================
   CLOSE
========================= */

function closeInboxModal() {


  if (
    !inboxModal.classList.contains(
      "modal-open"
    )
  ) {

    return;

  }


  inboxModal.classList.remove(
    "modal-open"
  );


  inboxModal.classList.add(
    "modal-closing"
  );


  inboxModalContent.addEventListener(
    "transitionend",
    function handleInboxClose(event) {


      if (
        event.propertyName !==
        "transform"
      ) {

        return;

      }


      inboxModal.classList.remove(
        "modal-closing"
      );


      unlockInboxScroll();


      inboxModalContent.removeEventListener(
        "transitionend",
        handleInboxClose
      );


    }
  );


}


/* =========================
   BUTTON OPEN
========================= */

inboxButton.addEventListener(
  "click",
  function () {

    openInboxModal();

  }
);


/* =========================
   CLOSE BUTTON
========================= */

inboxModalClose.addEventListener(
  "click",
  function () {

    closeInboxModal();

  }
);
