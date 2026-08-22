/* =========================================
   SUPABASE CONFIG
========================================= */


const SUPABASE_URL =
    "https://moufqvgakqqozybedisj.supabase.co";


const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdWZxdmdha3Fxb3p5YmVkaXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNzI0NjQsImV4cCI6MjEwMjk0ODQ2NH0.LjMk0ZDmImS4NYezx6Xp6FbUxVrH_esroZXzXBWkiVc";



const {
    createClient
} = window.supabase;



const supabaseClient =
    createClient(
        SUPABASE_URL,
        SUPABASE_KEY
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



const loginForm =
    document.getElementById(
        "loginForm"
    );


const registerForm =
    document.getElementById(
        "registerForm"
    );



const loginMessage =
    document.getElementById(
        "loginMessage"
    );


const registerMessage =
    document.getElementById(
        "registerMessage"
    );



const loginSubmit =
    document.getElementById(
        "loginSubmit"
    );


const registerSubmit =
    document.getElementById(
        "registerSubmit"
    );





/* =========================================
   MODAL FUNCTION
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
        ?
        "#16a34a"
        :
        "#dc2626";

}





function clearMessage(element){

    if(element)
        element.textContent="";

}







/* =========================================
   AUTH UI
========================================= */


async function updateAuthUI(user){


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



        welcomeUser
        .classList
        .add(
            "hidden"
        );



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
        user.email.split("@")[0]
        ||
        "User";



    headerUsername.textContent =
        username;



    welcomeUsername.textContent =
        username;



    welcomeUser
    .classList
    .remove(
        "hidden"
    );

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

        console.log(error);

        return;

    }



    await updateAuthUI(
        data.session?.user || null
    );


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
        form.get(
            "username"
        )
        .trim();



    const email =
        form.get(
            "email"
        )
        .trim()
        .toLowerCase();



    const password =
        form.get(
            "password"
        );



    const confirm =
        form.get(
            "password_confirm"
        );





    if(password.length < 8){

        showMessage(
            registerMessage,
            "Password minimum 8 characters"
        );

        return;
    }



    if(password !== confirm){

        showMessage(
            registerMessage,
            "Passwords do not match"
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



    setTimeout(()=>{


        closeModal(
            registerModal
        );


    },800);



    registerSubmit.disabled=false;

    registerSubmit.textContent =
        "Create Account";


}








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
        form.get(
            "email"
        )
        .trim()
        .toLowerCase();



    const password =
        form.get(
            "password"
        );





    loginSubmit.disabled=true;

    loginSubmit.textContent =
        "Login...";





    const {
        data,
        error
    }
    =
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

        loginSubmit.textContent =
            "Login";


        return;

    }




    showMessage(
        loginMessage,
        "Login success",
        "success"
    );



    setTimeout(()=>{

        closeModal(
            loginModal
        );

    },500);




    loginSubmit.disabled=false;

    loginSubmit.textContent =
        "Login";

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
   AUTH LISTENER
========================================= */


supabaseClient
.auth
.onAuthStateChange(
    async(
        event,
        session
    )=>{


        await updateAuthUI(
            session?.user || null
        );


    }
);








/* =========================================
   PAGE PROTECTION
========================================= */


function setupNavigation(){


    const protectedPages=[

        "order",

        "inbox",

        "me"

    ];



    document
    .querySelectorAll(
        ".nav-item"
    )
    .forEach(item=>{


        item.addEventListener(
            "click",
            async(e)=>{


                const page =
                    item.dataset.page;



                if(
                    !protectedPages.includes(page)
                )
                    return;




                const {
                    data
                }
                =
                await supabaseClient
                .auth
                .getSession();



                if(
                    !data.session
                ){


                    e.preventDefault();


                    openModal(
                        loginModal
                    );


                }



            }
        );


    });


}








/* =========================================
   EVENTS
========================================= */


function start(){


    loginButton
    ?.addEventListener(
        "click",
        ()=>{
            clearMessage(loginMessage);
            openModal(loginModal);
        }
    );



    registerButton
    ?.addEventListener(
        "click",
        ()=>{
            clearMessage(registerMessage);
            openModal(registerModal);
        }
    );



    logoutButton
    ?.addEventListener(
        "click",
        logout
    );



    loginForm
    ?.addEventListener(
        "submit",
        login
    );



    registerForm
    ?.addEventListener(
        "submit",
        register
    );



    document
    .querySelectorAll(
        ".modal-close"
    )
    .forEach(btn=>{


        btn.addEventListener(
            "click",
            ()=>{


                closeModal(
                    loginModal
                );


                closeModal(
                    registerModal
                );


            }
        );


    });



    setupNavigation();



    checkSession();


}






document.addEventListener(
    "DOMContentLoaded",
    start
);
