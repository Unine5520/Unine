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



// INPUT

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



// BUTTON

const loginSubmit =
document.getElementById("loginSubmit");

const registerSubmit =
document.getElementById("registerSubmit");



// ERROR

const loginError =
document.getElementById("loginError");


const registerError =
document.getElementById("registerError");



let loginErrorTimer;

let registerErrorTimer;









// =========================
// ERROR SYSTEM
// =========================


function showError(
element,
message=""
)
{

if(!element)
return;



let timer =
element.id === "loginError"
?
loginErrorTimer
:
registerErrorTimer;



clearTimeout(timer);



if(message)
{


element.innerText =
message;



requestAnimationFrame(
()=>{

element.classList.add(
"show"
);

});



timer =
setTimeout(
()=>{


element.classList.remove(
"show"
);



setTimeout(
()=>{

element.innerText="";

},
350
);


},
3000
);



}
else
{


element.classList.remove(
"show"
);



setTimeout(
()=>{

element.innerText="";

},
350
);


}



if(element.id==="loginError")
{

loginErrorTimer =
timer;

}
else
{

registerErrorTimer =
timer;

}


}





function clearErrors()
{

clearTimeout(
loginErrorTimer
);


clearTimeout(
registerErrorTimer
);



[
loginError,
registerError
]
.forEach(
el=>{

if(el)
{

el.classList.remove(
"show"
);

el.innerText="";

}

});


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
// BUTTON OPEN
// =========================


if(loginButton)
{

loginButton.onclick =
()=>openRL("login");

}



if(registerButton)
{

registerButton.onclick =
()=>openRL("register");

}



if(rlClose)
{

rlClose.onclick =
closeRL;

}



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
button=>{


button.onclick =
()=>{


const input =
document.getElementById(
button.dataset.target
);



if(input.type==="password")
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
// BUTTON ACTIVE
// =========================


function checkLoginButton()
{

const ok =
loginEmail.value.trim()
&&
loginPassword.value;



loginSubmit.disabled =
!ok;


loginSubmit.classList.toggle(
"active",
ok
);


}






function checkRegisterButton()
{

const ok =
registerUsername.value.trim()
&&
registerEmail.value.trim()
&&
registerPassword.value
&&
registerConfirm.value;



registerSubmit.disabled =
!ok;


registerSubmit.classList.toggle(
"active",
ok
);


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
checkRegisterButton;









// =========================
// REGISTER
// =========================


registerSubmit.onclick =
async()=>{


clearErrors();



if(
registerPassword.value !==
registerConfirm.value
)
{

showError(
registerError,
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


updateHeader(
data.user
);



registerUsername.value="";

registerEmail.value="";

registerPassword.value="";

registerConfirm.value="";



closeRL();


}
else
{


showError(
registerError,
data.error ||
"Register failed"
);


}


}
catch(err)
{

console.error(err);


showError(
registerError,
"Network error, please try again"
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


updateHeader(
data.user
);



loginEmail.value="";

loginPassword.value="";


loginPassword.type =
"password";


closeRL();


}
else
{


showError(
loginError,
data.error ||
"Login failed"
);


}



}
catch(err)
{

console.error(err);


showError(
loginError,
"Network error, please try again"
);


}


};









// =========================
// HEADER
// =========================


function updateHeader(user)
{

if(!user)
return;



const telegramButton =
document.getElementById(
"telegramButton"
);


const homeAuth =
document.getElementById(
"homeAuth"
);


const userHeader =
document.getElementById(
"userHeader"
);


const headerUsername =
document.getElementById(
"headerUsername"
);


const meUsername =
document.getElementById(
"meUsername"
);



if(telegramButton)
telegramButton.classList.add(
"hidden"
);


if(homeAuth)
homeAuth.classList.add(
"hidden"
);


if(userHeader)
userHeader.classList.remove(
"hidden"
);



if(headerUsername)
headerUsername.innerText =
user.username;



if(meUsername)
meUsername.innerText =
user.username;


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
