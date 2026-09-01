document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =====================================================
        // API
        // =====================================================

        const API =
            "https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v3";



        // =====================================================
        // ELEMENTS
        // =====================================================


        const orderPage =
            document.getElementById(
                "orderPage"
            );


        const orderRoundValue =
            document.getElementById(
                "order-round-value"
            );


        const orderStatus =
            document.getElementById(
                "order-status"
            );


        const orderMessage =
            document.getElementById(
                "order-message"
            );


        const orderMatching =
            document.getElementById(
                "order-matching"
            );


        const orderMatchingCountdown =
            document.getElementById(
                "order-matching-countdown"
            );


        const orderProduct =
            document.getElementById(
                "order-product"
            );


        const orderProductImage =
            document.getElementById(
                "order-product-image"
            );


        const orderProductName =
            document.getElementById(
                "order-product-name"
            );


        const orderProductDescription =
            document.getElementById(
                "order-product-description"
            );


        const orderProductPrice =
            document.getElementById(
                "order-product-price"
            );


        const orderProductProfit =
            document.getElementById(
                "order-product-profit"
            );


        const orderCoins =
            document.getElementById(
                "order-coins"
            );


        const orderBalance =
            document.getElementById(
                "order-balance"
            );


        const orderProgressText =
            document.getElementById(
                "order-progress-text"
            );


        const orderProgressBar =
            document.getElementById(
                "order-progress-bar"
            );


        const orderActionButton =
            document.getElementById(
                "order-action-button"
            );


        const orderError =
            document.getElementById(
                "order-error"
            );




        // =====================================================
        // STATE
        // =====================================================


        let currentUser =
            null;


        let currentOrder =
            null;


        let currentRound =
            null;


        let matchingTimer =
            null;


        let cooldownTimer =
            null;


        let orderStatusLoading =
            false;


        let isProcessing =
            false;



        // =====================================================
        // UTIL
        // =====================================================



        function setError(
            message = ""
        ){

            if(!orderError){

                return;

            }


            orderError.innerText =
                message;

        }




        function formatNumber(
            value
        ){

            const number =
                Number(
                    value ?? 0
                );


            if(
                !Number.isFinite(
                    number
                )
            ){

                return "0.00";

            }


            return number.toLocaleString(
                undefined,
                {
                    minimumFractionDigits:2,
                    maximumFractionDigits:2
                }
            );

        }





        function formatTime(
            seconds
        ){

            let time =
                Math.max(
                    0,
                    Number(seconds || 0)
                );


            time =
                Math.floor(
                    time
                );



            const h =
                Math.floor(
                    time / 3600
                );


            const m =
                Math.floor(
                    (time % 3600) / 60
                );


            const s =
                time % 60;



            if(h > 0){

                return (
                    `${h}h ${m}m ${s}s`
                );

            }



            if(m > 0){

                return (
                    `${m}m ${s}s`
                );

            }



            return `${s}s`;

        }





        function stopMatchingTimer(){

            if(
                matchingTimer
            ){

                clearInterval(
                    matchingTimer
                );


                matchingTimer =
                    null;

            }

        }





        function stopCooldownTimer(){

            if(
                cooldownTimer
            ){

                clearInterval(
                    cooldownTimer
                );


                cooldownTimer =
                    null;

            }

        }





        function stopAllTimer(){

            stopMatchingTimer();

            stopCooldownTimer();

        }






        // =====================================================
        // API HELPER
        // =====================================================



        async function apiRequest(
            url,
            options = {}
        ){

            const response =
                await fetch(
                    `${API}${url}`,
                    {
                        credentials:
                            "include",

                        ...options,

                        headers:{
                            "Content-Type":
                                "application/json",

                            ...(options.headers || {})
                        }

                    }
                );



            return await response.json();

        }





        // =====================================================
        // UPDATE USER DATA
        // =====================================================



        function updateUserData(
            user
        ){

            if(!user){

                return;

            }



            if(orderCoins){

                orderCoins.innerText =
                    formatNumber(
                        user.coins
                    );

            }



            if(orderBalance){

                orderBalance.innerText =
                    formatNumber(
                        user.balance
                    );

            }


        }





        // =====================================================
        // LOAD SESSION
        // =====================================================



        async function loadSession(){


            try{


                const data =
                    await apiRequest(
                        "/me",
                        {
                            method:"GET"
                        }
                    );



                console.log(
                    "ORDER SESSION:",
                    data
                );




                if(
                    !data.success ||
                    !data.logged_in ||
                    !data.user
                ){


                    currentUser =
                        null;



                    if(orderActionButton){

                        orderActionButton.disabled =
                            true;


                        orderActionButton.innerText =
                            "Login Required";

                    }



                    if(orderMessage){

                        orderMessage.innerText =
                            "Please login before starting an order.";

                    }



                    return false;


                }




                currentUser =
                    data.user;



                updateUserData(
                    currentUser
                );



                return true;



            }
            catch(error){


                console.error(
                    "Session error:",
                    error
                );



                currentUser =
                    null;



                if(orderActionButton){

                    orderActionButton.disabled =
                        true;


                    orderActionButton.innerText =
                        "Login Required";

                }



                return false;


            }


        }



