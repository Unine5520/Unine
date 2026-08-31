document.addEventListener(
"DOMContentLoaded",
()=>{


const API =
"https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";



const logoutButton =
document.getElementById(
"logoutButton"
);


const logoutModal =
document.getElementById(
"logoutModal"
);


const logoutConfirm =
document.getElementById(
"logoutConfirm"
);


const logoutCancel =
document.getElementById(
"logoutCancel"
);



const meUsername =
document.getElementById(
"meUsername"
);




// =================
// CHECK ELEMENT
// =================


if(
!logoutButton ||
!logoutModal ||
!logoutConfirm ||
!logoutCancel
)
{

console.log(
"Logout elements missing"
);

return;

}





// =================
// LOAD USER
// =================


async function loadUser()
{


try{


const res =
await fetch(
`${API}/me`,
{
credentials:"include"
}
);


const data =
await res.json();



console.log(
"ME PAGE:",
data
);



if(
data.success &&
data.logged_in
)
{

meUsername.innerText =
data.user.username;

}
else
{

meUsername.innerText =
"";

}


}
catch(err)
{

console.log(
err
);

}


}





// =================
// OPEN LOGOUT
// =================


logoutButton.onclick =
()=>{


logoutModal.classList.remove(
"hidden"
);


};







// =================
// CANCEL LOGOUT
// =================


logoutCancel.onclick =
()=>{


logoutModal.classList.add(
"hidden"
);


};







// =================
// CONFIRM LOGOUT
// =================


logoutConfirm.onclick =
async()=>{


try{


const res =
await fetch(
`${API}/logout`,
{

method:"POST",

credentials:"include"

}
);



const data =
await res.json();



console.log(
"LOGOUT:",
data
);



if(data.success)
{


    // =================
    // CLEAR LOGIN STATE
    // =================

    window.userLoggedIn = false;



    // =================
    // RETURN HOME
    // =================

    const homePage =
    document.getElementById(
        "homePage"
    );


    const pages =
    document.querySelectorAll(
        ".page-section"
    );


    pages.forEach(page=>{

        page.classList.add(
            "hidden"
        );

    });



    if(homePage)
    {

        homePage.classList.remove(
            "hidden"
        );

    }



    // =================
    // RESET HEADER
    // =================

    const homeAuth =
    document.getElementById(
        "homeAuth"
    );


    const userHeader =
    document.getElementById(
        "userHeader"
    );


    const telegramContainer =
    document.getElementById(
        "telegramContainer"
    );



    if(homeAuth)
    {
        homeAuth.classList.remove(
            "hidden"
        );
    }



    if(userHeader)
    {
        userHeader.classList.add(
            "hidden"
        );
    }



    if(telegramContainer)
    {
        telegramContainer.classList.remove(
            "hidden"
        );
    }



    location.reload();


}

else
{


alert(
data.message ||
"Logout failed"
);


}



}
catch(err)
{

console.error(
err
);


alert(
"Logout error"
);


}



};






// =================
// START
// =================


loadUser();



});
