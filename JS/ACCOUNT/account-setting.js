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
   HEADERS
========================= */

const addFriendPageHeader =
  document.getElementById(
    "Account-U9-account-add-friend-page-header"
  );


const accountHeader =
  document.getElementById(
    "Account-U9-account-header"
  );


const accountSettingPageHeader =
  document.getElementById(
    "Account-U9-account-setting-page-header"
  );


const accountSettingPageHeaderIcon =
  document.getElementById(
    "Account-U9-account-setting-page-header-icon"
  );



/* =========================
   BACK BUTTONS
========================= */

const accountSettingBack =
  document.getElementById(
    "Account-U9-account-setting-back"
  );


const accountSettingPageBack =
  document.getElementById(
    "Account-U9-account-setting-page-back"
  );


const addFriendPageBack =
  document.getElementById(
    "Account-U9-account-add-friend-page-back"
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
   ACCOUNT BUTTONS
========================= */

const accountSettingButton =
  document.getElementById(
    "Account-U9-account-setting-button"
  );


const accountAddFriend =
  document.getElementById(
    "Account-U9-account-add-friend"
  );


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
   ADD FRIEND PAGE
========================= */

const addFriendPage =
  document.getElementById(
    "Account-U9-account-add-friend-page"
  );



/* =========================
   ACCOUNT PAGE
========================= */

const accountPage =
  document.getElementById(
    "Account-U9-account-page"
  );



/* =========================
   SETTING PAGE
========================= */

const settingPage =
  document.getElementById(
    "Account-U9-account-setting-page"
  );



/* =========================
   EDIT PROFILE PAGE
========================= */

const editProfilePage =
  document.getElementById(
    "Account-U9-account-edit-profile-page"
  );



/* =========================
   HIDE ALL HEADERS
========================= */

function hideAllHeaders() {

  addFriendPageHeader.classList.remove(
    "active"
  );

  addFriendPageHeader.classList.add(
    "hidden"
  );


  accountHeader.classList.remove(
    "active"
  );

  accountHeader.classList.add(
    "hidden"
  );


  accountSettingPageHeader.classList.remove(
    "active"
  );

  accountSettingPageHeader.classList.add(
    "hidden"
  );

}



/* =========================
   SHOW ADD FRIEND PAGE
========================= */

function showAddFriendPage() {

  /*
   * Add Friend 在最左边
   */

  accountSettingPages.style.transform =
    "translateX(0)";


  hideAllHeaders();


  addFriendPageHeader.classList.remove(
    "hidden"
  );

  addFriendPageHeader.classList.add(
    "active"
  );

}



/* =========================
   SHOW ACCOUNT PAGE
========================= */

function showAccountPage() {

  /*
   * Account 在第二页
   */

  accountSettingPages.style.transform =
    "translateX(-25%)";


  hideAllHeaders();


  accountHeader.classList.remove(
    "hidden"
  );

  accountHeader.classList.add(
    "active"
  );

}



/* =========================
   SHOW SETTING PAGE
========================= */

function showSettingPage() {

  /*
   * Setting 在第三页
   */

  accountSettingPages.style.transform =
    "translateX(-50%)";


  hideAllHeaders();


  accountSettingPageHeader.classList.remove(
    "hidden"
  );

  accountSettingPageHeader.classList.add(
    "active"
  );


  accountSettingPageHeaderIcon.src =
    "SVG/setting-header.svg";


  accountSettingPageHeaderIcon.alt =
    "Setting";

}



/* =========================
   SHOW EDIT PROFILE PAGE
========================= */

function showEditProfilePage() {

  /*
   * Edit Profile 在最右边
   */

  accountSettingPages.style.transform =
    "translateX(-75%)";


  hideAllHeaders();


  accountSettingPageHeader.classList.remove(
    "hidden"
  );

  accountSettingPageHeader.classList.add(
    "active"
  );


  accountSettingPageHeaderIcon.src =
    "SVG/edit-header.svg";


  accountSettingPageHeaderIcon.alt =
    "Edit Profile";

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

          method:
            "GET",

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



  }

  catch (error) {

    console.error(
      "Failed to load account info:",
      error
    );

  }

}



/* =========================
   USER BUTTON
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
   PAGE HEADER
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
   ADD FRIEND
========================= */

accountAddFriend.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    showAddFriendPage();

  }
);



/* =========================
   ADD FRIEND BACK
========================= */

addFriendPageBack.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    showAccountPage();

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
   SETTING / EDIT BACK
========================= */

accountSettingPageBack.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    showAccountPage();

  }
);



/* =========================
   EDIT PROFILE
========================= */

accountEditProfile.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    showEditProfilePage();

  }
);



/* =========================
   CLICK ACCOUNT SETTING BACKGROUND
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
