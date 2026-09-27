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
   LOAD CURRENT FRAME
========================= */

async function loadCurrentFrame() {

  try {

    /* =========================
       GET SESSION
    ========================= */

    const sessionToken =
      localStorage.getItem(
        "u9_session"
      );


    /* =========================
       NO SESSION
    ========================= */

    if (!sessionToken) {

      console.error(
        "No session found."
      );

      return;

    }


    /* =========================
       GET CURRENT USER
    ========================= */

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


    /* =========================
       ME FAILED
    ========================= */

    if (!meResponse.ok) {

      console.error(
        "Failed to load current user."
      );

      return;

    }


    /* =========================
       ME JSON
    ========================= */

    const meResult =
      await meResponse.json();


    /* =========================
       USER
    ========================= */

    const user =
      meResult.user;


    if (!user) {

      console.error(
        "User data not found."
      );

      return;

    }


    /* =========================
       CURRENT FRAME TYPE
    ========================= */

    const frameType =
      user.avatar_frame_type;


    /* =========================
       CURRENT FRAME ID
    ========================= */

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


    /* =========================
       DEFAULT FRAME
    ========================= */

    if (
      frameType ===
      "default"
    ) {

      await loadDefaultFrame(
        frameId
      );

      return;

    }


    /* =========================
       FREE FRAME
    ========================= */

    if (
      frameType ===
      "free"
    ) {

      await loadFreeFrame(
        frameId
      );

      return;

    }


    /* =========================
       PAID FRAME
       LATER
    ========================= */

    if (
      frameType ===
      "paid"
    ) {

      console.log(
        "Paid frame loading will be added later."
      );

      return;

    }


    /* =========================
       UNKNOWN TYPE
    ========================= */

    console.error(
      "Unknown frame type:",
      frameType
    );

  } catch (error) {

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

    /* =========================
       REQUEST
    ========================= */

    const response =
      await fetch(
        defaultFrameFunction,
        {
          method: "GET"
        }
      );


    /* =========================
       REQUEST FAILED
    ========================= */

    if (!response.ok) {

      console.error(
        "Failed to load default frames."
      );

      return;

    }


    /* =========================
       JSON
    ========================= */

    const result =
      await response.json();


    /* =========================
       FIND CURRENT FRAME
    ========================= */

    const frame =
      result.frames?.find(
        (item) =>
          item.id === frameId
      );


    /* =========================
       FRAME NOT FOUND
    ========================= */

    if (!frame) {

      console.error(
        "Current default frame not found:",
        frameId
      );

      return;

    }


    /* =========================
       SET FRAME
    ========================= */

    accountAvatarFrame.src =
      frame.svg;


    /* =========================
       DEBUG
    ========================= */

    console.log(
      "Current default frame:",
      frame
    );


  } catch (error) {

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

    /* =========================
       REQUEST
    ========================= */

    const response =
      await fetch(
        freeFrameFunction,
        {
          method: "GET"
        }
      );


    /* =========================
       REQUEST FAILED
    ========================= */

    if (!response.ok) {

      console.error(
        "Failed to load free frames."
      );

      return;

    }


    /* =========================
       JSON
    ========================= */

    const result =
      await response.json();


    /* =========================
       FIND CURRENT FRAME
    ========================= */

    const frame =
      result.frames?.find(
        (item) =>
          item.id === frameId
      );


    /* =========================
       FRAME NOT FOUND
    ========================= */

    if (!frame) {

      console.error(
        "Current free frame not found:",
        frameId
      );

      return;

    }


    /* =========================
       SET FRAME
    ========================= */

    accountAvatarFrame.src =
      frame.svg;


    /* =========================
       DEBUG
    ========================= */

    console.log(
      "Current free frame:",
      frame
    );


  } catch (error) {

    console.error(
      "Failed to load free frame:",
      error
    );

  }

}


/* =========================
   LOAD
========================= */

loadCurrentFrame();
