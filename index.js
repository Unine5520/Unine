/* =========================================
   SUPABASE CONFIGURATION
========================================= */

const SUPABASE_URL = "https://moufqvgakqqozybedisj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdWZxdmdha3Fxb3p5YmVkaXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNzI0NjQsImV4cCI6MjEwMjk0ODQ2NH0.LjMk0ZDmImS4NYezx6Xp6FbUxVrH_esroZXzXBWkiVc";


/* =========================================
   SUPABASE CLIENT
========================================= */

const { createClient } = window.supabase;

const supabaseClient = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =========================================
   DOM ELEMENTS
========================================= */

const loginButton =
    document.getElementById("loginButton");

const registerButton =
    document.getElementById("registerButton");

const logoutButton =
    document.getElementById("logoutButton");

const loggedOutActions =
    document.getElementById("loggedOutActions");

const loggedInActions =
    document.getElementById("loggedInActions");

const headerUsername =
    document.getElementById("headerUsername");

const welcomeUser =
    document.getElementById("welcomeUser");

const welcomeUsername =
    document.getElementById("welcomeUsername");


/* Login */

const loginModal =
    document.getElementById("loginModal");

const closeLoginModal =
    document.getElementById("closeLoginModal");

const loginForm =
    document.getElementById("loginForm");

const loginSubmit =
    document.getElementById("loginSubmit");

const loginMessage =
    document.getElementById("loginMessage");


/* Register */

const registerModal =
    document.getElementById("registerModal");

const closeRegisterModal =
    document.getElementById("closeRegisterModal");

const registerForm =
    document.getElementById("registerForm");

const registerSubmit =
    document.getElementById("registerSubmit");

const registerMessage =
    document.getElementById("registerMessage");


/* =========================================
   MODAL FUNCTIONS
========================================= */

function openModal(modal) {

    if (!modal) {
        return;
    }

    modal.classList.remove("hidden");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";
}


function closeModal(modal) {

    if (!modal) {
        return;
    }

    modal.classList.add("hidden");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    if (
        loginModal.classList.contains("hidden") &&
        registerModal.classList.contains("hidden")
    ) {
        document.body.style.overflow = "";
    }
}


/* =========================================
   MESSAGE FUNCTIONS
========================================= */

function showMessage(element, message, type = "error") {

    if (!element) {
        return;
    }

    element.textContent = message;

    if (type === "success") {
        element.style.color = "#15803d";
    } else {
        element.style.color = "#dc2626";
    }
}


function clearMessage(element) {

    if (!element) {
        return;
    }

    element.textContent = "";
}


/* =========================================
   BUTTON LOADING
========================================= */

function setButtonLoading(
    button,
    loading,
    loadingText,
    normalText
) {

    if (!button) {
        return;
    }

    button.disabled = loading;

    button.textContent =
        loading ? loadingText : normalText;
}


/* =========================================
   PROFILE
========================================= */

async function getCurrentProfile(userId) {

    if (!userId) {
        return null;
    }

    const {
        data,
        error
    } = await supabaseClient
        .from("profiles")
        .select(`
            id,
            username,
            display_name,
            avatar_url,
            platform_account,
            status
        `)
        .eq("id", userId)
        .maybeSingle();

    if (error) {

        console.error(
            "Profile fetch error:",
            error
        );

        return null;
    }

    return data;
}


/* =========================================
   UPDATE UI
========================================= */

async function updateAuthUI(user) {

    if (!user) {

        loggedOutActions.classList.remove("hidden");
        loggedInActions.classList.add("hidden");

        welcomeUser.classList.add("hidden");

        headerUsername.textContent = "User";
        welcomeUsername.textContent = "";

        return;
    }


    const profile =
        await getCurrentProfile(user.id);


    if (profile) {

        const username =
            profile.username ||
            profile.display_name ||
            "User";

        headerUsername.textContent =
            username;

        welcomeUsername.textContent =
            username;

        welcomeUser.classList.remove("hidden");

    } else {

        headerUsername.textContent =
            "User";

        welcomeUser.classList.add("hidden");
    }


    loggedOutActions.classList.add("hidden");
    loggedInActions.classList.remove("hidden");
}


/* =========================================
   GET CURRENT SESSION
========================================= */

