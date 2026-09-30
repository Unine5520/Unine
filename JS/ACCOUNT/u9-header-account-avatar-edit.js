
/* =========================
   U9 ACCOUNT AVATAR EDIT
========================= */


/* =========================
   MAIN
========================= */

const u9AvatarEditContainer =
  document.getElementById(
    "Account-U9-account-avatar-edit"
  );


/* =========================
   CONFIG
========================= */

const u9AvatarDefaultImage =
  "SSVG/avatar/profile.svg";


const u9AvatarOutputSize =
  300;


const u9AvatarMoveStep =
  5;


/* =========================
   API
========================= */

const u9AvatarFreeFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-free";


const u9AvatarSetFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-set";


const u9AvatarMeFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/me";


const u9AvatarUploadFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-upload";


/* =========================
   STATE
========================= */

let u9AvatarSelectedImage =
  null;

let u9AvatarObjectUrl =
  null;

let u9AvatarImageLoaded =
  false;

let u9AvatarOffsetX =
  0;

let u9AvatarOffsetY =
  0;

let u9AvatarBaseScale =
  1;

let u9AvatarZoom =
  1;


/* =========================
   CURRENT AVATAR
========================= */

let u9AvatarCurrentType =
  "default";

let u9AvatarCurrentId =
  null;

let u9AvatarCustomUrl =
  null;


/* =========================
   COOLDOWN
========================= */

let u9AvatarCooldownUntil =
  null;

let u9AvatarCooldownTimer =
  null;


/* =========================
   FREE AVATARS
========================= */

let u9AvatarFreeAvatars =
  [];


/* =========================
   ELEMENTS
========================= */

let u9AvatarPreview = null;

let u9AvatarImage = null;

let u9AvatarCropGuide = null;

let u9AvatarFileInput = null;

let u9AvatarChooseButton = null;

let u9AvatarZoomWrapper = null;

let u9AvatarZoomLabel = null;

let u9AvatarZoomInput = null;

let u9AvatarZoomValue = null;

let u9AvatarSaveButton = null;

let u9AvatarStatus = null;

let u9AvatarMySection = null;

let u9AvatarMyList = null;

let u9AvatarFreeList = null;

let u9AvatarDragHint = null;

let u9AvatarMoveUpButton = null;

let u9AvatarMoveDownButton = null;

let u9AvatarMoveLeftButton = null;

let u9AvatarMoveRightButton = null;


/* =========================
   HELPERS
========================= */

function clamp(
  value,
  min,
  max
) {

  return Math.min(
    Math.max(
      value,
      min
    ),
    max
  );

}


/* =========================
   COOLDOWN CHECK
========================= */

function isAvatarCooldownActive() {

  if (
    !u9AvatarCooldownUntil
  ) {

    return false;

  }


  const cooldownTime =
    new Date(
      u9AvatarCooldownUntil
    ).getTime();


  if (
    Number.isNaN(
      cooldownTime
    )
  ) {

    return false;

  }


  return (
    cooldownTime >
    Date.now()
  );

}


/* =========================
   FORMAT COOLDOWN
========================= */

function formatAvatarCooldown(
  remainingMs
) {

  if (
    remainingMs <= 0
  ) {

    return "0m";

  }


  const totalMinutes =
    Math.ceil(
      remainingMs /
      60000
    );


  const days =
    Math.floor(
      totalMinutes /
      1440
    );


  const hours =
    Math.floor(
      (
        totalMinutes %
        1440
      ) / 60
    );


  const minutes =
    totalMinutes %
    60;


  if (
    days > 0
  ) {

    return `${days}d ${hours}h`;

  }


  if (
    hours > 0
  ) {

    return `${hours}h ${minutes}m`;

  }


  return `${minutes}m`;

}


/* =========================
   UPDATE MOVE BUTTONS
========================= */

function updateAvatarMoveButtons() {

  const disabled =
    !u9AvatarImageLoaded ||
    isAvatarCooldownActive() ||
    !u9AvatarSelectedImage;


  const buttons = [

    u9AvatarMoveUpButton,

    u9AvatarMoveDownButton,

    u9AvatarMoveLeftButton,

    u9AvatarMoveRightButton

  ];


  buttons.forEach(
    function (button) {

      if (
        button
      ) {

        button.disabled =
          disabled;

      }

    }
  );

}


/* =========================
   UPDATE UPLOAD VISIBILITY
========================= */

function updateAvatarUploadVisibility() {

  const cooldownActive =
    isAvatarCooldownActive();


  /* =========================
     PREVIEW
  ========================= */

  if (
    u9AvatarPreview
  ) {

    u9AvatarPreview.style.display =
      cooldownActive
        ? "none"
        : "";

  }


  /* =========================
     DRAG HINT
  ========================= */

  if (
    u9AvatarDragHint
  ) {

    u9AvatarDragHint.style.display =
      cooldownActive
        ? "none"
        : "";

  }


  /* =========================
     DIRECTION BUTTONS
  ========================= */

  const directionButtons = [

    u9AvatarMoveUpButton,

    u9AvatarMoveDownButton,

    u9AvatarMoveLeftButton,

    u9AvatarMoveRightButton

  ];


  directionButtons.forEach(
    function (button) {

      if (
        button
      ) {

        button.style.display =
          cooldownActive
            ? "none"
            : "";

      }

    }
  );


  /* =========================
     ZOOM
  ========================= */

  if (
    u9AvatarZoomWrapper
  ) {

    u9AvatarZoomWrapper.style.display =
      cooldownActive
        ? "none"
        : "";

  }


  if (
    u9AvatarZoomLabel
  ) {

    u9AvatarZoomLabel.style.display =
      cooldownActive
        ? "none"
        : "";

  }


  if (
    u9AvatarZoomInput
  ) {

    u9AvatarZoomInput.style.display =
      cooldownActive
        ? "none"
        : "";

  }


  if (
    u9AvatarZoomValue
  ) {

    u9AvatarZoomValue.style.display =
      cooldownActive
        ? "none"
        : "";

  }


  /* =========================
     CHOOSE
  ========================= */

  if (
    u9AvatarChooseButton
  ) {

    u9AvatarChooseButton.style.display =
      cooldownActive
        ? "none"
        : "";

  }


  /* =========================
     SAVE
  ========================= */

  if (
    u9AvatarSaveButton
  ) {

    u9AvatarSaveButton.style.display =
      cooldownActive
        ? "none"
        : "";


    if (
      cooldownActive
    ) {

      u9AvatarSaveButton.disabled =
        true;

    }

    else {

      u9AvatarSaveButton.disabled =
        !u9AvatarSelectedImage;

    }

  }


  /* =========================
     STATUS
  ========================= */

  if (
    u9AvatarStatus
  ) {

    if (
      cooldownActive
    ) {

      u9AvatarStatus.style.display =
        "";

    }

    else {

      if (
        u9AvatarStatus.dataset.cooldown ===
        "true"
      ) {

        u9AvatarStatus.style.display =
          "none";


        u9AvatarStatus.textContent =
          "";


        u9AvatarStatus.classList.remove(
          "error"
        );


        u9AvatarStatus.dataset.cooldown =
          "false";

      }

    }

  }


  updateAvatarMoveButtons();

}


