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

let u9AvatarDragging =
  false;

let u9AvatarDragStartX =
  0;

let u9AvatarDragStartY =
  0;

let u9AvatarStartOffsetX =
  0;

let u9AvatarStartOffsetY =
  0;

let u9AvatarOffsetX =
  0;

let u9AvatarOffsetY =
  0;

let u9AvatarBaseScale =
  1;

let u9AvatarZoom =
  1;

let u9AvatarCurrentType =
  "default";

let u9AvatarCurrentId =
  null;

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

let u9AvatarZoomInput = null;

let u9AvatarZoomValue = null;

let u9AvatarSaveButton = null;

let u9AvatarStatus = null;

let u9AvatarFreeList = null;


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
     DRAG HINT
  ========================= */

  const dragHint =
    document.createElement(
      "div"
    );

  dragHint.id =
    "Account-U9-avatar-editor-drag-hint";

  dragHint.textContent =
    "Drag to move";


  /* =========================
     ZOOM WRAPPER
  ========================= */

  const zoomWrapper =
    document.createElement(
      "div"
    );

  zoomWrapper.id =
    "Account-U9-avatar-editor-zoom";


  /* =========================
     ZOOM LABEL
  ========================= */

  const zoomLabel =
    document.createElement(
      "div"
    );

  zoomLabel.id =
    "Account-U9-avatar-editor-zoom-label";

  zoomLabel.textContent =
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

  zoomWrapper.appendChild(
    zoomLabel
  );


  zoomWrapper.appendChild(
    u9AvatarZoomInput
  );


  zoomWrapper.appendChild(
    u9AvatarZoomValue
  );


  /* =========================
     CHOOSE IMAGE
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


  /* =========================
     APPEND
  ========================= */

  wrapper.appendChild(
    title
  );


  wrapper.appendChild(
    freeSection
  );


  wrapper.appendChild(
    u9AvatarPreview
  );


  wrapper.appendChild(
    dragHint
  );


  wrapper.appendChild(
    zoomWrapper
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
     EVENTS
  ========================= */

  u9AvatarChooseButton.addEventListener(
    "click",
    () => {

      u9AvatarFileInput.click();

    }
  );


  u9AvatarFileInput.addEventListener(
    "change",
    handleAvatarFileChange
  );


  u9AvatarZoomInput.addEventListener(
    "input",
    handleAvatarZoom
  );


  u9AvatarSaveButton.addEventListener(
    "click",
    saveAvatarCrop
  );


  setupAvatarDrag();


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
        u9AvatarSaveButton
      ) {

        u9AvatarSaveButton.disabled =
          !u9AvatarSelectedImage;

      }

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
   LOAD CURRENT AVATAR
========================= */