async function initializeAuth() {

    const {
        data,
        error
    } = await supabaseClient.auth.getSession();


    if (error) {

        console.error(
            "Session error:",
            error
        );

        return;
    }


    const session = data.session;


    if (session && session.user) {

        await updateAuthUI(
            session.user
        );

    } else {

        await updateAuthUI(null);
    }
}


/* =========================================
   AUTH STATE LISTENER
========================================= */

function listenForAuthChanges() {

    supabaseClient.auth.onAuthStateChange(
        async (event, session) => {

            console.log(
                "Auth event:",
                event
            );


            if (session && session.user) {

                await updateAuthUI(
                    session.user
                );

            } else {

                await updateAuthUI(null);
            }
        }
    );
}


/* =========================================
   OPEN LOGIN
========================================= */

function openLogin() {

    clearMessage(loginMessage);

    loginForm.reset();

    closeModal(registerModal);

    openModal(loginModal);

    setTimeout(() => {

        const emailInput =
            document.getElementById("loginEmail");

        if (emailInput) {
            emailInput.focus();
        }

    }, 100);
}


/* =========================================
   OPEN REGISTER
========================================= */

function openRegister() {

    clearMessage(registerMessage);

    registerForm.reset();

    closeModal(loginModal);

    openModal(registerModal);

    setTimeout(() => {

        const usernameInput =
            document.getElementById(
                "registerUsername"
            );

        if (usernameInput) {
            usernameInput.focus();
        }

    }, 100);
}


/* =========================================
   LOGIN
========================================= */

async function handleLogin(event) {

    event.preventDefault();

    clearMessage(loginMessage);


    const formData =
        new FormData(loginForm);


    const email =
        String(
            formData.get("email") || ""
        ).trim();


    const password =
        String(
            formData.get("password") || ""
        );


    if (!email || !password) {

        showMessage(
            loginMessage,
            "Please enter your email and password."
        );

        return;
    }


    setButtonLoading(
        loginSubmit,
        true,
        "Logging in...",
        "Login"
    );


    try {

        const {
            data,
            error
        } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });


        if (error) {

            console.error(
                "Login error:",
                error
            );

            showMessage(
                loginMessage,
                getAuthErrorMessage(error)
            );

            return;
        }


        if (!data.session) {

            showMessage(
                loginMessage,
                "Login failed. Please try again."
            );

            return;
        }


        showMessage(
            loginMessage,
            "Login successful.",
            "success"
        );


        loginForm.reset();


        setTimeout(() => {

            closeModal(loginModal);

        }, 500);


    } catch (error) {

        console.error(
            "Unexpected login error:",
            error
        );

        showMessage(
            loginMessage,
            "Something went wrong. Please try again."
        );

    } finally {

        setButtonLoading(
            loginSubmit,
            false,
            "Logging in...",
            "Login"
        );
    }
}


/* =========================================
   REGISTER
========================================= */

async function handleRegister(event) {

    event.preventDefault();

    clearMessage(registerMessage);


    const formData =
        new FormData(registerForm);


    const username =
        String(
            formData.get("username") || ""
        ).trim();


    const email =
        String(
            formData.get("email") || ""
        ).trim();


    const password =
        String(
            formData.get("password") || ""
        );


    const passwordConfirm =
        String(
            formData.get("password_confirm") || ""
        );


    /* Username validation */

    if (!/^[A-Za-z0-9_]{3,30}$/.test(username)) {

        showMessage(
            registerMessage,
            "Username must contain 3-30 letters, numbers or underscores."
        );

        return;
    }


    /* Password validation */

    if (password.length < 8) {

        showMessage(
            registerMessage,
            "Password must be at least 8 characters."
        );

        return;
    }


    if (password !== passwordConfirm) {

        showMessage(
            registerMessage,
            "Passwords do not match."
        );

        return;
    }


    setButtonLoading(
        registerSubmit,
        true,
        "Creating account...",
        "Create Account"
    );


    try {

        const {
            data,
            error
        } = await supabaseClient.auth.signUp({

            email,

            password,

            options: {
                data: {
                    username: username
                }
            }

        });


        if (error) {

            console.error(
                "Registration error:",
                error
            );

            showMessage(
                registerMessage,
                getAuthErrorMessage(error)
            );

            return;
        }


        if (!data.user) {

            showMessage(
                registerMessage,
                "Registration failed. Please try again."
            );

            return;
        }


        /*
         * Email verification is intentionally not used.
         *
         * Supabase should have:
         *
         * Authentication
         * → Providers
         * → Email
         * → Confirm email = OFF
         */


        showMessage(
            registerMessage,
            "Account created successfully.",
            "success"
        );


        registerForm.reset();


        /*
         * If Supabase immediately creates a session,
         * the auth listener will update the UI.
         */

        if (data.session) {

            setTimeout(() => {

                closeModal(registerModal);

            }, 700);

        } else {

            /*
             * This means Supabase did not create
             * an active session immediately.
             */

            setTimeout(() => {

                closeModal(registerModal);

                openLogin();

            }, 1000);
        }


    } catch (error) {

        console.error(
            "Unexpected registration error:",
            error
        );

        showMessage(
            registerMessage,
            "Something went wrong. Please try again."
        );

    } finally {

        setButtonLoading(
            registerSubmit,
            false,
            "Creating account...",
            "Create Account"
        );
    }
}


