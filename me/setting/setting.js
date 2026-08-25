/* =========================================
   SETTING PAGE
========================================= */


/* =========================================
   DOM
========================================= */


const settingLogoutButton =
document.getElementById(
    "logoutButton"
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
        remove focus
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
   OPEN BUTTON
========================================= */


if(settingLogoutButton){


    settingLogoutButton.onclick =
    ()=>{


        console.log(
            "Logout button clicked"
        );



        openLogoutModal();



    };


}








/* =========================================
   CANCEL BUTTON
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


        console.log(
            "Confirm logout"
        );



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






            closeLogoutModal();







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
