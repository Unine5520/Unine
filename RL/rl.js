document.addEventListener(
"DOMContentLoaded",
()=>{


const modal =
document.getElementById("rlModal");


const loginBtn =
document.getElementById("loginButton");


const registerBtn =
document.getElementById("registerButton");


const closeBtn =
document.getElementById("rlClose");


const loginTab =
document.getElementById("loginTab");


const registerTab =
document.getElementById("registerTab");


const loginForm =
document.getElementById("loginForm");


const registerForm =
document.getElementById("registerForm");





function openRL(type){


modal.classList.remove("hidden");


if(type==="register"){

showRegister();

}else{

showLogin();

}

}





function showLogin(){


loginTab.classList.add("active");

registerTab.classList.remove("active");


loginForm.classList.remove("hidden");

registerForm.classList.add("hidden");


}



function showRegister(){


registerTab.classList.add("active");

loginTab.classList.remove("active");


registerForm.classList.remove("hidden");

loginForm.classList.add("hidden");


}





loginBtn.onclick=()=>{

openRL("login");

}



registerBtn.onclick=()=>{

openRL("register");

}



closeBtn.onclick=()=>{

modal.classList.add("hidden");

}



loginTab.onclick=showLogin;


registerTab.onclick=showRegister;





/* PASSWORD TOGGLE */


document.querySelectorAll(
".toggle-password"
)
.forEach(btn=>{


btn.onclick=()=>{


const input =
document.getElementById(
btn.dataset.target
);


input.type =
input.type==="password"
?
"text"
:
"password";


}


});





});
