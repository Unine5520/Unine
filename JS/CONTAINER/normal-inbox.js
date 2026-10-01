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
   PAGE SCROLL LOCK
========================= */


function lockInboxPageScroll(){


document.documentElement.style.overflow =
"hidden";


document.body.style.overflow =
"hidden";


}



function unlockInboxPageScroll(){


document.documentElement.style.overflow =
"";


document.body.style.overflow =
"";


}



/* =========================
   OPEN
========================= */


function openInboxModal(){



inboxModal.classList.remove(
"modal-closing"
);



inboxModal.classList.add(
"modal-open"
);



lockInboxPageScroll();


}



/* =========================
   CLOSE
========================= */


function closeInboxModal(){



if(
!inboxModal.classList.contains(
"modal-open"
)

){

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
function handleClose(event){



if(
event.propertyName !==
"transform"
){

return;

}



inboxModal.classList.remove(
"modal-closing"
);



unlockInboxPageScroll();



inboxModalContent.removeEventListener(
"transitionend",
handleClose
);



}

);



}



/* =========================
   BUTTON
========================= */


inboxButton.addEventListener(
"click",
()=>{


openInboxModal();


}

);



/* =========================
   CLOSE BUTTON
========================= */


inboxModalClose.addEventListener(
"click",
()=>{


closeInboxModal();


}

);



/* =========================
   BACKGROUND CLOSE
========================= */


inboxModal.addEventListener(
"click",
(e)=>{


if(
e.target === inboxModal
){

closeInboxModal();

}


}

);
