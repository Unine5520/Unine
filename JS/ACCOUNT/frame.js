
/* =========================
   AVATAR FRAME
========================= */


/* =========================
   AVATAR FRAME
========================= */

const accountAvatarFrame =
  document.getElementById(
    "Account-U9-account-avatar-frame"
  );


/* =========================
   LOADING FRAME
========================= */

const loadingFrameSvg =
  "SVG/ordinary.svg";


if (accountAvatarFrame) {

  accountAvatarFrame.src =
    loadingFrameSvg;

}


/* =========================
   EDIT PROFILE PAGE
========================= */

const accountFrameEditPage =
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


const paidFrameFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-paid";


const equipFrameFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-equip";


const paidFramePurchaseFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-paid-purchase";


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

let paidFrames = [];

let allFrames = [];


/* =========================
   PURCHASE MODAL
========================= */

let purchaseModal = null;


/* =========================
   PURCHASE PROCESS
========================= */

let purchasingFrame = false;


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
     * 如果 Frame 已经加载
     * 更新选中状态
     */

    if (
      allFrames.length > 0
    ) {

      updateSelectedFrameUI();

    }


    /*
     * 显示当前 Frame
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


    /*
     * 优先从已经加载的数据里面找
     */

    const frame =
      allFrames.find(
        (item) =>

          item.type ===
            currentFrameType &&

          item.id ===
            currentFrameId
      );


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
        "Current paid frame is waiting for paid frame data."
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
   LOAD PAID FRAMES
========================= */

async function loadPaidFrames() {

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
        paidFrameFunction,
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
        "Failed to load paid frames."
      );

      return;

    }


    const result =
      await response.json();


    if (
      !result.success
    ) {

      console.error(
        "Failed to load paid frames:",
        result
      );

      return;

    }


    paidFrames =
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

          coins_price:
            Number(
              frame.coins_price || 0
            ),

          is_active:
            frame.is_active,

          owned:
            frame.owned === true,

          type:
            "paid"

        })
      );


    console.log(
      "Paid frames loaded:",
      paidFrames
    );

  }

  catch (error) {

    console.error(
      "Failed to load paid frames:",
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

    ...freeFrames,

    ...paidFrames

  ];


  console.log(
    "All frames:",
    allFrames
  );

}


/* =========================
   CREATE FRAME EDITOR
========================= */

