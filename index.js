/* =========================================
   UNINE
   INDEX.JS
   AUTHENTICATION + MAIN NAVIGATION
========================================= */


/* =========================================
   SUPABASE CONFIGURATION
========================================= */

const SUPABASE_URL =
    "https://moufqvgakqqozybedisj.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdWZxdmdha3Fxb3p5YmVkaXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNzI0NjQsImV4cCI6MjEwMjk0ODQ2NH0.LjMk0ZDmImS4NYezx6Xp6FbUxVrH_esroZXzXBWkiVc";


/*
 * IMPORTANT:
 *
 * Only use the Supabase Publishable / Anon key
 * in frontend code.
 *
 * NEVER put:
 *
 * - service_role key
 * - secret key
 * - database password
 *
 * into this file.
 */


/* =========================================
   SUPABASE CLIENT
========================================= */

const {
    createClient
} = window.supabase;


const supabaseClient =
    createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* =========================================
   DOM ELEMENTS
========================================= */


/* -----------------------------------------
   HEADER
----------------------------------------- */

const loginButton =
    document.getElementById(
        "loginButton"
    );


const registerButton =
    document.getElementById(
        "registerButton"
    );


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


const loggedOutActions =
    document.getElementById(
        "loggedOutActions"
    );


const loggedInActions =
    document.getElementById(
        "loggedInActions"
    );


const headerUsername =
    document.getElementById(
        "headerUsername"
    );


const welcomeUser =
    document.getElementById(
        "welcomeUser"
    );


const welcomeUsername =
    document.getElementById(
        "welcomeUsername"
    );


/* -----------------------------------------
   LOGIN MODAL
----------------------------------------- */

const loginModal =
    document.getElementById(
        "loginModal"
    );


const closeLoginModal =
    document.getElementById(
        "closeLoginModal"
    );


const loginForm =
    document.getElementById(
        "loginForm"
    );


const loginSubmit =
    document.getElementById(
        "loginSubmit"
    );


const loginMessage =
    document.getElementById(
        "loginMessage"
    );


/* -----------------------------------------
   REGISTER MODAL
----------------------------------------- */

const registerModal =
    document.getElementById(
        "registerModal"
    );


const closeRegisterModal =
    document.getElementById(
        "closeRegisterModal"
    );


const registerForm =
    document.getElementById(
        "registerForm"
    );


const registerSubmit =
    document.getElementById(
        "registerSubmit"
    );


const registerMessage =
    document.getElementById(
        "registerMessage"
    );


/* =========================================
   APPLICATION STATE
========================================= */

let currentUser = null;


/*
 * Prevent multiple navigation checks
 * from running at the same time.
 */

let navigationChecking = false;


/* =========================================
   UTILITY
========================================= */


/* -----------------------------------------
   SHOW MESSAGE
----------------------------------------- */

function showMessage(
    element,
    message,
    type = "error"
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    if (type === "success") {

        element.style.color =
            "#15803d";

    } else {

        element.style.color =
            "#dc2626";
    }
}


/* -----------------------------------------
   CLEAR MESSAGE
----------------------------------------- */

function clearMessage(element) {

    if (!element) {
        return;
    }


    element.textContent =
        "";
}


/* -----------------------------------------
   BUTTON LOADING
----------------------------------------- */

function setButtonLoading(
    button,
    loading,
    loadingText,
    normalText
) {

    if (!button) {
        return;
    }


    button.disabled =
        loading;


    button.textContent =
        loading
            ? loadingText
            : normalText;
}


/* =========================================
   MODAL
========================================= */


/* -----------------------------------------
   OPEN MODAL
----------------------------------------- */

function openModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "hidden"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";
}


/* -----------------------------------------
   CLOSE MODAL
----------------------------------------- */

function closeModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.add(
        "hidden"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    const loginClosed =
        !loginModal ||
        loginModal.classList.contains(
            "hidden"
        );


    const registerClosed =
        !registerModal ||
        registerModal.classList.contains(
            "hidden"
        );


    if (
        loginClosed &&
        registerClosed
    ) {

        document.body.style.overflow =
            "";
    }
}


/* =========================================
   LOGIN MODAL
========================================= */

