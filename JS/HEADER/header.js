/* =========================
   HEADER ELEMENTS
========================= */

const headerActions =
  document.getElementById(
    "U9-page-header-actions"
  );


const registerButton =
  document.getElementById(
    "U9-page-header-register"
  );


const loginButton =
  document.getElementById(
    "U9-page-header-login"
  );


const userButton =
  document.getElementById(
    "U9-page-header-user"
  );


const usernameText =
  document.getElementById(
    "U9-page-header-username"
  );


/* =========================
   GET CURRENT USER
========================= */

async function getCurrentUser() {

  try {

    const response =
      await fetch(
        "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/me",
        {
          method: "GET",

          credentials: "include"
        }
      );


    const result =
      await response.json();


    /* =========================
       NOT LOGGED IN
    ========================= */

    if (!response.ok) {

      registerButton.style.display =
        "block";

      loginButton.style.display =
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


      /* Hide Register / Login */

      registerButton.style.display =
        "none";

      loginButton.style.display =
        "none";


      /* Set Username */

      usernameText.textContent =
        result.user.username;


      /* Show User */

      userButton.style.display =
        "flex";


      /* Show Header */

      headerActions.style.display =
        "flex";


      return result.user;

    }


    /* =========================
       UNKNOWN STATE
    ========================= */

    registerButton.style.display =
      "block";

    loginButton.style.display =
      "block";

    userButton.style.display =
      "none";


    usernameText.textContent =
      "";


    headerActions.style.display =
      "flex";


    return null;


  } catch (error) {

    console.error(
      "Get current user error:",
      error
    );


    /* =========================
       SESSION CHECK FAILED
    ========================= */

    registerButton.style.display =
      "block";

    loginButton.style.display =
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
   CHECK LOGIN
   WHEN PAGE LOADS
========================= */

getCurrentUser();