async function loadCurrentAvatar() {

  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  if (
    !sessionToken
  ) {

    u9AvatarCurrentType =
      "default";

    u9AvatarCurrentId =
      null;

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

    }

    else {

      u9AvatarCurrentType =
        avatar.type ||
        "default";


      u9AvatarCurrentId =
        avatar.id ||
        null;

    }


    updateFreeAvatarSelection();


    console.log(
      "Current avatar:",
      {
        type:
          u9AvatarCurrentType,

        id:
          u9AvatarCurrentId
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
   UPDATE FREE AVATAR
   SELECTED UI
========================= */

function updateFreeAvatarSelection() {

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
    (card) => {

      const isSelected =

        u9AvatarCurrentType ===
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


  /* =========================
     DISABLE
  ========================= */

  cards.forEach(
    (item) => {

      item.disabled =
        true;

    }
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
       FREE CARD SELECTED
    ========================= */

    updateFreeAvatarSelection();


    /* =========================
       STATUS
    ========================= */

    setAvatarStatus(
      "Free avatar updated successfully."
    );


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


    setAvatarStatus(

      error instanceof Error
        ? error.message
        : "Failed to select free avatar.",

      true

    );

  }

  finally {

    cards.forEach(
      (item) => {

        item.disabled =
          false;

      }
    );


    card.classList.remove(
      "loading"
    );

  }

}


/* =========================
   FILE CHANGE
========================= */

function handleAvatarFileChange(
  event
) {

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


  u9AvatarZoom =
    Number(
      u9AvatarZoomInput.value
    );


  const percentage =
    Math.round(
      u9AvatarZoom * 100
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
   DRAG
========================= */

function setupAvatarDrag() {

  if (
    !u9AvatarPreview
  ) {

    return;

  }


  /* =========================
     POINTER DOWN
  ========================= */

  u9AvatarPreview.addEventListener(
    "pointerdown",
    (event) => {

      if (
        !u9AvatarImageLoaded
      ) {

        return;

      }


      if (
        event.target ===
        u9AvatarCropGuide
      ) {

        return;

      }


      u9AvatarDragging =
        true;


      u9AvatarPreview.setPointerCapture(
        event.pointerId
      );


      u9AvatarDragStartX =
        event.clientX;


      u9AvatarDragStartY =
        event.clientY;


      u9AvatarStartOffsetX =
        u9AvatarOffsetX;


      u9AvatarStartOffsetY =
        u9AvatarOffsetY;


      u9AvatarPreview.classList.add(
        "dragging"
      );

    }
  );


  /* =========================
     POINTER MOVE
  ========================= */

  u9AvatarPreview.addEventListener(
    "pointermove",
    (event) => {

      if (
        !u9AvatarDragging
      ) {

        return;

      }


      const deltaX =
        event.clientX -
        u9AvatarDragStartX;


      const deltaY =
        event.clientY -
        u9AvatarDragStartY;


      u9AvatarOffsetX =
        u9AvatarStartOffsetX +
        deltaX;


      u9AvatarOffsetY =
        u9AvatarStartOffsetY +
        deltaY;


      clampAvatarPosition();


      updateAvatarImage();

    }
  );


  /* =========================
     POINTER UP
  ========================= */

  const stopDragging =
    (event) => {

      if (
        !u9AvatarDragging
      ) {

        return;

      }


      u9AvatarDragging =
        false;


      try {

        u9AvatarPreview.releasePointerCapture(
          event.pointerId
        );

      }
      catch {

      }


      u9AvatarPreview.classList.remove(
        "dragging"
      );

    };


  u9AvatarPreview.addEventListener(
    "pointerup",
    stopDragging
  );


  u9AvatarPreview.addEventListener(
    "pointercancel",
    stopDragging
  );


  /* =========================
     MOUSE WHEEL ZOOM
  ========================= */

  u9AvatarPreview.addEventListener(
    "wheel",
    (event) => {

      if (
        !u9AvatarImageLoaded
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

      /* =========================
         COOLDOWN
      ========================= */

      if (
        response.status ===
          429 ||
        result.error ===
          "Avatar is still on cooldown."
      ) {

        let message =
          "Avatar is still on cooldown.";


        if (
          result.remaining_hours
        ) {

          message +=
            ` ${result.remaining_hours} hours remaining.`;

        }


        setAvatarStatus(
          message,
          true
        );


        console.log(
          "Avatar upload cooldown:",
          result
        );


        return;

      }


      /* =========================
         OTHER ERROR
      ========================= */

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
       CACHE BUST
    ========================= */

    const cacheBustedUrl =
      `${avatarUrl}?v=${Date.now()}`;


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
        cacheBustedUrl;

    }


    /* =========================
       UPDATE CURRENT STATE
    ========================= */

    u9AvatarCurrentType =
      "custom";


    u9AvatarCurrentId =
      null;


    /* =========================
       CLEAR FREE SELECTION
    ========================= */

    updateFreeAvatarSelection();


    /* =========================
       SUCCESS MESSAGE
    ========================= */

    setAvatarStatus(
      "Avatar updated successfully."
    );


    console.log(
      "Avatar uploaded successfully:",
      result
    );


    /* =========================
       SAVE STATE
    ========================= */

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
      u9AvatarFileInput
    ) {

      u9AvatarFileInput.value =
        "";

    }

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


    u9AvatarSaveButton.disabled =
      !u9AvatarSelectedImage;

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


  u9AvatarStatus.textContent =
    message || "";


  u9AvatarStatus.classList.toggle(
    "error",
    Boolean(
      isError
    )
  );

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
