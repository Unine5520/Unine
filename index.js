/* ======== PAGE NAVIGATION ======== */
/* ======== PAGE NAVIGATION ======== */
/* ======== PAGE NAVIGATION ======== */

document.addEventListener("DOMContentLoaded", () => {


    /* ======== PAGES ======== */

    const pages = document.querySelectorAll(".page-section");


    /* ======== NAV BUTTONS ======== */

    const navButtons = document.querySelectorAll(
        "#Menu-button .nav-button"
    );


    /* ======== SHOW PAGE ======== */

    function showPage(pageId) {

        /* ----- PAGE ----- */

        pages.forEach(page => {

            page.classList.add("hidden");

        });


        const targetPage = document.getElementById(pageId);

        if (targetPage) {

            targetPage.classList.remove("hidden");

        }


        /* ----- NAV ----- */

        navButtons.forEach(button => {

            button.classList.remove("active");


            /* ORDER */

            if (button.id === "orderButton") {

                return;

            }


            /* OTHER BUTTONS */

            if (button.dataset.page === pageId) {

                button.classList.add("active");

            }

        });

    }


    /* ======== BUTTON CLICK ======== */

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            const pageId = button.dataset.page;

            showPage(pageId);

        });

    });


    /* ======== DEFAULT PAGE ======== */

    showPage("homePage");


});
