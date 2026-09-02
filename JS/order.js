window.currentUserId = localStorage.getItem("currentUserId");
window.currentUserUUID = localStorage.getItem("currentUserUUID");

const ORDER_API =
"https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";


let ordering = false;
let completing = false;
let matchingTimer = null;


let currentOrder = null;



/*
========================
 API
========================
*/


async function callFunction(name, body = {}){


    const token =
    localStorage.getItem("access_token");


    const res = await fetch(
        `${ORDER_API}/${name}`,
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json",

                "Authorization":
                `Bearer ${token}`
            },

            body:
            JSON.stringify(body)

        }
    );


    return await res.json();

}




/*
========================
 INIT
========================
*/


document.addEventListener(
"DOMContentLoaded",
()=>{

    bindOrderEvents();

    refreshOrder();

});




function bindOrderEvents(){


    document
    .getElementById("autoOrderBtn")
    ?.addEventListener(
        "click",
        startOrder
    );


    document
    .getElementById("completeOrderBtn")
    ?.addEventListener(
        "click",
        completeOrder
    );


    document
    .getElementById("confirmExchange")
    ?.addEventListener(
        "click",
        exchange
    );


}






/*
========================
 LOAD STATUS
========================
*/


async function refreshOrder(){


    if(!window.currentUserId)
    return;



    const result =
    await callFunction(
        "order-status"
    );


    if(!result.success){

        console.log(result.message);
        return;

    }



    renderUser(
        result.user
    );


    renderRound(
        result.round
    );


    renderOrder(
        result.activeOrder
    );


}






/*
========================
 USER UI
========================
*/


function renderUser(user){


    const coins =
    document.getElementById(
        "ordercoins"
    );


    if(coins)
    coins.textContent =
    Number(user.coins)
    .toFixed(2);



    const balance =
    document.getElementById(
        "balance"
    );


    if(balance)
    balance.textContent =
    Number(user.balance)
    .toFixed(2);



}





function renderRound(round){


    const el =
    document.getElementById(
        "roundProgress"
    );


    if(!el || !round)
    return;



    el.textContent =
    `Round: ${round.completed_orders}/${round.orders_per_round}`;



}





/*
========================
 ORDER DISPLAY
========================
*/


function renderOrder(order){


    currentOrder = order;



    const box =
    document.getElementById(
        "orderResult"
    );


    if(!box)
    return;



    if(!order){

        box.innerHTML="";

        return;

    }





    if(order.status==="matching"){


        box.innerHTML=
        `

        <div class="matching-box">

        <h3>
        Matching order...
        </h3>


        <div id="matchingTimer">
        Loading...
        </div>


        </div>

        `;



        startMatchingTimer(
            order.matching_end_at
        );


        disableStart(true);



        return;

    }





    if(order.status==="pending"){


        const p =
        order.products;



        let canComplete =
        Number(order.coins_after)>=0;



        box.innerHTML=
        `

        <div class="order-card">


        ${
        p?.url
        ?
        `<img src="${p.url}">`
        :
        ""
        }


        <h3>
        ${p?.name || ""}
        </h3>


        <p>
        Price:
        $${Number(order.total_price).toFixed(2)}
        </p>


        <p>
        Profit:
        ${order.profit_rate}%
        </p>


        <p>
        Income:
        +$${Number(order.profit).toFixed(2)}
        </p>


        <button
        id="completeOrderBtn"
        ${canComplete?"":"disabled"}
        >

        Complete Order

        </button>


        ${
        canComplete
        ?
        ""
        :
        `
        <p style="color:red">
        Coins insufficient,
        please recharge
        </p>
        `
        }


        </div>


        `;


        document
        .getElementById(
            "completeOrderBtn"
        )
        ?.addEventListener(
            "click",
            completeOrder
        );


        disableStart(true);


        return;

    }




}





/*
========================
 START ORDER
========================
*/


async function startOrder(){


    if(ordering)
    return;


    ordering=true;


    disableStart(true);



    try{


        const result =
        await callFunction(
            "order-start"
        );



        if(!result.success){

            alert(result.message);

            disableStart(false);

            return;

        }



        renderOrder(
            result.order
        );



    }
    catch(e){

        alert(e.message);

    }
    finally{

        ordering=false;

    }


}






/*
========================
 MATCH TIMER
========================
*/


function startMatchingTimer(endTime){


    if(matchingTimer)
    clearInterval(matchingTimer);



    const el =
    document.getElementById(
        "matchingTimer"
    );



    function tick(){


        const remain =
        Math.ceil(
        (
        new Date(endTime)
        -
        new Date()
        )
        /1000
        );



        if(remain<=0){


            clearInterval(
                matchingTimer
            );


            matchOrder();


            return;

        }



        if(el)
        el.textContent =
        `${remain}s`;



    }



    tick();


    matchingTimer =
    setInterval(
        tick,
        1000
    );


}





async function matchOrder(){


    const result =
    await callFunction(
        "order-match"
    );


    if(result.success){

        refreshOrder();

    }
    else{

        alert(result.message);

    }


}





/*
========================
 COMPLETE
========================
*/


async function completeOrder(){


    if(completing)
    return;



    completing=true;



    try{


        const result =
        await callFunction(
            "order-complete",
            {
                order_id:
                currentOrder.id
            }
        );



        if(!result.success){

            alert(result.message);
            return;

        }



        refreshOrder();



    }
    finally{

        completing=false;

    }


}






/*
========================
 EXCHANGE
========================
*/


async function exchange(){


    const amount =
    Number(
    document.getElementById(
        "addCoinsInput"
    )?.value
    );



    const direction =
    window.exchangeDirection
    ||
    "toCoins";



    let api =
    direction==="toCoins"
    ?
    "exchange-balance-coins"
    :
    "exchange-coins-balance";




    const result =
    await callFunction(
        api,
        {
            amount
        }
    );



    if(!result.success){

        alert(result.message);

        return;

    }



    refreshOrder();


}






function disableStart(disabled){


    const btn =
    document.getElementById(
        "autoOrderBtn"
    );


    if(btn){

        btn.disabled =
        disabled;

    }


}
