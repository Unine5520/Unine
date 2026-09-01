document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =====================================================
        // API
        // =====================================================

        const API =
            "https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";


        // =====================================================
        // ELEMENTS
        // =====================================================

        const rlModal =
            document.getElementById(
                "rlModal"
            );


        const loginButton =
            document.getElementById(
                "loginButton"
            );


        const registerButton =
            document.getElementById(
                "registerButton"
            );


        const rlClose =
            document.getElementById(
                "rlClose"
            );


        const loginTab =
            document.getElementById(
                "loginTab"
            );


        const registerTab =
            document.getElementById(
                "registerTab"
            );


        const loginForm =
            document.getElementById(
                "loginForm"
            );


        const registerForm =
            document.getElementById(
                "registerForm"
            );


        const rlTitle =
            document.getElementById(
                "rlTitle"
            );


        // =====================================================
        // INPUT
        // =====================================================

        const loginEmail =
            document.getElementById(
                "loginEmail"
            );


        const loginPassword =
            document.getElementById(
                "loginPassword"
            );


        const registerUsername =
            document.getElementById(
                "registerUsername"
            );


        const registerEmail =
            document.getElementById(
                "registerEmail"
            );


        const registerPassword =
            document.getElementById(
                "registerPassword"
            );


        const registerConfirm =
            document.getElementById(
                "registerConfirm"
            );


        // =====================================================
        // BUTTON
        // =====================================================

        const loginSubmit =
            document.getElementById(
                "loginSubmit"
            );


        const registerSubmit =
            document.getElementById(
                "registerSubmit"
            );


        // =====================================================
        // ERROR
        // =====================================================

        const loginError =
            document.getElementById(
                "loginError"
            );


        const registerError =
            document.getElementById(
                "registerError"
            );


        // =====================================================
        // STATE
        // =====================================================

        let loginErrorTimer;

        let registerErrorTimer;

        let userLoggedIn =
            false;


        window.userLoggedIn =
            false;


        // =====================================================
        // ERROR SYSTEM
        // =====================================================

        function showError(
            element,
            message = "",
            type = ""
        ) {

            if (!element) {

                return;

            }


            if (
                type ===
                "login"
            ) {

                clearTimeout(
                    loginErrorTimer
                );


                loginErrorTimer =
                    setTimeout(
                        () => {

                            element.innerText =
                                "";

                        },
                        3000
                    );

            }


            if (
                type ===
                "register"
            ) {

                clearTimeout(
                    registerErrorTimer
                );


                registerErrorTimer =
                    setTimeout(
                        () => {

                            element.innerText =
                                "";

                        },
                        3000
                    );

            }


            element.innerText =
                message;

        }


        function clearErrors() {

            if (loginError) {

                loginError.innerText =
                    "";

            }


            if (registerError) {

                registerError.innerText =
                    "";

            }


            clearTimeout(
                loginErrorTimer
            );


            clearTimeout(
                registerErrorTimer
            );

        }


        // =====================================================
        // OPEN / CLOSE
        // =====================================================

        function openRL(
            type
        ) {

            if (!rlModal) {

                return;

            }


            rlModal.classList.remove(
                "hidden"
            );


            clearErrors();


            if (
                type ===
                "register"
            ) {

                showRegister();

            }
            else {

                showLogin();

            }

        }


        function closeRL() {

            if (!rlModal) {

                return;

            }


            rlModal.classList.add(
                "hidden"
            );


            clearErrors();

        }


        // =====================================================
        // TAB
        // =====================================================

        function showLogin() {

            if (rlTitle) {

                rlTitle.innerText =
                    "Login";

            }


            if (loginTab) {

                loginTab.classList.add(
                    "active"
                );

            }


            if (registerTab) {

                registerTab.classList.remove(
                    "active"
                );

            }


            if (loginForm) {

                loginForm.classList.remove(
                    "hidden"
                );

            }


            if (registerForm) {

                registerForm.classList.add(
                    "hidden"
                );

            }

        }


        function showRegister() {

            if (rlTitle) {

                rlTitle.innerText =
                    "Register";

            }


            if (registerTab) {

                registerTab.classList.add(
                    "active"
                );

            }


            if (loginTab) {

                loginTab.classList.remove(
                    "active"
                );

            }


            if (registerForm) {

                registerForm.classList.remove(
                    "hidden"
                );

            }


            if (loginForm) {

                loginForm.classList.add(
                    "hidden"
                );

            }

        }


        // =====================================================
        // OPEN BUTTONS
        // =====================================================

        if (loginButton) {

            loginButton.onclick =
                () => {

                    openRL(
                        "login"
                    );

                };

        }


        if (registerButton) {

            registerButton.onclick =
                () => {

                    openRL(
                        "register"
                    );

                };

        }


        if (rlClose) {

            rlClose.onclick =
                closeRL;

        }


        if (loginTab) {

            loginTab.onclick =
                showLogin;

        }


        if (registerTab) {

            registerTab.onclick =
                showRegister;

        }


        // =====================================================
        // PASSWORD EYE
        // =====================================================

        document
            .querySelectorAll(
                ".toggle-password"
            )
            .forEach(
                button => {

                    button.onclick =
                        () => {

                            const input =
                                document.getElementById(
                                    button.dataset.target
                                );


                            if (!input) {

                                return;

                            }


                            if (
                                input.type ===
                                "password"
                            ) {

                                input.type =
                                    "text";


                                button.classList.add(
                                    "show"
                                );

                            }
                            else {

                                input.type =
                                    "password";


                                button.classList.remove(
                                    "show"
                                );

                            }

                        };

                }
            );


        // =====================================================
        // BUTTON ACTIVE STATE
        // =====================================================

        function checkLoginButton() {

            const ok =
                loginEmail &&
                loginPassword &&
                loginEmail.value.trim() &&
                loginPassword.value;


            if (loginSubmit) {

                loginSubmit.disabled =
                    !ok;


                loginSubmit.classList.toggle(
                    "active",
                    !!ok
                );

            }

        }


        function checkRegisterButton() {

            const ok =
                registerUsername &&
                registerEmail &&
                registerPassword &&
                registerConfirm &&
                registerUsername.value.trim() &&
                registerEmail.value.trim() &&
                registerPassword.value &&
                registerConfirm.value;


            if (registerSubmit) {

                registerSubmit.disabled =
                    !ok;


                registerSubmit.classList.toggle(
                    "active",
                    !!ok
                );

            }

        }


        if (loginEmail) {

            loginEmail.oninput =
                checkLoginButton;

        }


        if (loginPassword) {

            loginPassword.oninput =
                checkLoginButton;

        }


        if (registerUsername) {

            registerUsername.oninput =
                checkRegisterButton;

        }


        if (registerEmail) {

            registerEmail.oninput =
                checkRegisterButton;

        }


        if (registerPassword) {

            registerPassword.oninput =
                checkRegisterButton;

        }


        if (registerConfirm) {

            registerConfirm.oninput =
                checkRegisterButton;

        }


        // =====================================================
        // USER LOGIN EVENT
        // =====================================================

        function notifyUserLogin(
            user
        ) {

            if (!user) {

                return;

            }


            window.dispatchEvent(
                new CustomEvent(
                    "user-login",
                    {
                        detail: {
                            user
                        }
                    }
                )
            );

        }


        // =====================================================
        // REGISTER
        // =====================================================

        if (registerSubmit) {

            registerSubmit.onclick =
                async () => {

                    clearErrors();


                    if (
                        registerPassword.value !==
                        registerConfirm.value
                    ) {

                        showError(
                            registerError,
                            "Passwords do not match",
                            "register"
                        );


                        return;

                    }


                    registerSubmit.disabled =
                        true;


                    try {

                        const res =
                            await fetch(
                                `${API}/register`,
                                {
                                    method: "POST",

                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },

                                    credentials:
                                        "include",

                                    body:
                                        JSON.stringify(
                                            {
                                                username:
                                                    registerUsername.value.trim(),

                                                email:
                                                    registerEmail.value.trim(),

                                                password:
                                                    registerPassword.value
                                            }
                                        )
                                }
                            );


                        const data =
                            await res.json();


                        console.log(
                            "REGISTER:",
                            data
                        );


                        if (data.success) {


                            if (data.user) {

                                userLoggedIn =
                                    true;


                                window.userLoggedIn =
                                    true;


                                updateHeader(
                                    data.user
                                );


                                /*
                                 * Notify Order page
                                 *
                                 * order.js will immediately
                                 * load /me and /order-status.
                                 */

                                notifyUserLogin(
                                    data.user
                                );

                            }


                            registerUsername.value =
                                "";

                            registerEmail.value =
                                "";

                            registerPassword.value =
                                "";

                            registerConfirm.value =
                                "";


                            closeRL();

                        }
                        else {

                            showError(
                                registerError,
                                data.error ||
                                data.message ||
                                "Register failed",
                                "register"
                            );

                        }

                    }
                    catch (err) {

                        console.error(
                            "Register error:",
                            err
                        );


                        showError(
                            registerError,
                            "Network error, please try again",
                            "register"
                        );

                    }
                    finally {

                        checkRegisterButton();

                    }

                };

        }


        // =====================================================
        // LOGIN
        // =====================================================

        if (loginSubmit) {

            loginSubmit.onclick =
                async () => {

                    clearErrors();


                    loginSubmit.disabled =
                        true;


                    try {

                        const res =
                            await fetch(
                                `${API}/login`,
                                {
                                    method: "POST",

                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },

                                    credentials:
                                        "include",

                                    body:
                                        JSON.stringify(
                                            {
                                                login:
                                                    loginEmail.value.trim(),

                                                password:
                                                    loginPassword.value
                                            }
                                        )
                                }
                            );


                        const data =
                            await res.json();


                        console.log(
                            "LOGIN:",
                            data
                        );


                        if (data.success) {


                            if (data.user) {

                                userLoggedIn =
                                    true;


                                window.userLoggedIn =
                                    true;


                                updateHeader(
                                    data.user
                                );


                                /*
                                 * Notify Order page
                                 *
                                 * order.js will immediately
                                 * load /me and /order-status.
                                 */

                                notifyUserLogin(
                                    data.user
                                );

                            }


                            loginEmail.value =
                                "";

                            loginPassword.value =
                                "";


                            loginPassword.type =
                                "password";


                            closeRL();

                        }
                        else {

                            showError(
                                loginError,
                                data.error ||
                                data.message ||
                                "Login failed",
                                "login"
                            );

                        }

                    }
                    catch (err) {

                        console.error(
                            "Login error:",
                            err
                        );


                        showError(
                            loginError,
                            "Network error, please try again",
                            "login"
                        );

                    }
                    finally {

                        checkLoginButton();

                    }

                };

        }


        // =====================================================
        // UPDATE HEADER
        // =====================================================

        function updateHeader(
            user
        ) {

            if (!user) {

                return;

            }


            const telegramButton =
                document.getElementById(
                    "telegramButton"
                );


            const homeAuth =
                document.getElementById(
                    "homeAuth"
                );


            const userHeader =
                document.getElementById(
                    "userHeader"
                );


            const headerUsername =
                document.getElementById(
                    "headerUsername"
                );


            const meUsername =
                document.getElementById(
                    "meUsername"
                );


            if (telegramButton) {

                telegramButton.classList.add(
                    "hidden"
                );

            }


            if (homeAuth) {

                homeAuth.classList.add(
                    "hidden"
                );

            }


            if (userHeader) {

                userHeader.classList.remove(
                    "hidden"
                );

            }


            if (headerUsername) {

                headerUsername.innerText =
                    user.username;

            }


            if (meUsername) {

                meUsername.innerText =
                    user.username;

            }

        }


        window.updateHeader =
            updateHeader;


        window.openRL =
            openRL;


        // =====================================================
        // SESSION
        // =====================================================

        async function checkSession() {

            try {

                const res =
                    await fetch(
                        `${API}/me`,
                        {
                            method: "GET",
                            credentials: "include"
                        }
                    );


                const data =
                    await res.json();


                console.log(
                    "ME:",
                    data
                );


                if (
                    data.success &&
                    data.logged_in &&
                    data.user
                ) {

                    userLoggedIn =
                        true;


                    window.userLoggedIn =
                        true;


                    updateHeader(
                        data.user
                    );


                    /*
                     * Important:
                     *
                     * This also tells order.js
                     * to immediately restore the
                     * current Order state.
                     */

                    notifyUserLogin(
                        data.user
                    );

                }
                else {

                    userLoggedIn =
                        false;


                    window.userLoggedIn =
                        false;

                }

            }
            catch (err) {

                console.log(
                    "Not login"
                );

            }

        }


        // =====================================================
        // ESC
        // =====================================================

        document.addEventListener(
            "keydown",
            e => {

                if (
                    e.key ===
                    "Escape"
                ) {

                    closeRL();

                }

            }
        );


        // =====================================================
        // START
        // =====================================================

        checkSession();


    }
);
