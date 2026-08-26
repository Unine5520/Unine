/* =========================================
   SUPABASE CONFIG
========================================= */


const SUPABASE_URL =
"https://moufqvgakqqozybedisj.supabase.co";


const SUPABASE_PUBLISHABLE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdWZxdmdha3Fxb3p5YmVkaXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNzI0NjQsImV4cCI6MjEwMjk0ODQ2NH0.LjMk0ZDmImS4NYezx6Xp6FbUxVrH_esroZXzXBWkiVc";


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


const header =
document.querySelector(
    ".site-header"
);


const loginButton =
document.getElementById(
    "loginButton"
);


const registerButton =
document.getElementById(
    "registerButton"
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





/* =========================================
   MODAL
========================================= */


const loginModal =
document.getElementById(
    "loginModal"
);


const registerModal =
document.getElementById(
    "registerModal"
);


const closeLoginModal =
document.getElementById(
    "closeLoginModal"
);


const closeRegisterModal =
document.getElementById(
    "closeRegisterModal"
);





/* =========================================
   LOGIN FORM
========================================= */


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
   REGISTER FORM
========================================= */


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
   PAGE SYSTEM
========================================= */


const pages = {


    home:
    document.getElementById(
        "homePage"
    ),


    shop:
    document.getElementById(
        "shopPage"
    ),


    order:
    document.getElementById(
        "orderPage"
    ),


    inbox:
    document.getElementById(
        "inboxPage"
    ),


    me:
    document.getElementById(
        "mePage"
    ),


    setting:
    document.getElementById(
        "settingPage"
    )


};





let currentUser = null;





/* =========================================
   PASSWORD TOGGLE
========================================= */


function initPasswordToggle(){


    const buttons =
    document.querySelectorAll(
        ".password-toggle"
    );


    buttons.forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{


                const targetId =
                button.dataset.target;


                const input =
                document.getElementById(
                    targetId
                );


                const icon =
                button.querySelector(
                    "img"
                );


                if(!input || !icon)
                    return;


                if(
                    input.type === "password"
                ){


                    input.type =
                    "text";


                    icon.src =
                    "assets/icons/eye-off.svg";


                    icon.alt =
                    "hide password";


                }
                else{


                    input.type =
                    "password";


                    icon.src =
                    "assets/icons/eye.svg";


                    icon.alt =
                    "show password";


                }


            }
        );


    });


}





/* =========================================
   HEADER CONTROL
========================================= */


function updateHeader(){


    /*
        未登录

        Home 显示 Header
    */


    if(!currentUser){


        header.classList.remove(
            "hidden"
        );


        loggedOutActions
        .classList
        .remove(
            "hidden"
        );


        loggedInActions
        .classList
        .add(
            "hidden"
        );


        return;


    }





    /*
        登录以后

        只有 Home 显示 Header
    */


    const currentPage =
    getCurrentPage();


    if(
        currentPage === "home"
    ){


        header.classList.remove(
            "hidden"
        );


        loggedOutActions
        .classList
        .add(
            "hidden"
        );


        loggedInActions
        .classList
        .remove(
            "hidden"
        );


        return;


    }


    header.classList.add(
        "hidden"
    );


}





/* =========================================
   GET CURRENT PAGE
========================================= */


function getCurrentPage(){


    for(
        const key in pages
    ){


        if(
            !pages[key]
            .classList
            .contains(
                "hidden"
            )
        ){


            return key;


        }


    }


    return "home";


}





/* =========================================
   MODAL
========================================= */