/* =========================
   UPDATE COOLDOWN DISPLAY
========================= */

function updateAvatarCooldownDisplay() {

  if (
    !u9AvatarStatus
  ) {

    return;

  }


  if (
    !isAvatarCooldownActive()
  ) {

    stopAvatarCooldownTimer();


    u9AvatarCooldownUntil =
      null;


    u9AvatarStatus.textContent =
      "";


    u9AvatarStatus.classList.remove(
      "error"
    );


    u9AvatarStatus.dataset.cooldown =
      "false";


    u9AvatarStatus.style.display =
      "none";


    updateAvatarUploadVisibility();


    return;

  }


  const cooldownTime =
    new Date(
      u9AvatarCooldownUntil
    ).getTime();


  const remainingMs =
    cooldownTime -
    Date.now();


  const remaining =
    formatAvatarCooldown(
      remainingMs
    );


  u9AvatarStatus.textContent =
    `Custom Avatar cooldown: ${remaining}`;


  u9AvatarStatus.classList.add(
    "error"
  );


  u9AvatarStatus.dataset.cooldown =
    "true";


  u9AvatarStatus.style.display =
    "";


  updateAvatarUploadVisibility();

}


/* =========================
   START COOLDOWN TIMER
========================= */

function startAvatarCooldownTimer() {

  stopAvatarCooldownTimer();


  updateAvatarCooldownDisplay();


  if (
    !isAvatarCooldownActive()
  ) {

    return;

  }


  u9AvatarCooldownTimer =
    setInterval(
      () => {

        updateAvatarCooldownDisplay();

      },
      1000
    );

}


/* =========================
   STOP COOLDOWN TIMER
========================= */

function stopAvatarCooldownTimer() {

  if (
    u9AvatarCooldownTimer
  ) {

    clearInterval(
      u9AvatarCooldownTimer
    );

    u9AvatarCooldownTimer =
      null;

  }

}


/* =========================
   CREATE EDITOR
========================= */

