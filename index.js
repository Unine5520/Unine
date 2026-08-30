/* ======== U9 MAIN JS ======== */
/* ======== U9 MAIN JS ======== */
/* ======== U9 MAIN JS ======== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =========================
        // API
        // =========================


        const API =
        "https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";



        // =========================
        // USER STATE
        // =========================


        let currentUser = null;



        // =========================
        // PAGE NAVIGATION
        // =========================


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
                page =>
                {

                    page.classList.add(
                        "hidden"
                    );

                }
            );



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




            navButtons.forEach(
                button =>
                {

                    button.classList.remove(
                        "active"
                    );



                    /*
                        ORDER
                        保持你的原逻辑
                    */

                    if(
                        button.id ===
                        "orderButton"
                    )
                    {

                        return;

                    }



                    if(
                        button.dataset.page ===
                        pageId
                    )
                    {

                        button.classList.add(
                            "active"
                        );

                    }


                }
            );


        }







        // =========================
        // NAV BUTTON CLICK
        // =========================


        navButtons.forEach(
            button =>
            {


                button.addEventListener(
                    "click",
                    () =>
                    {


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


                            if(
                                !currentUser
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


            }
        );







        // =========================
        // DEFAULT PAGE
        // =========================


        showPage(
            "homePage"
        );









        // =========================
        // RL ELEMENT
        // =========================


        const rlModal =
        document.getElementById(
            "rlModal"
        );



        const loginButton =
        document.getElementById(
            "loginButton"
        );



        const registerButton =
        document.getElementById(
            "registerButton"
        );



        const rlClose =
        document.getElementById(
            "rlClose"
        );



        const loginTab =
        document.getElementById(
            "loginTab"
        );



        const registerTab =
        document.getElementById(
            "registerTab"
        );



        const loginForm =
        document.getElementById(
            "loginForm"
        );



        const registerForm =
        document.getElementById(
            "registerForm"
        );



        const rlTitle =
        document.getElementById(
            "rlTitle"
        );





        // =========================
        // INPUT
        // =========================


        const loginEmail =
        document.getElementById(
            "loginEmail"
        );


        const loginPassword =
        document.getElementById(
            "loginPassword"
        );



        const registerUsername =
        document.getElementById(
            "registerUsername"
        );



        const registerEmail =
        document.getElementById(
            "registerEmail"
        );



        const registerPassword =
        document.getElementById(
            "registerPassword"
        );



        const registerConfirm =
        document.getElementById(
            "registerConfirm"
        );





        // =========================
        // BUTTON
        // =========================


        const loginSubmit =
        document.getElementById(
            "loginSubmit"
        );



        const registerSubmit =
        document.getElementById(
            "registerSubmit"
        );





        // =========================
        // ERROR
        // =========================


        const loginError =
        document.getElementById(
            "loginError"
        );



        const registerError =
        document.getElementById(
            "registerError"
        );



        let loginErrorTimer;

        let registerErrorTimer;









        // =========================
        // OPEN CLOSE
        // =========================


        function openRL(type)
        {


            if(!rlModal)
            return;



            rlModal.classList.remove(
                "hidden"
            );



            clearErrors();




            if(
                type === "register"
            )
            {

                showRegister();

            }
            else
            {

                showLogin();

            }


        }




        window.openRL =
        openRL;






        function closeRL()
        {


            if(!rlModal)
            return;



            rlModal.classList.add(
                "hidden"
            );



            clearErrors();


        }








        // =========================
        // TAB
        // =========================


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
