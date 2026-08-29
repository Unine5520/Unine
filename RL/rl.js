document.addEventListener(
"DOMContentLoaded",
()=>{


// =========================
// API
// =========================


const API =
"https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";




// =========================
// ELEMENT
// =========================


const rlModal =
document.getElementById("rlModal");


const loginButton =
document.getElementById("loginButton");


const registerButton =
document.getElementById("registerButton");


const rlClose =
document.getElementById("rlClose");


const loginTab =
document.getElementById("loginTab");


const registerTab =
document.getElementById("registerTab");


const loginForm =
document.getElementById("loginForm");


const registerForm =
document.getElementById("registerForm");


const rlTitle =
document.getElementById("rlTitle");



// input

const loginEmail =
document.getElementById("loginEmail");


const loginPassword =
document.getElementById("loginPassword");


const registerUsername =
document.getElementById("registerUsername");


const registerEmail =
document.getElementById("registerEmail");


const registerPassword =
document.getElementById("registerPassword");


const registerConfirm =
document.getElementById("registerConfirm");



// button

const loginSubmit =
document.getElementById("loginSubmit");


const registerSubmit =
document.getElementById("registerSubmit");



// header

const telegramButton =
document.getElementById("telegramButton");


const homeAuth =
document.getElementById("homeAuth");


const userHeader =
document.getElementById("userHeader");


const headerUsername =
document.getElementById("headerUsername");






// =========================
// OPEN
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
// CLOSE
// =========================


function closeRL()
{

    rlModal.classList.add(
        "hidden"
    );

}





// =========================
// TAB LOGIN
// =========================


function showLogin()
{

    rlTitle.innerText="Login";


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
// TAB REGISTER
// =========================


function showRegister()
{

    rlTitle.innerText="Register";


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
// BUTTON OPEN
// =========================


loginButton.onclick =
()=>openRL("login");



registerButton.onclick =
()=>openRL("register");



rlClose.onclick =
closeRL;



loginTab.onclick =
showLogin;



registerTab.onclick =
showRegister;






// =========================
// PASSWORD SHOW
// =========================


document
.querySelectorAll(".toggle-password")
.forEach(
(button)=>{


button.onclick =
()=>{


const input =
document.getElementById(
    button.dataset.target
);



if(input.type==="password")
{

    input.type="text";

    button.innerHTML="🙈";

}
else
{

    input.type="password";

    button.innerHTML="👁";

}


};


});








// =========================
// REGISTER API
// =========================


registerSubmit.onclick =
async()=>{


const username =
registerUsername.value.trim();


const email =
registerEmail.value.trim();


const password =
registerPassword.value;


const confirm =
registerConfirm.value;



if(password!==confirm)
{
    alert(
        "Passwords do not match"
    );

    return;
}



try{


const res =
await fetch(
`${API}/register`,
{

method:"POST",

headers:
{
"Content-Type":"application/json"
},

credentials:"include",


body:JSON.stringify(
{
username,
email,
password
}
)

});


const data =
await res.json();



console.log(
data
);



if(data.success)
{

alert(
"Register successful"
);


closeRL();

showLogin();


}
else
{

alert(
data.message
);

}


}
catch(err)
{

console.error(err);

alert(
"Register error"
);

}



};








// =========================
// LOGIN API
// =========================


loginSubmit.onclick =
async()=>{


const email =
loginEmail.value.trim();


const password =
loginPassword.value;



try{


const res =
await fetch(
`${API}/login`,
{

method:"POST",

headers:
{
"Content-Type":"application/json"
},

credentials:"include",


body:JSON.stringify(
{
username: email,
password
}
)

});



const data =
await res.json();



console.log(
data
);



if(data.success)
{


alert(
"Login successful"
);



updateHeader(
data.user
);



closeRL();



}
else
{

alert(
data.message
);

}



}
catch(err)
{

console.error(err);

alert(
"Login error"
);


}



};









// =========================
// UPDATE HEADER
// =========================


function updateHeader(user)
{


if(!user)
return;



telegramButton.classList.add(
"hidden"
);



homeAuth.classList.add(
"hidden"
);



userHeader.classList.remove(
"hidden"
);



headerUsername.innerText =
user.username;



}








// =========================
// CHECK SESSION
// =========================


async function checkSession()
{


try{


const res =
await fetch(
`${API}/me`,
{

method:"GET",

credentials:"include"

});


const data =
await res.json();



console.log(
"ME:",
data
);



if(
data.success &&
data.logged_in
)
{

updateHeader(
data.user
);


}


}
catch(err)
{

console.log(
"Not login"
);


}



}




// =========================
// CLICK OUTSIDE
// =========================


rlModal.onclick =
(e)=>{


if(e.target===rlModal)
{

closeRL();

}


};






// =========================
// ESC
// =========================


document.addEventListener(
"keydown",
(e)=>{


if(e.key==="Escape")
{

closeRL();

}


});




// =========================
// START
// =========================


checkSession();



});