function createU9AvatarEditor() {

  if (
    !u9AvatarEditContainer
  ) {

    console.error(
      "Avatar edit container not found."
    );

    return;

  }


  /* =========================
     CLEAR
  ========================= */

  u9AvatarEditContainer.innerHTML =
    "";


  /* =========================
     WRAPPER
  ========================= */

  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.id =
    "Account-U9-avatar-editor";


  /* =========================
     TITLE
  ========================= */

  const title =
    document.createElement(
      "div"
    );

  title.id =
    "Account-U9-avatar-editor-title";

  title.textContent =
    "Avatar";


  /* =========================
     MY AVATAR SECTION
  ========================= */

  u9AvatarMySection =
    document.createElement(
      "div"
    );

  u9AvatarMySection.id =
    "Account-U9-avatar-editor-my-section";


  const myTitle =
    document.createElement(
      "div"
    );

  myTitle.id =
    "Account-U9-avatar-editor-my-title";

  myTitle.textContent =
    "My Avatar";


  u9AvatarMyList =
    document.createElement(
      "div"
    );

  u9AvatarMyList.id =
    "Account-U9-avatar-editor-my-list";


  u9AvatarMySection.appendChild(
    myTitle
  );


  u9AvatarMySection.appendChild(
    u9AvatarMyList
  );


  u9AvatarMySection.style.display =
    "none";


  /* =========================
     FREE AVATAR SECTION
  ========================= */

  const freeSection =
    document.createElement(
      "div"
    );

  freeSection.id =
    "Account-U9-avatar-editor-free-section";


  const freeTitle =
    document.createElement(
      "div"
    );

  freeTitle.id =
    "Account-U9-avatar-editor-free-title";

  freeTitle.textContent =
    "Free Avatar";


  u9AvatarFreeList =
    document.createElement(
      "div"
    );

  u9AvatarFreeList.id =
    "Account-U9-avatar-editor-free-list";


  freeSection.appendChild(
    freeTitle
  );


  freeSection.appendChild(
    u9AvatarFreeList
  );


  /* =========================
     PREVIEW AREA
  ========================= */

  const previewArea =
    document.createElement(
      "div"
    );

  previewArea.id =
    "Account-U9-avatar-editor-preview-area";


  /* =========================
     UP BUTTON
  ========================= */

  u9AvatarMoveUpButton =
    document.createElement(
      "button"
    );

  u9AvatarMoveUpButton.id =
    "Account-U9-avatar-editor-move-up";

  u9AvatarMoveUpButton.type =
    "button";

  u9AvatarMoveUpButton.setAttribute(
    "aria-label",
    "Move avatar up"
  );

  u9AvatarMoveUpButton.textContent =
    "↑";


  /* =========================
     MIDDLE ROW
  ========================= */

  const previewMiddle =
    document.createElement(
      "div"
    );

  previewMiddle.id =
    "Account-U9-avatar-editor-preview-middle";


  /* =========================
     LEFT BUTTON
  ========================= */

  u9AvatarMoveLeftButton =
    document.createElement(
      "button"
    );

  u9AvatarMoveLeftButton.id =
    "Account-U9-avatar-editor-move-left";

  u9AvatarMoveLeftButton.type =
    "button";

  u9AvatarMoveLeftButton.setAttribute(
    "aria-label",
    "Move avatar left"
  );

  u9AvatarMoveLeftButton.textContent =
    "←";


  /* =========================
     RIGHT BUTTON
  ========================= */

  u9AvatarMoveRightButton =
    document.createElement(
      "button"
    );

  u9AvatarMoveRightButton.id =
    "Account-U9-avatar-editor-move-right";

  u9AvatarMoveRightButton.type =
    "button";

  u9AvatarMoveRightButton.setAttribute(
    "aria-label",
    "Move avatar right"
  );

  u9AvatarMoveRightButton.textContent =
    "→";


  /* =========================
     PREVIEW
  ========================= */

  u9AvatarPreview =
    document.createElement(
      "div"
    );

  u9AvatarPreview.id =
    "Account-U9-avatar-editor-preview";


  /* =========================
     IMAGE
  ========================= */

  u9AvatarImage =
    document.createElement(
      "img"
    );

  u9AvatarImage.id =
    "Account-U9-avatar-editor-image";

  u9AvatarImage.src =
    u9AvatarDefaultImage;

  u9AvatarImage.alt =
    "Avatar Preview";

  u9AvatarImage.draggable =
    false;


  /* =========================
     CROP GUIDE
  ========================= */

  u9AvatarCropGuide =
    document.createElement(
      "div"
    );

  u9AvatarCropGuide.id =
    "Account-U9-avatar-editor-crop-guide";


  /* =========================
     PREVIEW APPEND
  ========================= */

  u9AvatarPreview.appendChild(
    u9AvatarImage
  );


  u9AvatarPreview.appendChild(
    u9AvatarCropGuide
  );


  /* =========================
     MIDDLE APPEND
  ========================= */

  previewMiddle.appendChild(
    u9AvatarMoveLeftButton
  );


  previewMiddle.appendChild(
    u9AvatarPreview
  );


  previewMiddle.appendChild(
    u9AvatarMoveRightButton
  );


  /* =========================
     DOWN BUTTON
  ========================= */

  u9AvatarMoveDownButton =
    document.createElement(
      "button"
    );

  u9AvatarMoveDownButton.id =
    "Account-U9-avatar-editor-move-down";

  u9AvatarMoveDownButton.type =
    "button";

  u9AvatarMoveDownButton.setAttribute(
    "aria-label",
    "Move avatar down"
  );

  u9AvatarMoveDownButton.textContent =
    "↓";


  /* =========================
     PREVIEW AREA APPEND
  ========================= */

  previewArea.appendChild(
    u9AvatarMoveUpButton
  );


  previewArea.appendChild(
    previewMiddle
  );


  previewArea.appendChild(
    u9AvatarMoveDownButton
  );


  /* =========================
     DRAG HINT
  ========================= */

  u9AvatarDragHint =
    document.createElement(
      "div"
    );

  u9AvatarDragHint.id =
    "Account-U9-avatar-editor-drag-hint";

  u9AvatarDragHint.textContent =
    "Use the arrows to move";


  /* =========================
     ZOOM WRAPPER
  ========================= */

  u9AvatarZoomWrapper =
    document.createElement(
      "div"
    );

  u9AvatarZoomWrapper.id =
    "Account-U9-avatar-editor-zoom";


  /* =========================
     ZOOM LABEL
  ========================= */

  u9AvatarZoomLabel =
    document.createElement(
      "div"
    );

  u9AvatarZoomLabel.id =
    "Account-U9-avatar-editor-zoom-label";

  u9AvatarZoomLabel.textContent =
    "Zoom";


  /* =========================
     ZOOM INPUT
  ========================= */

  u9AvatarZoomInput =
    document.createElement(
      "input"
    );

  u9AvatarZoomInput.id =
    "Account-U9-avatar-editor-zoom-input";

  u9AvatarZoomInput.type =
    "range";

  u9AvatarZoomInput.min =
    "1";

  u9AvatarZoomInput.max =
    "3";

  u9AvatarZoomInput.step =
    "0.01";

  u9AvatarZoomInput.value =
    "1";


  /* =========================
     ZOOM VALUE
  ========================= */

  u9AvatarZoomValue =
    document.createElement(
      "span"
    );

  u9AvatarZoomValue.id =
    "Account-U9-avatar-editor-zoom-value";

  u9AvatarZoomValue.textContent =
    "100%";


  /* =========================
     ZOOM APPEND
  ========================= */

  u9AvatarZoomWrapper.appendChild(
    u9AvatarZoomLabel
  );


  u9AvatarZoomWrapper.appendChild(
    u9AvatarZoomInput
  );


  u9AvatarZoomWrapper.appendChild(
    u9AvatarZoomValue
  );


  /* =========================
     CHOOSE AREA
  ========================= */

  const chooseArea =
    document.createElement(
      "div"
    );

  chooseArea.id =
    "Account-U9-avatar-editor-choose-area";


  u9AvatarChooseButton =
    document.createElement(
      "button"
    );

  u9AvatarChooseButton.id =
    "Account-U9-avatar-editor-choose";

  u9AvatarChooseButton.type =
    "button";

  u9AvatarChooseButton.textContent =
    "Choose Image";


  u9AvatarFileInput =
    document.createElement(
      "input"
    );

  u9AvatarFileInput.id =
    "Account-U9-avatar-editor-file";

  u9AvatarFileInput.type =
    "file";

  u9AvatarFileInput.accept =
    "image/*";

  u9AvatarFileInput.hidden =
    true;


  chooseArea.appendChild(
    u9AvatarChooseButton
  );


  chooseArea.appendChild(
    u9AvatarFileInput
  );


  /* =========================
     SAVE
  ========================= */

  u9AvatarSaveButton =
    document.createElement(
      "button"
    );

  u9AvatarSaveButton.id =
    "Account-U9-avatar-editor-save";

  u9AvatarSaveButton.type =
    "button";

  u9AvatarSaveButton.textContent =
    "Save";

  u9AvatarSaveButton.disabled =
    true;


  /* =========================
     STATUS
  ========================= */

  u9AvatarStatus =
    document.createElement(
      "div"
    );

  u9AvatarStatus.id =
    "Account-U9-avatar-editor-status";

  u9AvatarStatus.dataset.cooldown =
    "false";

  u9AvatarStatus.style.display =
    "none";


  /* =========================
     APPEND EDITOR
  ========================= */

  wrapper.appendChild(
    title
  );


  wrapper.appendChild(
    u9AvatarMySection
  );


  wrapper.appendChild(
    freeSection
  );


  wrapper.appendChild(
    previewArea
  );


  wrapper.appendChild(
    u9AvatarDragHint
  );


  wrapper.appendChild(
    u9AvatarZoomWrapper
  );


  wrapper.appendChild(
    chooseArea
  );


  wrapper.appendChild(
    u9AvatarSaveButton
  );


  wrapper.appendChild(
    u9AvatarStatus
  );


  u9AvatarEditContainer.appendChild(
    wrapper
  );


  /* =========================
     CHOOSE EVENT
  ========================= */

  u9AvatarChooseButton.addEventListener(
    "click",
    () => {

      if (
        isAvatarCooldownActive()
      ) {

        updateAvatarCooldownDisplay();

        return;

      }


      u9AvatarFileInput.click();

    }
  );


  /* =========================
     FILE EVENT
  ========================= */

  u9AvatarFileInput.addEventListener(
    "change",
    handleAvatarFileChange
  );


  /* =========================
     ZOOM EVENT
  ========================= */

  u9AvatarZoomInput.addEventListener(
    "input",
    handleAvatarZoom
  );


  /* =========================
     SAVE EVENT
  ========================= */

  u9AvatarSaveButton.addEventListener(
    "click",
    saveAvatarCrop
  );


  /* =========================
     MOVE EVENTS
  ========================= */

  u9AvatarMoveUpButton.addEventListener(
    "click",
    () => {

      moveAvatar(
        0,
        -u9AvatarMoveStep
      );

    }
  );


  u9AvatarMoveDownButton.addEventListener(
    "click",
    () => {

      moveAvatar(
        0,
        u9AvatarMoveStep
      );

    }
  );


  u9AvatarMoveLeftButton.addEventListener(
    "click",
    () => {

      moveAvatar(
        -u9AvatarMoveStep,
        0
      );

    }
  );


  u9AvatarMoveRightButton.addEventListener(
    "click",
    () => {

      moveAvatar(
        u9AvatarMoveStep,
        0
      );

    }
  );


  /* =========================
     IMAGE LOAD
  ========================= */

  u9AvatarImage.addEventListener(
    "load",
    () => {

      u9AvatarImageLoaded =
        true;


      calculateBaseScale();


      clampAvatarPosition();


      updateAvatarImage();


      if (
        u9AvatarSaveButton &&
        !isAvatarCooldownActive()
      ) {

        u9AvatarSaveButton.disabled =
          !u9AvatarSelectedImage;

      }


      updateAvatarMoveButtons();

    }
  );


  /* =========================
     INITIAL IMAGE
  ========================= */

  u9AvatarImage.src =
    u9AvatarDefaultImage;


  /* =========================
     LOAD DATA
  ========================= */

  loadCurrentAvatar();


  loadFreeAvatars();

}


