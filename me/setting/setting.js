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
