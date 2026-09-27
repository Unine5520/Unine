
/* =========================
   ACCOUNT FRAME
========================= */


/* =========================
   AVATAR FRAME
========================= */

const accountAvatarFrame =
  document.getElementById(
    "Account-U9-account-avatar-frame"
  );


/* =========================
   EDIT PROFILE PAGE
========================= */

const editProfilePage =
  document.getElementById(
    "Account-U9-account-edit-profile-page"
  );


/* =========================
   FUNCTIONS
========================= */

const meFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/me";


const defaultFrameFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-default";


const freeFrameFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-free";


const equipFrameFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-equip";


/* =========================
   CURRENT FRAME
========================= */

let currentFrameType = null;

let currentFrameId = null;


/* =========================
   SELECTED FRAME
========================= */

let selectedFrameType = null;

let selectedFrameId = null;


/* =========================
   FRAME DATA
========================= */

let defaultFrames = [];

let freeFrames = [];

let allFrames = [];


/* =========================
   LOAD CURRENT FRAME
========================= */

async function loadCurrentFrame() {

  try {

    const sessionToken =
      localStorage.getItem(
        "u9_session"
      );


    if (!sessionToken) {

      console.error(
        "No session found."
      );

      return;

    }


    const response =
      await fetch(
        meFunction,
        {
          method:
            "GET",

          headers: {
            "Authorization":
              `Bearer ${sessionToken}`
          }
        }
      );


    if (!response.ok) {

      console.error(
        "Failed to load current user."
      );

      return;

    }


    const result =
      await response.json();


    const user =
      result.user;


    if (!user) {

      console.error(
        "User data not found."
      );

      return;

    }


    currentFrameType =
      user.avatar_frame_type ||
      null;


    currentFrameId =
      user.avatar_frame_id ||
      null;


    /*
     * 初始选择 = 当前 Frame
     */

    selectedFrameType =
      currentFrameType;


    selectedFrameId =
      currentFrameId;


    console.log(
      "Current frame:",
      {
        type:
          currentFrameType,

        id:
          currentFrameId
      }
    );


    /*
     * 如果 Frame 数据已经加载
     * 同步当前选中状态
     */

    if (
      allFrames.length > 0
    ) {

      updateSelectedFrameUI();

    }


    /*
     * 显示当前头像 Frame
     */

    await loadCurrentFrameImage();

  }

  catch (error) {

    console.error(
      "Failed to load current frame:",
      error
    );

  }

}


/* =========================
   LOAD CURRENT FRAME IMAGE
========================= */

async function loadCurrentFrameImage() {

  try {

    if (
      !currentFrameType ||
      !currentFrameId
    ) {

      return;

    }


    const frame =
      allFrames.find(
        (item) =>
          item.type ===
            currentFrameType &&
          item.id ===
            currentFrameId
      );


    /*
     * 数据已经在前端
     */

    if (frame) {

      accountAvatarFrame.src =
        frame.svg;

      return;

    }


    /*
     * Default
     */

    if (
      currentFrameType ===
      "default"
    ) {

      await loadDefaultFrame(
        currentFrameId
      );

      return;

    }


    /*
     * Free
     */

    if (
      currentFrameType ===
      "free"
    ) {

      await loadFreeFrame(
        currentFrameId
      );

      return;

    }


    /*
     * Paid
     */

    if (
      currentFrameType ===
      "paid"
    ) {

      console.log(
        "Paid frame loading will be added later."
      );

    }

  }

  catch (error) {

    console.error(
      "Failed to load current frame image:",
      error
    );

  }

}


/* =========================
   LOAD DEFAULT FRAME
========================= */

async function loadDefaultFrame(
  frameId
) {

  try {

    const response =
      await fetch(
        defaultFrameFunction,
        {
          method:
            "GET"
        }
      );


    if (!response.ok) {

      console.error(
        "Failed to load default frames."
      );

      return;

    }


    const result =
      await response.json();


    const frame =
      result.frames?.find(
        (item) =>
          item.id ===
          frameId
      );


    if (!frame) {

      console.error(
        "Current default frame not found:",
        frameId
      );

      return;

    }


    accountAvatarFrame.src =
      frame.svg;


    console.log(
      "Current default frame:",
      frame
    );

  }

  catch (error) {

    console.error(
      "Failed to load default frame:",
      error
    );

  }

}


/* =========================
   LOAD FREE FRAME
========================= */

async function loadFreeFrame(
  frameId
) {

  try {

    const response =
      await fetch(
        freeFrameFunction,
        {
          method:
            "GET"
        }
      );


    if (!response.ok) {

      console.error(
        "Failed to load free frames."
      );

      return;

    }


    const result =
      await response.json();


    const frame =
      result.frames?.find(
        (item) =>
          item.id ===
          frameId
      );


    if (!frame) {

      console.error(
        "Current free frame not found:",
        frameId
      );

      return;

    }


    accountAvatarFrame.src =
      frame.svg;


    console.log(
      "Current free frame:",
      frame
    );

  }

  catch (error) {

    console.error(
      "Failed to load free frame:",
      error
    );

  }

}


