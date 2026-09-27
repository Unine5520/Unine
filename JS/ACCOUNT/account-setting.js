/* =========================
   ACCOUNT SETTING
========================= */

const accountSetting =
  document.getElementById(
    "U9-account-setting"
  );


const accountSettingPages =
  document.getElementById(
    "U9-account-setting-pages"
  );


/* =========================
   ACCOUNT HEADER
========================= */

const accountHeader =
  document.getElementById(
    "U9-account-header"
  );


const accountSettingPageHeader =
  document.getElementById(
    "U9-account-setting-page-header"
  );


/* =========================
   BACK BUTTON
========================= */

const accountSettingBack =
  document.getElementById(
    "U9-account-setting-back"
  );


const accountSettingPageBack =
  document.getElementById(
    "U9-account-setting-page-back"
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
    "U9-account-setting-button"
  );


/* =========================
   ADD FRIEND
========================= */

const accountAddFriend =
  document.getElementById(
    "U9-account-add-friend"
  );


/* =========================
   EDIT PROFILE
========================= */

const accountEditProfile =
  document.getElementById(
    "U9-account-edit-profile"
  );


/* =========================
   LOGOUT
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


  accountHeader.classList.remove(
    "hidden"
  );


  accountSettingPageHeader.classList.remove(
    "active"
  );

}


/* =========================
   SHOW SETTING PAGE
========================= */

function showSettingPage() {

  accountSettingPages.style.transform =
    "translateX(-50%)";


  accountHeader.classList.add(
    "hidden"
  );


  accountSettingPageHeader.classList.add(
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
   ACCOUNT X
========================= */

accountSettingBack.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    closeAccountSetting();

  }
);


/* =========================
   SETTING
========================= */

accountSettingButton.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    showSettingPage();

  }
);


/* =========================
   SETTING BACK
========================= */

accountSettingPageBack.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    showAccountPage();

  }
);


/* =========================
   ADD FRIEND
========================= */

accountAddFriend.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

  }
);


/* =========================
   EDIT PROFILE
========================= */

accountEditProfile.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

  }
);


/* =========================
   CLICK BACKGROUND
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
   LOGOUT
========================= */

accountSettingLogout.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    closeAccountSetting();


    openLogoutConfirm();

  }
);
