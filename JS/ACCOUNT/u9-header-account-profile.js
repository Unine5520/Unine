/* =========================
   U9 HEADER ACCOUNT PROFILE
========================= */


/* =========================
   MAIN ELEMENTS
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


const u9AddFriendPageHeaderText =
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
   ACCOUNT EDIT BUTTON
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
   ACCOUNT PROFILE ELEMENTS
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
   DEFAULT FRAME
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
   REQUIRED ELEMENT CHECK
========================= */

function u9AccountElementsReady() {

  return Boolean(
    u9AccountSettingPages &&
    u9AddFriendPageHeader &&
    u9AccountHeader &&
    u9AccountSettingPageHeader &&
    u9AddFriendPageHeaderText &&
    u9AccountHeaderText &&
    u9AccountSettingPageHeaderText
  );

}


/* =========================
   HIDE ALL HEADERS
========================= */

function u9AccountHideAllHeaders() {

  [
    u9AddFriendPageHeader,
    u9AccountHeader,
    u9AccountSettingPageHeader
  ].forEach(
    (header) => {

      if (!header) {
        return;
      }

      header.classList.remove(
        "active"
      );

      header.classList.add(
        "hidden"
      );

    }
  );

}


/* =========================
   SHOW HEADER
========================= */

function u9AccountShowHeader(
  header
) {

  if (!header) {
    return;
  }


  header.classList.remove(
    "hidden"
  );

  header.classList.add(
    "active"
  );

}


/* =========================
   SHOW ACCOUNT PAGE
========================= */

function u9AccountShowAccountPage() {

  if (!u9AccountSettingPages) {
    return;
  }


  u9AccountSettingPages.style.transform =
    "translateX(-20%)";


  u9AccountHideAllHeaders();


  u9AccountShowHeader(
    u9AccountHeader
  );


  if (u9AccountHeaderText) {

    u9AccountHeaderText.textContent =
      "Account";

  }


  u9AccountCurrentPage =
    "account";

}


/* =========================
   SHOW ADD FRIEND PAGE
========================= */

function u9AccountShowAddFriendPage() {

  if (!u9AccountSettingPages) {
    return;
  }


  u9AccountSettingPages.style.transform =
    "translateX(0)";


  u9AccountHideAllHeaders();


  u9AccountShowHeader(
    u9AddFriendPageHeader
  );


  if (u9AddFriendPageHeaderText) {

    u9AddFriendPageHeaderText.textContent =
      "Add Friend";

  }


  u9AccountCurrentPage =
    "add-friend";

}


/* =========================
   SHOW SETTING PAGE
========================= */

function u9AccountShowSettingPage() {

  if (!u9AccountSettingPages) {
    return;
  }


  u9AccountSettingPages.style.transform =
    "translateX(-40%)";


  u9AccountHideAllHeaders();


  u9AccountShowHeader(
    u9AccountSettingPageHeader
  );


  if (
    u9AccountSettingPageHeaderText
  ) {

    u9AccountSettingPageHeaderText.textContent =
      "Setting";

  }


  u9AccountCurrentPage =
    "setting";

}


/* =========================
   SHOW ACCOUNT EDIT PAGE
========================= */

function u9AccountShowEditPage() {

  if (!u9AccountSettingPages) {
    return;
  }


  u9AccountSettingPages.style.transform =
    "translateX(-60%)";


  u9AccountHideAllHeaders();


  u9AccountShowHeader(
    u9AccountSettingPageHeader
  );


  if (
    u9AccountSettingPageHeaderText
  ) {

    u9AccountSettingPageHeaderText.textContent =
      "Account Edit";

  }


  u9AccountCurrentPage =
    "account-edit";

}


/* =========================
   SHOW FRAME EDIT PAGE
========================= */

function u9AccountShowFrameEditPage() {

  if (!u9AccountSettingPages) {
    return;
  }


  u9AccountSettingPages.style.transform =
    "translateX(-80%)";


  u9AccountHideAllHeaders();


  u9AccountShowHeader(
    u9AccountSettingPageHeader
  );


  if (
    u9AccountSettingPageHeaderText
  ) {

    u9AccountSettingPageHeaderText.textContent =
      "Frame Edit";

  }


  u9AccountCurrentPage =
    "frame-edit";

}