// =====================================================
// RESET UI
// =====================================================


function resetOrderUI(){


    stopAllTimer();



    currentOrder =
        null;


    currentRound =
        null;



    if(orderStatus){

        orderStatus.innerText =
            "Ready";


        orderStatus.className =
            "order-status idle";

    }



    if(orderMessage){

        orderMessage.innerText =
            "Start an order to begin.";

    }



    if(orderMatching){

        orderMatching.classList.add(
            "hidden"
        );

    }



    if(orderProduct){

        orderProduct.classList.add(
            "hidden"
        );

    }



    if(orderMatchingCountdown){

        orderMatchingCountdown.innerText =
            "-";

    }



    if(orderRoundValue){

        orderRoundValue.innerText =
            "0/0";

    }



    if(orderProgressText){

        orderProgressText.innerText =
            "0 / 0";

    }



    if(orderProgressBar){

        orderProgressBar.style.width =
            "0%";

    }



    if(orderActionButton){

        orderActionButton.disabled =
            false;


        orderActionButton.innerText =
            "Start Order";

    }



    setError("");

}




// =====================================================
// UPDATE ROUND
// =====================================================


function updateRound(
    round
){


    if(!round){

        return;

    }



    currentRound =
        round;



    const completed =
        Number(
            round.completed_orders || 0
        );



    const target =
        Number(
            round.target_orders || 0
        );



    if(orderRoundValue){

        orderRoundValue.innerText =
            `${completed}/${target}`;

    }



    if(orderProgressText){

        orderProgressText.innerText =
            `${completed} / ${target}`;

    }



    if(orderProgressBar){


        let percent =
            0;



        if(target > 0){

            percent =
                (
                    completed /
                    target
                )
                *
                100;

        }



        orderProgressBar.style.width =
            `${Math.min(
                percent,
                100
            )}%`;

    }


}




// =====================================================
// DISPLAY PRODUCT
// =====================================================


function displayProduct(
    product
){


    if(!product){

        return;

    }



    if(orderProductImage){

        orderProductImage.src =
            product.image_url ||
            "https://placehold.co/600x600?text=No+Order";


        orderProductImage.alt =
            product.name ||
            "Product";

    }



    if(orderProductName){

        orderProductName.innerText =
            product.name ||
            "Order Product";

    }



    if(orderProductDescription){

        orderProductDescription.innerText =
            product.description ||
            "";

    }



    if(orderProductPrice){

        orderProductPrice.innerText =
            formatNumber(
                product.price
            );

    }



    if(orderProductProfit){


        const price =
            Number(
                product.price || 0
            );



        const ratio =
            Number(
                product.profit || 0
            );



        orderProductProfit.innerText =
            formatNumber(
                price * ratio
            );


    }


}




// =====================================================
// SHOW MATCHING
// =====================================================