function openLogin() {

    if (!loginModal) {
        return;
    }


    clearMessage(
        loginMessage
    );


    if (loginForm) {
        loginForm.reset();
    }


    closeModal(
        registerModal
    );


    openModal(
        loginModal
    );


    setTimeout(() => {

        const emailInput =
            document.getElementById(
                "loginEmail"
            );


        if (emailInput) {

            emailInput.focus();
        }

    }, 100);
}


/* =========================================
   REGISTER MODAL
========================================= */

function openRegister() {

    if (!registerModal) {
        return;
    }


    clearMessage(
        registerMessage
    );


    if (registerForm) {
        registerForm.reset();
    }


    closeModal(
        loginModal
    );


    openModal(
        registerModal
    );


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
   AUTH UI
========================================= */

function updateAuthUI(user) {

    currentUser =
        user || null;


    /* -------------------------------------
       LOGGED OUT
    ------------------------------------- */

    if (!user) {

        if (loggedOutActions) {

            loggedOutActions
                .classList
                .remove("hidden");
        }


        if (loggedInActions) {

            loggedInActions
                .classList
                .add("hidden");
        }


        if (welcomeUser) {

            welcomeUser
                .classList
                .add("hidden");
        }


        if (headerUsername) {

            headerUsername.textContent =
                "User";
        }


        if (welcomeUsername) {

            welcomeUsername.textContent =
                "";
        }


        return;
    }


    /* -------------------------------------
       LOGGED IN
    ------------------------------------- */

    if (loggedOutActions) {

        loggedOutActions
            .classList
            .add("hidden");
    }


    if (loggedInActions) {

        loggedInActions
            .classList
            .remove("hidden");
    }


    /*
     * Username comes from:
     *
     * supabase.auth.signUp({
     *     options: {
     *         data: {
     *             username
     *         }
     *     }
     * })
     */

    const username =
        user.user_metadata?.username ||
        user.email?.split("@")[0] ||
        "User";


    if (headerUsername) {

        headerUsername.textContent =
            username;
    }


    if (welcomeUsername) {

        welcomeUsername.textContent =
            username;
    }


    if (welcomeUser) {

        welcomeUser
            .classList
            .remove("hidden");
    }
}


/* =========================================
   GET CURRENT SESSION
========================================= */

async function getCurrentSession() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .auth
                .getSession();


        if (error) {

            console.error(
                "Session error:",
                error
            );


            return null;
        }


        return data?.session || null;

    } catch (error) {

        console.error(
            "Unexpected session error:",
            error
        );


        return null;
    }
}


/* =========================================
   INITIALIZE AUTH
========================================= */

async function initializeAuth() {

    const session =
        await getCurrentSession();


    if (session?.user) {

        updateAuthUI(
            session.user
        );

    } else {

        updateAuthUI(
            null
        );
    }
}


/* =========================================
   AUTH STATE LISTENER
========================================= */

function listenForAuthChanges() {

    supabaseClient
        .auth
        .onAuthStateChange(
            (
                event,
                session
            ) => {

                console.log(
                    "Auth event:",
                    event
                );


                /*
                 * Supabase recommends keeping
                 * this callback lightweight.
                 */

                updateAuthUI(
                    session?.user || null
                );
            }
        );
}


/* =========================================
   LOGIN
========================================= */

