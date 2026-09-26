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

    accountSetting.classList.add(
      "active"
    );

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

      accountSetting.classList.remove(
        "active"
      );

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

    accountSetting.classList.remove(
      "active"
    );


    openLogoutConfirm();

  }
);