function createFrameEditor() {

  if (!accountFrameEditPage) {

    console.error(
      "Edit Profile Page not found."
    );

    return;

  }


  /*
   * 清空页面
   */

  accountFrameEditPage.innerHTML =
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
     CONFIRM
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


  accountFrameEditPage.appendChild(
    wrapper
  );


  /* =========================
     RENDER
  ========================= */

  renderFrameList();


  /* =========================
     CONFIRM
  ========================= */

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

      /* =========================
         CARD
      ========================= */

      const card =
        document.createElement(
          "button"
        );


      card.type =
        "button";


      card.className =
        "Account-U9-frame-card";


      card.dataset.frameType =
        frame.type;


      card.dataset.frameId =
        frame.id;


      /* =========================
         PAID OWNERSHIP
      ========================= */

      if (
        frame.type ===
        "paid"
      ) {

        card.dataset.owned =
          frame.owned
            ? "true"
            : "false";

      }


      /* =========================
         IMAGE
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
         NAME
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


      if (
        frame.type ===
        "default"
      ) {

        type.textContent =
          "Default";

      }

      else if (
        frame.type ===
        "free"
      ) {

        type.textContent =
          "Free";

      }

      else if (
        frame.type ===
        "paid"
      ) {

        type.textContent =
          frame.owned
            ? "Owned"
            : `${frame.coins_price} Coins`;

      }


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
         PAID LOCK
      ========================= */

      let lock = null;


      if (
        frame.type ===
          "paid" &&
        !frame.owned
      ) {

        card.classList.add(
          "locked"
        );


        lock =
          document.createElement(
            "span"
          );


        lock.className =
          "Account-U9-frame-card-lock";


        lock.textContent =
          "🔒";


        card.appendChild(
          lock
        );

      }


      /* =========================
         APPEND
      ========================= */

      card.appendChild(
        image
      );


      card.appendChild(
        name
      );


      card.appendChild(
        type
      );


      card.appendChild(
        check
      );


      /* =========================
         CLICK
      ========================= */

      card.addEventListener(
        "click",
        () => {

          /*
           * Paid + 未购买
           * 打开购买弹窗
           */

          if (
            frame.type ===
              "paid" &&
            !frame.owned
          ) {

            openPurchaseModal(
              frame
            );

            return;

          }


          /*
           * 已购买 / Default / Free
           * 正常选择
           */

          selectFrame(
            frame.type,
            frame.id
          );

        }
      );


      frameList.appendChild(
        card
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
   UPDATE CONFIRM BUTTON
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
   * 已经是当前 Frame
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

    /* =========================
       LOADING
    ========================= */

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
       RESPONSE FAILED
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
       UPDATE CURRENT STATE
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
   OPEN PURCHASE MODAL
========================= */

function openPurchaseModal(
  frame
) {

  if (
    purchasingFrame
  ) {

    return;

  }


  closePurchaseModal();


  /* =========================
     OVERLAY
  ========================= */

  const overlay =
    document.createElement(
      "div"
    );


  overlay.id =
    "Account-U9-frame-purchase-modal";


  /* =========================
     CONTENT
  ========================= */

  const content =
    document.createElement(
      "div"
    );


  content.id =
    "Account-U9-frame-purchase-content";


  /* =========================
     TITLE
  ========================= */

  const title =
    document.createElement(
      "div"
    );


  title.id =
    "Account-U9-frame-purchase-title";


  title.textContent =
    "Purchase Frame";


  /* =========================
     FRAME IMAGE
  ========================= */

  const image =
    document.createElement(
      "img"
    );


  image.id =
    "Account-U9-frame-purchase-image";


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
      "div"
    );


  name.id =
    "Account-U9-frame-purchase-name";


  name.textContent =
    frame.name;


  /* =========================
     PRICE
  ========================= */

  const price =
    document.createElement(
      "div"
    );


  price.id =
    "Account-U9-frame-purchase-price";


  price.textContent =
    `${frame.coins_price} Coins`;


  /* =========================
     MESSAGE
  ========================= */

  const message =
    document.createElement(
      "div"
    );


  message.id =
    "Account-U9-frame-purchase-message";


  message.textContent =
    `Purchase ${frame.name} for ${frame.coins_price} Coins?`;


  /* =========================
     ACTIONS
  ========================= */

  const actions =
    document.createElement(
      "div"
    );


  actions.id =
    "Account-U9-frame-purchase-actions";


  /* =========================
     CANCEL
  ========================= */

  const cancelButton =
    document.createElement(
      "button"
    );


  cancelButton.id =
    "Account-U9-frame-purchase-cancel";


  cancelButton.type =
    "button";


  cancelButton.textContent =
    "Cancel";


  /* =========================
     CONFIRM
  ========================= */

  const confirmButton =
    document.createElement(
      "button"
    );


  confirmButton.id =
    "Account-U9-frame-purchase-confirm";


  confirmButton.type =
    "button";


  confirmButton.textContent =
    "Confirm";


  /* =========================
     APPEND ACTIONS
  ========================= */

  actions.appendChild(
    cancelButton
  );


  actions.appendChild(
    confirmButton
  );


  /* =========================
     APPEND CONTENT
  ========================= */

  content.appendChild(
    title
  );


  content.appendChild(
    image
  );


  content.appendChild(
    name
  );


  content.appendChild(
    price
  );


  content.appendChild(
    message
  );


  content.appendChild(
    actions
  );


  overlay.appendChild(
    content
  );


  document.body.appendChild(
    overlay
  );


  purchaseModal =
    overlay;


  /* =========================
     CANCEL
  ========================= */

  cancelButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      closePurchaseModal();

    }
  );


  /* =========================
     CONFIRM
  ========================= */

  confirmButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      purchasePaidFrame(
        frame,
        confirmButton
      );

    }
  );


  /* =========================
     BACKGROUND
  ========================= */

  overlay.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        overlay
      ) {

        closePurchaseModal();

      }

    }
  );

}


/* =========================
   CLOSE PURCHASE MODAL
========================= */

function closePurchaseModal() {

  if (
    purchaseModal
  ) {

    purchaseModal.remove();

    purchaseModal =
      null;

  }


  purchasingFrame =
    false;

}


/* =========================
   PURCHASE PAID FRAME
========================= */

