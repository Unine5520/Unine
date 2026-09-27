
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
   EDIT PROFILE MODAL
========================= */

const accountEditProfileModal =
  document.getElementById(
    "U9-account-edit-profile-modal"
  );


const accountEditProfileModalClose =
  document.getElementById(
    "U9-account-edit-profile-modal-close"
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
   OPEN EDIT PROFILE MODAL
========================= */

accountEditProfile.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    if (!accountEditProfileModal) {

      console.error(
        "Edit Profile Modal not found."
      );

      return;

    }


    /*
     * 强制显示
     */

    accountEditProfileModal.style.display =
      "flex";


    /*
     * 强制定位
     */

    accountEditProfileModal.style.position =
      "fixed";


    accountEditProfileModal.style.top =
      "0";


    accountEditProfileModal.style.left =
      "0";


    accountEditProfileModal.style.width =
      "100%";


    accountEditProfileModal.style.height =
      "100%";


    accountEditProfileModal.style.alignItems =
      "center";


    accountEditProfileModal.style.justifyContent =
      "center";


    accountEditProfileModal.style.backgroundColor =
      "rgba(0, 0, 0, 0.25)";


    /*
     * 放到最上层
     */

    accountEditProfileModal.style.zIndex =
      "9999";


    console.log(
      "Edit Profile Modal opened."
    );

  }
);



/* =========================
   CLOSE EDIT PROFILE MODAL
========================= */

accountEditProfileModalClose.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    if (!accountEditProfileModal) {

      return;

    }


    accountEditProfileModal.style.display =
      "none";


    console.log(
      "Edit Profile Modal closed."
    );

  }
);



/* =========================
   EDIT PROFILE MODAL
   BACKGROUND
========================= */

accountEditProfileModal.addEventListener(
  "click",
  (event) => {

    if (
      event.target ===
      accountEditProfileModal
    ) {

      accountEditProfileModal.style.display =
        "none";

    }

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
