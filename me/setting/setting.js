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
   BOTTOM NAV
========================================= */


function hideBottomNavigation(){


    if(settingBottomNavigation){


        settingBottomNavigation.classList.add(
            "hidden"
        );


    }


}





function showBottomNavigation(){


    if(settingBottomNavigation){


        settingBottomNavigation.classList.remove(
            "hidden"
        );


    }


}









/* =========================================
   ACCOUNT EMAIL
========================================= */


async function loadSettingEmail(){


    if(!accountEmail)
        return;



    const {
        data,
        error
    } =

    await supabaseClient
    .auth
    .getUser();



    if(error){


        console.error(
            "Load email error:",
            error
        );


        accountEmail.textContent =
        "Email";


        return;


    }



    if(
        data.user
        &&
        data.user.email
    ){


        accountEmail.textContent =
        data.user.email;


    }
    else{


        accountEmail.textContent =
        "Email";


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



    if(
        !data.user
    ){


        return false;


    }


}









/* =========================================
   UPDATE BUTTON
========================================= */


async function updateConfirmEmailButton(){


    if(!confirmEmailButton)
        return;



    const verified =
    await checkEmailVerified();



    if(verified){


        confirmEmailButton.textContent =
        "Email Verified";


        confirmEmailButton.disabled =
        true;


        confirmEmailButton.classList.add(
            "verified"
        );


    }
    else{


        confirmEmailButton.textContent =
        "Confirm Email";


        confirmEmailButton.disabled =
        false;


        confirmEmailButton.classList.remove(
            "verified"
        );


    }


}









/* =========================================
   LOAD SETTING PAGE
========================================= */


async function loadSettingPage(){


    await loadSettingEmail();


    await updateConfirmEmailButton();


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
   SEND CONFIRM EMAIL
========================================= */


if(confirmEmailButton){


    confirmEmailButton.onclick =
    async()=>{


        const {
            data,
            error:userError
        } =

        await supabaseClient
        .auth
        .getUser();



        if(userError || !data.user){


            return;


        }



        if(
            data.user.email_confirmed_at
        ){


            await updateConfirmEmailButton();


            return;


        }



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
                data.user.email

            });



            if(error){


                console.error(
                    "Send email error:",
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



            setTimeout(
                async()=>{


                    await updateConfirmEmailButton();


                },
                3000
            );


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
   OPEN LOGOUT
========================================= */


function openLogoutModal(){


    if(!logoutModal)
        return;



    logoutModal.classList.remove(
        "hidden"
    );


    logoutModal.setAttribute(
        "aria-hidden",
        "false"
    );


}









/* =========================================
   CLOSE LOGOUT
========================================= */


function closeLogoutModal(){


    if(!logoutModal)
        return;



    if(document.activeElement){


        document.activeElement.blur();


    }



    logoutModal.classList.add(
        "hidden"
    );


    logoutModal.setAttribute(
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



            updateAuthUI(
                null
            );


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
   ESC CLOSE
========================================= */


document.addEventListener(
    "keydown",
    (event)=>{


        if(
            event.key === "Escape"
            &&
            logoutModal
            &&
            !logoutModal.classList.contains(
                "hidden"
            )
        ){


            closeLogoutModal();


        }


    }
);
