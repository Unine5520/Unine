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

        let cooldownTimer = null;

        let cooldownUntil = null;


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



        function formatCooldownTime(
            seconds
        ) {

            let time =
                Math.max(
                    0,
                    Math.floor(
                        Number(seconds || 0)
                    )
                );


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

                return (
                    `${hours}h ` +
                    `${minutes}m ` +
                    `${secondsLeft}s`
                );

            }


            if (minutes > 0) {

                return (
                    `${minutes}m ` +
                    `${secondsLeft}s`
                );

            }


            return `${secondsLeft}s`;

        }



        function stopMatchingTimer() {

            if (matchingTimer) {

                clearInterval(
                    matchingTimer
                );

                matchingTimer = null;

            }

        }



        function stopCooldownTimer() {

            if (cooldownTimer) {

                clearInterval(
                    cooldownTimer
                );

                cooldownTimer = null;

            }

            cooldownUntil = null;

        }


        // =====================================================
        // RESET UI
        // =====================================================

        function resetOrderUI() {

            stopMatchingTimer();

            stopCooldownTimer();

            currentOrder = null;

            currentRound = null;


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


                console.log(
                    "ORDER SESSION:",
                    data
                );


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


                /*
                 * Do not automatically clear the current
                 * order state here.
                 *
                 * The current order is handled by the
                 * page's order state.
                 */

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


                if (orderMessage) {

                    orderMessage.innerText =
                        "Unable to load your session.";

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
        // SHOW COOLDOWN
        // =====================================================

        function showCooldown(
            seconds,
            roundData = null
        ) {

            stopCooldownTimer();


            let remaining =
                Math.max(
                    0,
                    Math.floor(
                        Number(seconds || 0)
                    )
                );


            if (roundData) {

                updateRound(
                    roundData
                );

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


            if (orderStatus) {

                orderStatus.innerText =
                    "Cooldown";

                orderStatus.className =
                    "order-status idle";

            }


            if (orderActionButton) {

                orderActionButton.disabled =
                    true;

                orderActionButton.innerText =
                    "Round Cooldown";

            }


            function updateCooldownDisplay() {

                const timeText =
                    formatCooldownTime(
                        remaining
                    );


                if (orderMessage) {

                    orderMessage.innerText =
                        "Your Round is currently in cooldown.";

                }


                if (orderError) {

                    orderError.innerText =
                        `Remaining time: ${timeText}`;

                }

            }


            updateCooldownDisplay();


            if (remaining <= 0) {

                finishCooldown();

                return;

            }


            cooldownTimer =
                setInterval(
                    () => {

                        remaining -= 1;


                        if (
                            remaining <= 0
                        ) {

                            finishCooldown();

                            return;

                        }


                        updateCooldownDisplay();

                    },
                    1000
                );

        }


        // =====================================================
        // FINISH COOLDOWN
        // =====================================================

        function finishCooldown() {

            stopCooldownTimer();


            if (orderStatus) {

                orderStatus.innerText =
                    "Ready";

                orderStatus.className =
                    "order-status idle";

            }


            if (orderMessage) {

                orderMessage.innerText =
                    "Cooldown finished. You can start a new Round.";

            }


            if (orderError) {

                orderError.innerText =
                    "";

            }


            if (orderActionButton) {

                orderActionButton.disabled =
                    false;

                orderActionButton.innerText =
                    "Start Order";

            }

        }


        // =====================================================
        // SHOW MATCHING
        // =====================================================

        function showMatching(
            seconds
        ) {

            stopMatchingTimer();

            stopCooldownTimer();


            let remaining =
                Math.max(
                    0,
                    Math.floor(
                        Number(seconds || 0)
                    )
                );


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


            if (orderError) {

                orderError.innerText =
                    "";

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
        // SHOW PENDING ORDER
        // =====================================================

        function showPendingOrder() {

            stopCooldownTimer();


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


            if (orderError) {

                orderError.innerText =
                    "";

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


                const price =
                    Number(
                        product.price || 0
                    );


                orderProductProfit.innerText =
                    formatNumber(
                        price * profit
                    );

            }

        }


        // =====================================================
        // START ORDER
        // =====================================================

        async function startOrder() {

            setError("");


            stopCooldownTimer();


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


            // -------------------------------------------------
            // INSUFFICIENT START COINS
            // -------------------------------------------------

            if (
                code ===
                "INSUFFICIENT_START_COINS"
            ) {

                setError(
                    `You need at least ${formatNumber(
                        data.required_coins
                    )} Coins to start an order.`
                );


                if (orderStatus) {

                    orderStatus.innerText =
                        "Ready";

                    orderStatus.className =
                        "order-status idle";

                }

            }


            // -------------------------------------------------
            // PENDING ORDER
            // -------------------------------------------------

            else if (
                code ===
                "PENDING_ORDER"
            ) {

                setError(
                    "Please complete your current order first."
                );


                if (orderStatus) {

                    orderStatus.innerText =
                        "Order Pending";

                    orderStatus.className =
                        "order-status pending";

                }

            }


            // -------------------------------------------------
            // ROUND COOLDOWN
            // -------------------------------------------------

            else if (
                code ===
                "ROUND_COOLDOWN"
            ) {

                showCooldown(
                    data.remaining_seconds,
                    {
                        id:
                            data.round_id,

                        round_number:
                            data.round_number,

                        target_orders:
                            data.target_orders,

                        completed_orders:
                            data.completed_orders,

                        status:
                            "cooldown",

                        cooldown_until:
                            data.cooldown_until
                    }
                );


                return;

            }


            // -------------------------------------------------
            // ROUND COMPLETED
            // -------------------------------------------------

            else if (
                code ===
                "ROUND_COMPLETED"
            ) {

                updateRound(
                    {
                        round_number:
                            data.round_number,

                        target_orders:
                            data.target_orders,

                        completed_orders:
                            data.completed_orders
                    }
                );


                setError(
                    data.error ||
                    "This Round has already been completed."
                );

            }


            // -------------------------------------------------
            // NO PRODUCTS
            // -------------------------------------------------

            else if (
                code ===
                "NO_AVAILABLE_PRODUCTS"
            ) {

                setError(
                    data.error ||
                    "No available order products."
                );

            }


            // -------------------------------------------------
            // DEFAULT
            // -------------------------------------------------

            else {

                setError(
                    data.error ||
                    "Unable to start order."
                );

            }


            // =================================================
            // RESTORE BUTTON
            // =================================================

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


            stopMatchingTimer();

            stopCooldownTimer();


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


                currentOrder =
                    data.order;


                currentRound =
                    data.round;


                if (currentUser) {

                    currentUser.coins =
                        data.coins.after_complete;

                    updateUserData(
                        currentUser
                    );

                }


                updateRound(
                    data.round
                );


                if (orderProduct) {

                    orderProduct.classList.add(
                        "hidden"
                    );

                }


                if (orderMatching) {

                    orderMatching.classList.add(
                        "hidden"
                    );

                }


                if (orderStatus) {

                    orderStatus.innerText =
                        "Completed";

                    orderStatus.className =
                        "order-status completed";

                }


                if (orderError) {

                    orderError.innerText =
                        "";

                }


                if (data.round?.status === "cooldown") {

                    showCooldown(
                        0,
                        data.round
                    );


                    /*
                     * order-complete already returns
                     * cooldown_until.
                     *
                     * Calculate real remaining time.
                     */

                    if (
                        data.round.cooldown_until
                    ) {

                        const until =
                            new Date(
                                data.round.cooldown_until
                            ).getTime();


                        const remaining =
                            Math.max(
                                0,
                                Math.ceil(
                                    (
                                        until -
                                        Date.now()
                                    ) / 1000
                                )
                            );


                        showCooldown(
                            remaining,
                            data.round
                        );

                    }

                }
                else {

                    if (orderMessage) {

                        orderMessage.innerText =
                            data.message ||
                            "Order completed successfully.";

                    }


                    if (orderActionButton) {

                        orderActionButton.disabled =
                            false;

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

            const code =
                data.code || "";


            if (
                code ===
                "INSUFFICIENT_COINS"
            ) {

                setError(
                    data.error ||
                    "Insufficient Coins. Please recharge before completing this order."
                );

            }
            else if (
                code ===
                "ORDER_ALREADY_COMPLETED"
            ) {

                setError(
                    data.error ||
                    "This order has already been completed."
                );

            }
            else if (
                code ===
                "ORDER_NOT_PENDING"
            ) {

                setError(
                    data.error ||
                    "This order cannot be completed."
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


                    if (cooldownTimer) {

                        return;

                    }


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
