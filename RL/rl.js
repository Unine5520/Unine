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




// error

const loginError =
document.getElementById("loginError");


const registerError =
document.getElementById("registerError");





// header

const telegramButton =
document.getElementById("telegramButton");


const homeAuth =
document.getElementById("homeAuth");


const userHeader =
document.getElementById("userHeader");


const headerUsername =
document.getElementById("headerUsername");


const meUsername =
document.getElementById("meUsername");









// =========================
// ERROR
// =========================


function showError(
element,
message=""
)
{

if(element)
{
    element.innerText =
    message;
}

}








// =========================
// OPEN CLOSE
// =========================


function openRL(type)
{

rlModal.classList.remove(
"hidden"
);


clearErrors();


if(type==="register")
{
    showRegister();
}
else
{
    showLogin();
}


}



function closeRL()
{

rlModal.classList.add(
"hidden"
);


clearErrors();

}




function clearErrors()
{

showError(
loginError
);


showError(
registerError
);

}









// =========================
// TAB
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
// OPEN BUTTON
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
// PASSWORD EYE SVG
// =========================


document
.querySelectorAll(".toggle-password")
.forEach(
button=>{


button.onclick =
()=>{


const input =
document.getElementById(
button.dataset.target
);



if(
input.type==="password"
)
{

input.type="text";


button.classList.add(
"show"
);


}
else
{

input.type="password";


button.classList.remove(
"show"
);


}


};


});









// =========================
// BUTTON STATE
// =========================


function checkLoginButton()
{

if(
loginEmail.value.trim()
&&
loginPassword.value
)
{

loginSubmit.classList.add(
"active"
);


loginSubmit.disabled=false;


}
else
{

loginSubmit.classList.remove(
"active"
);


loginSubmit.disabled=true;


}


}





function checkRegisterButton()
{

if(

registerUsername.value.trim()
&&

registerEmail.value.trim()
&&

registerPassword.value
&&

registerConfirm.value
&&

registerPassword.value ===
registerConfirm.value

)
{

registerSubmit.classList.add(
"active"
);


registerSubmit.disabled=false;


}
else
{

registerSubmit.classList.remove(
"active"
);


registerSubmit.disabled=true;


}


}






loginEmail.oninput =
checkLoginButton;


loginPassword.oninput =
checkLoginButton;



registerUsername.oninput =
checkRegisterButton;


registerEmail.oninput =
checkRegisterButton;


registerPassword.oninput =
checkRegisterButton;


registerConfirm.oninput =
()=>{


if(
registerPassword.value !==
registerConfirm.value
)
{

showError(
registerError,
"Passwords do not match"
);


}
else
{

showError(
registerError
);


}


checkRegisterButton();


};









// =========================
// REGISTER
// =========================


registerSubmit.onclick =
async()=>{


clearErrors();



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

username:
registerUsername.value.trim(),

email:
registerEmail.value.trim(),

password:
registerPassword.value


}

)

});



const data =
await res.json();



console.log(data);



if(data.success)
{


if(data.user)
{
updateHeader(
data.user
);
}



closeRL();



}
else
{

showError(
registerError,
data.message || "Register failed"
);


}


}
catch(err)
{

console.error(err);


showError(
registerError,
"Register error"
);


}


};









// =========================
// LOGIN
// =========================


loginSubmit.onclick =
async()=>{


clearErrors();



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

login:
loginEmail.value.trim(),

password:
loginPassword.value


}

)

});



const data =
await res.json();



console.log(data);



if(data.success)
{


if(data.user)
{
updateHeader(
data.user
);
}



loginEmail.value="";

loginPassword.value="";



loginPassword.type=
"password";



closeRL();


}
else
{

showError(
loginError,
data.message || "Login failed"
);


}


}
catch(err)
{

console.error(err);


showError(
loginError,
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



if(telegramButton)
{
telegramButton.classList.add(
"hidden"
);
}


if(homeAuth)
{
homeAuth.classList.add(
"hidden"
);
}



if(userHeader)
{
userHeader.classList.remove(
"hidden"
);
}



if(headerUsername)
{
headerUsername.innerText =
user.username;
}



if(meUsername)
{
meUsername.innerText =
user.username;
}


}



window.updateHeader =
updateHeader;









// =========================
// SESSION
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
// ESC CLOSE
// =========================


document.addEventListener(
"keydown",
e=>{


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
