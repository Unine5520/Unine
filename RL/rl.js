document.addEventListener(
"DOMContentLoaded",
()=>{


// =========================
// ELEMENT
// =========================


const rlModal =
document.getElementById(
    "rlModal"
);


const loginButton =
document.getElementById(
    "loginButton"
);


const registerButton =
document.getElementById(
    "registerButton"
);


const rlClose =
document.getElementById(
    "rlClose"
);



const loginTab =
document.getElementById(
    "loginTab"
);


const registerTab =
document.getElementById(
    "registerTab"
);



const loginForm =
document.getElementById(
    "loginForm"
);


const registerForm =
document.getElementById(
    "registerForm"
);



const rlTitle =
document.getElementById(
    "rlTitle"
);





// =========================
// OPEN MODAL
// =========================


function openRL(type)
{


    rlModal.classList.remove(
        "hidden"
    );


    if(type==="register")
    {

        showRegister();

    }
    else
    {

        showLogin();

    }


}





// =========================
// CLOSE MODAL
// =========================


function closeRL()
{

    rlModal.classList.add(
        "hidden"
    );

}





// =========================
// SHOW LOGIN
// =========================


function showLogin()
{


    rlTitle.innerText =
    "Login";


    loginTab.classList.add(
        "active"
    );


    registerTab.classList.remove(
        "active"
    );



    loginForm.classList.remove(
        "hidden"
    );


    registerForm.classList.add(
        "hidden"
    );


}





// =========================
// SHOW REGISTER
// =========================


function showRegister()
{


    rlTitle.innerText =
    "Register";


    registerTab.classList.add(
        "active"
    );


    loginTab.classList.remove(
        "active"
    );



    registerForm.classList.remove(
        "hidden"
    );


    loginForm.classList.add(
        "hidden"
    );


}





// =========================
// HEADER BUTTON
// =========================


if(loginButton)
{

loginButton.onclick =
()=>{

    openRL(
        "login"
    );

};


}




if(registerButton)
{

registerButton.onclick =
()=>{

    openRL(
        "register"
    );

};


}






// =========================
// CLOSE BUTTON
// =========================


if(rlClose)
{

rlClose.onclick =
()=>{

    closeRL();

};


}






// =========================
// TAB
// =========================


loginTab.onclick =
showLogin;



registerTab.onclick =
showRegister;







// =========================
// PASSWORD SHOW/HIDE
// =========================


document
.querySelectorAll(
".toggle-password"
)
.forEach(
(button)=>{


button.onclick =
()=>{


    const input =
    document.getElementById(
        button.dataset.target
    );


    if(
        input.type === "password"
    )
    {

        input.type =
        "text";


        button.innerHTML =
        "🙈";


    }
    else
    {


        input.type =
        "password";


        button.innerHTML =
        "👁";


    }


};



});








// =========================
// CLICK OUTSIDE
// =========================


rlModal.onclick =
(e)=>{


    if(
        e.target === rlModal
    )
    {

        closeRL();

    }


};






// =========================
// ESC CLOSE
// =========================


document.addEventListener(
"keydown",
(e)=>{


    if(
        e.key === "Escape"
    )
    {

        closeRL();

    }


});



});
