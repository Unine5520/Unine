/* =========================================
   ME PAGE
========================================= */


/* =========================================
   DOM
========================================= */


const settingButton =
document.getElementById(
    "settingButton"
);



const bottomNavigation =
document.querySelector(
    ".bottom-navigation"
);






/* =========================================
   OPEN SETTING
========================================= */


if(settingButton){


    settingButton.onclick =
    ()=>{


        switchPage(
            "setting"
        );


        /*
            Hide bottom menu
        */


        if(bottomNavigation){


            bottomNavigation
            .classList
            .add(
                "hidden"
            );


        }



    };


}
