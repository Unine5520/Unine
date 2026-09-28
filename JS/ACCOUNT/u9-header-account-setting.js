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
   LOGOUT
========================= */

if (u9AccountLogout) {

  u9AccountLogout.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();


      /* =========================
         REMOVE SESSION
      ========================= */

      localStorage.removeItem(
        "u9_session"
      );


      /* =========================
         RELOAD PAGE
      ========================= */

      window.location.reload();

    }
  );

}
