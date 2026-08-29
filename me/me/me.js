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


}
catch(err)
{

console.log(err);

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
// CANCEL
// =================


logoutCancel.onclick =
()=>{


logoutModal.classList.add(
"hidden"
);


};






// =================
// LOGOUT API
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
data
);



if(data.success)
{


alert(
"Logout successful"
);



// refresh page

location.reload();


}



}
catch(err)
{

console.error(err);

alert(
"Logout error"
);


}



};






loadUser();



});
