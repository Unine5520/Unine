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



const meBottomNavigation =
document.querySelector(
    ".bottom-navigation"
);









/* =========================================
   BOTTOM NAV CONTROL
========================================= */


function hideMeBottomNavigation(){


    if(meBottomNavigation){


        meBottomNavigation
        .classList
        .add(
            "hidden"
        );


    }


}









/* =========================================
   OPEN SETTING
========================================= */


if(settingButton){


    settingButton.onclick =
    ()=>{


        switchPage(
            "setting"
        );



        hideMeBottomNavigation();



    };


}
