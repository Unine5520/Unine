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
   TEMPORARY
========================= */

logoutYes.addEventListener(
  "click",
  () => {

    if (
      logoutYes.disabled
    ) {

      return;

    }


    console.log(
      "Logout confirmed."
    );

  }
);
