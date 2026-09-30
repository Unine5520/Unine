/* =========================
   U9 HEADER
========================= */


/* =========================
   HEADER ELEMENTS
========================= */

const headerActions =
  document.getElementById(
    "U9-page-header-actions"
  );


const userButton =
  document.getElementById(
    "U9-page-header-user"
  );


const usernameText =
  document.getElementById(
    "U9-page-header-username"
  );


const u9Header =
  document.getElementById(
    "U9-page-header"
  );


/* =========================
   ACCOUNT SETTING
========================= */

const accountSetting =
  document.getElementById(
    "U9-account-setting"
  );


const accountSettingBack =
  document.getElementById(
    "Account-U9-account-setting-back"
  );


/* =========================
   REGISTER / LOGIN
========================= */

const u9HeaderRegisterButton =
  document.getElementById(
    "U9-page-header-register"
  );


const u9HeaderLoginButton =
  document.getElementById(
    "U9-page-header-login"
  );


/* =========================
   CHECK ELEMENTS
========================= */

if (
  !headerActions ||
  !userButton ||
  !usernameText ||
  !u9Header ||
  !accountSetting ||
  !accountSettingBack ||
  !u9HeaderRegisterButton ||
  !u9HeaderLoginButton
) {

  console.error(
    "U9 Header: required elements are missing."
  );

}


/* =========================
   GET CURRENT USER
========================= */

async function getCurrentUser() {

  try {

    /* =========================
       SESSION
    ========================= */

    const sessionToken =
      localStorage.getItem(
        "u9_session"
      );


    /* =========================
       NO SESSION
    ========================= */

    if (!sessionToken) {

      u9HeaderRegisterButton.style.display =
        "block";


      u9HeaderLoginButton.style.display =
        "block";


      userButton.style.display =
        "none";


      usernameText.textContent =
        "";


      headerActions.style.display =
        "flex";


      return null;

    }


    /* =========================
       REQUEST
    ========================= */

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


    const result =
      await response.json();


    /* =========================
       NOT LOGGED IN
    ========================= */

    if (!response.ok) {

      u9HeaderRegisterButton.style.display =
        "block";


      u9HeaderLoginButton.style.display =
        "block";


      userButton.style.display =
        "none";


      usernameText.textContent =
        "";


      headerActions.style.display =
        "flex";


      return null;

    }


    /* =========================
       LOGGED IN
    ========================= */

    if (
      result.authenticated ===
      true
    ) {

      console.log(
        "Current user:",
        result.user
      );


      /* =========================
         HIDE REGISTER / LOGIN
      ========================= */

      u9HeaderRegisterButton.style.display =
        "none";


      u9HeaderLoginButton.style.display =
        "none";


      /* =========================
         USERNAME
      ========================= */

      const username =
        result.user?.username ||
        "";


      let displayUsername =
        username;


      if (
        username.length >
        8
      ) {

        displayUsername =
          username.slice(
            0,
            8
          ) +
          "...";

      }


      usernameText.textContent =
        displayUsername;


      /* =========================
         SHOW USER
      ========================= */

      userButton.style.display =
        "flex";


      headerActions.style.display =
        "flex";


      return result.user;

    }


    /* =========================
       UNKNOWN STATE
    ========================= */

    u9HeaderRegisterButton.style.display =
      "block";


    u9HeaderLoginButton.style.display =
      "block";


    userButton.style.display =
      "none";


    usernameText.textContent =
      "";


    headerActions.style.display =
      "flex";


    return null;

  }

  catch (error) {

    console.error(
      "Get current user error:",
      error
    );


    /* =========================
       SESSION CHECK FAILED
    ========================= */

    u9HeaderRegisterButton.style.display =
      "block";


    u9HeaderLoginButton.style.display =
      "block";


    userButton.style.display =
      "none";


    usernameText.textContent =
      "";


    headerActions.style.display =
      "flex";


    return null;

  }

}


/* =========================
   ACCOUNT SETTING STATE
========================= */

function isAccountSettingOpen() {

  return accountSetting.classList.contains(
    "active"
  );

}


/* =========================
   CHECK TARGET
   INSIDE ACCOUNT SETTING
========================= */

