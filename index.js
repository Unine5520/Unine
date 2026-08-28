/* =========================================
   SUPABASE CONFIG
========================================= */

const SUPABASE_URL =
"---------";

const SUPABASE_PUBLISHABLE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxheXpjZ2t0Z3RycXZzZ3h3d3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4OTIxNDUsImV4cCI6MjEwMzQ2ODE0NX0.A-9DppiKBSLkjsFEW5fT1WZuWd1b4f_bFp7iTdm9t6E";

/* =========================================
   SUPABASE CLIENT
========================================= */

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


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