/* =========================
   LOAD DEFAULT FRAMES
========================= */

async function loadDefaultFrames() {

  try {

    const response =
      await fetch(
        defaultFrameFunction,
        {
          method:
            "GET"
        }
      );


    if (!response.ok) {

      console.error(
        "Failed to load default frame list."
      );

      return;

    }


    const result =
      await response.json();


    defaultFrames =
      (
        result.frames ||
        []
      ).map(
        (frame) => ({

          id:
            frame.id,

          name:
            frame.name,

          svg:
            frame.svg,

          type:
            "default"

        })
      );


    console.log(
      "Default frames loaded:",
      defaultFrames
    );

  }

  catch (error) {

    console.error(
      "Failed to load default frames:",
      error
    );

  }

}


/* =========================
   LOAD FREE FRAMES
========================= */

async function loadFreeFrames() {

  try {

    const response =
      await fetch(
        freeFrameFunction,
        {
          method:
            "GET"
        }
      );


    if (!response.ok) {

      console.error(
        "Failed to load free frame list."
      );

      return;

    }


    const result =
      await response.json();


    freeFrames =
      (
        result.frames ||
        []
      )
      .filter(
        (frame) =>
          frame.is_active !== false
      )
      .map(
        (frame) => ({

          id:
            frame.id,

          name:
            frame.name,

          svg:
            frame.svg,

          type:
            "free"

        })
      );


    console.log(
      "Free frames loaded:",
      freeFrames
    );

  }

  catch (error) {

    console.error(
      "Failed to load free frames:",
      error
    );

  }

}


/* =========================
   COMBINE FRAME DATA
========================= */

function buildAllFrames() {

  allFrames = [

    ...defaultFrames,

    ...freeFrames

  ];


  console.log(
    "All frames:",
    allFrames
  );

}


/* =========================
   CREATE EDIT PROFILE UI
========================= */

function createFrameEditor() {

  if (!editProfilePage) {

    console.error(
      "Edit Profile Page not found."
    );

    return;

  }


  /*
   * 清空旧内容
   */

  editProfilePage.innerHTML =
    "";


  /* =========================
     WRAPPER
  ========================= */

  const wrapper =
    document.createElement(
      "div"
    );

  wrapper.id =
    "Account-U9-frame-editor";


  /* =========================
     TITLE
  ========================= */

  const title =
    document.createElement(
      "div"
    );

  title.id =
    "Account-U9-frame-editor-title";

  title.textContent =
    "Frame";


  /* =========================
     FRAME LIST
  ========================= */

  const frameList =
    document.createElement(
      "div"
    );

  frameList.id =
    "Account-U9-frame-editor-list";


  /* =========================
     CONFIRM BUTTON
  ========================= */

  const confirmButton =
    document.createElement(
      "button"
    );

  confirmButton.id =
    "Account-U9-frame-editor-confirm";

  confirmButton.type =
    "button";

  confirmButton.textContent =
    "Confirm";

  confirmButton.disabled =
    true;


  /* =========================
     APPEND
  ========================= */

  wrapper.appendChild(
    title
  );

  wrapper.appendChild(
    frameList
  );

  wrapper.appendChild(
    confirmButton
  );


  editProfilePage.appendChild(
    wrapper
  );


  /*
   * Render Frame
   */

  renderFrameList();


  /*
   * Confirm
   */

  confirmButton.addEventListener(
    "click",
    confirmSelectedFrame
  );

}


/* =========================
   RENDER FRAME LIST
========================= */

function renderFrameList() {

  const frameList =
    document.getElementById(
      "Account-U9-frame-editor-list"
    );


  if (!frameList) {

    return;

  }


  frameList.innerHTML =
    "";


  allFrames.forEach(
    (frame) => {

      const button =
        document.createElement(
          "button"
        );

      button.type =
        "button";

      button.className =
        "Account-U9-frame-card";


      button.dataset.frameType =
        frame.type;


      button.dataset.frameId =
        frame.id;


      /* =========================
         FRAME IMAGE
      ========================= */

      const image =
        document.createElement(
          "img"
        );

      image.className =
        "Account-U9-frame-card-image";

      image.src =
        frame.svg;

      image.alt =
        frame.name;

      image.draggable =
        false;


      /* =========================
         FRAME NAME
      ========================= */

      const name =
        document.createElement(
          "span"
        );

      name.className =
        "Account-U9-frame-card-name";

      name.textContent =
        frame.name;


      /* =========================
         TYPE
      ========================= */

      const type =
        document.createElement(
          "span"
        );

      type.className =
        "Account-U9-frame-card-type";

      type.textContent =
        frame.type ===
          "default"
          ? "Default"
          : "Free";


      /* =========================
         CHECK
      ========================= */

      const check =
        document.createElement(
          "span"
        );

      check.className =
        "Account-U9-frame-card-check";

      check.textContent =
        "✓";


      /* =========================
         CONTENT
      ========================= */

      button.appendChild(
        image
      );

      button.appendChild(
        name
      );

      button.appendChild(
        type
      );

      button.appendChild(
        check
      );


      /* =========================
         CLICK
      ========================= */

      button.addEventListener(
        "click",
        () => {

          selectFrame(
            frame.type,
            frame.id
          );

        }
      );


      frameList.appendChild(
        button
      );

    }
  );


  updateSelectedFrameUI();

}