function isInsideAccountSetting(
  target
) {

  if (
    !(target instanceof Node)
  ) {

    return false;

  }


  return accountSetting.contains(
    target
  );

}


/* =========================
   CHECK TARGET
   USER BUTTON
========================= */

function isUserButtonTarget(
  target
) {

  if (
    !(target instanceof Element)
  ) {

    return false;

  }


  return Boolean(
    target.closest(
      "#U9-page-header-user"
    )
  );

}


/* =========================
   LOCK BACKGROUND
========================= */

function lockBackground() {

  document.documentElement.classList.add(
    "u9-account-setting-open"
  );


  document.body.classList.add(
    "u9-account-setting-open"
  );

}


/* =========================
   UNLOCK BACKGROUND
========================= */

function unlockBackground() {

  document.documentElement.classList.remove(
    "u9-account-setting-open"
  );


  document.body.classList.remove(
    "u9-account-setting-open"
  );

}


/* =========================
   OPEN ACCOUNT SETTING
========================= */

function openAccountSetting() {

  accountSetting.classList.add(
    "active"
  );


  userButton.classList.add(
    "account-open"
  );


  lockBackground();

}


/* =========================
   CLOSE ACCOUNT SETTING
========================= */

function closeAccountSetting() {

  accountSetting.classList.remove(
    "active"
  );


  userButton.classList.remove(
    "account-open"
  );


  unlockBackground();

}


/* =========================
   BLOCK BACKGROUND SCROLL
========================= */

document.addEventListener(
  "wheel",
  (event) => {

    if (
      !isAccountSettingOpen()
    ) {

      return;

    }


    if (
      isInsideAccountSetting(
        event.target
      )
    ) {

      return;

    }


    if (
      isUserButtonTarget(
        event.target
      )
    ) {

      return;

    }


    event.preventDefault();

    event.stopPropagation();

  },
  {
    capture: true,
    passive: false
  }
);


/* =========================
   BLOCK BACKGROUND TOUCH SCROLL
========================= */

document.addEventListener(
  "touchmove",
  (event) => {

    if (
      !isAccountSettingOpen()
    ) {

      return;

    }


    if (
      isInsideAccountSetting(
        event.target
      )
    ) {

      return;

    }


    if (
      isUserButtonTarget(
        event.target
      )
    ) {

      return;

    }


    event.preventDefault();

    event.stopPropagation();

  },
  {
    capture: true,
    passive: false
  }
);


/* =========================
   BLOCK BACKGROUND POINTER
========================= */

document.addEventListener(
  "pointerdown",
  (event) => {

    if (
      !isAccountSettingOpen()
    ) {

      return;

    }


    if (
      isInsideAccountSetting(
        event.target
      )
    ) {

      return;

    }


    if (
      isUserButtonTarget(
        event.target
      )
    ) {

      return;

    }


    event.preventDefault();

    event.stopPropagation();

  },
  {
    capture: true
  }
);


/* =========================
   BLOCK BACKGROUND CLICK
========================= */

document.addEventListener(
  "click",
  (event) => {

    if (
      !isAccountSettingOpen()
    ) {

      return;

    }


    if (
      isInsideAccountSetting(
        event.target
      )
    ) {

      return;

    }


    if (
      isUserButtonTarget(
        event.target
      )
    ) {

      return;

    }


    event.preventDefault();

    event.stopPropagation();

  },
  {
    capture: true
  }
);


/* =========================
   USER BUTTON
========================= */

userButton.addEventListener(
  "click",
  (event) => {

    event.preventDefault();

    event.stopPropagation();


    if (
      isAccountSettingOpen()
    ) {

      closeAccountSetting();

      return;

    }


    openAccountSetting();

  }
);


/* =========================
   ACCOUNT CLOSE BUTTON
========================= */

accountSettingBack.addEventListener(
  "click",
  (event) => {

    event.preventDefault();

    event.stopPropagation();


    closeAccountSetting();

  }
);


/* =========================
   ACCOUNT BACKGROUND
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
   CHECK LOGIN
   WHEN PAGE LOADS
========================= */

getCurrentUser();
