/* =========================
   MESSAGE NORMAL MODAL
========================= */


/* =========================
   ELEMENTS
========================= */

const messageButton =
  document.getElementById(
    "U9-page-container-tool-message"
  );


const messageModal =
  document.getElementById(
    "U9-message-normal-modal"
  );


const messageModalContent =
  document.getElementById(
    "U9-message-normal-modal-content"
  );


const messageModalClose =
  document.getElementById(
    "U9-message-normal-modal-close"
  );


/* =========================
   PAGE SCROLL LOCK
========================= */

function lockMessagePageScroll() {

  document.documentElement.style.overflow =
    "hidden";

  document.body.style.overflow =
    "hidden";

}


function unlockMessagePageScroll() {

  document.documentElement.style.overflow =
    "";

  document.body.style.overflow =
    "";

}


/* =========================
   OPEN MESSAGE MODAL
========================= */

function openMessageModal() {


  /* MESSAGE BUTTON ANIMATION */

  messageButton.classList.remove(
    "message-bounce"
  );

  void messageButton.offsetWidth;

  messageButton.classList.add(
    "message-bounce"
  );


  /* REMOVE CLOSING */

  messageModal.classList.remove(
    "modal-closing"
  );


  /* OPEN */

  messageModal.classList.add(
    "modal-open"
  );


  /* LOCK PAGE SCROLL */

  lockMessagePageScroll();

}


/* =========================
   CLOSE MESSAGE MODAL
========================= */

function closeMessageModal() {


  /* ALREADY CLOSED */

  if (
    !messageModal.classList.contains(
      "modal-open"
    )
  ) {

    return;

  }


  /* REMOVE OPEN */

  messageModal.classList.remove(
    "modal-open"
  );


  /* START CLOSING */

  messageModal.classList.add(
    "modal-closing"
  );


  /* WAIT FOR ANIMATION */

  messageModalContent.addEventListener(
    "transitionend",
    function handleCloseAnimation(event) {


      /* ONLY TRANSFORM */

      if (
        event.propertyName !==
        "transform"
      ) {

        return;

      }


      /* REMOVE CLOSING */

      messageModal.classList.remove(
        "modal-closing"
      );


      /* UNLOCK PAGE SCROLL */

      unlockMessagePageScroll();


      /* REMOVE EVENT */

      messageModalContent.removeEventListener(
        "transitionend",
        handleCloseAnimation
      );

    }
  );

}


/* =========================
   MESSAGE BUTTON
========================= */

messageButton.addEventListener(
  "click",
  function () {

    openMessageModal();

  }
);


/* =========================
   CLOSE BUTTON
========================= */

messageModalClose.addEventListener(
  "click",
  function () {

    closeMessageModal();

  }
);
