/* =====================================================
   U9 INDEX.JS
   RL LOGIN REGISTER + PAGE NAVIGATION
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


// =====================================================
// =========================
// RL SYSTEM START
// =========================
// =====================================================



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

const globalLoading =
document.getElementById("globalLoading");


// =========================
// INPUT
// =========================


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




// =========================
// BUTTON
// =========================


const loginSubmit =
document.getElementById("loginSubmit");


const registerSubmit =
document.getElementById("registerSubmit");


const logoutButton =
document.getElementById("logoutButton");


const logoutModal =
document.getElementById("logoutModal");


const logoutConfirm =
document.getElementById("logoutConfirm");


const logoutCancel =
document.getElementById("logoutCancel");




// =========================
// ERROR
// =========================


const loginError =
document.getElementById("loginError");


const registerError =
document.getElementById("registerError");





// =====================================================
// STATE
// =====================================================


let loginErrorTimer;

let registerErrorTimer;


let loginLoading=false;

let registerLoading=false;


window.userLoggedIn=false;


// =====================================================
// GLOBAL LOADING
// =====================================================


// =====================================================
// GLOBAL LOADING
// =====================================================


let globalLoadingCount = 0;



function showGlobalLoading()
{


globalLoadingCount++;



if(globalLoading)
{

globalLoading.classList.remove(
"hidden"
);

}


}





function hideGlobalLoading()
{


globalLoadingCount--;



if(globalLoadingCount < 0)
{

globalLoadingCount = 0;

}




if(
globalLoadingCount === 0
)
{


if(globalLoading)
{

globalLoading.classList.add(
"hidden"
);

}


}



}





// =====================================================
// ERROR SYSTEM
// =====================================================


function showError(
element,
message="",
type=""
)
{


if(!element)
return;



element.innerText =
message;




if(type==="login")
{


clearTimeout(
loginErrorTimer
);



loginErrorTimer =
setTimeout(
()=>{


element.innerText="";


loginLoading=false;


checkLoginButton();



},
3000
);



}




if(type==="register")
{


clearTimeout(
registerErrorTimer
);



registerErrorTimer =
setTimeout(
()=>{


element.innerText="";


registerLoading=false;


checkRegisterButton();



},
3000
);



}



}





function clearErrors()
{


if(loginError)
{

loginError.innerText="";

}



if(registerError)
{

registerError.innerText="";

}



clearTimeout(
loginErrorTimer
);


clearTimeout(
registerErrorTimer
);



}









// =====================================================
// OPEN CLOSE MODAL
// =====================================================


function openRL(type)
{


if(rlModal)
{

rlModal.classList.remove(
"hidden"
);

}



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


if(rlModal)
{

rlModal.classList.add(
"hidden"
);

}



clearErrors();



}









// =====================================================
// TAB
// =====================================================


function showLogin()
{


if(rlTitle)
{

rlTitle.innerText="Login";

}



loginTab?.classList.add(
"active"
);


registerTab?.classList.remove(
"active"
);



loginForm?.classList.remove(
"hidden"
);


registerForm?.classList.add(
"hidden"
);



}








function showRegister()
{


if(rlTitle)
{

rlTitle.innerText="Register";

}



registerTab?.classList.add(
"active"
);


loginTab?.classList.remove(
"active"
);



registerForm?.classList.remove(
"hidden"
);


loginForm?.classList.add(
"hidden"
);



}










// =====================================================
// OPEN BUTTON
// =====================================================


loginButton?.addEventListener(
"click",
()=>openRL("login")
);



registerButton?.addEventListener(
"click",
()=>openRL("register")
);



rlClose?.addEventListener(
"click",
closeRL
);



loginTab?.addEventListener(
"click",
showLogin
);



registerTab?.addEventListener(
"click",
showRegister
);









// =====================================================
// PASSWORD EYE
// =====================================================


document
.querySelectorAll(
".toggle-password"
)
.forEach(
button=>{


button.addEventListener(
"click",
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



});



});









// =====================================================
// BUTTON CHECK
// =====================================================


function checkLoginButton()
{


if(!loginSubmit)
return;



const ok =
loginEmail.value.trim()
&&
loginPassword.value;



loginSubmit.disabled =
!ok ||
loginLoading;



loginSubmit.classList.toggle(
"active",
ok &&
!loginLoading
);



}






function checkRegisterButton()
{


if(!registerSubmit)
return;



const ok =
registerUsername.value.trim()
&&
registerEmail.value.trim()
&&
registerPassword.value
&&
registerConfirm.value;



registerSubmit.disabled =
!ok ||
registerLoading;



registerSubmit.classList.toggle(
"active",
ok &&
!registerLoading
);



}




loginEmail?.addEventListener(
"input",
checkLoginButton
);


loginPassword?.addEventListener(
"input",
checkLoginButton
);


registerUsername?.addEventListener(
"input",
checkRegisterButton
);


registerEmail?.addEventListener(
"input",
checkRegisterButton
);


registerPassword?.addEventListener(
"input",
checkRegisterButton
);


registerConfirm?.addEventListener(
"input",
checkRegisterButton
);






// =====================================================
// REGISTER
// =====================================================


registerSubmit?.addEventListener(
"click",
async()=>{


if(registerLoading)
return;



clearErrors();



if(
registerPassword.value !==
registerConfirm.value
)
{


showError(
registerError,
"Passwords do not match",
"register"
);



return;

}




registerLoading=true;


registerSubmit.disabled=true;


registerSubmit.classList.remove(
"active"
);




try
{


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



console.log(
"REGISTER:",
data
);



if(data.success)
{


window.userLoggedIn=true;


updateHeader(
data.user
);



registerUsername.value="";

registerEmail.value="";

registerPassword.value="";

registerConfirm.value="";



registerLoading=false;


closeRL();



}
else
{


showError(
registerError,
data.error ||
data.message ||
"Register failed",
"register"
);



}



}
catch(err)
{


console.error(err);



showError(
registerError,
"Network error",
"register"
);



}



});





// =====================================================
// =========================
// LOGIN
// =========================
// =====================================================


loginSubmit?.addEventListener(
"click",
async()=>{


if(loginLoading)
return;



clearErrors();



loginLoading=true;


loginSubmit.disabled=true;


loginSubmit.classList.remove(
"active"
);




try
{


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



console.log(
"LOGIN:",
data
);





if(data.success)
{


window.userLoggedIn=true;



updateHeader(
data.user
);




loginEmail.value="";


loginPassword.value="";


loginPassword.type =
"password";



loginLoading=false;



closeRL();



}
else
{


showError(
loginError,
data.error ||
data.message ||
"Login failed",
"login"
);



}



}
catch(err)
{


console.error(err);



showError(
loginError,
"Network error",
"login"
);



}



});









// =====================================================
// =========================
// UPDATE HEADER
// =========================
// =====================================================


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



}



window.updateHeader =
updateHeader;



window.openRL =
openRL;









// =====================================================
// =========================
// LOGOUT
// =========================
// =====================================================


async function logout()
{


try
{


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


window.userLoggedIn=false;



const userHeader =
document.getElementById(
"userHeader"
);



const homeAuth =
document.getElementById(
"homeAuth"
);



const telegramButton =
document.getElementById(
"telegramButton"
);



if(userHeader)
{

userHeader.classList.add(
"hidden"
);

}



if(homeAuth)
{

homeAuth.classList.remove(
"hidden"
);

}



if(telegramButton)
{

telegramButton.classList.remove(
"hidden"
);

}




if(logoutModal)
{

logoutModal.classList.add(
"hidden"
);

}



showPage(
"homePage"
);



}



}
catch(err)
{


console.error(
"Logout error:",
err
);



}



}



window.logout =
logout;









// =====================================================
// =========================
// SESSION
// =========================
// =====================================================


async function checkSession()
{


showGlobalLoading();


try
{


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


window.userLoggedIn=true;



updateHeader(
data.user
);



}
else
{


window.userLoggedIn=false;



}




}
catch(err)
{


console.log(
"Session none"
);



window.userLoggedIn=false;



}
finally
{


hideGlobalLoading();



}


}


checkSession();



// =====================================================
// =========================
// ESC CLOSE
// =========================
// =====================================================


document.addEventListener(
"keydown",
e=>
{


if(e.key==="Escape")
{


closeRL();



}



});









// =====================================================
// =========================
// PAGE NAVIGATION
// =========================
// =====================================================


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


pages.forEach(
page=>
{

page.classList.add(
"hidden"
);

}

);





const target =
document.getElementById(
pageId
);



if(target)
{

target.classList.remove(
"hidden"
);

}




navButtons.forEach(
button=>
{


button.classList.remove(
"active"
);



if(
button.dataset.page===pageId
)
{


button.classList.add(
"active"
);



}



});



}



window.showPage =
showPage;









// =====================================================
// NAV CLICK
// =====================================================


navButtons.forEach(
button=>
{


button.addEventListener(
"click",
()=>{


const pageId =
button.dataset.page;




// NEED LOGIN PAGE


if(
pageId==="shopPage" ||
pageId==="orderPage" ||
pageId==="inboxPage" ||
pageId==="mePage"
)
{


if(
!window.userLoggedIn
)
{


openRL(
"login"
);


return;



}



}




showPage(
pageId
);



}



);



});









// =====================================================
// DEFAULT PAGE
// =====================================================


showPage(
"homePage"
);









// =====================================================
// LOGOUT BUTTON
// =====================================================


logoutButton?.addEventListener(
"click",
()=>{


if(logoutModal)
{

logoutModal.classList.remove(
"hidden"
);

}



});







logoutCancel?.addEventListener(
"click",
()=>{


logoutModal.classList.add(
"hidden"
);



});








logoutConfirm?.addEventListener(
"click",
logout
);





// =====================================================
// RL SYSTEM END
// =====================================================


});
