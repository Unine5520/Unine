const logoutButton =
document.getElementById(
    "logoutButton"
);



if(logoutButton){


    logoutButton.onclick =
    ()=>{


        console.log(
            "Logout button clicked"
        );


    };


}

console.log("setting.js loaded");


const logoutButton =
document.getElementById(
    "logoutButton"
);



if(logoutButton){


    logoutButton.onclick =
    async()=>{


        console.log(
            "Logout button clicked"
        );



        const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );



        if(!confirmLogout){

            return;

        }




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



        switchPage(
            "home"
        );



    };


}
