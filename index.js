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

const logoutButton =
document.getElementById("logoutButton");


const logoutModal =
document.getElementById("logoutModal");


const logoutConfirm =
document.getElementById("logoutConfirm");


const logoutCancel =
document.getElementById("logoutCancel");

// error


const loginError =
document.getElementById("loginError");


const registerError =
document.getElementById("registerError");




// =========================
// STATE
// =========================


let loginErrorTimer;


let registerErrorTimer;


let loginLoading = false;


let registerLoading = false;


let userLoggedIn = false;


window.userLoggedIn = false;







// =========================
// ERROR SYSTEM
// =========================


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


// unlock login

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


// unlock register

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









// =========================
// OPEN CLOSE
// =========================


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









// =========================
// TAB
// =========================


function showLogin()
{


if(rlTitle)
{

rlTitle.innerText =
"Login";

}



if(loginTab)
{

loginTab.classList.add(
"active"
);

}



if(registerTab)
{

registerTab.classList.remove(
"active"
);

}



if(loginForm)
{

loginForm.classList.remove(
"hidden"
);

}



if(registerForm)
{

registerForm.classList.add(
"hidden"
);

}



}








function showRegister()
{


if(rlTitle)
{

rlTitle.innerText =
"Register";

}



if(registerTab)
{

registerTab.classList.add(
"active"
);

}



if(loginTab)
{

loginTab.classList.remove(
"active"
);

}



if(registerForm)
{

registerForm.classList.remove(
"hidden"
);

}



if(loginForm)
{

loginForm.classList.add(
"hidden"
);

}



}









// =========================
// OPEN BUTTON
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



if(loginTab)
{


loginTab.onclick =
showLogin;

}



if(registerTab)
{


registerTab.onclick =
showRegister;

}









// =========================
// PASSWORD EYE
// =========================


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









// =========================
// BUTTON ACTIVE CHECK
// =========================


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



if(registerUsername)
{

registerUsername.oninput =
checkRegisterButton;

}



if(registerEmail)
{

registerEmail.oninput =
checkRegisterButton;

}



if(registerPassword)
{

registerPassword.oninput =
checkRegisterButton;

}



if(registerConfirm)
{

registerConfirm.oninput =
checkRegisterButton;

}









// =========================
// REGISTER
// =========================


if(registerSubmit)
{


registerSubmit.onclick =
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



// lock button

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



console.log(data);




if(data.success)
{


if(data.user)
{


userLoggedIn=true;


window.userLoggedIn=true;



updateHeader(
data.user
);



}




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
"Network error, please try again",
"register"
);



}



};


}





// =====================================================
// PART 2 CONTINUES
// =====================================================



// =====================================================
// =========================
// LOGIN
// =========================
// =====================================================


if(loginSubmit)
{


loginSubmit.onclick =
async()=>{


if(loginLoading)
return;



clearErrors();



// lock login button

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



console.log(data);






if(data.success)
{


if(data.user)
{


userLoggedIn=true;


window.userLoggedIn=true;



updateHeader(
data.user
);



}



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
"Network error, please try again",
"login"
);



}



};


}









// =========================
// UPDATE HEADER
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



window.openRL =
openRL;









// =========================
// SESSION
// =========================


async function checkSession()
{


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


userLoggedIn=true;


window.userLoggedIn=true;



updateHeader(
data.user
);



}
else
{


userLoggedIn=false;


window.userLoggedIn=false;



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
e=>
{


if(e.key==="Escape")
{


closeRL();



}



});









// =========================
// START SESSION
// =========================


checkSession();




// =====================================================
// =========================
// RL SYSTEM END
// =========================
// =====================================================









// =====================================================
// =========================
// PAGE NAVIGATION START
// =========================
// =====================================================





// =========================
// PAGES
// =========================


const pages =
document.querySelectorAll(
".page-section"
);





// =========================
// NAV BUTTONS
// =========================


const navButtons =
document.querySelectorAll(
"#Menu-button .nav-button"
);









// =========================
// SHOW PAGE
// =========================


function showPage(pageId)
{


// PAGE HIDE


pages.forEach(
page=>
{


page.classList.add(
"hidden"
);



});






// SHOW TARGET


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







// NAV ACTIVE


navButtons.forEach(
button=>
{


button.classList.remove(
"active"
);




// ORDER BUTTON

if(
button.id==="orderButton"
)
{

return;

}





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









// =========================
// NAV CLICK
// =========================


navButtons.forEach(
button=>
{


button.addEventListener(
"click",
()=>{


const pageId =
button.dataset.page;





// NEED LOGIN


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









// =========================
// DEFAULT PAGE
// =========================


showPage(
"homePage"
);





// =====================================================
// =========================
// PAGE NAVIGATION END
// =========================
// =====================================================



});
