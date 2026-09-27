/* =========================
   ACCOUNT SETTING
========================= */

const accountSetting =
  document.getElementById(
    "U9-account-setting"
  );


const accountSettingContent =
  document.getElementById(
    "U9-account-setting-content"
  );


/* =========================
   ACCOUNT HEADER
========================= */

const accountSettingAccountHeader =
  document.getElementById(
    "U9-account-setting-account-header"
  );


const accountSettingSettingHeader =
  document.getElementById(
    "U9-account-setting-setting-header"
  );


/* =========================
   ACCOUNT PAGES
========================= */

const accountSettingPages =
  document.getElementById(
    "U9-account-setting-pages"
  );


/* =========================
   BACK BUTTON
========================= */

const accountSettingBack =
  document.getElementById(
    "U9-account-setting-back"
  );


const accountSettingSettingBack =
  document.getElementById(
    "U9-account-setting-setting-back"
  );


/* =========================
   ACCOUNT INFO
========================= */

const accountUsername =
  document.getElementById(
    "U9-account-username"
  );


const accountAccount =
  document.getElementById(
    "U9-account-account"
  );


/* =========================
   SETTING BUTTON
========================= */

const accountSettingButton =
  document.getElementById(
    "U9-account-setting-1"
  );


/* =========================
   LOGOUT BUTTON
========================= */

const accountSettingLogout =
  document.getElementById(
    "U9-account-setting-5"
  );


/* =========================
   PAGE HEADER
========================= */

const pageHeader =
  document.getElementById(
    "U9-page-header"
  );


/* =========================
   SHOW ACCOUNT PAGE
========================= */

function showAccountPage() {

  accountSettingPages.style.transform =
    "translateX(0)";


  accountSettingAccountHeader.classList.remove(
    "hidden"
  );


  accountSettingSettingHeader.classList.remove(
    "active"
  );

}


/* =========================
   SHOW SETTING PAGE
========================= */

function showSettingPage() {

  accountSettingPages.style.transform =
    "translateX(-50%)";


  accountSettingAccountHeader.classList.add(
    "hidden"
  );


  accountSettingSettingHeader.classList.add(
    "active"
  );

}


/* =========================
   OPEN ACCOUNT SETTING
========================= */

function openAccountSetting() {

  showAccountPage();


  accountSetting.classList.add(
    "active"
  );

}


/* =========================
   CLOSE ACCOUNT SETTING
========================= */

function closeAccountSetting() {

  accountSetting.classList.remove(
    "active"
  );

}


/* =========================
   LOAD ACCOUNT INFO
========================= */

async function loadAccountInfo() {

  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  if (!sessionToken) {

    accountUsername.textContent =
      "";


    accountAccount.textContent =
      "";

    return;

  }


  try {

    const response =
      await fetch(
        "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/me",
        {
          method: "GET",

          headers: {

            "Authorization":
              `Bearer ${sessionToken}`

          }

        }
      );


    if (!response.ok) {

      accountUsername.textContent =
        "";


      accountAccount.textContent =
        "";

      return;

    }


    const result =
      await response.json();


    const user =
      result.user ||
      result.data?.user ||
      result;


    accountUsername.textContent =
      user?.username ||
      "";


    accountAccount.textContent =
      user?.account ||
      "";

  } catch (error) {

    console.error(
      "Failed to load account info:",
      error
    );

  }

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


    loadAccountInfo();

  }
);


/* =========================
   CLICK HEADER
   CLOSE ACCOUNT SETTING
========================= */

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
========================= */

accountSettingBack.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    closeAccountSetting();

  }
);


/* =========================
   SETTING BUTTON
========================= */

accountSettingButton.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    showSettingPage();

  }
);


/* =========================
   SETTING BACK BUTTON
========================= */

accountSettingSettingBack.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    showAccountPage();

  }
);


/* =========================
   LOGOUT BUTTON
========================= */

accountSettingLogout.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    closeAccountSetting();


    openLogoutConfirm();

  }
);