/* =========================
   SELECT FRAME
========================= */

function selectFrame(
  frameType,
  frameId
) {

  selectedFrameType =
    frameType;


  selectedFrameId =
    frameId;


  updateSelectedFrameUI();


  console.log(
    "Frame selected:",
    {
      type:
        frameType,

      id:
        frameId
    }
  );

}


/* =========================
   UPDATE SELECTED UI
========================= */

function updateSelectedFrameUI() {

  const cards =
    document.querySelectorAll(
      ".Account-U9-frame-card"
    );


  cards.forEach(
    (card) => {

      const isSelected =
        card.dataset.frameType ===
          selectedFrameType &&
        card.dataset.frameId ===
          selectedFrameId;


      if (isSelected) {

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


  updateConfirmButton();

}


/* =========================
   CONFIRM BUTTON
========================= */

function updateConfirmButton() {

  const confirmButton =
    document.getElementById(
      "Account-U9-frame-editor-confirm"
    );


  if (!confirmButton) {

    return;

  }


  const hasSelection =
    Boolean(
      selectedFrameType &&
      selectedFrameId
    );


  const isSameAsCurrent =
    selectedFrameType ===
      currentFrameType &&
    selectedFrameId ===
      currentFrameId;


  confirmButton.disabled =
    !hasSelection ||
    isSameAsCurrent;

}


/* =========================
   CONFIRM SELECTED FRAME
========================= */

async function confirmSelectedFrame() {

  if (
    !selectedFrameType ||
    !selectedFrameId
  ) {

    return;

  }


  /*
   * 当前已经是这个 Frame
   */

  if (
    selectedFrameType ===
      currentFrameType &&
    selectedFrameId ===
      currentFrameId
  ) {

    return;

  }


  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  if (!sessionToken) {

    console.error(
      "No session found."
    );

    return;

  }


  const confirmButton =
    document.getElementById(
      "Account-U9-frame-editor-confirm"
    );


  const selectedFrame =
    allFrames.find(
      (frame) =>
        frame.type ===
          selectedFrameType &&
        frame.id ===
          selectedFrameId
    );


  if (!selectedFrame) {

    console.error(
      "Selected frame not found."
    );

    return;

  }


  try {

    /*
     * Loading
     */

    if (confirmButton) {

      confirmButton.disabled =
        true;

      confirmButton.classList.add(
        "loading"
      );

      confirmButton.textContent =
        "Saving...";

    }


    /* =========================
       REQUEST
    ========================= */

    const response =
      await fetch(
        equipFrameFunction,
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

              frame_type:
                selectedFrameType,

              frame_id:
                selectedFrameId

            })

        }
      );


    const result =
      await response.json();


    /* =========================
       FAILED
    ========================= */

    if (!response.ok) {

      console.error(
        "Equip frame failed:",
        result
      );

      return;

    }


    if (
      !result.success
    ) {

      console.error(
        "Equip frame failed:",
        result
      );

      return;

    }


    /* =========================
       SAVE CURRENT STATE
    ========================= */

    currentFrameType =
      selectedFrameType;


    currentFrameId =
      selectedFrameId;


    /* =========================
       UPDATE AVATAR
    ========================= */

    accountAvatarFrame.src =
      selectedFrame.svg;


    /* =========================
       UPDATE UI
    ========================= */

    updateSelectedFrameUI();


    console.log(
      "Frame equipped successfully:",
      {
        type:
          selectedFrameType,

        id:
          selectedFrameId,

        name:
          selectedFrame.name
      }
    );

  }

  catch (error) {

    console.error(
      "Failed to equip frame:",
      error
    );

  }

  finally {

    if (confirmButton) {

      confirmButton.classList.remove(
        "loading"
      );

      confirmButton.textContent =
        "Confirm";

      updateConfirmButton();

    }

  }

}


/* =========================
   LOAD EDIT PROFILE
========================= */

async function loadFrameEditor() {

  try {

    await Promise.all([

      loadDefaultFrames(),

      loadFreeFrames(),

      loadCurrentFrame()

    ]);


    buildAllFrames();


    /*
     * 再次同步当前选择
     */

    if (
      currentFrameType &&
      currentFrameId
    ) {

      selectedFrameType =
        currentFrameType;

      selectedFrameId =
        currentFrameId;

    }


    createFrameEditor();

  }

  catch (error) {

    console.error(
      "Failed to load frame editor:",
      error
    );

  }

}


/* =========================
   LOAD
========================= */

loadFrameEditor();
