/* =========================
   ACCOUNT SETTING
========================= */


/* =========================
   MAIN
========================= */

const accountSetting =
  document.getElementById(
    "U9-account-setting"
  );


const accountSettingPages =
  document.getElementById(
    "Account-U9-account-setting-pages"
  );



/* =========================
   ACCOUNT HEADER
========================= */

const accountHeader =
  document.getElementById(
    "Account-U9-account-header"
  );


const accountSettingPageHeader =
  document.getElementById(
    "Account-U9-account-setting-page-header"
  );



/* =========================
   BACK BUTTON
========================= */

const accountSettingBack =
  document.getElementById(
    "Account-U9-account-setting-back"
  );


const accountSettingPageBack =
  document.getElementById(
    "Account-U9-account-setting-page-back"
  );



/* =========================
   ACCOUNT INFO
========================= */

const accountUsername =
  document.getElementById(
    "Account-U9-account-username"
  );


const accountAccount =
  document.getElementById(
    "Account-U9-account-account"
  );



/* =========================
   SETTING BUTTON
========================= */

const accountSettingButton =
  document.getElementById(
    "Account-U9-account-setting-button"
  );



/* =========================
   ADD FRIEND
========================= */

const accountAddFriend =
  document.getElementById(
    "Account-U9-account-add-friend"
  );



/* =========================
   EDIT PROFILE
========================= */

const accountEditProfile =
  document.getElementById(
    "Account-U9-account-edit-profile"
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


  /* =========================
     NO SESSION
  ========================= */

  if (!sessionToken) {

    accountUsername.textContent =
      "";


    accountAccount.textContent =
      "";


    return;

  }



  /* =========================
     REQUEST
  ========================= */

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



    /* =========================
       REQUEST FAILED
    ========================= */

    if (!response.ok) {

      accountUsername.textContent =
        "";


      accountAccount.textContent =
        "";


      return;

    }



    /* =========================
       JSON
    ========================= */

    const result =
      await response.json();



    /* =========================
       USER DATA
    ========================= */

    const user =
      result.user ||
      result.data?.user ||
      result;



    /* =========================
       USERNAME
    ========================= */

    accountUsername.textContent =
      user?.username ||
      "";



    /* =========================
       ACCOUNT
    ========================= */

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