function showMatching(
    seconds
){


    stopMatchingTimer();

    stopCooldownTimer();



    let remaining =
        Math.max(
            0,
            Math.floor(
                Number(seconds || 0)
            )
        );



    if(orderMatching){

        orderMatching.classList.remove(
            "hidden"
        );

    }



    if(orderProduct){

        orderProduct.classList.add(
            "hidden"
        );

    }



    if(orderStatus){

        orderStatus.innerText =
            "Matching";


        orderStatus.className =
            "order-status matching";

    }



    if(orderMessage){

        orderMessage.innerText =
            "Finding your order...";

    }



    if(orderActionButton){

        orderActionButton.disabled =
            true;


        orderActionButton.innerText =
            "Matching...";

    }



    if(orderMatchingCountdown){

        orderMatchingCountdown.innerText =
            `${remaining}s`;

    }



    if(remaining <= 0){

        showPendingOrder();

        return;

    }




    matchingTimer =
        setInterval(
            ()=>{


                remaining--;



                if(orderMatchingCountdown){

                    orderMatchingCountdown.innerText =
                        `${Math.max(
                            remaining,
                            0
                        )}s`;

                }



                if(remaining <= 0){

                    stopMatchingTimer();


                    showPendingOrder();

                }


            },
            1000
        );


}




// =====================================================
// SHOW PENDING ORDER
// =====================================================


function showPendingOrder(){


    stopMatchingTimer();



    if(orderMatching){

        orderMatching.classList.add(
            "hidden"
        );

    }



    if(orderStatus){

        orderStatus.innerText =
            "Order Ready";


        orderStatus.className =
            "order-status pending";

    }



    if(orderMessage){

        orderMessage.innerText =
            "Your order is ready. Complete it to continue.";

    }



    if(orderProduct){

        orderProduct.classList.remove(
            "hidden"
        );

    }



    if(orderActionButton){

        orderActionButton.disabled =
            false;


        orderActionButton.innerText =
            "Complete Order";

    }



}




// =====================================================
// SHOW COOLDOWN
// =====================================================


function showCooldown(
    seconds,
    roundData = null
){


    stopCooldownTimer();



    let remaining =
        Math.max(
            0,
            Math.floor(
                Number(seconds || 0)
            )
        );



    if(roundData){

        updateRound(
            roundData
        );

    }



    if(orderMatching){

        orderMatching.classList.add(
            "hidden"
        );

    }



    if(orderProduct){

        orderProduct.classList.add(
            "hidden"
        );

    }



    if(orderStatus){

        orderStatus.innerText =
            "Cooldown";


        orderStatus.className =
            "order-status idle";

    }



    if(orderActionButton){

        orderActionButton.disabled =
            true;


        orderActionButton.innerText =
            "Round Cooldown";

    }




    function update(){

        if(orderMessage){

            orderMessage.innerText =
                "Round cooldown.";

        }



        setError(
            `Remaining time: ${formatTime(
                remaining
            )}`
        );

    }



    update();




    if(remaining <= 0){

        finishCooldown();

        return;

    }



    cooldownTimer =
        setInterval(
            ()=>{


                remaining--;



                if(remaining <= 0){

                    finishCooldown();

                    return;

                }



                update();



            },
            1000
        );


}





// =====================================================
// FINISH COOLDOWN
// =====================================================


function finishCooldown(){


    stopCooldownTimer();



    if(orderStatus){

        orderStatus.innerText =
            "Ready";


        orderStatus.className =
            "order-status idle";

    }



    if(orderMessage){

        orderMessage.innerText =
            "Cooldown finished. Start a new order.";

    }



    setError("");



    if(orderActionButton){

        orderActionButton.disabled =
            false;


        orderActionButton.innerText =
            "Start Order";

    }


}




// =====================================================
// LOAD ORDER STATE
// =====================================================


