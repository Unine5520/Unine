/* =====================================================
   U9 ORDER PAGE
===================================================== */


const SUPABASE_FUNCTION_URL =
"https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";



let currentOrder = null;



function getToken(){

    return localStorage.getItem("token");

}



async function api(functionName, body={}){


    const token = getToken();


    const res = await fetch(
        `${SUPABASE_FUNCTION_URL}/${functionName}`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },

            body:JSON.stringify(body)
        }
    );


    return await res.json();

}





/* =====================================================
   ORDER UI INIT
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    loadOrderStatus();


    const startBtn =
    document.getElementById(
        "startOrderButton"
    );


    if(startBtn){

        startBtn.onclick =
        startOrder;

    }



    const completeBtn =
    document.getElementById(
        "completeOrderButton"
    );


    if(completeBtn){

        completeBtn.onclick =
        completeOrder;

    }


});





/* =====================================================
   GET ORDER STATUS
===================================================== */


async function loadOrderStatus(){


    try{


        const result =
        await api(
            "order-status"
        );


        if(!result.success){

            return;

        }



        renderOrder(
            result
        );



    }
    catch(e){

        console.log(e);

    }


}






/* =====================================================
   START ORDER
===================================================== */


async function startOrder(){


    const btn =
    document.getElementById(
        "startOrderButton"
    );


    if(btn){

        btn.disabled=true;

        btn.innerText =
        "Matching...";

    }



    const result =
    await api(
        "order-start"
    );



    if(!result.success){


        alert(
            result.message
        );


        if(btn){

            btn.disabled=false;

            btn.innerText =
            "Start Order";

        }


        return;

    }



    currentOrder =
    result.order;



    renderOrder({

        order:
        currentOrder

    });



    /*
        后端控制时间

        这里轮询 order-status

        不在前端计算
    */


    startMatchPolling();



}








/* =====================================================
   MATCHING CHECK
===================================================== */


let matchTimer=null;



function startMatchPolling(){


    if(matchTimer){

        clearInterval(
            matchTimer
        );

    }



    matchTimer =
    setInterval(
        async()=>{


            const result =
            await api(
                "order-status"
            );



            if(result.success){

                renderOrder(
                    result
                );


                if(
                    result.order &&
                    result.order.status !== "matching"
                ){

                    clearInterval(
                        matchTimer
                    );

                }

            }



        },
        3000
    );


}








/* =====================================================
   COMPLETE ORDER
===================================================== */


async function completeOrder(){


    if(!currentOrder){

        return;

    }



    const btn =
    document.getElementById(
        "completeOrderButton"
    );



    if(btn){

        btn.disabled=true;

    }



    const result =
    await api(
        "order-complete",
        {
            order_id:
            currentOrder.id
        }
    );



    if(!result.success){


        alert(
            result.message
        );


        if(btn){

            btn.disabled=false;

        }


        return;

    }



    alert(
        "Order completed"
    );


    loadOrderStatus();



}








/* =====================================================
   RENDER
===================================================== */


function renderOrder(data){


    const order =
    data.order;



    const user =
    data.user;



    const round =
    data.round;




    /*
        Coins
    */

    const coins =
    document.getElementById(
        "coinsDisplay"
    );


    if(coins && user){

        coins.innerText =
        Number(user.coins).toFixed(2);

    }




    /*
        Round

        completed_orders/orders_per_round

        例如:

        0/5

    */


    const roundDisplay =
    document.getElementById(
        "roundDisplay"
    );


    if(roundDisplay && round){

        roundDisplay.innerText =
        `${round.completed_orders}/${round.orders_per_round}`;

    }






    /*
        没有订单

        显示 Ready

    */


    if(!order){


        currentOrder=null;


        const status =
        document.getElementById(
            "orderStatus"
        );


        if(status){

            status.innerText =
            "Ready";

        }


        return;

    }






    currentOrder =
    order;





    /*
        Status
    */


    const status =
    document.getElementById(
        "orderStatus"
    );


    if(status){

        status.innerText =
        order.status;

    }






    /*
        Product price

    */


    const price =
    document.getElementById(
        "orderPrice"
    );


    if(price){

        price.innerText =
        order.total_price;

    }





    /*
        Profit

    */


    const profit =
    document.getElementById(
        "orderProfit"
    );


    if(profit){

        profit.innerText =
        order.profit;

    }






    /*
        Complete

    */


    const completeBtn =
    document.getElementById(
        "completeOrderButton"
    );



    if(completeBtn){


        completeBtn.disabled =
        order.status !== "pending";


    }






    /*
        Start

    */


    const startBtn =
    document.getElementById(
        "startOrderButton"
    );


    if(startBtn){


        startBtn.disabled =
        (
            order.status==="matching" ||
            order.status==="pending"
        );


        if(order.status==="matching"){

            startBtn.innerText =
            "Matching...";

        }
        else{

            startBtn.innerText =
            "Start Order";

        }

    }



}


/* =====================================================
   EXCHANGE BALANCE -> COINS
===================================================== */


async function exchangeBalanceCoins(amount){


    const result =
    await api(
        "exchange-balance-coins",
        {
            amount
        }
    );



    if(!result.success){

        alert(
            result.message
        );

        return;

    }



    loadOrderStatus();


}







/* =====================================================
   EXCHANGE COINS -> BALANCE
===================================================== */


async function exchangeCoinsBalance(amount){


    const result =
    await api(
        "exchange-coins-balance",
        {
            amount
        }
    );



    if(!result.success){

        alert(
            result.message
        );

        return;

    }



    loadOrderStatus();


}