/* =========================
   LOAD CURRENT FRAME
========================= */

async function u9AccountLoadCurrentFrame(
  user
) {

  if (!u9AccountAvatarFrame) {
    return;
  }


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


    const headers = {};


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

        headers.Authorization =
          `Bearer ${sessionToken}`;

      }

    }


    const response =
      await fetch(
        requestUrl,
        {
          method: "GET",
          headers
        }
      );


    if (!response.ok) {
      return;
    }


    const result =
      await response.json();


    const frames =
      result.frames ||
      result.data?.frames ||
      [];


    const currentFrame =
      frames.find(
        (frame) =>
          frame.id === frameId
      );


    if (
      !currentFrame ||
      !currentFrame.svg
    ) {

      return;

    }


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

  if (
    !u9AccountUsername ||
    !u9AccountAccount ||
    !u9AccountAvatarImage
  ) {

    return;

  }


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


    u9AccountAvatarImage.src =
      "SSVG/avatar/profile.svg";


    if (u9AccountAvatarFrame) {

      u9AccountAvatarFrame.src =
        u9AccountFramePlaceholder;

    }


    return;

  }


  try {

    const response =
      await fetch(
        u9AccountMeUrl,
        {

          method: "GET",

          headers: {

            Authorization:
              `Bearer ${sessionToken}`

          }

        }
      );


    if (!response.ok) {

      u9AccountUsername.textContent =
        "";


      u9AccountAccount.textContent =
        "";


      if (u9AccountAvatarFrame) {

        u9AccountAvatarFrame.src =
          u9AccountFramePlaceholder;

      }


      return;

    }


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

if (u9AccountAddFriend) {

  u9AccountAddFriend.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      u9AccountShowAddFriendPage();

    }
  );

}


/* =========================
   ADD FRIEND BACK
========================= */

if (u9AddFriendPageBack) {

  u9AddFriendPageBack.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      u9AccountShowAccountPage();

    }
  );

}


/* =========================
   SETTING
========================= */

if (u9AccountSettingButton) {

  u9AccountSettingButton.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      u9AccountShowSettingPage();

    }
  );

}


/* =========================
   ACCOUNT EDIT
========================= */

if (u9AccountEditProfile) {

  u9AccountEditProfile.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      u9AccountShowEditPage();

    }
  );

}


/* =========================
   FRAME EDIT
========================= */

if (u9AccountFrameEdit) {

  u9AccountFrameEdit.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      u9AccountShowFrameEditPage();

    }
  );

}


/* =========================
   SHARED HEADER BACK
========================= */

if (u9AccountSettingPageBack) {

  u9AccountSettingPageBack.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();


      if (
        u9AccountCurrentPage ===
        "frame-edit"
      ) {

        u9AccountShowEditPage();

        return;

      }


      u9AccountShowAccountPage();

    }
  );

}


/* =========================
   INITIAL HEADER TEXT
========================= */

if (u9AccountHeaderText) {

  u9AccountHeaderText.textContent =
    "Account";

}


if (u9AddFriendPageHeaderText) {

  u9AddFriendPageHeaderText.textContent =
    "Add Friend";

}


/* =========================
   ACCOUNT SETTING OPEN
========================= */

if (u9AccountSetting) {

  const u9AccountSettingObserver =
    new MutationObserver(
      (mutations) => {

        for (
          const mutation of mutations
        ) {

          if (
            mutation.type !==
            "attributes"
          ) {

            continue;

          }


          if (
            mutation.attributeName !==
            "class"
          ) {

            continue;

          }


          const isOpen =
            u9AccountSetting.classList.contains(
              "active"
            );


          if (!isOpen) {
            continue;
          }


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
   INITIAL LOAD
========================= */

u9AccountLoadProfile();


/* =========================
   GLOBAL API
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
