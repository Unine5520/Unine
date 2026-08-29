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


alert(
"Logout successful"
);



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
