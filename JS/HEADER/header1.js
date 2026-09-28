
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


/* =========================
   GET CURRENT USER
========================= */

async function getCurrentUser() {

  try {

    const sessionToken =
      localStorage.getItem(
        "u9_session"
      );


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


    const result =
      await response.json();

    alert(
      JSON.stringify(result)
    );


    /* =========================
       NOT LOGGED IN
    ========================= */

    if (!response.ok) {

      document.getElementById(
        "U9-page-header-register"
      ).style.display =
        "block";


      document.getElementById(
        "U9-page-header-login"
      ).style.display =
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

      document.getElementById(
        "U9-page-header-register"
      ).style.display =
        "none";


      document.getElementById(
        "U9-page-header-login"
      ).style.display =
        "none";


      /* =========================
         SET USERNAME
      ========================= */

      const username =
        result.user.username;


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

    document.getElementById(
      "U9-page-header-register"
    ).style.display =
      "block";


    document.getElementById(
      "U9-page-header-login"
    ).style.display =
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

    document.getElementById(
      "U9-page-header-register"
    ).style.display =
      "block";


    document.getElementById(
      "U9-page-header-login"
    ).style.display =
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
