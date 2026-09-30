/* =========================
   U9 HEADER ACCOUNT PROFILE
========================= */


/* =========================
   MAIN
========================= */

const u9AccountSetting =
  document.getElementById(
    "U9-account-setting"
  );


const u9AccountSettingPages =
  document.getElementById(
    "Account-U9-account-setting-pages"
  );


/* =========================
   HEADERS
========================= */

const u9AddFriendPageHeader =
  document.getElementById(
    "Account-U9-account-add-friend-page-header"
  );


const u9AccountHeader =
  document.getElementById(
    "Account-U9-account-header"
  );


const u9AccountSettingPageHeader =
  document.getElementById(
    "Account-U9-account-setting-page-header"
  );


const u9AccountAddFriendPageHeaderText =
  document.getElementById(
    "Account-U9-account-add-friend-page-header-text"
  );


const u9AccountHeaderText =
  document.getElementById(
    "Account-U9-account-header-text"
  );


const u9AccountSettingPageHeaderText =
  document.getElementById(
    "Account-U9-account-setting-page-header-text"
  );


/* =========================
   BACK BUTTONS
========================= */

const u9AccountSettingPageBack =
  document.getElementById(
    "Account-U9-account-setting-page-back"
  );


const u9AddFriendPageBack =
  document.getElementById(
    "Account-U9-account-add-friend-page-back"
  );


/* =========================
   ACCOUNT BUTTONS
========================= */

const u9AccountAddFriend =
  document.getElementById(
    "Account-U9-account-add-friend"
  );


const u9AccountSettingButton =
  document.getElementById(
    "Account-U9-account-setting-button"
  );


const u9AccountEditProfile =
  document.getElementById(
    "Account-U9-account-edit-profile"
  );


/* =========================
   ACCOUNT EDIT BUTTONS
========================= */

const u9AccountFrameEdit =
  document.getElementById(
    "Account-U9-account-frame-edit"
  );


/* =========================
   ACCOUNT PAGES
========================= */

const u9AccountAddFriendPage =
  document.getElementById(
    "Account-U9-account-add-friend-page"
  );


const u9AccountPage =
  document.getElementById(
    "Account-U9-account-page"
  );


const u9AccountSettingPage =
  document.getElementById(
    "Account-U9-account-setting-page"
  );


const u9AccountEditPage =
  document.getElementById(
    "Account-U9-account-edit-page"
  );


const u9AccountFrameEditPage =
  document.getElementById(
    "Account-U9-account-edit-profile-page"
  );


/* =========================
   ACCOUNT INFO
========================= */

const u9AccountAvatarImage =
  document.getElementById(
    "Account-U9-account-avatar-image"
  );


const u9AccountAvatarFrame =
  document.getElementById(
    "Account-U9-account-avatar-frame"
  );


const u9AccountUsername =
  document.getElementById(
    "Account-U9-account-username"
  );


const u9AccountAccount =
  document.getElementById(
    "Account-U9-account-account"
  );


/* =========================
   CURRENT PAGE
========================= */

let u9AccountCurrentPage =
  "account";


/* =========================
   FRAME PLACEHOLDER
========================= */

const u9AccountFramePlaceholder =
  "SSVG/avatar/ordinary.svg";


/* =========================
   API
========================= */

const u9AccountMeUrl =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/me";


const u9AccountDefaultFrameUrl =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-default";


const u9AccountFreeFrameUrl =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-free";


const u9AccountPaidFrameUrl =
  "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/avatar-frame-paid";


/* =========================
   HIDE ALL HEADERS
========================= */

function u9AccountHideAllHeaders() {

  u9AddFriendPageHeader.classList.remove(
    "active"
  );

  u9AddFriendPageHeader.classList.add(
    "hidden"
  );


  u9AccountHeader.classList.remove(
    "active"
  );

  u9AccountHeader.classList.add(
    "hidden"
  );


  u9AccountSettingPageHeader.classList.remove(
    "active"
  );

  u9AccountSettingPageHeader.classList.add(
    "hidden"
  );

}


/* =========================
   SHOW ACCOUNT PAGE
========================= */

function u9AccountShowAccountPage() {

  /*
   * 5 pages
   *
   * Add Friend  = 0%
   * Account     = -20%
   * Setting     = -40%
   * Account Edit= -60%
   * Frame Edit  = -80%
   */

  u9AccountSettingPages.style.transform =
    "translateX(-20%)";


  u9AccountHideAllHeaders();


  u9AccountHeader.classList.remove(
    "hidden"
  );

  u9AccountHeader.classList.add(
    "active"
  );


  u9AccountCurrentPage =
    "account";

}


