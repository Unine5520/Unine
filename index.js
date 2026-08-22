/* =========================================
   SUPABASE CONFIGURATION
========================================= */

const SUPABASE_URL =
    "https://moufqvgakqqozybedisj.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdWZxdmdha3Fxb3p5YmVkaXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNzI0NjQsImV4cCI6MjEwMjk0ODQ2NH0.LjMk0ZDmImS4NYezx6Xp6FbUxVrH_esroZXzXBWkiVc";



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
   DOM
========================================= */

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



/* =========================================
   LOGIN
========================================= */

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



/* =========================================
   REGISTER
========================================= */

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
   MODAL
========================================= */

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
        loginModal.classList.contains(
            "hidden"
        );


    const registerClosed =
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
   MESSAGES
========================================= */

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


    element.style.color =
        type === "success"
            ? "#15803d"
            : "#dc2626";
}


function clearMessage(element) {

    if (!element) {
        return;
    }


    element.textContent =
        "";
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


    button.disabled =
        loading;


    button.textContent =
        loading
            ? loadingText
            : normalText;
}



/* =========================================
   OPEN LOGIN
========================================= */

function openLogin() {

    clearMessage(
        loginMessage
    );


    loginForm.reset();


    closeModal(
        registerModal
    );


    openModal(
        loginModal
    );


    setTimeout(() => {

        const input =
            document.getElementById(
                "loginEmail"
            );


        if (input) {
            input.focus();
        }

    }, 100);
}



/* =========================================
   OPEN REGISTER
========================================= */

function openRegister() {

    clearMessage(
        registerMessage
    );


    registerForm.reset();


    closeModal(
        loginModal
    );


    openModal(
        registerModal
    );


    setTimeout(() => {

        const input =
            document.getElementById(
                "registerUsername"
            );


        if (input) {
            input.focus();
        }

    }, 100);
}



/* =========================================
   UPDATE AUTH UI
========================================= */

async function updateAuthUI(user) {

    if (!user) {

        loggedOutActions
            .classList
            .remove("hidden");


        loggedInActions
            .classList
            .add("hidden");


        welcomeUser
            .classList
            .add("hidden");


        headerUsername.textContent =
            "User";


        welcomeUsername.textContent =
            "";


        return;
    }


    loggedOutActions
        .classList
        .add("hidden");


    loggedInActions
        .classList
        .remove("hidden");


    const username =
        user.user_metadata?.username ||
        user.email?.split("@")[0] ||
        "User";


    headerUsername.textContent =
        username;


    welcomeUsername.textContent =
        username;


    welcomeUser
        .classList
        .remove("hidden");
}



/* =========================================
   INITIALIZE AUTH
========================================= */

async function initializeAuth() {

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


        return;
    }


    await updateAuthUI(
        data.session?.user || null
    );
}



/* =========================================
   AUTH STATE
========================================= */

function listenForAuthChanges() {

    supabaseClient
        .auth
        .onAuthStateChange(
            async (
                event,
                session
            ) => {

                console.log(
                    "Auth event:",
                    event
                );


                await updateAuthUI(
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


        setTimeout(() => {

            closeModal(
                loginModal
            );

        }, 500);


    } catch (error) {

        console.error(
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


    const formData =
        new FormData(
            registerForm
        );


    const username =
        String(
            formData.get("username") || ""
        ).trim();


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



    /* USERNAME */

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



    /* PASSWORD */

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


        if (!data.user) {

            showMessage(
                registerMessage,
                "Registration failed."
            );


            return;
        }


        showMessage(
            registerMessage,
            "Account created successfully.",
            "success"
        );


        registerForm.reset();


        if (data.session) {

            setTimeout(() => {

                closeModal(
                    registerModal
                );

            }, 700);

        } else {

            setTimeout(() => {

                closeModal(
                    registerModal
                );


                openLogin();

            }, 1000);

        }


    } catch (error) {

        console.error(
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


    } catch (error) {

        console.error(
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
   AUTH ERROR
========================================= */

function getAuthErrorMessage(error) {

    if (!error) {
        return "Something went wrong.";
    }


    const message =
        String(
            error.message || ""
        ).toLowerCase();


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
            "rate limit"
        )
    ) {

        return "Too many attempts. Please try again later.";
    }


    return (
        error.message ||
        "Authentication failed."
    );
}



/* =========================================
   PROTECTED PAGES
========================================= */

function setupNavigation() {

    const protectedPages = [
        "order",
        "inbox",
        "me"
    ];


    document
        .querySelectorAll(
            ".nav-item"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                async event => {

                    const page =
                        item.dataset.page;


                    if (
                        !protectedPages
                            .includes(page)
                    ) {
                        return;
                    }


                    const {
                        data
                    } =
                        await supabaseClient
                            .auth
                            .getSession();


                    if (
                        !data.session
                    ) {

                        event.preventDefault();

                        openLogin();
                    }

                }
            );

        });
}



/* =========================================
   MODAL EVENTS
========================================= */

function setupModalEvents() {

    closeLoginModal
        .addEventListener(
            "click",
            () => {
                closeModal(
                    loginModal
                );
            }
        );


    closeRegisterModal
        .addEventListener(
            "click",
            () => {
                closeModal(
                    registerModal
                );
            }
        );


    document
        .querySelectorAll(
            "[data-close-modal]"
        )
        .forEach(element => {

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

        });


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
   EVENTS
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
   START
========================================= */

async function initializeApp() {

    setupEventListeners();

    setupModalEvents();

    setupNavigation();

    listenForAuthChanges();

    await initializeAuth();
}


document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);
