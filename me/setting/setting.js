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
   OPEN LOGOUT MODAL
========================================= */


if(settingLogoutButton){


    settingLogoutButton.onclick =
    ()=>{


        console.log(
            "Logout button clicked"
        );



        if(logoutModal){


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



    };


}









/* =========================================
   CLOSE LOGOUT MODAL
========================================= */


function closeLogoutModal(){



    if(logoutModal){


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
   CONFIRM LOGOUT
========================================= */


if(confirmLogout){


    confirmLogout.onclick =
    async()=>{



        console.log(
            "Confirm logout"
        );





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







        closeLogoutModal();








        switchPage(
            "home"
        );



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
    ){


        closeLogoutModal();


    }


}

);