/* =========================
   SHOW ADD FRIEND PAGE
========================= */

function u9AccountShowAddFriendPage() {

  u9AccountSettingPages.style.transform =
    "translateX(0)";


  u9AccountHideAllHeaders();


  u9AddFriendPageHeader.classList.remove(
    "hidden"
  );

  u9AddFriendPageHeader.classList.add(
    "active"
  );


  u9AccountCurrentPage =
    "add-friend";

}


/* =========================
   SHOW SETTING PAGE
========================= */

function u9AccountShowSettingPage() {

  u9AccountSettingPages.style.transform =
    "translateX(-40%)";


  u9AccountHideAllHeaders();


  u9AccountSettingPageHeader.classList.remove(
    "hidden"
  );

  u9AccountSettingPageHeader.classList.add(
    "active"
  );


  u9AccountSettingPageHeaderText.textContent =
    "Setting";


  u9AccountCurrentPage =
    "setting";

}


/* =========================
   SHOW ACCOUNT EDIT PAGE
========================= */

function u9AccountShowEditPage() {

  u9AccountSettingPages.style.transform =
    "translateX(-60%)";


  u9AccountHideAllHeaders();


  u9AccountSettingPageHeader.classList.remove(
    "hidden"
  );

  u9AccountSettingPageHeader.classList.add(
    "active"
  );


  u9AccountSettingPageHeaderText.textContent =
    "Account Edit";


  u9AccountCurrentPage =
    "account-edit";

}


/* =========================
   SHOW FRAME EDIT PAGE
========================= */

function u9AccountShowFrameEditPage() {

  u9AccountSettingPages.style.transform =
    "translateX(-80%)";


  u9AccountHideAllHeaders();


  u9AccountSettingPageHeader.classList.remove(
    "hidden"
  );

  u9AccountSettingPageHeader.classList.add(
    "active"
  );


  u9AccountSettingPageHeaderText.textContent =
    "Frame Edit";


  u9AccountCurrentPage =
    "frame-edit";

}


/* =========================
   RESET ACCOUNT PAGE
========================= */

function u9AccountResetToAccountPage() {

  u9AccountShowAccountPage();

}


/* =========================
   FRAME DATA
========================= */

async function u9AccountLoadCurrentFrame(
  user
) {

  /*
   * 先使用普通占位 Frame
   */

  u9AccountAvatarFrame.src =
    u9AccountFramePlaceholder;


  if (!user) {
    return;
  }


  /* =========================
     DIRECT FRAME URL
  ========================= */

  const directFrameUrl =
    user.avatar_frame_svg ||
    user.avatar_frame_url ||
    user.frame_url ||
    "";


  if (directFrameUrl) {

    u9AccountAvatarFrame.src =
      directFrameUrl;

    return;

  }


  /* =========================
     FRAME TYPE / ID
  ========================= */

  const frameType =
    user.avatar_frame_type ||
    "default";


  const frameId =
    user.avatar_frame_id ||
    null;


  if (!frameId) {
    return;
  }


  try {

    let requestUrl =
      u9AccountDefaultFrameUrl;


    let headers = {};


    /* =========================
       DEFAULT
    ========================= */

    if (
      frameType ===
      "default"
    ) {

      requestUrl =
        u9AccountDefaultFrameUrl;

    }


    /* =========================
       FREE
    ========================= */

    else if (
      frameType ===
      "free"
    ) {

      requestUrl =
        u9AccountFreeFrameUrl;

    }


    /* =========================
       PAID
    ========================= */

    else if (
      frameType ===
      "paid"
    ) {

      requestUrl =
        u9AccountPaidFrameUrl;


      const sessionToken =
        localStorage.getItem(
          "u9_session"
        );


      if (sessionToken) {

        headers = {

          "Authorization":
            `Bearer ${sessionToken}`

        };

      }

    }


    /* =========================
       REQUEST
    ========================= */

    const response =
      await fetch(
        requestUrl,
        {

          method:
            "GET",

          headers

        }
      );


    if (!response.ok) {
      return;
    }


    /* =========================
       JSON
    ========================= */

    const result =
      await response.json();


    const frames =
      result.frames ||
      result.data?.frames ||
      [];


    /* =========================
       FIND CURRENT FRAME
    ========================= */

    const currentFrame =
      frames.find(
        (frame) =>
          frame.id === frameId
      );


    if (!currentFrame) {
      return;
    }


    if (!currentFrame.svg) {
      return;
    }


    /* =========================
       SET FRAME
    ========================= */

    u9AccountAvatarFrame.src =
      currentFrame.svg;

  }

  catch (error) {

    console.error(
      "Failed to load account avatar frame:",
      error
    );

  }

}