function openModal(modal){


    if(!modal)
        return;


    modal.classList.remove(
        "hidden"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


}





function closeModal(modal){


    if(!modal)
        return;


    if(document.activeElement){


        document.activeElement.blur();


    }


    modal.classList.add(
        "hidden"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


}





function closeAllModal(){


    closeModal(
        loginModal
    );


    closeModal(
        registerModal
    );


}





/* =========================================
   MESSAGE
========================================= */


function showMessage(
    element,
    message,
    type="error"
){


    if(!element)
        return;


    element.textContent =
        message;


    element.style.color =
        type === "success"
        ? "#15803d"
        : "#dc2626";


}





function clearMessage(element){


    if(element){


        element.textContent =
        "";


    }


}





/* =========================================
   AUTH UI
========================================= */


function updateAuthUI(user){


    currentUser =
    user;


    if(!user){


        loggedOutActions
        .classList
        .remove(
            "hidden"
        );


        loggedInActions
        .classList
        .add(
            "hidden"
        );


        headerUsername.textContent =
        "User";


        updateHeader();


        return;


    }


    loggedOutActions
    .classList
    .add(
        "hidden"
    );


    loggedInActions
    .classList
    .remove(
        "hidden"
    );


    const username =

        user.user_metadata?.username

        ||

        user.email
        .split("@")[0];


    headerUsername.textContent =
    username;


    updateHeader();


}





/* =========================================
   SESSION CHECK
========================================= */


async function checkSession(){


    const {

        data,

        error

    } =

    await supabaseClient
    .auth
    .getSession();


    if(error){


        console.error(
            "Session error:",
            error
        );


        return;


    }


    updateAuthUI(
        data.session?.user || null
    );


}





/* =========================================
   AUTH LISTENER
========================================= */


supabaseClient
.auth
.onAuthStateChange(

    (event,session)=>{


        updateAuthUI(
            session?.user || null
        );


    }

);





/* =========================================
   LOGIN
========================================= */


async function login(event){


    event.preventDefault();


    clearMessage(
        loginMessage
    );


    const form =

    new FormData(
        loginForm
    );


    const email =

    String(
        form.get("email")
    )

    .trim()

    .toLowerCase();


    const password =

    String(
        form.get("password")
    );


    loginSubmit.disabled =
    true;


    loginSubmit.textContent =
    "Logging in...";


    try{


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


        if(error){


            showMessage(

                loginMessage,

                error.message

            );


            return;


        }


        showMessage(

            loginMessage,

            "Login successful",

            "success"

        );


        const {
            data: sessionData
        } =

        await supabaseClient
        .auth
        .getSession();


        if(sessionData.session){


            updateAuthUI(
                sessionData.session.user
            );


        }


        closeModal(
            loginModal
        );


        switchPage(
            "home"
        );


    }


    catch(error){


        console.error(
            error
        );


        showMessage(

            loginMessage,

            "Login failed"

        );


    }


    finally{


        loginSubmit.disabled =
        false;


        loginSubmit.textContent =
        "Login";


    }


}


/* =========================================
   REGISTER
========================================= */


async function register(event){


    event.preventDefault();



    clearMessage(
        registerMessage
    );



    const form =
    new FormData(
        registerForm
    );



    const username =
    String(
        form.get("username")
    )
    .trim();



    const email =
    String(
        form.get("email")
    )
    .trim()
    .toLowerCase();



    const password =
    String(
        form.get("password")
    );



    const confirm =
    String(
        form.get("password_confirm")
    );



    if(password !== confirm){


        showMessage(
            registerMessage,
            "Passwords do not match"
        );


        return;


    }



    if(password.length < 8){


        showMessage(
            registerMessage,
            "Password must be at least 8 characters"
        );


        return;


    }



    registerSubmit.disabled =
    true;



    registerSubmit.textContent =
    "Creating...";



    try{


        const {

            data,

            error

        } =

        await supabaseClient
        .auth
        .signUp({


            email,

            password,


            options:{


                data:{


                    username

                }


            }


        });



        if(error){


            showMessage(
                registerMessage,
                error.message
            );


            return;


        }



        if(!data.user){


            showMessage(
                registerMessage,
                "Register failed"
            );


            return;


        }

        showMessage(
            registerMessage,
            "Account created",
            "success"
        );



        registerForm.reset();



        setTimeout(()=>{


            closeModal(
                registerModal
            );


            switchPage(
                "home"
            );


        },500);



    }


    catch(error){


        console.error(
            error
        );


        showMessage(
            registerMessage,
            "Register failed"
        );


    }



    finally{


        registerSubmit.disabled =
        false;



        registerSubmit.textContent =
        "Create Account";


    }


}


/* =========================================
   CHECK EMAIL VERIFY
========================================= */


async function checkEmailVerified(){


    const {
        data,
        error
    } =

    await supabaseClient
    .auth
    .getUser();



    if(error){


        console.error(
            "Check verify error:",
            error
        );


        return false;


    }



    if(!data.user){


        return false;


    }



    return Boolean(
        data.user.email_confirmed_at
    );


}

/* =========================================
   PAGE SWITCH
========================================= */


async function switchPage(page){


    const protectedPages = [

        "order",

        "inbox",

        "me",

        "setting"

    ];


    /*
        需要登录页面保护
    */


    if(

        protectedPages.includes(page)

        &&

        !currentUser

    ){


        openModal(
            loginModal
        );


        return;


    }


    Object.values(pages)

    .forEach(section=>{


        section.classList.add(
            "hidden"
        );


    });


    if(
        pages[page]
    ){


        pages[page]

        .classList

        .remove(
            "hidden"
        );


    }

    if(
        page === "setting"
    ){

        if(
            typeof loadSettingPage === "function"
        ){
            await loadSettingPage();

        }
    }
       
    /*
        NAV ACTIVE
    */


    document

    .querySelectorAll(
        ".nav-item"
    )

    .forEach(item=>{


        item.classList.remove(
            "active"
        );


        if(

            item.dataset.page === page

        ){


            item.classList.add(
                "active"
            );


        }


    });


    /* =========================================
       NAV ICON CONTROL
    ========================================= */


    const navIcons = {


        home: {

            active:
            "assets/icons/home-active.svg",

            normal:
            "assets/icons/home.svg"

        },


        shop: {

            active:
            "assets/icons/shop-active.svg",

            normal:
            "assets/icons/shop.svg"

        },


        order: {

            active:
            "assets/icons/order-active.svg",

            normal:
            "assets/icons/order.svg"

        },


        inbox: {

            active:
            "assets/icons/inbox-active.svg",

            normal:
            "assets/icons/inbox.svg"

        },


        me: {

            active:
            "assets/icons/me-active.svg",

            normal:
            "assets/icons/me.svg"

        }


    };


    Object.keys(navIcons).forEach(navPage=>{


        const navButton =
        document.querySelector(
            `.nav-item[data-page="${navPage}"]`
        );


        if(!navButton)
            return;


        const navIcon =
        navButton.querySelector(
            ".nav-icon-image"
        );


        if(!navIcon)
            return;


        if(page === navPage){


            navIcon.src =
            navIcons[navPage].active;


        }
        else{


            navIcon.src =
            navIcons[navPage].normal;


        }


    });


    updateHeader();


}





/* =========================================
   EVENTS
========================================= */


function initEvents(){


    /*
        OPEN LOGIN
    */


    if(loginButton){


        loginButton.onclick =
        ()=>{


            clearMessage(
                loginMessage
            );


            openModal(
                loginModal
            );


        };


    }





    /*
        OPEN REGISTER
    */


    if(registerButton){


        registerButton.onclick =
        ()=>{


            clearMessage(
                registerMessage
            );


            openModal(
                registerModal
            );


        };


    }





    /*
        FORM SUBMIT
    */


    if(loginForm){


        loginForm.onsubmit =
        login;


    }


    if(registerForm){


        registerForm.onsubmit =
        register;


    }





    /*
        CLOSE BUTTON
    */


    if(closeLoginModal){


        closeLoginModal.onclick =
        ()=>{


            closeModal(
                loginModal
            );


        };


    }





    if(closeRegisterModal){


        closeRegisterModal.onclick =
        ()=>{


            closeModal(
                registerModal
            );


        };


    }





    /*
        CLICK BACKGROUND CLOSE
    */


    document

    .querySelectorAll(
        "[data-close-modal]"
    )

    .forEach(item=>{


        item.onclick =
        closeAllModal;


    });





    /*
        NAVIGATION
    */


    document

    .querySelectorAll(
        ".nav-item"
    )

    .forEach(button=>{


        button.onclick =
        ()=>{


            switchPage(

                button.dataset.page

            );


        };


    });


}





/* =========================================
   ESC CLOSE MODAL
========================================= */


document.addEventListener(

    "keydown",

    (event)=>{


        if(

            event.key === "Escape"

        ){


            closeAllModal();


        }


    }

);





/* =========================================
   START
========================================= */


document.addEventListener(

    "DOMContentLoaded",

    async ()=>{


        /*
            初始化事件
        */


        initEvents();


        /*
            密码眼睛
        */


        initPasswordToggle();


        /*
            检查登录状态
        */


        await checkSession();


        /*
            默认 Home
        */


        switchPage(
            "home"
        );


    }

);
