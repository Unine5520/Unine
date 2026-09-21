
/* =========================
   ACCOUNT SETTING
========================= */

const accountSetting =
  document.getElementById(
    "U9-account-setting"
  );


/* =========================
   OPEN ACCOUNT SETTING
========================= */

userButton.addEventListener(
  "click",
  () => {

    accountSetting.style.display =
      "block";

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

      accountSetting.style.display =
        "none";

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
  () => {

    accountSetting.style.display =
      "none";


    openLogoutConfirm();

  }
);