async function loadOrderState(){


    if(!currentUser){

        return;

    }



    if(orderStatusLoading){

        return;

    }



    orderStatusLoading =
        true;



    try{


        const data =
            await apiRequest(
                "/order-status",
                {
                    method:"GET"
                }
            );



        console.log(
            "ORDER STATUS:",
            data
        );



        if(!data.success){

            return;

        }




        if(data.user){

            currentUser =
                data.user;


            updateUserData(
                currentUser
            );

        }




        if(data.round){

            updateRound(
                data.round
            );

        }




        if(!data.has_order){


            currentOrder =
                null;


            resetOrderUI();


            return;

        }





        currentOrder =
            data.order;



        if(
            currentOrder.product
        ){

            displayProduct(
                currentOrder.product
            );

        }





        if(
            currentOrder.status ===
            "pending"
        ){


            const seconds =
                Number(
                    currentOrder.matching?.remaining_seconds || 0
                );



            if(seconds > 0){

                showMatching(
                    seconds
                );

            }
            else{

                showPendingOrder();

            }



            return;

        }





        if(
            currentOrder.status ===
            "completed"
        ){



            if(
                data.round &&
                data.round.status ===
                "cooldown"
            ){


                const end =
                    new Date(
                        data.round.cooldown_until
                    )
                    .getTime();



                showCooldown(
                    Math.ceil(
                        (
                            end -
                            Date.now()
                        )
                        /
                        1000
                    ),
                    data.round
                );


                return;


            }




            if(orderStatus){

                orderStatus.innerText =
                    "Completed";


                orderStatus.className =
                    "order-status completed";

            }



            if(orderActionButton){

                orderActionButton.disabled =
                    false;


                orderActionButton.innerText =
                    "Start Next Order";

            }



            if(orderMessage){

                orderMessage.innerText =
                    "Order completed successfully.";

            }



        }



    }
    catch(error){


        console.error(
            "Order state error:",
            error
        );


    }
    finally{


        orderStatusLoading =
            false;


    }


}

// =====================================================
// START ORDER
// =====================================================


async function startOrder(){


    if(isProcessing){

        return;

    }



    setError("");



    if(!currentUser){


        const logged =
            await loadSession();



        if(!logged){

            return;

        }

    }




    isProcessing =
        true;




    if(orderActionButton){

        orderActionButton.disabled =
            true;


        orderActionButton.innerText =
            "Starting...";

    }





    try{


        const data =
            await apiRequest(
                "/order-start",
                {
                    method:"POST",

                    body:
                        JSON.stringify(
                            {
                                user_id:
                                    currentUser.id
                            }
                        )

                }
            );



        console.log(
            "ORDER START:",
            data
        );



        if(!data.success){

            handleStartError(
                data
            );

            return;

        }





        currentOrder =
            data.order;



        currentRound =
            data.round;




        updateRound(
            data.round
        );





        if(
            currentOrder.product
        ){

            displayProduct(
                currentOrder.product
            );

        }






        if(currentUser){

            currentUser.coins =
                currentOrder.coins_after_order;



            updateUserData(
                currentUser
            );

        }






        showMatching(
            currentOrder.matching_delay_seconds
        );




    }
    catch(error){


        console.error(
            "Start order error:",
            error
        );



        setError(
            "Network error. Please try again."
        );



    }
    finally{


        isProcessing =
            false;


    }


}




// =====================================================
// START ERROR
// =====================================================


function handleStartError(
    data
){


    const code =
        data.code || "";




    if(
        code ===
        "INSUFFICIENT_START_COINS"
    ){


        setError(
            `Need ${formatNumber(
                data.required_coins
            )} Coins to start order.`
        );

    }



    else if(
        code ===
        "PENDING_ORDER"
    ){


        setError(
            "Please complete current order first."
        );


        showPendingOrder();


    }



    else if(
        code ===
        "ROUND_COOLDOWN"
    ){


        showCooldown(
            data.remaining_seconds,
            data.round
        );


        return;

    }




    else if(
        code ===
        "ROUND_COMPLETED"
    ){


        updateRound(
            {
                target_orders:
                    data.target_orders,

                completed_orders:
                    data.completed_orders
            }
        );


        setError(
            data.error ||
            "Round completed."
        );


    }



    else{


        setError(
            data.error ||
            "Unable to start order."
        );


    }




    if(orderActionButton){

        orderActionButton.disabled =
            false;


        orderActionButton.innerText =
            "Start Order";

    }



}




