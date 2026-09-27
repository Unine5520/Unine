
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
   ME FUNCTION
========================= */

const meFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/me";


/* =========================
   DEFAULT FRAME FUNCTION
========================= */

const defaultFrameFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-default";


/* =========================
   FREE FRAME FUNCTION
========================= */

const freeFrameFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-free";


/* =========================
   EQUIP FRAME FUNCTION
========================= */

const equipFrameFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-equip";


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


    const meResponse =
      await fetch(
        meFunction,
        {
          method: "GET",

          headers: {
            "Authorization":
              `Bearer ${sessionToken}`
          }
        }
      );


    if (!meResponse.ok) {

      console.error(
        "Failed to load current user."
      );

      return;
    }


    const meResult =
      await meResponse.json();


    const user =
      meResult.user;


    if (!user) {

      console.error(
        "User data not found."
      );

      return;
    }


    const frameType =
      user.avatar_frame_type;


    const frameId =
      user.avatar_frame_id;


    console.log(
      "Current frame:",
      {
        type:
          frameType,

        id:
          frameId
      }
    );


    if (
      frameType ===
      "default"
    ) {

      await loadDefaultFrame(
        frameId
      );

      return;
    }


    if (
      frameType ===
      "free"
    ) {

      await loadFreeFrame(
        frameId
      );

      return;
    }


    if (
      frameType ===
      "paid"
    ) {

      console.log(
        "Paid frame loading will be added later."
      );

      return;
    }


    console.error(
      "Unknown frame type:",
      frameType
    );

  }

  catch (error) {

    console.error(
      "Failed to load current frame:",
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
          item.id === frameId
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
          item.id === frameId
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
   LOAD FREE FRAME LIST
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


    const frames =
      result.frames || [];


    /*
     * 找到所有可以点击的 Free Frame
     */

    const frameElements =
      document.querySelectorAll(
        "[data-frame-name]"
      );


    frameElements.forEach(
      (element) => {

        const frameName =
          element.dataset.frameName;


        const frame =
          frames.find(
            (item) =>
              item.name ===
              frameName
          );


        if (!frame) {

          console.error(
            "Free frame not found:",
            frameName
          );

          return;
        }


        /*
         * 保存 UUID
         */

        element.dataset.frameId =
          frame.id;


        /*
         * 保存 SVG URL
         */

        element.dataset.frameSvg =
          frame.svg;


        /*
         * 点击装备
         */

        element.addEventListener(
          "click",
          () => {

            equipFreeFrame(
              frame.id,
              frame.svg,
              frame.name,
              element
            );

          }
        );

      }
    );


    console.log(
      "Free frames loaded:",
      frames
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
   EQUIP FREE FRAME
========================= */

async function equipFreeFrame(
  frameId,
  frameSvg,
  frameName,
  element
) {

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


    /*
     * 防止重复点击
     */

    if (
      element.dataset.equipping ===
      "true"
    ) {

      return;
    }


    element.dataset.equipping =
      "true";


    /*
     * 调用 Edge Function
     */

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
                "free",

              frame_id:
                frameId

            })

        }
      );


    const result =
      await response.json();


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


    /*
     * 立即更新头像 Frame
     */

    accountAvatarFrame.src =
      frameSvg;


    /*
     * 保存当前状态
     */

    console.log(
      "Frame equipped:",
      {
        type:
          "free",

        id:
          frameId,

        name:
          frameName
      }
    );


  }

  catch (error) {

    console.error(
      "Failed to equip free frame:",
      error
    );

  }

  finally {

    element.dataset.equipping =
      "false";

  }

}


/* =========================
   LOAD
========================= */

loadCurrentFrame();

loadFreeFrames();