/* =========================================
   LOGOUT
========================================= */

async function handleLogout() {

    logoutButton.disabled = true;

    logoutButton.textContent =
        "Logging out...";


    try {

        const {
            error
        } = await supabaseClient.auth.signOut();


        if (error) {

            console.error(
                "Logout error:",
                error
            );

            alert(
                "Logout failed. Please try again."
            );

            return;
        }


        /*
         * Auth state listener will update UI.
         */

    } catch (error) {

        console.error(
            "Unexpected logout error:",
            error
        );

        alert(
            "Something went wrong. Please try again."
        );

    } finally {

        logoutButton.disabled = false;

        logoutButton.textContent =
            "Logout";
    }
}


/* =========================================
   AUTH ERROR MESSAGES
========================================= */

function getAuthErrorMessage(error) {

    if (!error) {
        return "Something went wrong.";
    }


    const message =
        String(error.message || "")
            .toLowerCase();


    if (
        message.includes(
            "invalid login credentials"
        )
    ) {
        return "Invalid email or password.";
    }


    if (
        message.includes(
            "user already registered"
        )
    ) {
        return "This email is already registered.";
    }


    if (
        message.includes(
            "password should be at least"
        )
    ) {
        return "Password is too short.";
    }


    if (
        message.includes(
            "email rate limit"
        )
    ) {
        return "Too many attempts. Please try again later.";
    }


    return error.message ||
        "Authentication failed.";
}


/* =========================================
   CLOSE MODALS
========================================= */

function setupModalEvents() {

    closeLoginModal.addEventListener(
        "click",
        () => closeModal(loginModal)
    );


    closeRegisterModal.addEventListener(
        "click",
        () => closeModal(registerModal)
    );


    document
        .querySelectorAll("[data-close-modal]")
        .forEach((element) => {

            element.addEventListener(
                "click",
                () => {

                    closeModal(loginModal);
                    closeModal(registerModal);

                }
            );

        });


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {
                return;
            }

            closeModal(loginModal);
            closeModal(registerModal);
        }
    );
}


/* =========================================
   NAVIGATION AUTH CHECK
========================================= */

function setupNavigation() {

    const protectedPages = [
        "order",
        "me"
    ];


    document
        .querySelectorAll(".nav-item")
        .forEach((item) => {

            item.addEventListener(
                "click",
                async (event) => {

                    const page =
                        item.dataset.page;


                    if (
                        !protectedPages.includes(page)
                    ) {
                        return;
                    }


                    const {
                        data
                    } =
                        await supabaseClient
                            .auth
                            .getSession();


                    if (!data.session) {

                        event.preventDefault();

                        openLogin();
                    }

                }
            );

        });
}


/* =========================================
   EVENT LISTENERS
========================================= */

function setupEventListeners() {

    loginButton.addEventListener(
        "click",
        openLogin
    );


    registerButton.addEventListener(
        "click",
        openRegister
    );


    logoutButton.addEventListener(
        "click",
        handleLogout
    );


    loginForm.addEventListener(
        "submit",
        handleLogin
    );


    registerForm.addEventListener(
        "submit",
        handleRegister
    );
}


/* =========================================
   APPLICATION START
========================================= */

async function initializeApp() {

    setupEventListeners();

    setupModalEvents();

    setupNavigation();

    listenForAuthChanges();

    await initializeAuth();
}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);