async function purchasePaidFrame(
  frame,
  confirmButton
) {

  if (
    purchasingFrame
  ) {

    return;

  }


  purchasingFrame =
    true;


  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  if (!sessionToken) {

    console.error(
      "No session found."
    );

    purchasingFrame =
      false;

    return;

  }


  /*
   * 找到购买弹窗里的 Message
   */

  const message =
    document.getElementById(
      "Account-U9-frame-purchase-message"
    );


  try {

    /* =========================
       LOADING
    ========================= */

    if (confirmButton) {

      confirmButton.disabled =
        true;

      confirmButton.textContent =
        "Purchasing...";

      confirmButton.classList.add(
        "loading"
      );

    }


    /* =========================
       REQUEST
    ========================= */

    const response =
      await fetch(
        paidFramePurchaseFunction,
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

              frame_id:
                frame.id

            })

        }
      );


    const result =
      await response.json();


    /* =========================
       BUSINESS ERROR
    ========================= */

    if (
      !response.ok ||
      !result.success
    ) {

      /*
       * Coins 不足
       */

      if (
        result.message ===
        "Not enough coins."
      ) {

        const currentCoins =
          Number(
            result.coins || 0
          );


        const requiredCoins =
          Number(
            result.required_coins || 0
          );


        if (message) {

          message.textContent =
            `Not enough Coins. You have ${currentCoins.toFixed(2)} Coins, but you need ${requiredCoins.toFixed(2)} Coins.`;

          message.classList.add(
            "error"
          );

        }


        return;

      }


      /*
       * 已经购买
       */

      if (
        result.message ===
        "Paid frame already purchased."
      ) {

        /*
         * 更新前端 owned
         */

        const paidFrameIndex =
          paidFrames.findIndex(
            (item) =>
              item.id ===
              frame.id
          );


        if (
          paidFrameIndex !==
          -1
        ) {

          paidFrames[
            paidFrameIndex
          ].owned =
            true;

        }


        buildAllFrames();

        closePurchaseModal();

        renderFrameList();

        console.log(
          "Paid frame was already purchased."
        );

        return;

      }


      /*
       * 其他购买错误
       */

      if (message) {

        message.textContent =
          result.message ||
          "Purchase failed.";

        message.classList.add(
          "error"
        );

      }


      console.error(
        "Purchase failed:",
        result
      );


      return;

    }


    /* =========================
       PURCHASE SUCCESS
    ========================= */

    const paidFrameIndex =
      paidFrames.findIndex(
        (item) =>
          item.id ===
          frame.id
      );


    if (
      paidFrameIndex !==
      -1
    ) {

      paidFrames[
        paidFrameIndex
      ].owned =
        true;

    }


    /* =========================
       CURRENT COINS
    ========================= */

    console.log(
      "Coins after purchase:",
      result.coins
    );


    /* =========================
       REBUILD DATA
    ========================= */

    buildAllFrames();


    /* =========================
       CLOSE MODAL
    ========================= */

    closePurchaseModal();


    /* =========================
       RENDER
    ========================= */

    renderFrameList();


    console.log(
      "Paid frame purchased successfully:",
      {
        id:
          frame.id,

        name:
          frame.name,

        coins:
          result.coins
      }
    );

  }

  catch (error) {

    console.error(
      "Failed to purchase paid frame:",
      error
    );


    if (message) {

      message.textContent =
        "Network error. Please try again.";

      message.classList.add(
        "error"
      );

    }

  }

  finally {

    purchasingFrame =
      false;


    /*
     * 如果购买成功
     * Modal 已经关闭
     *
     * 如果失败
     * 恢复 Confirm
     */

    if (
      purchaseModal &&
      confirmButton
    ) {

      confirmButton.classList.remove(
        "loading"
      );


      confirmButton.textContent =
        "Confirm";


      confirmButton.disabled =
        false;

    }

  }

}


/* =========================
   LOAD FRAME EDITOR
========================= */

async function loadFrameEditor() {

  try {

    /*
     * 同时读取：
     *
     * Default
     * Free
     * Paid
     * Current User
     */

    await Promise.all([

      loadDefaultFrames(),

      loadFreeFrames(),

      loadPaidFrames(),

      loadCurrentFrame()

    ]);


    /* =========================
       COMBINE
    ========================= */

    buildAllFrames();


    /* =========================
       CURRENT SELECTION
    ========================= */

    if (
      currentFrameType &&
      currentFrameId
    ) {

      selectedFrameType =
        currentFrameType;


      selectedFrameId =
        currentFrameId;

    }


    /* =========================
       LOAD CURRENT IMAGE AGAIN
    ========================= */

    /*
     * Promise.all 完成以后
     * allFrames 已经存在
     *
     * 如果当前是 Paid Frame
     * 这里可以找到它
     */

    await loadCurrentFrameImage();


    /* =========================
       CREATE UI
    ========================= */

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
   START
========================= */

loadFrameEditor();
