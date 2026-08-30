/* ======== PAGE NAVIGATION ======== */
/* ======== PAGE NAVIGATION ======== */
/* ======== PAGE NAVIGATION ======== */


document.addEventListener(
"DOMContentLoaded",
()=>{


// =========================
// LOGIN STATE
// =========================


let loggedIn = false;



window.setLoginState =
function(state)
{

    loggedIn = state;

};





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


    pages.forEach(
    page=>{

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






    // =========================
    // ACTIVE BUTTON
    // =========================


    navButtons.forEach(
    button=>{


        button.classList.remove(
            "active"
        );



        // ORDER 不处理

        if(
            button.id === "orderButton"
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









// =========================
// BUTTON CLICK
// =========================


navButtons.forEach(
button=>{


button.addEventListener(
"click",
()=>{


    const pageId =
    button.dataset.page;




    // =========================
    // LOGIN REQUIRED
    // =========================


    const needLoginPages =
    [
        "shopPage",
        "orderPage",
        "inboxPage",
        "mePage"
    ];





    if(
        needLoginPages.includes(
            pageId
        )
    )
    {



        if(!loggedIn)
        {


            window.dispatchEvent(
                new Event(
                    "openLogin"
                )
            );


            return;


        }


    }





    showPage(
        pageId
    );



});


});








// =========================
// DEFAULT
// =========================


showPage(
"homePage"
);



});
