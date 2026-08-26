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


        if(settingButton){


            settingButton.onclick =
            ()=>{
                switchPage(
                    "setting"
                );
        }
