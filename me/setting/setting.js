/* =========================================
   SETTING PAGE
========================================= */


/* =========================================
   DOM
========================================= */


const closeSettingButton =
document.getElementById(
    "closeSettingButton"
);



const settingBottomNavigation =
document.querySelector(
    ".bottom-navigation"
);



const accountEmail =
document.getElementById(
    "accountEmail"
);



const confirmEmailButton =
document.getElementById(
    "confirmEmailButton"
);







/* =========================================
   LOGOUT DOM
========================================= */


const settingLogoutButton =
document.getElementById(
    "setting-logoutButton"
);



const logoutModal =
document.getElementById(
    "logoutModal"
);



const cancelLogout =
document.getElementById(
    "cancelLogout"
);



const confirmLogout =
document.getElementById(
    "confirmLogout"
);



const logoutBackground =
document.querySelector(
    "#logoutModal .modal-background"
);









/* =========================================
   BOTTOM NAV CONTROL
========================================= */


function hideBottomNavigation(){


    if(settingBottomNavigation){


        settingBottomNavigation
        .classList
        .add(
            "hidden"
        );


    }


}





function showBottomNavigation(){


    if(settingBottomNavigation){


        settingBottomNavigation
        .classList
        .remove(
            "hidden"
        );


    }


}









/* =========================================
   ACCOUNT EMAIL
========================================= */


function loadSettingEmail(){


    if(!accountEmail)
        return;



    if(
        currentUser
        &&
        currentUser.email
    ){


        accountEmail.textContent =
        currentUser.email;



    }
    else{


        accountEmail.textContent =
        "Email";


    }


}









/* =========================================
   LOAD SETTING PAGE
========================================= */


function loadSettingPage(){


    loadSettingEmail();

    updateConfirmEmailButton();

    hideBottomNavigation();


}









/* =========================================
   CLOSE SETTING
========================================= */


if(closeSettingButton){


    closeSettingButton.onclick =
    ()=>{


        switchPage(
            "me"
        );


        showBottomNavigation();



    };


}









/* =========================================
   CONFIRM EMAIL
========================================= */


async function checkEmailVerified(){


    if(!currentUser)
        return false;


    const {
        data,
        error
    } =

    await supabaseClient
    .auth
    .getUser();



    if(error){

        console.error(
            "Check email error:",
            error
        );

        return false;

    }



    return Boolean(
        data.user.email_confirmed_at
    );


}









async function updateConfirmEmailButton(){


    if(!confirmEmailButton)
        return;



    const verified =
    await checkEmailVerified();



    if(verified){


        confirmEmailButton.textContent =
        "Email Confirmed";


        confirmEmailButton.disabled =
        true;


        confirmEmailButton
        .classList
        .add(
            "verified"
        );


    }
    else{


        confirmEmailButton.textContent =
        "Confirm Email";


        confirmEmailButton.disabled =
        false;


        confirmEmailButton
        .classList
        .remove(
            "verified"
        );


    }


}









if(confirmEmailButton){


    confirmEmailButton.onclick =
    async()=>{


        if(!currentUser)
            return;



        confirmEmailButton.disabled =
        true;



        confirmEmailButton.textContent =
        "Sending...";



        try{


            const {
                error
            } =

            await supabaseClient
            .auth
            .resend({

                type:
                "signup",

                email:
                currentUser.email

            });



            if(error){


                console.error(
                    "Resend email error:",
                    error
                );


                confirmEmailButton.textContent =
                "Try Again";


                confirmEmailButton.disabled =
                false;


                return;


            }





            confirmEmailButton.textContent =
            "Email Sent";



            setTimeout(()=>{


                updateConfirmEmailButton();


            },3000);



        }


        catch(error){


            console.error(
                "Confirm email failed:",
                error
            );


            confirmEmailButton.textContent =
            "Try Again";


            confirmEmailButton.disabled =
            false;


        }


    };


}





/* =========================================
   OPEN LOGOUT MODAL
========================================= */


function openLogoutModal(){


    if(!logoutModal)
        return;



    logoutModal
    .classList
    .remove(
        "hidden"
    );



    logoutModal
    .setAttribute(
        "aria-hidden",
        "false"
    );


}









/* =========================================
   CLOSE LOGOUT MODAL
========================================= */


function closeLogoutModal(){


    if(!logoutModal)
        return;



    if(
        document.activeElement
    ){

        document.activeElement.blur();

    }




    logoutModal
    .classList
    .add(
        "hidden"
    );



    logoutModal
    .setAttribute(
        "aria-hidden",
        "true"
    );


}









/* =========================================
   LOGOUT BUTTON
========================================= */


if(settingLogoutButton){


    settingLogoutButton.onclick =
    ()=>{


        openLogoutModal();



    };


}









/* =========================================
   CANCEL LOGOUT
========================================= */


if(cancelLogout){


    cancelLogout.onclick =
    ()=>{


        closeLogoutModal();



    };


}









/* =========================================
   BACKGROUND CLOSE
========================================= */


if(logoutBackground){


    logoutBackground.onclick =
    ()=>{


        closeLogoutModal();



    };


}









/* =========================================
   CONFIRM LOGOUT
========================================= */


if(confirmLogout){


    confirmLogout.onclick =
    async()=>{


        if(
            document.activeElement
        ){

            document.activeElement.blur();

        }




        try{


            const {
                error
            } =

            await supabaseClient
            .auth
            .signOut();





            if(error){


                console.error(
                    "Logout error:",
                    error
                );


                return;


            }





            console.log(
                "Logout successful"
            );


            updateAuthUI(null);



            closeLogoutModal();



            showBottomNavigation();



            switchPage(
                "home"
            );



        }


        catch(error){


            console.error(
                "Logout failed:",
                error
            );


        }



    };


}









/* =========================================
   ESC CLOSE LOGOUT
========================================= */


document.addEventListener(
    "keydown",
    (event)=>{


        if(

            event.key === "Escape"

            &&

            logoutModal

            &&

            !logoutModal
            .classList
            .contains(
                "hidden"
            )

        ){


            closeLogoutModal();



        }


    }
);