// =====================================================
// COMPLETE ORDER
// =====================================================


async function completeOrder(){



    if(isProcessing){

        return;

    }



    if(
        !currentUser ||
        !currentOrder
    ){

        return;

    }



    isProcessing =
        true;



    setError("");



    if(orderActionButton){

        orderActionButton.disabled =
            true;


        orderActionButton.innerText =
            "Completing...";

    }





    try{


        const data =
            await apiRequest(
                "/order-complete",
                {
                    method:"POST",

                    body:
                        JSON.stringify(
                            {

                                user_id:
                                    currentUser.id,


                                order_id:
                                    currentOrder.id

                            }
                        )

                }
            );



        console.log(
            "ORDER COMPLETE:",
            data
        );




        if(!data.success){


            handleCompleteError(
                data
            );


            return;


        }






        currentOrder =
            data.order;



        currentRound =
            data.round;






        if(
            data.coins &&
            currentUser
        ){


            currentUser.coins =
                data.coins.after_complete;



            updateUserData(
                currentUser
            );


        }






        updateRound(
            data.round
        );






        if(
            data.round &&
            data.round.status ===
            "cooldown"
        ){



            const end =
                new Date(
                    data.round.cooldown_until
                )
                .getTime();



            showCooldown(
                Math.ceil(
                    (
                        end -
                        Date.now()
                    )
                    /
                    1000
                ),
                data.round
            );



            return;

        }






        if(orderStatus){


            orderStatus.innerText =
                "Completed";


            orderStatus.className =
                "order-status completed";


        }





        if(orderMessage){


            orderMessage.innerText =
                data.message ||
                "Order completed successfully.";


        }




        if(orderActionButton){


            orderActionButton.disabled =
                false;



            orderActionButton.innerText =
                "Start Next Order";


        }





    }
    catch(error){



        console.error(
            "Complete error:",
            error
        );



        setError(
            "Network error. Please try again."
        );



    }
    finally{


        isProcessing =
            false;


    }



}






// =====================================================
// COMPLETE ERROR
// =====================================================


function handleCompleteError(
    data
){


    setError(
        data.error ||
        "Unable to complete order."
    );



    if(orderActionButton){


        orderActionButton.disabled =
            false;



        orderActionButton.innerText =
            "Complete Order";


    }


}





// =====================================================
// ACTION BUTTON
// =====================================================


if(orderActionButton){


    orderActionButton.addEventListener(
        "click",
        ()=>{


            if(isProcessing){

                return;

            }



            if(
                currentOrder &&
                currentOrder.status ===
                "pending"
            ){


                completeOrder();


            }
            else{


                startOrder();


            }



        }
    );


}







// =====================================================
// PAGE VISIBILITY
// =====================================================


if(orderPage){



    const observer =
        new MutationObserver(
            ()=>{



                const visible =
                    !orderPage.classList.contains(
                        "hidden"
                    );




                if(visible){



                    loadSession()
                    .then(
                        logged=>{


                            if(logged){


                                loadOrderState();


                            }


                        }
                    );


                }



            }
        );





    observer.observe(
        orderPage,
        {
            attributes:true,

            attributeFilter:[
                "class"
            ]
        }
    );


}






// =====================================================
// LOGIN EVENT
// =====================================================


window.addEventListener(
    "user-login",
    async ()=>{


        resetOrderUI();



        const logged =
            await loadSession();



        if(logged){


            await loadOrderState();


        }


    }
);







// =====================================================
// INITIAL LOAD
// =====================================================


resetOrderUI();



loadSession()
.then(
    logged=>{


        if(logged){


            loadOrderState();


        }


    }
);



    }
);
