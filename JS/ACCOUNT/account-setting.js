/* =========================
   ACCOUNT SETTING
========================= */

const accountSetting =
  document.getElementById(
    "U9-account-setting"
  );


/* =========================
   BACK BUTTON
========================= */

const accountSettingBack =
  document.getElementById(
    "U9-account-setting-back"
  );


/* =========================
   OPEN / CLOSE
========================= */

function openAccountSetting() {

  accountSetting.classList.add(
    "active"
  );

}


function closeAccountSetting() {

  accountSetting.classList.remove(
    "active"
  );

}


/* =========================
   OPEN ACCOUNT SETTING
========================= */

userButton.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    if (
      accountSetting.classList.contains(
        "active"
      )
    ) {

      closeAccountSetting();

      return;

    }


    openAccountSetting();

  }
);


/* =========================
   CLICK HEADER
   CLOSE ACCOUNT SETTING
========================= */

const pageHeader =
  document.getElementById(
    "U9-page-header"
  );


pageHeader.addEventListener(
  "click",
  () => {

    if (
      accountSetting.classList.contains(
        "active"
      )
    ) {

      closeAccountSetting();

    }

  }
);


/* =========================
   X BUTTON
   CLOSE ACCOUNT SETTING
========================= */

accountSettingBack.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    closeAccountSetting();

  }
);


/* =========================
   CLICK BACKGROUND
   CLOSE ACCOUNT SETTING
========================= */

accountSetting.addEventListener(
  "click",
  (event) => {

    if (
      event.target ===
      accountSetting
    ) {

      closeAccountSetting();

    }

  }
);


/* =========================
   LOGOUT BUTTON
========================= */

const accountSettingLogout =
  document.getElementById(
    "U9-account-setting-5"
  );


accountSettingLogout.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    closeAccountSetting();


    openLogoutConfirm();

  }
);
