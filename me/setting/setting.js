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


        }



    };


}









/* =========================================
   CANCEL LOGOUT
========================================= */


if(cancelLogout){


    cancelLogout.onclick =
    ()=>{


        if(logoutModal){


            logoutModal
            .classList
            .add(
                "hidden"
            );


        }


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



        await supabaseClient
        .auth
        .signOut();





        if(logoutModal){


            logoutModal
            .classList
            .add(
                "hidden"
            );


        }





        switchPage(
            "home"
        );



    };


}
