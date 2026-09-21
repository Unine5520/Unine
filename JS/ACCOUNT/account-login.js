
/* =========================
   LOGIN ELEMENTS
========================= */

const loginButton =
  document.getElementById(
    "U9-page-header-login"
  );


const loginModal =
  document.getElementById(
    "U9-login-modal"
  );


const loginClose =
  document.getElementById(
    "U9-login-modal-close"
  );


/* =========================
   OPEN LOGIN
========================= */

loginButton.addEventListener(
  "click",
  () => {

    loginModal.style.display =
      "flex";

  }
);


/* =========================
   CLOSE LOGIN
========================= */

loginClose.addEventListener(
  "click",
  () => {

    loginModal.style.display =
      "none";

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
