
/* =========================
   HEADER BUTTONS
========================= */

const registerButton =
  document.getElementById("U9-page-header-register");

const loginButton =
  document.getElementById("U9-page-header-login");

const userButton =
  document.getElementById("U9-page-header-user");

const usernameText =
  document.getElementById("U9-page-header-username");


/* =========================
   MODALS
========================= */

const registerModal =
  document.getElementById("U9-register-modal");

const loginModal =
  document.getElementById("U9-login-modal");


/* =========================
   CLOSE BUTTONS
========================= */

const registerClose =
  document.getElementById("U9-register-modal-close");

const loginClose =
  document.getElementById("U9-login-modal-close");


/* =========================
   REGISTER
   OPEN MODAL
========================= */

registerButton.addEventListener("click", () => {

  registerModal.style.display = "flex";

});


/* =========================
   LOGIN
   OPEN MODAL
========================= */

loginButton.addEventListener("click", () => {

  loginModal.style.display = "flex";

});


/* =========================
   CLOSE REGISTER
========================= */

registerClose.addEventListener("click", () => {

  registerModal.style.display = "none";

});


/* =========================
   CLOSE LOGIN
========================= */

loginClose.addEventListener("click", () => {

  loginModal.style.display = "none";

});


/* =========================
   REGISTER PASSWORD
   SHOW / HIDE
========================= */

const registerPassword =
  document.getElementById(
    "U9-register-password"
  );

const registerPasswordToggle =
  document.getElementById(
    "U9-register-password-toggle"
  );


registerPasswordToggle.addEventListener(
  "click",
  () => {

    if (
      registerPassword.type ===
      "password"
    ) {

      registerPassword.type =
        "text";

      registerPasswordToggle.textContent =
        "Hide";

    } else {

      registerPassword.type =
        "password";

      registerPasswordToggle.textContent =
        "Show";

    }

  }
);


/* =========================
   REGISTER CONFIRM PASSWORD
   SHOW / HIDE
========================= */

const registerConfirmPassword =
  document.getElementById(
    "U9-register-confirm-password"
  );

const registerConfirmPasswordToggle =
  document.getElementById(
    "U9-register-confirm-password-toggle"
  );


registerConfirmPasswordToggle.addEventListener(
  "click",
  () => {

    if (
      registerConfirmPassword.type ===
      "password"
    ) {

      registerConfirmPassword.type =
        "text";

      registerConfirmPasswordToggle.textContent =
        "Hide";

    } else {

      registerConfirmPassword.type =
        "password";

      registerConfirmPasswordToggle.textContent =
        "Show";

    }

  }
);


/* =========================
   LOGIN PASSWORD
   SHOW / HIDE
========================= */

const loginPassword =
  document.getElementById(
    "U9-login-password"
  );

const loginPasswordToggle =
  document.getElementById(
    "U9-login-password-toggle"
  );


loginPasswordToggle.addEventListener(
  "click",
  () => {

    if (
      loginPassword.type ===
      "password"
    ) {

      loginPassword.type =
        "text";

      loginPasswordToggle.textContent =
        "Hide";

    } else {

      loginPassword.type =
        "password";

      loginPasswordToggle.textContent =
        "Show";

    }

  }
);


/* =========================
   REGISTER FORM
========================= */

const registerForm =
  document.getElementById(
    "U9-register-form"
  );


registerForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    /* =========================
       GET FORM DATA
    ========================= */

    const username =
      document
        .getElementById(
          "U9-register-username"
        )
        .value
        .trim();


    const email =
      document
        .getElementById(
          "U9-register-email"
        )
        .value
        .trim();


    const password =
      document.getElementById(
        "U9-register-password"
      ).value;


    const confirmPassword =
      document.getElementById(
        "U9-register-confirm-password"
      ).value;


    /* =========================
       CHECK PASSWORD
    ========================= */

    if (
      password !==
      confirmPassword
    ) {

      alert(
        "Passwords do not match."
      );

      return;

    }


    /* =========================
       REGISTER REQUEST
    ========================= */

    try {

      const response =
        await fetch(
          "https://tvtakmswbzawaweytimx.supabase.co/functions/v1/register",
          {
            method: "POST",

            credentials: "include",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              username:
                username,

              email:
                email,

              password:
                password

            })

          }
        );


      const result =
        await response.json();


      /* =========================
         REGISTER ERROR
      ========================= */

      if (!response.ok) {

        alert(
          result.error ||
          "Registration failed."
        );

        return;

      }


      /* =========================
         REGISTER SUCCESS
      ========================= */

      alert(
        "Registration successful."
      );


      /* Clear form */

      registerForm.reset();


      /* Close modal */

      registerModal.style.display =
        "none";


      /* =========================
         GET CURRENT USER
      ========================= */

      await getCurrentUser();


      console.log(
        "Register result:",
        result
      );


    } catch (error) {

      console.error(
        "Register error:",
        error
      );


      alert(
        "Unable to connect to the server."
      );

    }

  }
);


/* =========================
   GET CURRENT USER
========================= */

async function getCurrentUser() {

  const headerActions =
    document.getElementById(
      "U9-page-header-actions"
    );


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

      console.log(
        "Not logged in."
      );


      registerButton.style.display =
        "block";

      loginButton.style.display =
        "block";

      userButton.style.display =
        "none";


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


      /* Set username */

      usernameText.textContent =
        result.user.username;


      /* Show User Button */

      userButton.style.display =
        "flex";


      /* Show Header Actions */

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


    headerActions.style.display =
      "flex";


    return null;


  } catch (error) {

    console.error(
      "Get current user error:",
      error
    );


    /* If session check fails,
       show normal logged-out buttons */

    registerButton.style.display =
      "block";

    loginButton.style.display =
      "block";

    userButton.style.display =
      "none";


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
