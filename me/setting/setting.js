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
   BOTTOM NAV CONTROL
========================================= */


function hideBottomNavigation(){


    if(bottomNavigation){


        bottomNavigation
        .classList
        .add(
            "hidden"
        );


    }


}






function showBottomNavigation(){


    if(bottomNavigation){


        bottomNavigation
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
   AUTH STATE LISTENER
========================================= */


supabaseClient
.auth
.onAuthStateChange(
(event,session)=>{


    currentUser =
    session?.user || null;



    loadSettingEmail();



}

);









/* =========================================
   OPEN SETTING
========================================= */


function openSettingPage(){


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
   CONFIRM EMAIL
========================================= */


if(confirmEmailButton){


    confirmEmailButton.onclick =
    async()=>{


        if(!currentUser)
            return;



        console.log(
            "Confirm email:",
            currentUser.email
        );


        /*
            Later:
            resend confirmation email
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



    /*
        remove focus first
        prevent aria-hidden warning
    */


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
            .signOut({

                scope:"local"

            });





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





            closeLogoutModal();





            showBottomNavigation();





            currentUser =
            null;



            loadSettingEmail();





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









/* =========================================
   INIT
========================================= */


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        loadSettingEmail();



    }
);