/* =========================
   MOVE AVATAR
========================= */

function moveAvatar(
  deltaX,
  deltaY
) {

  if (
    isAvatarCooldownActive()
  ) {

    updateAvatarCooldownDisplay();

    return;

  }


  if (
    !u9AvatarImageLoaded ||
    !u9AvatarSelectedImage
  ) {

    return;

  }


  u9AvatarOffsetX +=
    deltaX;


  u9AvatarOffsetY +=
    deltaY;


  clampAvatarPosition();


  updateAvatarImage();

}


/* =========================
   LOAD CURRENT AVATAR
========================= */

async function loadCurrentAvatar() {

  /* =========================
     RESET
  ========================= */

  u9AvatarCurrentType =
    "default";

  u9AvatarCurrentId =
    null;

  u9AvatarCustomUrl =
    null;

  u9AvatarCooldownUntil =
    null;


  stopAvatarCooldownTimer();


  hideMyAvatar();


  updateAvatarUploadVisibility();


  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  if (
    !sessionToken
  ) {

    updateFreeAvatarSelection();

    return;

  }


  try {

    const response =
      await fetch(
        u9AvatarMeFunction,
        {

          method:
            "GET",

          headers: {

            "Authorization":
              `Bearer ${sessionToken}`

          }

        }
      );


    if (
      !response.ok
    ) {

      updateFreeAvatarSelection();

      return;

    }


    const result =
      await response.json();


    const avatar =
      result.user?.avatar ||
      null;


    if (
      !avatar
    ) {

      u9AvatarCurrentType =
        "default";

      u9AvatarCurrentId =
        null;

      u9AvatarCustomUrl =
        null;

      u9AvatarCooldownUntil =
        null;

      hideMyAvatar();

    }

    else {

      u9AvatarCurrentType =
        avatar.type ||
        "default";


      u9AvatarCurrentId =
        avatar.id ||
        null;


      u9AvatarCustomUrl =
        avatar.custom_url ||
        null;


      u9AvatarCooldownUntil =
        avatar.cooldown_until ||
        null;


      renderMyAvatar();


      /* =========================
         CURRENT AVATAR IMAGE
      ========================= */

      const accountAvatarImage =
        document.getElementById(
          "Account-U9-account-avatar-image"
        );


      if (
        accountAvatarImage &&
        avatar.url
      ) {

        accountAvatarImage.src =
          `${avatar.url}?v=${Date.now()}`;

      }

    }


    updateFreeAvatarSelection();


    /* =========================
       COOLDOWN
    ========================= */

    if (
      isAvatarCooldownActive()
    ) {

      startAvatarCooldownTimer();

    }

    else {

      u9AvatarCooldownUntil =
        null;

      updateAvatarUploadVisibility();

    }


    console.log(
      "Current avatar:",
      {

        type:
          u9AvatarCurrentType,

        id:
          u9AvatarCurrentId,

        custom_url:
          u9AvatarCustomUrl,

        cooldown_until:
          u9AvatarCooldownUntil

      }
    );

  }

  catch (error) {

    console.error(
      "Failed to load current avatar:",
      error
    );

  }

}


/* =========================
   RENDER MY AVATAR
========================= */

function renderMyAvatar() {

  if (
    !u9AvatarMySection ||
    !u9AvatarMyList
  ) {

    return;

  }


  u9AvatarMyList.innerHTML =
    "";


  if (
    !u9AvatarCustomUrl
  ) {

    hideMyAvatar();

    return;

  }


  u9AvatarMySection.style.display =
    "";


  const card =
    document.createElement(
      "button"
    );


  card.type =
    "button";


  card.className =
    "Account-U9-free-avatar-card";


  card.dataset.avatarType =
    "custom";


  /* =========================
     IMAGE
  ========================= */

  const image =
    document.createElement(
      "img"
    );


  image.className =
    "Account-U9-free-avatar-image";


  image.src =
    `${u9AvatarCustomUrl}?v=${Date.now()}`;


  image.alt =
    "My Avatar";


  image.draggable =
    false;


  /* =========================
     NAME
  ========================= */

  const name =
    document.createElement(
      "span"
    );


  name.className =
    "Account-U9-free-avatar-name";


  name.textContent =
    "My Avatar";


  /* =========================
     APPEND
  ========================= */

  card.appendChild(
    image
  );


  card.appendChild(
    name
  );


  /* =========================
     CLICK
  ========================= */

  card.addEventListener(
    "click",
    () => {

      selectCustomAvatar(
        card
      );

    }
  );


  u9AvatarMyList.appendChild(
    card
  );


  updateFreeAvatarSelection();

}


