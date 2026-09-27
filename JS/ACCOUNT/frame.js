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
   DEFAULT FRAME URL
========================= */

const defaultFrameFunction =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-default";


/* =========================
   LOAD DEFAULT FRAME
========================= */

async function loadDefaultFrame() {

  try {

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
        "Failed to load default frame."
      );

      return;

    }


    /* =========================
       JSON
    ========================= */

    const result =
      await response.json();


    /* =========================
       GET FRAME
    ========================= */

    const frame =
      result.frames?.[0];


    if (!frame) {

      console.error(
        "Default frame not found."
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
      "Default frame:",
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
   LOAD
========================= */

loadDefaultFrame();
