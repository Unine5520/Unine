document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =====================================================
        // API
        // =====================================================

        const API =
            "https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";


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

        let currentUser = null;

        let currentOrder = null;

        let currentRound = null;

        let matchingTimer = null;


        // =====================================================
        // UTIL
        // =====================================================

        function setError(
            message = ""
        ) {

            if (!orderError) {

                return;

            }

            orderError.innerText =
                message;

        }


        function formatNumber(
            value
        ) {

            function formatCooldownTime(
                seconds
            ) {

                let time =
                    Number(seconds || 0);


                if (time <= 0) {

                    return "0s";

                }


                const hours =
                    Math.floor(
                        time / 3600
                    );


                const minutes =
                    Math.floor(
                        (time % 3600) / 60
                    );


                const secondsLeft =
                    time % 60;


                if (hours > 0) {

                    return `${hours}h ${minutes}m ${secondsLeft}s`;

                }


                if (minutes > 0) {

                    return `${minutes}m ${secondsLeft}s`;

                }


                return `${secondsLeft}s`;

            }


            const number =
                Number(value ?? 0);

            if (!Number.isFinite(number)) {

                return "0";

            }

            return number.toLocaleString(
                undefined,
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

        }


        function stopMatchingTimer() {

            if (matchingTimer) {

                clearInterval(
                    matchingTimer
                );

                matchingTimer = null;

            }

        }


        // =====================================================
        // RESET UI
        // =====================================================

        function resetOrderUI() {

            stopMatchingTimer();

            currentOrder = null;


            if (orderStatus) {

                orderStatus.innerText =
                    "Ready";

                orderStatus.className =
                    "order-status idle";

            }


            if (orderMessage) {

                orderMessage.innerText =
                    "Start an order to begin.";

            }


            if (orderMatching) {

                orderMatching.classList.add(
                    "hidden"
                );

            }


            if (orderProduct) {

                orderProduct.classList.add(
                    "hidden"
                );

            }


            if (orderMatchingCountdown) {

                orderMatchingCountdown.innerText =
                    "-";

            }


            if (orderActionButton) {

                orderActionButton.disabled =
                    false;

                orderActionButton.innerText =
                    "Start Order";

            }


            setError("");

        }


        // =====================================================
        // LOAD SESSION
        // =====================================================

        async function loadSession() {

            try {

                const response =
                    await fetch(
                        `${API}/me`,
                        {
                            method: "GET",
                            credentials: "include"
                        }
                    );


                const data =
                    await response.json();


                if (
                    !data.success ||
                    !data.logged_in ||
                    !data.user
                ) {

                    currentUser =
                        null;

                    if (orderActionButton) {

                        orderActionButton.disabled =
                            true;

                        orderActionButton.innerText =
                            "Login Required";

                    }

                    if (orderMessage) {

                        orderMessage.innerText =
                            "Please login before starting an order.";

                    }

                    return;

                }


                currentUser =
                    data.user;


                updateUserData(
                    data.user
                );

            }
            catch (error) {

                console.error(
                    "Order session error:",
                    error
                );

                currentUser =
                    null;

                if (orderActionButton) {

                    orderActionButton.disabled =
                        true;

                    orderActionButton.innerText =
                        "Login Required";

                }

            }

        }


        // =====================================================
        // UPDATE USER DATA
        // =====================================================

        function updateUserData(
            user
        ) {

            if (!user) {

                return;

            }


            if (orderCoins) {

                orderCoins.innerText =
                    formatNumber(
                        user.coins
                    );

            }


            if (orderBalance) {

                orderBalance.innerText =
                    formatNumber(
                        user.balance
                    );

            }

        }


        // =====================================================
        // UPDATE ROUND
        // =====================================================

        function updateRound(
            round
        ) {

            if (!round) {

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


            if (orderRoundValue) {

                orderRoundValue.innerText =
                    `${completed}/${target}`;

            }


            if (orderProgressText) {

                orderProgressText.innerText =
                    `${completed} / ${target}`;

            }


            if (orderProgressBar) {

                let percent =
                    0;


                if (target > 0) {

                    percent =
                        (
                            completed /
                            target
                        ) *
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
        // SHOW MATCHING
        // =====================================================

        function showMatching(
            seconds
        ) {

            stopMatchingTimer();


            let remaining =
                Number(seconds || 0);


            if (orderMatching) {

                orderMatching.classList.remove(
                    "hidden"
                );

            }


            if (orderProduct) {

                orderProduct.classList.add(
                    "hidden"
                );

            }


            if (orderStatus) {

                orderStatus.innerText =
                    "Matching";

                orderStatus.className =
                    "order-status matching";

            }


            if (orderMessage) {

                orderMessage.innerText =
                    "Finding your order...";

            }


            if (orderActionButton) {

                orderActionButton.disabled =
                    true;

                orderActionButton.innerText =
                    "Matching...";

            }


            if (orderMatchingCountdown) {

                orderMatchingCountdown.innerText =
                    `${remaining}s`;

            }


            matchingTimer =
                setInterval(
                    () => {

                        remaining -= 1;


                        if (
                            orderMatchingCountdown
                        ) {

                            orderMatchingCountdown.innerText =
                                `${Math.max(
                                    remaining,
                                    0
                                )}s`;

                        }


                        if (
                            remaining <= 0
                        ) {

                            stopMatchingTimer();

                            showPendingOrder();

                        }

                    },
                    1000
                );

        }


        // =====================================================
        // SHOW PENDING
        // =====================================================

        function showPendingOrder() {

            if (orderMatching) {

                orderMatching.classList.add(
                    "hidden"
                );

            }


            if (orderStatus) {

                orderStatus.innerText =
                    "Order Ready";

                orderStatus.className =
                    "order-status pending";

            }


            if (orderMessage) {

                orderMessage.innerText =
                    "Your order is ready. Complete it to continue.";

            }


            if (orderActionButton) {

                orderActionButton.disabled =
                    false;

                orderActionButton.innerText =
                    "Complete Order";

            }


            if (orderProduct) {

                orderProduct.classList.remove(
                    "hidden"
                );

            }

        }


        // =====================================================
        // DISPLAY PRODUCT
        // =====================================================

        function displayProduct(
            product
        ) {

            if (!product) {

                return;

            }


            if (orderProductImage) {

                orderProductImage.src =
                    product.image_url || "";

                orderProductImage.alt =
                    product.name ||
                    "Order Product";

            }


            if (orderProductName) {

                orderProductName.innerText =
                    product.name || "";

            }


            if (orderProductDescription) {

                orderProductDescription.innerText =
                    product.description || "";

            }


            if (orderProductPrice) {

                orderProductPrice.innerText =
                    formatNumber(
                        product.price
                    );

            }


            if (orderProductProfit) {

                const profit =
                    Number(
                        product.profit || 0
                    );


                orderProductProfit.innerText =
                    `${formatNumber(
                        Number(
                            product.price || 0
                        ) * profit
                    )}`;

            }

        }


        // =====================================================
        // START ORDER
        // =====================================================

        async function startOrder() {

            setError("");


            if (!currentUser) {

                await loadSession();

            }


            if (!currentUser) {

                return;

            }


            if (orderActionButton) {

                orderActionButton.disabled =
                    true;

                orderActionButton.innerText =
                    "Starting...";

            }


            try {

                const response =
                    await fetch(
                        `${API}/order-start`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            credentials:
                                "include",

                            body:
                                JSON.stringify(
                                    {
                                        user_id:
                                            currentUser.id
                                    }
                                )
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "ORDER START:",
                    data
                );


                if (!data.success) {

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


                if (currentOrder) {

                    displayProduct(
                        currentOrder.product
                    );

                }


                if (currentUser) {

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
            catch (error) {

                console.error(
                    "Order start error:",
                    error
                );

                setError(
                    "Network error. Please try again."
                );


                if (orderActionButton) {

                    orderActionButton.disabled =
                        false;

                    orderActionButton.innerText =
                        "Start Order";

                }

            }

        }


        // =====================================================
        // START ERROR
        // =====================================================

        function handleStartError(
            data
        ) {

            const code =
                data.code || "";


            if (
                code ===
                "INSUFFICIENT_START_COINS"
            ) {

                setError(
                    `You need at least ${formatNumber(
                        data.required_coins
                    )} Coins to start an order.`
                );

            }
            else if (
                code ===
                "PENDING_ORDER"
            ) {

                setError(
                    "Please complete your current order first."
                );

            }
            else if (
                code ===
                "ROUND_COOLDOWN"
            ) {

                const remaining =
                    Number(
                        data.remaining_seconds || 0
                    );


                setError(
                    `Your Round is currently in cooldown. Remaining time: ${formatCooldownTime(
                        remaining
                    )}`
                );


            }      
            else {

                setError(
                    data.error ||
                    "Unable to start order."
                );

            }


            if (orderActionButton) {

                orderActionButton.disabled =
                    false;

                orderActionButton.innerText =
                    "Start Order";

            }

        }


        // =====================================================
        // COMPLETE ORDER
        // =====================================================

        async function completeOrder() {

            setError("");


            if (
                !currentUser ||
                !currentOrder
            ) {

                return;

            }


            if (orderActionButton) {

                orderActionButton.disabled =
                    true;

                orderActionButton.innerText =
                    "Completing...";

            }


            try {

                const response =
                    await fetch(
                        `${API}/order-complete`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            credentials:
                                "include",

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


                const data =
                    await response.json();


                console.log(
                    "ORDER COMPLETE:",
                    data
                );


                if (!data.success) {

                    handleCompleteError(
                        data
                    );

                    return;

                }


                stopMatchingTimer();


                currentOrder =
                    data.order;


                currentRound =
                    data.round;


                currentUser.coins =
                    data.coins.after_complete;


                updateUserData(
                    currentUser
                );


                updateRound(
                    data.round
                );


                if (orderStatus) {

                    orderStatus.innerText =
                        "Completed";

                    orderStatus.className =
                        "order-status completed";

                }


                if (orderMessage) {

                    orderMessage.innerText =
                        data.message ||
                        "Order completed successfully.";

                }


                if (orderActionButton) {

                    orderActionButton.disabled =
                        false;


                    if (
                        data.round &&
                        data.round.status ===
                            "cooldown"
                    ) {

                        orderActionButton.innerText =
                            "Round Cooldown";

                        orderActionButton.disabled =
                            true;

                    }
                    else {

                        orderActionButton.innerText =
                            "Start Next Order";

                    }

                }


            }
            catch (error) {

                console.error(
                    "Order complete error:",
                    error
                );

                setError(
                    "Network error. Please try again."
                );


                if (orderActionButton) {

                    orderActionButton.disabled =
                        false;

                    orderActionButton.innerText =
                        "Complete Order";

                }

            }

        }


        // =====================================================
        // COMPLETE ERROR
        // =====================================================

        function handleCompleteError(
            data
        ) {

            if (
                data.code ===
                "INSUFFICIENT_COINS"
            ) {

                setError(
                    data.error ||
                    "Please recharge your Coins before completing this order."
                );

            }
            else {

                setError(
                    data.error ||
                    "Unable to complete order."
                );

            }


            if (orderActionButton) {

                orderActionButton.disabled =
                    false;

                orderActionButton.innerText =
                    "Complete Order";

            }

        }


        // =====================================================
        // ACTION BUTTON
        // =====================================================

        if (orderActionButton) {

            orderActionButton.addEventListener(
                "click",
                () => {

                    if (
                        currentOrder &&
                        currentOrder.status ===
                            "pending"
                    ) {

                        completeOrder();

                    }
                    else {

                        startOrder();

                    }

                }
            );

        }


        // =====================================================
        // PAGE VISIBILITY
        // =====================================================

        if (orderPage) {

            const observer =
                new MutationObserver(
                    () => {

                        if (
                            !orderPage.classList.contains(
                                "hidden"
                            )
                        ) {

                            loadSession();

                        }

                    }
                );


            observer.observe(
                orderPage,
                {
                    attributes: true,
                    attributeFilter: [
                        "class"
                    ]
                }
            );

        }


        // =====================================================
        // START
        // =====================================================

        resetOrderUI();

        loadSession();


    }
);
