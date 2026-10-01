 /* =========================
    MESSAGE NORMAL MODAL
 ========================= */

 const messageButton =
   document.getElementById(
     "U9-page-container-tool-message"
   );


 const messageModal =
   document.getElementById(
     "U9-message-normal-modal"
   );


 const messageModalClose =
   document.getElementById(
     "U9-message-normal-modal-close"
   );


 const messageModalContent =
   document.getElementById(
     "U9-message-normal-modal-content"
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

   messageButton.classList.remove(
     "message-bounce"
   );


   void messageButton.offsetWidth;


   messageButton.classList.add(
     "message-bounce"
   );


   messageModal.classList.remove(
     "modal-closing"
   );


   messageModal.classList.add(
     "modal-open"
   );


   lockMessagePageScroll();

 }


 /* =========================
    CLOSE MESSAGE MODAL
 ========================= */

 function closeMessageModal() {

   if (
     !messageModal.classList.contains(
       "modal-open"
     )
   ) {

     return;

   }


   messageModal.classList.remove(
     "modal-open"
   );


   messageModal.classList.add(
     "modal-closing"
   );


   messageModalContent.addEventListener(
     "transitionend",
     function handleCloseAnimation(event) {

       if (
         event.propertyName !==
         "transform"
       ) {

         return;

       }


       messageModal.classList.remove(
         "modal-closing"
       );


       unlockMessagePageScroll();


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
