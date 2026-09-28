
/* =========================
   U9 HEADER ACCOUNT
   ADD FRIEND
========================= */


/* =========================
   ADD FRIEND HEADER TEXT
========================= */

const u9AddFriendHeaderText =
  document.getElementById(
    "Account-U9-account-add-friend-page-header-text"
  );


/* =========================
   ADD FRIEND BACK BUTTON
========================= */

const u9AddFriendBackButton =
  document.getElementById(
    "Account-U9-account-add-friend-page-back"
  );


/* =========================
   HEADER TEXT
========================= */

if (u9AddFriendHeaderText) {

  u9AddFriendHeaderText.textContent =
    "Add Friend";

}


/* =========================
   BACK BUTTON
========================= */

if (u9AddFriendBackButton) {

  u9AddFriendBackButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();


      /*
       * Return to Account page
       */

      if (
        window.U9AccountProfile &&
        typeof
          window.U9AccountProfile
            .showAccountPage ===
          "function"
      ) {

        window.U9AccountProfile
          .showAccountPage();

      }

    }
  );

}
