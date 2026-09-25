/* =========================
   LOGOUT CONFIRM
========================= */

const logoutModal =
  document.getElementById(
    "U9-account-logout"
  );


const logoutNo =
  document.getElementById(
    "U9-account-logout-no"
  );


const logoutYes =
  document.getElementById(
    "U9-account-logout-yes"
  );


const logoutCountdown =
  document.getElementById(
    "U9-account-logout-countdown"
  );


let logoutTimer = null;


/* =========================
   OPEN LOGOUT CONFIRM
========================= */

function openLogoutConfirm() {

  logoutModal.style.display =
    "flex";


  /* Reset */

  logoutYes.disabled =
    true;


  let count = 5;

  logoutCountdown.textContent =
    count;


  logoutYes.textContent =
    `Yes (${count})`;


  /* Clear old timer */

  if (logoutTimer) {

    clearInterval(
      logoutTimer
    );

  }


  /* Countdown */

  logoutTimer =
    setInterval(
      () => {

        count--;

        logoutCountdown.textContent =
          count;


        logoutYes.textContent =
          `Yes (${count})`;


        if (count <= 0) {

          clearInterval(
            logoutTimer
          );


          logoutTimer =
            null;


          logoutYes.textContent =
            "Yes";


          logoutYes.disabled =
            false;

        }

      },
      1000
    );

}


/* =========================
   NO
========================= */

logoutNo.addEventListener(
  "click",
  () => {

    logoutModal.style.display =
      "none";


    if (logoutTimer) {

      clearInterval(
        logoutTimer
      );

      logoutTimer =
        null;

    }

  }
);


/* =========================
   YES
========================= */

logoutYes.addEventListener(
  "click",
  async () => {

    if (
      logoutYes.disabled
    ) {

      return;

    }


    /* =========================
       GET SESSION TOKEN
    ========================= */

    const sessionToken =
      localStorage.getItem(
        "u9_session"
      );


    /* =========================
       LOGOUT REQUEST
    ========================= */

    try {

      const response =
        await fetch(
          "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/logout",
          {
            method: "POST",

            credentials: "include",

            headers: {

              "Authorization":
                `Bearer ${sessionToken}`

            }

          }
        );


      const result =
        await response.json();


      /* =========================
         LOGOUT ERROR
      ========================= */

      if (!response.ok) {

        alert(
          result.error ||
          "Logout failed."
        );

        return;

      }


      /* =========================
         REMOVE LOCAL SESSION
      ========================= */

      localStorage.removeItem(
        "u9_session"
      );


      /* =========================
         CLOSE MODAL
      ========================= */

      logoutModal.style.display =
        "none";


      if (logoutTimer) {

        clearInterval(
          logoutTimer
        );

        logoutTimer =
          null;

      }


      /* =========================
         UPDATE HEADER
      ========================= */

      await getCurrentUser();


      /* =========================
         DEBUG
      ========================= */

      console.log(
        "Logout result:",
        result
      );


    } catch (error) {

      console.error(
        "Logout error:",
        error
      );


      alert(
        "Unable to connect to the server."
      );

    }

  }
);
