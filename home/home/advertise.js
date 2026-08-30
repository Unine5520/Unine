document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =========================
        // ADVERTISE
        // =========================

        const advertiseTrack =
            document.querySelector(
                "#advertise-header .advertise-track"
            );


        if(!advertiseTrack)
        return;


        // =========================
        // CURRENT
        // =========================

        let currentIndex = 0;


        // =========================
        // MOBILE CHECK
        // =========================

        function isMobile()
        {

            return window.innerWidth <= 768;

        }


        // =========================
        // SHOW
        // =========================

        function showAdvertise()
        {

            if(!isMobile())
            {

                advertiseTrack.style.transform =
                    "translateX(0)";

                return;

            }


            advertiseTrack.style.transform =
                `translateX(-${currentIndex * 33.333333}%)`;

        }


        // =========================
        // NEXT
        // =========================

        function nextAdvertise()
        {

            if(!isMobile())
            return;


            currentIndex++;


            if(currentIndex >= 3)
            {
                currentIndex = 0;
            }


            showAdvertise();

        }


        // =========================
        // START
        // =========================

        showAdvertise();


        setInterval(
            nextAdvertise,
            3000
        );


        // =========================
        // RESIZE
        // =========================

        window.addEventListener(
            "resize",
            () =>
            {

                showAdvertise();

            }
        );


    }
);
