
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

let u9AvatarCancelButton = null;

let u9AvatarZoomWrapper = null;

let u9AvatarZoomLabel = null;

let u9AvatarZoomInput = null;

let u9AvatarZoomValue = null;

let u9AvatarSaveButton = null;

let u9AvatarStatus = null;

let u9AvatarFreeSection = null;

let u9AvatarFreeList = null;

let u9AvatarPreviewArea = null;

let u9AvatarPreviewMiddle = null;

let u9AvatarActionRow = null;

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
    !u9AvatarSelectedImage ||
    isAvatarCooldownActive();


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
    u9AvatarPreviewArea
  ) {

    u9AvatarPreviewArea.style.display =
      cooldownActive
        ? "none"
        : "";

  }


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
     CANCEL
  ========================= */

  if (
    u9AvatarCancelButton
  ) {

    u9AvatarCancelButton.style.display =
      cooldownActive
        ? "none"
        : (
            u9AvatarSelectedImage
              ? "flex"
              : "none"
          );

  }


  /* =========================
     ACTION ROW
  ========================= */

  if (
    u9AvatarActionRow
  ) {

    u9AvatarActionRow.style.display =
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
     PREVIEW AREA
  ========================= */

  u9AvatarPreviewArea =
    document.createElement(
      "div"
    );

  u9AvatarPreviewArea.id =
    "Account-U9-avatar-editor-preview-area";


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
     PREVIEW MIDDLE
  ========================= */

  u9AvatarPreviewMiddle =
    document.createElement(
      "div"
    );

  u9AvatarPreviewMiddle.id =
    "Account-U9-avatar-editor-preview-middle";


  /* =========================
     MOVE UP
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
     MOVE DOWN
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
     MOVE LEFT
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
     MOVE RIGHT
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
     APPEND MOVE BUTTONS
  ========================= */

  u9AvatarPreviewMiddle.appendChild(
    u9AvatarMoveUpButton
  );


  u9AvatarPreviewMiddle.appendChild(
    u9AvatarMoveDownButton
  );


  u9AvatarPreviewMiddle.appendChild(
    u9AvatarMoveLeftButton
  );


  u9AvatarPreviewMiddle.appendChild(
    u9AvatarMoveRightButton
  );


  /* =========================
     APPEND PREVIEW AREA
  ========================= */

  u9AvatarPreviewArea.appendChild(
    u9AvatarPreview
  );


  u9AvatarPreviewArea.appendChild(
    u9AvatarPreviewMiddle
  );


  /* =========================
     ZOOM
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
     ACTION ROW
  ========================= */

  u9AvatarActionRow =
    document.createElement(
      "div"
    );

  u9AvatarActionRow.id =
    "Account-U9-avatar-editor-action-row";


  /* =========================
     CHOOSE AREA
  ========================= */

  const chooseArea =
    document.createElement(
      "div"
    );

  chooseArea.id =
    "Account-U9-avatar-editor-choose-area";


  /* =========================
     CHOOSE BUTTON
  ========================= */

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


  /* =========================
     CANCEL BUTTON
  ========================= */

  u9AvatarCancelButton =
    document.createElement(
      "button"
    );

  u9AvatarCancelButton.id =
    "Account-U9-avatar-editor-cancel";

  u9AvatarCancelButton.type =
    "button";

  u9AvatarCancelButton.textContent =
    "Cancel";


  /* =========================
     FILE INPUT
  ========================= */

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


  /* =========================
     APPEND CHOOSE AREA
  ========================= */

  chooseArea.appendChild(
    u9AvatarChooseButton
  );


  chooseArea.appendChild(
    u9AvatarCancelButton
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
     APPEND ACTION ROW
  ========================= */

  u9AvatarActionRow.appendChild(
    chooseArea
  );


  u9AvatarActionRow.appendChild(
    u9AvatarSaveButton
  );


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
     FREE AVATAR SECTION
  ========================= */

  u9AvatarFreeSection =
    document.createElement(
      "div"
    );

  u9AvatarFreeSection.id =
    "Account-U9-avatar-editor-free-section";


  /* =========================
     FREE TITLE
  ========================= */

  const freeTitle =
    document.createElement(
      "div"
    );

  freeTitle.id =
    "Account-U9-avatar-editor-free-title";

  freeTitle.textContent =
    "Free Avatar";


  /* =========================
     FREE LIST
  ========================= */

  u9AvatarFreeList =
    document.createElement(
      "div"
    );

  u9AvatarFreeList.id =
    "Account-U9-avatar-editor-free-list";


  /* =========================
     FREE SECTION APPEND
  ========================= */

  u9AvatarFreeSection.appendChild(
    freeTitle
  );


  u9AvatarFreeSection.appendChild(
    u9AvatarFreeList
  );


  /* =========================
     EDITOR APPEND
  ========================= */

  wrapper.appendChild(
    title
  );


  wrapper.appendChild(
    u9AvatarPreviewArea
  );


  wrapper.appendChild(
    u9AvatarZoomWrapper
  );


  wrapper.appendChild(
    u9AvatarStatus
  );


  wrapper.appendChild(
    u9AvatarActionRow
  );


  wrapper.appendChild(
    u9AvatarFreeSection
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


      if (
        u9AvatarSelectedImage
      ) {

        cancelAvatarSelection();

        return;

      }


      u9AvatarFileInput.click();

    }
  );


  /* =========================
     CANCEL EVENT
  ========================= */

  u9AvatarCancelButton.addEventListener(
    "click",
    cancelAvatarSelection
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
     INITIAL VISIBILITY
  ========================= */

  u9AvatarChooseButton.style.display =
    "";


  u9AvatarCancelButton.style.display =
    "none";


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
   CANCEL AVATAR SELECTION
========================= */

function cancelAvatarSelection() {

  if (
    isAvatarCooldownActive()
  ) {

    updateAvatarCooldownDisplay();

    return;

  }


  if (
    u9AvatarObjectUrl
  ) {

    URL.revokeObjectURL(
      u9AvatarObjectUrl
    );

    u9AvatarObjectUrl =
      null;

  }


  u9AvatarSelectedImage =
    null;


  u9AvatarOffsetX =
    0;


  u9AvatarOffsetY =
    0;


  u9AvatarZoom =
    1;


  u9AvatarImageLoaded =
    false;


  if (
    u9AvatarZoomInput
  ) {

    u9AvatarZoomInput.value =
      "1";

  }


  if (
    u9AvatarZoomValue
  ) {

    u9AvatarZoomValue.textContent =
      "100%";

  }


  if (
    u9AvatarFileInput
  ) {

    u9AvatarFileInput.value =
      "";

  }


  if (
    u9AvatarChooseButton
  ) {

    u9AvatarChooseButton.textContent =
      "Choose Image";

    u9AvatarChooseButton.style.display =
      "";

  }


  if (
    u9AvatarCancelButton
  ) {

    u9AvatarCancelButton.style.display =
      "none";

  }


  if (
    u9AvatarSaveButton
  ) {

    u9AvatarSaveButton.disabled =
      true;

  }


  setAvatarStatus(
    ""
  );


  if (
    u9AvatarImage
  ) {

    u9AvatarImage.src =
      u9AvatarDefaultImage;

  }


  updateAvatarMoveButtons();

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


  updateAvatarUploadVisibility();


  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  if (
    !sessionToken
  ) {

    updateAvatarSourceSelection();

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

      updateAvatarSourceSelection();

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


    updateAvatarSourceSelection();


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
      Array.isArray(
        result.avatars
      )
        ? result.avatars
        : [];


    renderAvatarSources();


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
   RENDER AVATAR SOURCES
========================= */

function renderAvatarSources() {

  if (
    !u9AvatarFreeList
  ) {

    return;

  }


  u9AvatarFreeList.innerHTML =
    "";


  /* =========================
     DATABASE URL
  ========================= */

  if (
    u9AvatarCustomUrl
  ) {

    const customCard =
      createAvatarSourceCard(
        {
          id:
            "custom-avatar",

          type:
            "custom",

          name:
            "Database URL",

          url:
            u9AvatarCustomUrl

        }
      );


    u9AvatarFreeList.appendChild(
      customCard
    );

  }


  /* =========================
     FREE AVATARS
  ========================= */

  if (
    u9AvatarFreeAvatars.length ===
      0 &&
    !u9AvatarCustomUrl
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
    function (avatar) {

      const card =
        createAvatarSourceCard(
          {
            id:
              avatar.id,

            type:
              "free",

            name:
              avatar.name ||
              "Avatar",

            url:
              avatar.svg

          }
        );


      u9AvatarFreeList.appendChild(
        card
      );

    }
  );


  updateAvatarSourceSelection();

}


/* =========================
   CREATE SOURCE CARD
========================= */

function createAvatarSourceCard(
  source
) {

  const card =
    document.createElement(
      "button"
    );


  card.type =
    "button";


  card.className =
    "Account-U9-free-avatar-card";


  card.dataset.avatarType =
    source.type;


  if (
    source.id
  ) {

    card.dataset.avatarId =
      String(
        source.id
      );

  }


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
    source.type ===
      "custom"

      ? `${source.url}?v=${Date.now()}`
      : source.url;


  image.alt =
    source.name;


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
    source.name;


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
    function () {

      if (
        source.type ===
        "custom"
      ) {

        selectCustomAvatar(
          card
        );

      }

      else {

        selectFreeAvatar(
          source,
          card
        );

      }

    }
  );


  return card;

}


/* =========================
   UPDATE SOURCE SELECTION
========================= */

function updateAvatarSourceSelection() {

  if (
    !u9AvatarFreeList
  ) {

    return;

  }


  const cards =
    u9AvatarFreeList.querySelectorAll(
      ".Account-U9-free-avatar-card"
    );


  cards.forEach(
    function (card) {

      const type =
        card.dataset.avatarType;


      let selected =
        false;


      if (
        type ===
        "custom"
      ) {

        selected =
          u9AvatarCurrentType ===
          "custom";

      }

      else if (
        type ===
        "free"
      ) {

        selected =

          u9AvatarCurrentType ===
            "free" &&

          card.dataset.avatarId ===
            String(
              u9AvatarCurrentId
            );

      }


      card.classList.toggle(
        "selected",
        selected
      );

    }
  );

}


/* =========================
   DISABLE SOURCE CARDS
========================= */

function setAvatarSourceCardsDisabled(
  disabled
) {

  if (
    !u9AvatarFreeList
  ) {

    return;

  }


  const cards =
    u9AvatarFreeList.querySelectorAll(
      ".Account-U9-free-avatar-card"
    );


  cards.forEach(
    function (card) {

      card.disabled =
        disabled;

    }
  );

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


  if (

    u9AvatarCurrentType ===
      "free" &&

    u9AvatarCurrentId ===
      avatar.id

  ) {

    return;

  }


  setAvatarSourceCardsDisabled(
    true
  );


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
        result.message ||
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
      result.avatar &&
      Object.prototype.hasOwnProperty.call(
        result.avatar,
        "custom_url"
      )
    ) {

      u9AvatarCustomUrl =
        result.avatar.custom_url ||
        null;

    }


    if (
      result.avatar &&
      Object.prototype.hasOwnProperty.call(
        result.avatar,
        "cooldown_until"
      )
    ) {

      u9AvatarCooldownUntil =
        result.avatar.cooldown_until ||
        null;

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
       UPDATE SOURCE LIST
    ========================= */

    renderAvatarSources();


    /* =========================
       STATUS
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

    card.classList.remove(
      "loading"
    );


    setAvatarSourceCardsDisabled(
      false
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


  if (
    u9AvatarCurrentType ===
    "custom"
  ) {

    return;

  }


  setAvatarSourceCardsDisabled(
    true
  );


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
        result.message ||
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
      result.avatar &&
      Object.prototype.hasOwnProperty.call(
        result.avatar,
        "custom_url"
      )
    ) {

      u9AvatarCustomUrl =
        result.avatar.custom_url ||
        u9AvatarCustomUrl;

    }


    if (
      result.avatar &&
      Object.prototype.hasOwnProperty.call(
        result.avatar,
        "cooldown_until"
      )
    ) {

      u9AvatarCooldownUntil =
        result.avatar.cooldown_until ||
        null;

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
       UPDATE SOURCE LIST
    ========================= */

    renderAvatarSources();


    /* =========================
       STATUS
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

    card.classList.remove(
      "loading"
    );


    setAvatarSourceCardsDisabled(
      false
    );

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

    event.target.value =
      "";

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
     BUTTON STATE
  ========================= */

  u9AvatarChooseButton.style.display =
    "none";


  u9AvatarCancelButton.style.display =
    "flex";


  u9AvatarSaveButton.disabled =
    true;


  /* =========================
     STATUS
  ========================= */

  setAvatarStatus(
    ""
  );


  /* =========================
     IMAGE
  ========================= */

  u9AvatarImage.src =
    u9AvatarObjectUrl;


  updateAvatarMoveButtons();

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


  if (
    !u9AvatarSelectedImage
  ) {

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
        result.message ||
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
       SUCCESS URL
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
       SAVE CUSTOM DATA
    ========================= */

    u9AvatarCustomUrl =
      avatarUrl;


    u9AvatarCooldownUntil =
      result.avatar?.cooldown_until ||
      null;


    u9AvatarCurrentType =
      "custom";


    u9AvatarCurrentId =
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
       UPDATE SOURCE LIST
    ========================= */

    renderAvatarSources();


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
       RESET SELECTION
    ========================= */

    if (
      u9AvatarObjectUrl
    ) {

      URL.revokeObjectURL(
        u9AvatarObjectUrl
      );

      u9AvatarObjectUrl =
        null;

    }


    u9AvatarSelectedImage =
      null;


    u9AvatarImageLoaded =
      false;


    u9AvatarOffsetX =
      0;


    u9AvatarOffsetY =
      0;


    u9AvatarZoom =
      1;


    if (
      u9AvatarFileInput
    ) {

      u9AvatarFileInput.value =
        "";

    }


    if (
      u9AvatarZoomInput
    ) {

      u9AvatarZoomInput.value =
        "1";

    }


    if (
      u9AvatarZoomValue
    ) {

      u9AvatarZoomValue.textContent =
        "100%";

    }


    /* =========================
       RESET BUTTONS
    ========================= */

    if (
      u9AvatarChooseButton
    ) {

      u9AvatarChooseButton.textContent =
        "Choose Image";

      u9AvatarChooseButton.style.display =
        "";

    }


    if (
      u9AvatarCancelButton
    ) {

      u9AvatarCancelButton.style.display =
        "none";

    }


    if (
      u9AvatarSaveButton
    ) {

      u9AvatarSaveButton.disabled =
        true;

    }


    /* =========================
       RESET PREVIEW
    ========================= */

    if (
      u9AvatarImage
    ) {

      u9AvatarImage.src =
        u9AvatarDefaultImage;

    }


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
      error instanceof Error
        ? error.message
        : "Network error. Please try again.",
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

        function (blob) {

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

}
