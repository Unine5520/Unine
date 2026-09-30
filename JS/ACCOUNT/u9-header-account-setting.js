
/* =========================
   U9 HEADER ACCOUNT SETTING
========================= */


/* =========================
   LOGOUT BUTTON
========================= */

const u9AccountLogout =
  document.getElementById(
    "Account-U9-account-logout"
  );


/* =========================
   LOGOUT CONFIRM MODAL
========================= */

const u9LogoutModal =
  document.getElementById(
    "U9-account-logout"
  );


/* =========================
   SETTING LOGOUT BUTTON
========================= */

if (u9AccountLogout) {

  u9AccountLogout.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();


      /*
       * Close Account Setting
       */

      if (
        typeof closeAccountSetting ===
        "function"
      ) {

        closeAccountSetting();

      }


      /*
       * Open Logout Confirm Modal
       */

      if (u9LogoutModal) {

        u9LogoutModal.style.display =
          "flex";

      }

    }
  );

}