/* =========================
   HIDE MY AVATAR
========================= */

function hideMyAvatar() {

  if (
    u9AvatarMySection
  ) {

    u9AvatarMySection.style.display =
      "none";

  }


  if (
    u9AvatarMyList
  ) {

    u9AvatarMyList.innerHTML =
      "";

  }

}


/* =========================
   LOAD FREE AVATARS
========================= */

async function loadFreeAvatars() {

  if (
    !u9AvatarFreeList
  ) {

    return;

  }


  try {

    u9AvatarFreeList.innerHTML =
      `
      <div class="Account-U9-avatar-editor-free-loading">
        Loading...
      </div>
      `;


    const response =
      await fetch(
        u9AvatarFreeFunction,
        {

          method:
            "GET"

        }
      );


    if (
      !response.ok
    ) {

      throw new Error(
        "Failed to load free avatars."
      );

    }


    const result =
      await response.json();


    u9AvatarFreeAvatars =
      result.avatars ||
      [];


    renderFreeAvatars();


    console.log(
      "Free avatars loaded:",
      u9AvatarFreeAvatars
    );

  }

  catch (error) {

    console.error(
      "Failed to load free avatars:",
      error
    );


    if (
      u9AvatarFreeList
    ) {

      u9AvatarFreeList.innerHTML =
        `
        <div class="Account-U9-avatar-editor-free-error">
          Failed to load free avatars.
        </div>
        `;

    }

  }

}


/* =========================
   RENDER FREE AVATARS
========================= */

function renderFreeAvatars() {

  if (
    !u9AvatarFreeList
  ) {

    return;

  }


  u9AvatarFreeList.innerHTML =
    "";


  if (
    !Array.isArray(
      u9AvatarFreeAvatars
    ) ||
    u9AvatarFreeAvatars.length === 0
  ) {

    u9AvatarFreeList.innerHTML =
      `
      <div class="Account-U9-avatar-editor-free-empty">
        No free avatars.
      </div>
      `;

    return;

  }


  u9AvatarFreeAvatars.forEach(
    (avatar) => {

      const card =
        document.createElement(
          "button"
        );


      card.type =
        "button";


      card.className =
        "Account-U9-free-avatar-card";


      card.dataset.avatarId =
        avatar.id;


      card.dataset.avatarType =
        "free";


      /* =========================
         IMAGE
      ========================= */

      const image =
        document.createElement(
          "img"
        );


      image.className =
        "Account-U9-free-avatar-image";


      image.src =
        avatar.svg;


      image.alt =
        avatar.name ||
        "Free Avatar";


      image.draggable =
        false;


      /* =========================
         NAME
      ========================= */

      const name =
        document.createElement(
          "span"
        );


      name.className =
        "Account-U9-free-avatar-name";


      name.textContent =
        avatar.name ||
        "Avatar";


      /* =========================
         APPEND
      ========================= */

      card.appendChild(
        image
      );


      card.appendChild(
        name
      );


      /* =========================
         CLICK
      ========================= */

      card.addEventListener(
        "click",
        () => {

          selectFreeAvatar(
            avatar,
            card
          );

        }
      );


      u9AvatarFreeList.appendChild(
        card
      );

    }
  );


  updateFreeAvatarSelection();

}


/* =========================
   UPDATE AVATAR SELECTED UI
========================= */

function updateFreeAvatarSelection() {

  /* =========================
     FREE
  ========================= */

  if (
    u9AvatarFreeList
  ) {

    const cards =
      u9AvatarFreeList.querySelectorAll(
        ".Account-U9-free-avatar-card"
      );


    cards.forEach(
      (card) => {

        const isSelected =

          u9AvatarCurrentType ===
            "free" &&

          card.dataset.avatarType ===
            "free" &&

          card.dataset.avatarId ===
            String(
              u9AvatarCurrentId
            );


        if (
          isSelected
        ) {

          card.classList.add(
            "selected"
          );

        }

        else {

          card.classList.remove(
            "selected"
          );

        }

      }
    );

  }


  /* =========================
     MY AVATAR
  ========================= */

  if (
    u9AvatarMyList
  ) {

    const myCard =
      u9AvatarMyList.querySelector(
        '.Account-U9-free-avatar-card[data-avatar-type="custom"]'
      );


    if (
      myCard
    ) {

      if (
        u9AvatarCurrentType ===
        "custom"
      ) {

        myCard.classList.add(
          "selected"
        );

      }

      else {

        myCard.classList.remove(
          "selected"
        );

      }

    }

  }

}


/* =========================
   SELECT FREE AVATAR
========================= */

