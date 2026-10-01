/* =========================
   GIFT NORMAL MODAL
========================= */


/* =========================
   ELEMENTS
========================= */

const giftButton =
  document.getElementById(
    "U9-page-container-tool-gift"
  );


const giftModal =
  document.getElementById(
    "U9-gift-normal-modal"
  );


const giftModalContent =
  document.getElementById(
    "U9-gift-normal-modal-content"
  );


const giftModalClose =
  document.getElementById(
    "U9-gift-normal-modal-close"
  );


/* =========================
   SCROLL LOCK
========================= */

function lockGiftScroll() {


  document.documentElement.style.overflow =
    "hidden";


  document.body.style.overflow =
    "hidden";


}



function unlockGiftScroll() {


  document.documentElement.style.overflow =
    "";


  document.body.style.overflow =
    "";


}


/* =========================
   OPEN
========================= */

function openGiftModal() {


  giftModal.classList.remove(
    "modal-closing"
  );


  giftModal.classList.add(
    "modal-open"
  );


  lockGiftScroll();


}



/* =========================
   CLOSE
========================= */

function closeGiftModal() {


  if (
    !giftModal.classList.contains(
      "modal-open"
    )
  ) {

    return;

  }



  giftModal.classList.remove(
    "modal-open"
  );



  giftModal.classList.add(
    "modal-closing"
  );



  giftModalContent.addEventListener(
    "transitionend",
    function handleGiftClose(event) {



      if (
        event.propertyName !==
        "transform"
      ) {

        return;

      }



      giftModal.classList.remove(
        "modal-closing"
      );



      unlockGiftScroll();



      giftModalContent.removeEventListener(
        "transitionend",
        handleGiftClose
      );


    }
  );


}



/* =========================
   OPEN BUTTON
========================= */

giftButton.addEventListener(
  "click",
  function () {


    openGiftModal();


  }
);



/* =========================
   CLOSE BUTTON
========================= */

giftModalClose.addEventListener(
  "click",
  function () {


    closeGiftModal();


  }
);