/* =========================
   LOAD ACCOUNT PROFILE
========================= */

async function u9AccountLoadProfile() {

  const sessionToken =
    localStorage.getItem(
      "u9_session"
    );


  /* =========================
     NO SESSION
  ========================= */

  if (!sessionToken) {

    u9AccountUsername.textContent =
      "";


    u9AccountAccount.textContent =
      "";


    u9AccountAvatarFrame.src =
      u9AccountFramePlaceholder;


    return;

  }


  try {

    /* =========================
       REQUEST ME
    ========================= */

    const response =
      await fetch(
        u9AccountMeUrl,
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

      u9AccountUsername.textContent =
        "";


      u9AccountAccount.textContent =
        "";


      u9AccountAvatarFrame.src =
        u9AccountFramePlaceholder;


      return;

    }


    /* =========================
       JSON
    ========================= */

    const result =
      await response.json();


    const user =
      result.user ||
      result.data?.user ||
      result;


    if (!user) {
      return;
    }


    /* =========================
       USERNAME
    ========================= */

    u9AccountUsername.textContent =
      user.username ||
      "";


    /* =========================
       ACCOUNT
    ========================= */

    u9AccountAccount.textContent =
      user.account ||
      "";


    /* =========================
      AVATAR
    ========================= */

    const avatar =
      user.avatar ||
      null;


    const avatarUrl =
      avatar?.url ||
      "";


    u9AccountAvatarImage.src =
      avatarUrl ||
      "SSVG/avatar/profile.svg";


    /* =========================
       FRAME
    ========================= */

    await u9AccountLoadCurrentFrame(
      user
    );

  }

  catch (error) {

    console.error(
      "Failed to load account profile:",
      error
    );

  }

}


/* =========================
   ADD FRIEND
========================= */

u9AccountAddFriend.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    u9AccountShowAddFriendPage();

  }
);


/* =========================
   ADD FRIEND BACK
========================= */

u9AddFriendPageBack.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    u9AccountShowAccountPage();

  }
);


/* =========================
   SETTING
========================= */

u9AccountSettingButton.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    u9AccountShowSettingPage();

  }
);


/* =========================
   ACCOUNT EDIT
========================= */

u9AccountEditProfile.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    u9AccountShowEditPage();

  }
);


/* =========================
   FRAME EDIT
========================= */

u9AccountFrameEdit.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    u9AccountShowFrameEditPage();

  }
);


/* =========================
   SHARED HEADER BACK
========================= */

u9AccountSettingPageBack.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();


    /* =========================
       FRAME EDIT -> ACCOUNT EDIT
    ========================= */

    if (
      u9AccountCurrentPage ===
      "frame-edit"
    ) {

      u9AccountShowEditPage();

      return;

    }


    /* =========================
       SETTING / ACCOUNT EDIT
       -> ACCOUNT
    ========================= */

    u9AccountShowAccountPage();

  }
);


/* =========================
   ACCOUNT HEADER TEXT
========================= */

u9AccountHeaderText.textContent =
  "Account";


u9AccountAddFriendPageHeaderText.textContent =
  "Add Friend";


/* =========================
   ACCOUNT SETTING OBSERVER
========================= */

if (u9AccountSetting) {

  const u9AccountSettingObserver =
    new MutationObserver(
      () => {

        if (
          u9AccountSetting.classList.contains(
            "active"
          )
        ) {

          u9AccountShowAccountPage();

          u9AccountLoadProfile();

        }

      }
    );


  u9AccountSettingObserver.observe(
    u9AccountSetting,
    {
      attributes: true,
      attributeFilter: [
        "class"
      ]
    }
  );

}


/* =========================
   INITIAL PROFILE LOAD
========================= */

u9AccountLoadProfile();


/* =========================
   GLOBAL PROFILE API
========================= */

window.U9AccountProfile = {

  showAccountPage:
    u9AccountShowAccountPage,

  showAddFriendPage:
    u9AccountShowAddFriendPage,

  showSettingPage:
    u9AccountShowSettingPage,

  showEditPage:
    u9AccountShowEditPage,

  showFrameEditPage:
    u9AccountShowFrameEditPage,

  loadProfile:
    u9AccountLoadProfile

};
