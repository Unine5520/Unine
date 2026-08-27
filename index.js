/* =========================================
   SUPABASE CONFIG
========================================= */

const SUPABASE_URL =
"https://moufqvgakqqozybedisj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdWZxdmdha3Fxb3p5YmVkaXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNzI0NjQsImV4cCI6MjEwMjk0ODQ2NH0.LjMk0ZDmImS4NYezx6Xp6FbUxVrH_esroZXzXBWkiVc";


/* =========================================
   SUPABASE CONFIG
========================================= */


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


            const image = button.querySelector("img");


            /* ORDER */

            if (button.id === "orderButton") {

                return;

            }


            /* OTHER BUTTONS */

            if (button.dataset.page === pageId) {

                button.classList.add("active");

                image.src = image.dataset.active;

            } else {

                image.src = image.dataset.default;

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
