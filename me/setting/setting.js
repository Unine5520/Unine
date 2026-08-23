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





/* =========================================
   CLOSE LOGOUT MODAL
========================================= */


function closeLogoutModal(){


    if(!logoutModal)
        return;



    /*
        remove focus first
        fix aria-hidden warning
    */


    if(document.activeElement){


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
   OPEN BUTTON
========================================= */


if(settingLogoutButton){



    settingLogoutButton.onclick = ()=>{


        console.log(
            "Logout button clicked"
        );



        openLogoutModal();



    };


}









/* =========================================
   CANCEL LOGOUT
========================================= */


if(cancelLogout){



    cancelLogout.onclick = ()=>{


        closeLogoutModal();



    };


}









/* =========================================
   CLICK BACKGROUND CLOSE
========================================= */


const logoutBackground =
document.querySelector(
    "[data-close-logout]"
);



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


            const result =
            await supabaseClient
            .auth
            .signOut();

            console.log(
               "Supabase logout result:",
               result
            );


            if(error){


                console.error(
                    "Logout error:",
                    error
                );


                return;


            }







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