async function handleLogin(event) {

    event.preventDefault();


    clearMessage(
        loginMessage
    );


    if (!loginForm) {
        return;
    }


    const formData =
        new FormData(
            loginForm
        );


    const email =
        String(
            formData.get("email") || ""
        )
        .trim()
        .toLowerCase();


    const password =
        String(
            formData.get("password") || ""
        );


    /* -------------------------------------
       VALIDATION
    ------------------------------------- */

    if (
        !email ||
        !password
    ) {

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
        } =
            await supabaseClient
                .auth
                .signInWithPassword({

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
                getAuthErrorMessage(
                    error
                )
            );


            return;
        }


        if (!data?.user) {

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


        /*
         * Auth listener will update
         * the header automatically.
         */

        setTimeout(() => {

            closeModal(
                loginModal
            );

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


    clearMessage(
        registerMessage
    );


    if (!registerForm) {
        return;
    }


    const formData =
        new FormData(
            registerForm
        );


    const username =
        String(
            formData.get("username") || ""
        )
        .trim();


    const email =
        String(
            formData.get("email") || ""
        )
        .trim()
        .toLowerCase();


    const password =
        String(
            formData.get("password") || ""
        );


    const passwordConfirm =
        String(
            formData.get(
                "password_confirm"
            ) || ""
        );


    /* -------------------------------------
       USERNAME VALIDATION
    ------------------------------------- */

    if (
        !/^[A-Za-z0-9_]{3,30}$/
            .test(username)
    ) {

        showMessage(
            registerMessage,
            "Username must contain 3-30 letters, numbers or underscores."
        );


        return;
    }


    /* -------------------------------------
       PASSWORD VALIDATION
    ------------------------------------- */

    if (
        password.length < 8
    ) {

        showMessage(
            registerMessage,
            "Password must be at least 8 characters."
        );


        return;
    }


    if (
        password !==
        passwordConfirm
    ) {

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
        } =
            await supabaseClient
                .auth
                .signUp({

                    email,

                    password,

                    options: {

                        data: {

                            username:
                                username

                        }

                    }

                });


        if (error) {

            console.error(
                "Register error:",
                error
            );


            showMessage(
                registerMessage,
                getAuthErrorMessage(
                    error
                )
            );


            return;
        }


        if (!data?.user) {

            showMessage(
                registerMessage,
                "Registration failed. Please try again."
            );


            return;
        }


        /*
         * Confirm email is OFF in your
         * Supabase project.
         *
         * Therefore normally:
         *
         * data.session
         *
         * should exist immediately.
         */


        if (data.session) {

            showMessage(
                registerMessage,
                "Account created successfully.",
                "success"
            );


            registerForm.reset();


            setTimeout(() => {

                closeModal(
                    registerModal
                );

            }, 700);


        } else {

            /*
             * Safety fallback.
             *
             * If Supabase does not return
             * a session, don't pretend login
             * succeeded.
             */

            showMessage(
                registerMessage,
                "Account created. Please log in.",
                "success"
            );


            registerForm.reset();


            setTimeout(() => {

                closeModal(
                    registerModal
                );


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

    if (!logoutButton) {
        return;
    }


    logoutButton.disabled =
        true;


    logoutButton.textContent =
        "Logging out...";


    try {

        const {
            error
        } =
            await supabaseClient
                .auth
                .signOut();


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
         * Auth state listener updates
         * the UI automatically.
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

        logoutButton.disabled =
            false;


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
        String(
            error.message || ""
        )
        .toLowerCase();


    /* -------------------------------------
       LOGIN
    ------------------------------------- */

    if (
        message.includes(
            "invalid login credentials"
        )
    ) {

        return "Invalid email or password.";
    }


    /* -------------------------------------
       EMAIL
    ------------------------------------- */

    if (
        message.includes(
            "user already registered"
        )
    ) {

        return "This email is already registered.";
    }


    if (
        message.includes(
            "email address is invalid"
        )
    ) {

        return "Please enter a valid email address.";
    }


    /* -------------------------------------
       PASSWORD
    ------------------------------------- */

    if (
        message.includes(
            "password should be at least"
        )
    ) {

        return "Password is too short.";
    }


    if (
        message.includes(
            "weak password"
        )
    ) {

        return "Please choose a stronger password.";
    }


    /* -------------------------------------
       RATE LIMIT
    ------------------------------------- */

    if (
        message.includes(
            "rate limit"
        )
    ) {

        return "Too many attempts. Please try again later.";
    }


    /* -------------------------------------
       EMAIL NOT CONFIRMED
    ------------------------------------- */

    if (
        message.includes(
            "email not confirmed"
        )
    ) {

        return "Email confirmation is still enabled in Supabase. Please turn it off in Authentication settings.";
    }


    /* -------------------------------------
       NETWORK
    ------------------------------------- */

    if (
        message.includes(
            "failed to fetch"
        )
    ) {

        return "Network error. Please check your connection and try again.";
    }


    return (
        error.message ||
        "Authentication failed."
    );
}


/* =========================================
   PROTECTED PAGES
========================================= */


/*
 * These pages require login:
 *
 * Order
 * Inbox
 * Me
 *
 * Home and Shop remain public.
 */

const protectedPages = [
    "order",
    "inbox",
    "me"
];


/* -----------------------------------------
   CHECK AUTH
----------------------------------------- */

async function requireLogin() {

    const session =
        await getCurrentSession();


    if (
        session?.user
    ) {

        return true;
    }


    openLogin();


    return false;
}


/* =========================================
   NAVIGATION
========================================= */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );


    navItems.forEach(
        item => {

            item.addEventListener(
                "click",
                async event => {

                    const page =
                        item.dataset.page;


                    /*
                     * Public page
                     */

                    if (
                        !protectedPages
                            .includes(page)
                    ) {

                        return;
                    }


                    /*
                     * Stop the browser
                     * temporarily.
                     */

                    event.preventDefault();


                    /*
                     * Prevent double clicks.
                     */

                    if (
                        navigationChecking
                    ) {

                        return;
                    }


                    navigationChecking =
                        true;


                    try {

                        const allowed =
                            await requireLogin();


                        if (!allowed) {

                            return;
                        }


                        /*
                         * Login exists.
                         *
                         * Continue navigation.
                         */

                        const target =
                            item.getAttribute(
                                "href"
                            );


                        if (target) {

                            window.location.href =
                                target;
                        }


                    } finally {

                        navigationChecking =
                            false;
                    }

                }
            );

        }
    );
}


/* =========================================
   MODAL EVENTS
========================================= */

function setupModalEvents() {

    /* -------------------------------------
       LOGIN CLOSE
    ------------------------------------- */

    if (closeLoginModal) {

        closeLoginModal
            .addEventListener(
                "click",
                () => {

                    closeModal(
                        loginModal
                    );

                }
            );
    }


    /* -------------------------------------
       REGISTER CLOSE
    ------------------------------------- */

    if (closeRegisterModal) {

        closeRegisterModal
            .addEventListener(
                "click",
                () => {

                    closeModal(
                        registerModal
                    );

                }
            );
    }


    /* -------------------------------------
       OVERLAY CLOSE
    ------------------------------------- */

    document
        .querySelectorAll(
            "[data-close-modal]"
        )
        .forEach(
            element => {

                element.addEventListener(
                    "click",
                    () => {

                        closeModal(
                            loginModal
                        );


                        closeModal(
                            registerModal
                        );

                    }
                );

            }
        );


    /* -------------------------------------
       ESC KEY
    ------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !==
                "Escape"
            ) {

                return;
            }


            closeModal(
                loginModal
            );


            closeModal(
                registerModal
            );

        }
    );
}


/* =========================================
   FORGOT PASSWORD
========================================= */


/*
 * Forgot Password is NOT implemented
 * inside index.js.
 *
 * The login modal simply sends the user
 * to:
 *
 * forgot-password/forgot-password.html
 *
 * The actual password reset system will
 * be handled there.
 */

function setupForgotPassword() {

    const forgotPasswordLinks =
        document.querySelectorAll(
            'a[href*="forgot-password"]'
        );


    forgotPasswordLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    closeModal(
                        loginModal
                    );

                }
            );

        }
    );
}


/* =========================================
   GLOBAL EVENT LISTENERS
========================================= */

function setupEventListeners() {

    /* -------------------------------------
       LOGIN BUTTON
    ------------------------------------- */

    if (loginButton) {

        loginButton.addEventListener(
            "click",
            openLogin
        );
    }


    /* -------------------------------------
       REGISTER BUTTON
    ------------------------------------- */

    if (registerButton) {

        registerButton.addEventListener(
            "click",
            openRegister
        );
    }


    /* -------------------------------------
       LOGOUT BUTTON
    ------------------------------------- */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            handleLogout
        );
    }


    /* -------------------------------------
       LOGIN FORM
    ------------------------------------- */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );
    }


    /* -------------------------------------
       REGISTER FORM
    ------------------------------------- */

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            handleRegister
        );
    }
}


/* =========================================
   APPLICATION INITIALIZATION
========================================= */

async function initializeApp() {

    /*
     * Setup UI events first.
     */

    setupEventListeners();


    setupModalEvents();


    setupNavigation();


    setupForgotPassword();


    /*
     * Start Supabase auth listener.
     */

    listenForAuthChanges();


    /*
     * Restore existing session.
     */

    await initializeAuth();
}


/* =========================================
   START APPLICATION
========================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();
}
