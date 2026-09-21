/* =========================
   ACCOUNT SETTING
========================= */

const accountSetting =
  document.getElementById(
    "U9-account-setting"
  );


const userButton =
  document.getElementById(
    "U9-page-header-user"
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