async function selectFreeAvatar(
  avatar,
  card
) {

  if (
    !avatar ||
    !avatar.id
  ) {

    return;

  }


  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  if (
    !sessionToken
  ) {

    setAvatarStatus(
      "Please log in first.",
      true
    );

    return;

  }


  /* =========================
     SAME AVATAR
  ========================= */

  if (

    u9AvatarCurrentType ===
      "free" &&

    u9AvatarCurrentId ===
      avatar.id

  ) {

    return;

  }


  const cards =
    u9AvatarFreeList
      ?.querySelectorAll(
        ".Account-U9-free-avatar-card"
      ) ||
    [];


  const myCard =
    u9AvatarMyList
      ?.querySelector(
        '.Account-U9-free-avatar-card[data-avatar-type="custom"]'
      );


  /* =========================
     DISABLE
  ========================= */

  cards.forEach(
    (item) => {

      item.disabled =
        true;

    }
  );


  if (
    myCard
  ) {

    myCard.disabled =
      true;

  }


  try {

    card.classList.add(
      "loading"
    );


    const response =
      await fetch(
        u9AvatarSetFunction,
        {

          method:
            "POST",

          headers: {

            "Authorization":
              `Bearer ${sessionToken}`,

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify({

              type:
                "free",

              avatar_id:
                avatar.id

            })

        }
      );


    const result =
      await response.json();


    if (
      !response.ok ||
      !result.success
    ) {

      throw new Error(

        result.error ||
        "Failed to select free avatar."

      );

    }


    /* =========================
       UPDATE CURRENT STATE
    ========================= */

    u9AvatarCurrentType =
      "free";


    u9AvatarCurrentId =
      avatar.id;


    /* =========================
       PRESERVE CUSTOM DATA
    ========================= */

    if (
      result.avatar?.custom_url
    ) {

      u9AvatarCustomUrl =
        result.avatar.custom_url;

    }


    if (
      result.avatar?.cooldown_until
    ) {

      u9AvatarCooldownUntil =
        result.avatar.cooldown_until;

    }


    /* =========================
       UPDATE ACCOUNT AVATAR
    ========================= */

    const accountAvatarImage =
      document.getElementById(
        "Account-U9-account-avatar-image"
      );


    if (
      accountAvatarImage
    ) {

      accountAvatarImage.src =
        `${avatar.svg}?v=${Date.now()}`;

    }


    /* =========================
       UPDATE MY AVATAR
    ========================= */

    renderMyAvatar();


    /* =========================
       SELECTED
    ========================= */

    updateFreeAvatarSelection();


    /* =========================
       COOLDOWN
    ========================= */

    if (
      isAvatarCooldownActive()
    ) {

      startAvatarCooldownTimer();

    }

    else {

      setAvatarStatus(
        "Free avatar updated successfully."
      );

    }


    console.log(
      "Free avatar selected:",
      result
    );

  }

  catch (error) {

    console.error(
      "Failed to select free avatar:",
      error
    );


    if (
      isAvatarCooldownActive()
    ) {

      updateAvatarCooldownDisplay();

    }

    else {

      setAvatarStatus(

        error instanceof Error
          ? error.message
          : "Failed to select free avatar.",

        true

      );

    }

  }

  finally {

    cards.forEach(
      (item) => {

        item.disabled =
          false;

      }
    );


    if (
      myCard
    ) {

      myCard.disabled =
        false;

    }


    card.classList.remove(
      "loading"
    );

  }

}


/* =========================
   SELECT CUSTOM AVATAR
========================= */

async function selectCustomAvatar(
  card
) {

  if (
    !u9AvatarCustomUrl
  ) {

    return;

  }


  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  if (
    !sessionToken
  ) {

    setAvatarStatus(
      "Please log in first.",
      true
    );

    return;

  }


  /* =========================
     SAME AVATAR
  ========================= */

  if (
    u9AvatarCurrentType ===
    "custom"
  ) {

    return;

  }


  const cards =
    u9AvatarFreeList
      ?.querySelectorAll(
        ".Account-U9-free-avatar-card"
      ) ||
    [];


  const myCard =
    card;


  /* =========================
     DISABLE
  ========================= */

  cards.forEach(
    (item) => {

      item.disabled =
        true;

    }
  );


  if (
    myCard
  ) {

    myCard.disabled =
      true;

  }


  try {

    myCard.classList.add(
      "loading"
    );


    const response =
      await fetch(
        u9AvatarSetFunction,
        {

          method:
            "POST",

          headers: {

            "Authorization":
              `Bearer ${sessionToken}`,

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify({

              type:
                "custom"

            })

        }
      );


    const result =
      await response.json();


    if (
      !response.ok ||
      !result.success
    ) {

      throw new Error(

        result.error ||
        "Failed to select custom avatar."

      );

    }


    /* =========================
       UPDATE CURRENT STATE
    ========================= */

    u9AvatarCurrentType =
      "custom";


    u9AvatarCurrentId =
      null;


    if (
      result.avatar?.custom_url
    ) {

      u9AvatarCustomUrl =
        result.avatar.custom_url;

    }


    if (
      result.avatar?.cooldown_until
    ) {

      u9AvatarCooldownUntil =
        result.avatar.cooldown_until;

    }


    /* =========================
       UPDATE ACCOUNT AVATAR
    ========================= */

    const accountAvatarImage =
      document.getElementById(
        "Account-U9-account-avatar-image"
      );


    if (
      accountAvatarImage &&
      u9AvatarCustomUrl
    ) {

      accountAvatarImage.src =
        `${u9AvatarCustomUrl}?v=${Date.now()}`;

    }


    /* =========================
       UPDATE MY AVATAR
    ========================= */

    renderMyAvatar();


    /* =========================
       SELECTED
    ========================= */

    updateFreeAvatarSelection();


    /* =========================
       COOLDOWN
    ========================= */

    if (
      isAvatarCooldownActive()
    ) {

      startAvatarCooldownTimer();

    }

    else {

      setAvatarStatus(
        "Custom avatar selected successfully."
      );

    }


    console.log(
      "Custom avatar selected:",
      result
    );

  }

  catch (error) {

    console.error(
      "Failed to select custom avatar:",
      error
    );


    if (
      isAvatarCooldownActive()
    ) {

      updateAvatarCooldownDisplay();

    }

    else {

      setAvatarStatus(

        error instanceof Error
          ? error.message
          : "Failed to select custom avatar.",

        true

      );

    }

  }

  finally {

    cards.forEach(
      (item) => {

        item.disabled =
          false;

      }
    );


    if (
      myCard
    ) {

      myCard.disabled =
        false;


      myCard.classList.remove(
        "loading"
      );

    }

  }

}


/* =========================
   FILE CHANGE
========================= */

function handleAvatarFileChange(
  event
) {

  if (
    isAvatarCooldownActive()
  ) {

    event.target.value =
      "";


    updateAvatarCooldownDisplay();

    return;

  }


  const file =
    event.target.files?.[0];


  if (
    !file
  ) {

    return;

  }


  if (
    !file.type.startsWith(
      "image/"
    )
  ) {

    setAvatarStatus(
      "Please choose an image.",
      true
    );

    return;

  }


  /* =========================
     REVOKE OLD URL
  ========================= */

  if (
    u9AvatarObjectUrl
  ) {

    URL.revokeObjectURL(
      u9AvatarObjectUrl
    );

  }


  /* =========================
     CREATE URL
  ========================= */

  u9AvatarObjectUrl =
    URL.createObjectURL(
      file
    );


  u9AvatarSelectedImage =
    file;


  /* =========================
     RESET
  ========================= */

  u9AvatarOffsetX =
    0;


  u9AvatarOffsetY =
    0;


  u9AvatarZoom =
    1;


  u9AvatarZoomInput.value =
    "1";


  u9AvatarZoomValue.textContent =
    "100%";


  u9AvatarImageLoaded =
    false;


  /* =========================
     IMAGE
  ========================= */

  u9AvatarImage.src =
    u9AvatarObjectUrl;


  /* =========================
     BUTTON
  ========================= */

  u9AvatarSaveButton.disabled =
    true;


  updateAvatarMoveButtons();


  setAvatarStatus(
    ""
  );

}


/* =========================
   BASE SCALE
========================= */

function calculateBaseScale() {

  if (
    !u9AvatarImage ||
    !u9AvatarPreview ||
    !u9AvatarImage.naturalWidth ||
    !u9AvatarImage.naturalHeight
  ) {

    return;

  }


  const previewWidth =
    u9AvatarPreview.clientWidth;


  const previewHeight =
    u9AvatarPreview.clientHeight;


  const scaleX =
    previewWidth /
    u9AvatarImage.naturalWidth;


  const scaleY =
    previewHeight /
    u9AvatarImage.naturalHeight;


  /* =========================
     COVER
  ========================= */

  u9AvatarBaseScale =
    Math.max(
      scaleX,
      scaleY
    );

}


/* =========================
   ZOOM
========================= */

function handleAvatarZoom() {

  if (
    !u9AvatarZoomInput
  ) {

    return;

  }


  if (
    isAvatarCooldownActive()
  ) {

    updateAvatarCooldownDisplay();

    return;

  }


  u9AvatarZoom =
    Number(
      u9AvatarZoomInput.value
    );


  const percentage =
    Math.round(
      u9AvatarZoom *
      100
    );


  u9AvatarZoomValue.textContent =
    `${percentage}%`;


  clampAvatarPosition();


  updateAvatarImage();

}


/* =========================
   UPDATE IMAGE
========================= */

function updateAvatarImage() {

  if (
    !u9AvatarImage ||
    !u9AvatarImageLoaded
  ) {

    return;

  }


  const scale =
    u9AvatarBaseScale *
    u9AvatarZoom;


  u9AvatarImage.style.transform =

    `translate(-50%, -50%) translate(${u9AvatarOffsetX}px, ${u9AvatarOffsetY}px) scale(${scale})`;

}


/* =========================
   CLAMP POSITION
========================= */

function clampAvatarPosition() {

  if (
    !u9AvatarImage ||
    !u9AvatarPreview ||
    !u9AvatarImage.naturalWidth ||
    !u9AvatarImage.naturalHeight
  ) {

    return;

  }


  const previewWidth =
    u9AvatarPreview.clientWidth;


  const previewHeight =
    u9AvatarPreview.clientHeight;


  const scale =
    u9AvatarBaseScale *
    u9AvatarZoom;


  const imageWidth =
    u9AvatarImage.naturalWidth *
    scale;


  const imageHeight =
    u9AvatarImage.naturalHeight *
    scale;


  const maxOffsetX =
    Math.max(

      0,

      (
        imageWidth -
        previewWidth
      ) / 2

    );


  const maxOffsetY =
    Math.max(

      0,

      (
        imageHeight -
        previewHeight
      ) / 2

    );


  u9AvatarOffsetX =
    clamp(

      u9AvatarOffsetX,

      -maxOffsetX,

      maxOffsetX

    );


  u9AvatarOffsetY =
    clamp(

      u9AvatarOffsetY,

      -maxOffsetY,

      maxOffsetY

    );

}


/* =========================
   MOUSE WHEEL ZOOM
========================= */

function setupAvatarWheelZoom() {

  if (
    !u9AvatarPreview
  ) {

    return;

  }


  u9AvatarPreview.addEventListener(
    "wheel",
    (event) => {

      if (
        isAvatarCooldownActive()
      ) {

        return;

      }


      if (
        !u9AvatarImageLoaded ||
        !u9AvatarSelectedImage
      ) {

        return;

      }


      event.preventDefault();


      const step =
        event.deltaY < 0
          ? 0.05
          : -0.05;


      const nextZoom =
        clamp(

          u9AvatarZoom +
            step,

          1,

          3

        );


      u9AvatarZoom =
        Number(
          nextZoom.toFixed(2)
        );


      u9AvatarZoomInput.value =
        String(
          u9AvatarZoom
        );


      u9AvatarZoomValue.textContent =
        `${Math.round(
          u9AvatarZoom *
          100
        )}%`;


      clampAvatarPosition();


      updateAvatarImage();

    },
    {
      passive: false
    }
  );

}


/* =========================
   SAVE CROP / UPLOAD
========================= */

async function saveAvatarCrop() {

  if (
    isAvatarCooldownActive()
  ) {

    updateAvatarCooldownDisplay();

    return;

  }


  if (
    !u9AvatarImageLoaded ||
    !u9AvatarSelectedImage
  ) {

    return;

  }


  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  if (
    !sessionToken
  ) {

    setAvatarStatus(
      "Please log in first.",
      true
    );

    return;

  }


  try {

    /* =========================
       LOADING
    ========================= */

    u9AvatarSaveButton.disabled =
      true;


    u9AvatarSaveButton.classList.add(
      "loading"
    );


    u9AvatarSaveButton.textContent =
      "Uploading...";


    /* =========================
       CREATE CROP
    ========================= */

    const blob =
      await createAvatarCropBlob();


    if (
      !blob
    ) {

      throw new Error(
        "Failed to create avatar."
      );

    }


    /* =========================
       CREATE FILE
    ========================= */

    const avatarFile =
      new File(

        [blob],

        "avatar.webp",

        {
          type:
            "image/webp"
        }

      );


    /* =========================
       FORM DATA
    ========================= */

    const formData =
      new FormData();


    formData.append(
      "avatar",
      avatarFile
    );


    /* =========================
       UPLOAD
    ========================= */

    const response =
      await fetch(

        u9AvatarUploadFunction,

        {

          method:
            "POST",

          headers: {

            "Authorization":
              `Bearer ${sessionToken}`

          },

          body:
            formData

        }

      );


    /* =========================
       RESPONSE
    ========================= */

    const result =
      await response.json();


    /* =========================
       FAILED
    ========================= */

    if (
      !response.ok ||
      !result.success
    ) {

      if (
        response.status ===
          429 ||
        result.error ===
          "Avatar is still on cooldown."
      ) {

        u9AvatarCooldownUntil =
          result.cooldown_until ||
          null;


        if (
          isAvatarCooldownActive()
        ) {

          startAvatarCooldownTimer();

        }

        else {

          setAvatarStatus(
            "Avatar upload failed.",
            true
          );

        }


        console.log(
          "Avatar upload cooldown:",
          result
        );


        return;

      }


      setAvatarStatus(

        result.error ||
        "Avatar upload failed.",

        true

      );


      console.error(
        "Avatar upload failed:",
        result
      );


      return;

    }


    /* =========================
       SUCCESS
    ========================= */

    const avatarUrl =
      result.avatar?.url ||
      "";


    if (
      !avatarUrl
    ) {

      throw new Error(
        "Avatar URL not returned."
      );

    }


    /* =========================
       SAVE CUSTOM AVATAR
    ========================= */

    u9AvatarCustomUrl =
      avatarUrl;


    u9AvatarCooldownUntil =
      result.avatar?.cooldown_until ||
      null;


    /* =========================
       UPDATE ACCOUNT AVATAR
    ========================= */

    const accountAvatarImage =
      document.getElementById(
        "Account-U9-account-avatar-image"
      );


    if (
      accountAvatarImage
    ) {

      accountAvatarImage.src =
        `${avatarUrl}?v=${Date.now()}`;

    }


    /* =========================
       UPDATE CURRENT STATE
    ========================= */

    u9AvatarCurrentType =
      "custom";


    u9AvatarCurrentId =
      null;


    /* =========================
       UPDATE MY AVATAR
    ========================= */

    renderMyAvatar();


    /* =========================
       SELECTED
    ========================= */

    updateFreeAvatarSelection();


    /* =========================
       SAVE STATE
    ========================= */

    if (
      !window.U9AvatarEditor
    ) {

      window.U9AvatarEditor = {};

    }


    window.U9AvatarEditor.lastBlob =
      blob;


    window.U9AvatarEditor.lastFile =
      avatarFile;


    /* =========================
       RESET CHOICE
    ========================= */

    u9AvatarSelectedImage =
      null;


    u9AvatarImageLoaded =
      false;


    if (
      u9AvatarObjectUrl
    ) {

      URL.revokeObjectURL(
        u9AvatarObjectUrl
      );

      u9AvatarObjectUrl =
        null;

    }


    if (
      u9AvatarFileInput
    ) {

      u9AvatarFileInput.value =
        "";

    }


    /* =========================
       RESET PREVIEW
    ========================= */

    u9AvatarImage.src =
      u9AvatarDefaultImage;


    /* =========================
       UPDATE MOVE BUTTONS
    ========================= */

    updateAvatarMoveButtons();


    /* =========================
       COOLDOWN
    ========================= */

    if (
      isAvatarCooldownActive()
    ) {

      startAvatarCooldownTimer();

    }

    else {

      setAvatarStatus(
        "Avatar updated successfully."
      );

    }


    console.log(
      "Avatar uploaded successfully:",
      result
    );

  }

  catch (error) {

    console.error(
      "Failed to upload avatar:",
      error
    );


    setAvatarStatus(
      "Network error. Please try again.",
      true
    );

  }

  finally {

    u9AvatarSaveButton.classList.remove(
      "loading"
    );


    u9AvatarSaveButton.textContent =
      "Save";


    if (
      !isAvatarCooldownActive()
    ) {

      u9AvatarSaveButton.disabled =
        !u9AvatarSelectedImage;

    }


    updateAvatarMoveButtons();

  }

}


/* =========================
   CREATE CROP BLOB
========================= */

function createAvatarCropBlob() {

  return new Promise(
    (resolve) => {

      if (
        !u9AvatarImage ||
        !u9AvatarPreview ||
        !u9AvatarCropGuide
      ) {

        resolve(
          null
        );

        return;

      }


      const canvas =
        document.createElement(
          "canvas"
        );


      canvas.width =
        u9AvatarOutputSize;


      canvas.height =
        u9AvatarOutputSize;


      const context =
        canvas.getContext(
          "2d"
        );


      if (
        !context
      ) {

        resolve(
          null
        );

        return;

      }


      const previewWidth =
        u9AvatarPreview.clientWidth;


      const previewHeight =
        u9AvatarPreview.clientHeight;


      const cropSize =
        u9AvatarCropGuide.clientWidth;


      const centerX =
        previewWidth / 2 +
        u9AvatarOffsetX;


      const centerY =
        previewHeight / 2 +
        u9AvatarOffsetY;


      const scale =
        u9AvatarBaseScale *
        u9AvatarZoom;


      const imageLeft =
        centerX -
        (
          u9AvatarImage.naturalWidth *
          scale
        ) / 2;


      const imageTop =
        centerY -
        (
          u9AvatarImage.naturalHeight *
          scale
        ) / 2;


      const cropLeft =
        (
          previewWidth -
          cropSize
        ) / 2;


      const cropTop =
        (
          previewHeight -
          cropSize
        ) / 2;


      const sourceX =
        (
          cropLeft -
          imageLeft
        ) / scale;


      const sourceY =
        (
          cropTop -
          imageTop
        ) / scale;


      const sourceSize =
        cropSize /
        scale;


      context.imageSmoothingEnabled =
        true;


      context.imageSmoothingQuality =
        "high";


      context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      context.drawImage(

        u9AvatarImage,

        sourceX,
        sourceY,
        sourceSize,
        sourceSize,

        0,
        0,
        canvas.width,
        canvas.height

      );


      canvas.toBlob(

        (blob) => {

          resolve(
            blob
          );

        },

        "image/webp",

        0.9

      );

    }
  );

}


/* =========================
   STATUS
========================= */

function setAvatarStatus(
  message,
  isError = false
) {

  if (
    !u9AvatarStatus
  ) {

    return;

  }


  /*
   * Do not overwrite cooldown
   * message with normal status.
   */

  if (
    isAvatarCooldownActive() &&
    u9AvatarStatus.dataset.cooldown ===
      "true"
  ) {

    updateAvatarCooldownDisplay();

    return;

  }


  u9AvatarStatus.textContent =
    message || "";


  u9AvatarStatus.classList.toggle(
    "error",
    Boolean(
      isError
    )
  );


  u9AvatarStatus.dataset.cooldown =
    "false";


  if (
    message
  ) {

    u9AvatarStatus.style.display =
      "";

  }

  else {

    u9AvatarStatus.style.display =
      "none";

  }

}


/* =========================
   GLOBAL API
========================= */

window.U9AvatarEditor = {

  lastBlob:
    null,

  lastFile:
    null,

  getCroppedBlob:
    createAvatarCropBlob,

  getCroppedFile:
    async () => {

      const blob =
        await createAvatarCropBlob();


      if (
        !blob
      ) {

        return null;

      }


      return new File(
        [blob],
        "avatar.webp",
        {
          type:
            "image/webp"
        }
      );

    },

  loadCurrentAvatar:
    loadCurrentAvatar,

  loadFreeAvatars:
    loadFreeAvatars

};


/* =========================
   START
========================= */

if (
  u9AvatarEditContainer
) {

  createU9AvatarEditor();

  setupAvatarWheelZoom();

}
