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




/* LOGIN */


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





/* REGISTER */


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
        )

};





let currentUser = null;






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
    text,
    type="error"
){


    if(!element)
        return;


    element.textContent =
        text;


    element.style.color =
        type === "success"
        ? "#15803d"
        : "#dc2626";


}





function clearMessage(element){

    if(element)
        element.textContent="";

}







/* =========================================
   AUTH UI
========================================= */


function updateAuthUI(user){



    currentUser = user;



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
        user.email.split("@")[0];



    headerUsername.textContent =
        username;


}







/* =========================================
   SESSION
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


});








/* =========================================
   LOGIN
========================================= */


async function login(e){


    e.preventDefault();



    clearMessage(
        loginMessage
    );



    const form =
        new FormData(
            loginForm
        );



    const email =
        form.get("email")
        .trim()
        .toLowerCase();



    const password =
        form.get("password");




    loginSubmit.disabled =
        true;



    loginSubmit.textContent =
        "Logging in...";





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


        loginSubmit.disabled=false;

        loginSubmit.textContent="Login";


        return;

    }





    showMessage(
        loginMessage,
        "Login successful",
        "success"
    );



    setTimeout(()=>{


        closeModal(
            loginModal
        );


    },500);




    loginSubmit.disabled=false;

    loginSubmit.textContent="Login";

}







/* =========================================
   REGISTER
========================================= */


async function register(e){


    e.preventDefault();



    clearMessage(
        registerMessage
    );



    const form =
        new FormData(
            registerForm
        );



    const username =
        form.get("username")
        .trim();



    const email =
        form.get("email")
        .trim()
        .toLowerCase();



    const password =
        form.get("password");



    const confirm =
        form.get(
            "password_confirm"
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







    registerSubmit.disabled=true;


    registerSubmit.textContent =
        "Creating...";






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


        registerSubmit.disabled=false;


        registerSubmit.textContent =
            "Create Account";


        return;


    }






    showMessage(
        registerMessage,
        "Account created",
        "success"
    );





    registerForm.reset();





    if(data.session){


        setTimeout(()=>{

            closeModal(
                registerModal
            );

        },700);


    }
    else{


        setTimeout(()=>{

            closeModal(
                registerModal
            );


            openModal(
                loginModal
            );


        },1000);


    }




    registerSubmit.disabled=false;


    registerSubmit.textContent =
        "Create Account";

}








/* =========================================
   LOGOUT
========================================= */


async function logout(){


    await supabaseClient
        .auth
        .signOut();


}








/* =========================================
   PAGE SWITCH
========================================= */


async function switchPage(page){



    const protectedPages=[

        "order",

        "inbox",

        "me"

    ];





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





    pages[page]
        .classList
        .remove(
            "hidden"
        );





    document
    .querySelectorAll(
        ".nav-item"
    )
    .forEach(item=>{


        item.classList.remove(
            "active"
        );


        if(
            item.dataset.page===page
        ){

            item.classList.add(
                "active"
            );

        }


    });





}








/* =========================================
   EVENTS
========================================= */


function initEvents(){



    loginButton.onclick =
        ()=>{


            clearMessage(
                loginMessage
            );


            openModal(
                loginModal
            );


        };





    registerButton.onclick =
        ()=>{


            clearMessage(
                registerMessage
            );


            openModal(
                registerModal
            );


        };





    logoutButton.onclick =
        logout;





    loginForm.onsubmit =
        login;




    registerForm.onsubmit =
        register;






    closeLoginModal.onclick =
        ()=>closeModal(
            loginModal
        );




    closeRegisterModal.onclick =
        ()=>closeModal(
            registerModal
        );






    document
    .querySelectorAll(
        "[data-close-modal]"
    )
    .forEach(item=>{


        item.onclick =
            closeAllModal;


    });






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
   START
========================================= */


document.addEventListener(
"DOMContentLoaded",
()=>{


    initEvents();


    checkSession();


    switchPage(
        "home"
    );


});
