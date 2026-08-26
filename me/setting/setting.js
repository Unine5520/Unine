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



const bottomNavigation =
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
   SHOW USER EMAIL
========================================= */


function loadSettingEmail(){


    if(
        !accountEmail
    )
        return;



    if(
        currentUser
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
   CLOSE SETTING
========================================= */


if(closeSettingButton){


    closeSettingButton.onclick =
    ()=>{


        switchPage(
            "me"
        );



        if(bottomNavigation){


            bottomNavigation
            .classList
            .remove(
                "hidden"
            );


        }



    };


}








/* =========================================
   CONFIRM EMAIL
========================================= */


if(confirmEmailButton){


    confirmEmailButton.onclick =
    async()=>{


        if(
            !currentUser
        )
            return;



        console.log(
            "Confirm email:",
            currentUser.email
        );



        /*
            Later:
            Supabase resend confirmation email
        */



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
   CLICK BACKGROUND CLOSE
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
                    error
                );


                return;


            }




            closeLogoutModal();



            if(bottomNavigation){


                bottomNavigation
                .classList
                .remove(
                    "hidden"
                );


            }



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








/* =========================================
   LOAD SETTING
========================================= */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        loadSettingEmail();



    }
);
