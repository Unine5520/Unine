document.addEventListener(
"DOMContentLoaded",
()=>{


// =========================
// ELEMENT
// =========================


const modal =
document.getElementById(
"rlModal"
);


const loginBtn =
document.getElementById(
"loginButton"
);


const registerBtn =
document.getElementById(
"registerButton"
);


const closeBtn =
document.getElementById(
"rlClose"
);



const rlTitle =
document.getElementById(
"rlTitle"
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




// =========================
// OPEN MODAL
// =========================


function openRL(type="login"){


    modal.classList.remove(
        "hidden"
    );


    if(type==="register"){

        showRegister();

    }
    else{

        showLogin();

    }

}




// =========================
// LOGIN TAB
// =========================


function showLogin(){


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
// REGISTER TAB
// =========================


function showRegister(){


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


if(loginBtn){


loginBtn.onclick=()=>{


    openRL(
        "login"
    );


};


}



if(registerBtn){


registerBtn.onclick=()=>{


    openRL(
        "register"
    );


};


}





// =========================
// CLOSE BUTTON
// =========================


if(closeBtn){


closeBtn.onclick=()=>{


    modal.classList.add(
        "hidden"
    );


};


}





// =========================
// TAB CLICK
// =========================


loginTab.onclick =
showLogin;


registerTab.onclick =
showRegister;






// =========================
// PASSWORD TOGGLE
// =========================


document
.querySelectorAll(
".toggle-password"
)
.forEach(
(btn)=>{


btn.onclick=()=>{


    const input =
    document.getElementById(
        btn.dataset.target
    );



    if(!input)
    return;



    if(
        input.type==="password"
    ){

        input.type =
        "text";


        btn.innerHTML =
        "🙈";


    }
    else{


        input.type =
        "password";


        btn.innerHTML =
        "👁";


    }



};



});







// =========================
// CLICK OUTSIDE CLOSE
// =========================


modal.onclick =
(e)=>{


    if(
        e.target === modal
    ){

        modal.classList.add(
            "hidden"
        );

    }


};






// =========================
// ESC CLOSE
// =========================


document.addEventListener(
"keydown",
(e)=>{


    if(
        e.key==="Escape"
    ){

        modal.classList.add(
            "hidden"
        );

    }


});





});
