document.addEventListener("DOMContentLoaded",()=>{


// =================================
// API
// =================================

const API =
"https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";




// =================================
// GLOBAL STATE
// =================================

let userLoggedIn = false;

window.userLoggedIn = false;





// =================================
// ELEMENT
// =================================


// modal

const rlModal =
document.getElementById("rlModal");


const rlClose =
document.getElementById("rlClose");



// button

const loginButton =
document.getElementById("loginButton");


const registerButton =
document.getElementById("registerButton");


// tabs

const loginTab =
document.getElementById("loginTab");


const registerTab =
document.getElementById("registerTab");


// forms

const loginForm =
document.getElementById("loginForm");


const registerForm =
document.getElementById("registerForm");


// title

const rlTitle =
document.getElementById("rlTitle");



// register input

const registerUsername =
document.getElementById("registerUsername");


const registerEmail =
document.getElementById("registerEmail");


const registerPassword =
document.getElementById("registerPassword");


const registerConfirm =
document.getElementById("registerConfirm");



// register button

const registerSubmit =
document.getElementById("registerSubmit");


// error

const registerError =
document.getElementById("registerError");





// =================================
// ERROR SYSTEM
// =================================

let registerErrorTimer;



function showError(
element,
message=""
)
{

if(!element)
return;


element.innerText =
message;


clearTimeout(
registerErrorTimer
);



registerErrorTimer =
setTimeout(()=>{

element.innerText="";

},3000);


}




function clearErrors()
{

if(registerError)
{

registerError.innerText="";

}


clearTimeout(
registerErrorTimer
);


}






// =================================
// OPEN / CLOSE
// =================================


function openRL(type)
{

if(!rlModal)
return;



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

if(!rlModal)
return;



rlModal.classList.add(
"hidden"
);


clearErrors();


}



window.openRL =
openRL;







// =================================
// TAB
// =================================


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






// =================================
// REGISTER BUTTON
// =================================


if(registerButton)
{

registerButton.onclick =
()=>{

openRL("register");

};

}



if(rlClose)
{

rlClose.onclick =
closeRL;

}



if(registerTab)
{

registerTab.onclick =
showRegister;

}



if(loginTab)
{

loginTab.onclick =
showLogin;

}







// =================================
// REGISTER INPUT CHECK
// =================================


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



registerUsername.oninput =
checkRegisterButton;


registerEmail.oninput =
checkRegisterButton;


registerPassword.oninput =
checkRegisterButton;


registerConfirm.oninput =
checkRegisterButton;







// =================================
// REGISTER API
// =================================


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

"Content-Type":
"application/json"

},


credentials:
"include",


body:
JSON.stringify({

username:
registerUsername.value.trim(),


email:
registerEmail.value.trim(),


password:
registerPassword.value


})


}

);



const data =
await res.json();



console.log(
"REGISTER:",
data
);




if(data.success)
{


if(data.user)
{


userLoggedIn = true;


window.userLoggedIn = true;



updateHeader(
data.user
);


}




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
data.message ||
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






// =================================
// UPDATE HEADER
// =================================


function updateHeader(user)
{

if(!user)
return;



const homeAuth =
document.getElementById(
"homeAuth"
);


const telegramButton =
document.getElementById(
"telegramButton"
);


const userHeader =
document.getElementById(
"userHeader"
);


const headerUsername =
document.getElementById(
"headerUsername"
);



if(homeAuth)
homeAuth.classList.add(
"hidden"
);



if(telegramButton)
telegramButton.classList.add(
"hidden"
);



if(userHeader)
userHeader.classList.remove(
"hidden"
);



if(headerUsername)
headerUsername.innerText =
user.username;



}



window.updateHeader =
updateHeader;



// =================================
// LOGIN ELEMENT
// =================================


const loginEmail =
document.getElementById("loginEmail");


const loginPassword =
document.getElementById("loginPassword");


const loginSubmit =
document.getElementById("loginSubmit");


const loginError =
document.getElementById("loginError");



let loginErrorTimer;





// =================================
// LOGIN ERROR
// =================================


function showLoginError(message="")
{

if(!loginError)
return;


loginError.innerText =
message;



clearTimeout(
loginErrorTimer
);



loginErrorTimer =
setTimeout(()=>{


loginError.innerText="";


},3000);



}







// =================================
// LOGIN BUTTON CHECK
// =================================


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



if(loginEmail)
{

loginEmail.oninput =
checkLoginButton;

}


if(loginPassword)
{

loginPassword.oninput =
checkLoginButton;

}








// =================================
// LOGIN API
// =================================


if(loginSubmit)
{


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

"Content-Type":
"application/json"

},


credentials:
"include",


body:
JSON.stringify({

login:
loginEmail.value.trim(),


password:
loginPassword.value


})


}

);



const data =
await res.json();



console.log(
"LOGIN:",
data
);





if(data.success)
{


if(data.user)
{


userLoggedIn = true;


window.userLoggedIn = true;



updateHeader(
data.user
);


}



loginEmail.value="";


loginPassword.value="";



loginPassword.type="password";



closeRL();


}
else
{


showLoginError(
data.error ||
data.message ||
"Login failed"
);


}



}
catch(err)
{


console.error(err);



showLoginError(
"Network error, please try again"
);



}



};


}








// =================================
// PASSWORD EYE
// =================================


document
.querySelectorAll(
".toggle-password"
)
.forEach(
button=>{


button.onclick =
()=>{


const input =
document.getElementById(
button.dataset.target
);



if(!input)
return;




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









// =================================
// SESSION CHECK
// =================================


async function checkSession()
{


try{


const res =
await fetch(
`${API}/me`,
{

method:"GET",


credentials:"include"


}

);



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


userLoggedIn = true;


window.userLoggedIn = true;



updateHeader(
data.user
);



}
else
{


userLoggedIn = false;


window.userLoggedIn = false;



}



}
catch(err)
{


console.log(
"Not login"
);



}



}









// =================================
// ESC CLOSE
// =================================


document.addEventListener(
"keydown",
e=>{


if(e.key==="Escape")
{


closeRL();


}



});








// =================================
// PAGE NAVIGATION
// =================================



const pages =
document.querySelectorAll(
".page-section"
);



const navButtons =
document.querySelectorAll(
"#Menu-button .nav-button"
);







function showPage(pageId)
{


// PAGE


pages.forEach(page=>{


page.classList.add(
"hidden"
);



});





const targetPage =
document.getElementById(
pageId
);



if(targetPage)
{


targetPage.classList.remove(
"hidden"
);



}







// NAV


navButtons.forEach(button=>{


button.classList.remove(
"active"
);




if(
button.id==="orderButton"
)
{


return;


}




if(
button.dataset.page === pageId
)
{


button.classList.add(
"active"
);


}



});



}









// =================================
// NAV CLICK
// =================================


navButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


const pageId =
button.dataset.page;






if(

pageId==="shopPage"

||

pageId==="orderPage"

||

pageId==="inboxPage"

||

pageId==="mePage"

)
{


if(
!window.userLoggedIn
)
{


if(window.openRL)
{


window.openRL(
"login"
);


}



return;


}



}




showPage(
pageId
);



}

);



});









// =================================
// START
// =================================


checkSession();


showPage(
"homePage"
);


});
