/* =====================================================
   U9 ORDER
   Cookie Session Version
===================================================== */


const SUPABASE_FUNCTION_URL =
"https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";



const ORDER_STATUS_URL =
`${SUPABASE_FUNCTION_URL}/order-status`;


const ORDER_START_URL =
`${SUPABASE_FUNCTION_URL}/order-start`;


const ORDER_MATCH_URL =
`${SUPABASE_FUNCTION_URL}/order-match`;





let matchingTimer = null;








/* =====================================================
   LOAD ORDER STATUS
===================================================== */


async function loadOrderStatus(){


    try{


        const res =
        await fetch(
            ORDER_STATUS_URL,
            {

                method:"POST",

                credentials:"include",

                headers:{

                    "Content-Type":
                    "application/json"

                }

            }
        );



        const data =
        await res.json();



        console.log(
            "ORDER STATUS:",
            data
        );



        if(!data.success){


            console.log(
                data.message
            );


            return;


        }



        renderOrderStatus(
            data
        );



        /*
            如果当前订单还在 matching
            自动恢复倒计时
        */


        const order =
        data.order ||
        data.activeOrder;



        if(
            order &&
            order.status==="matching"
        ){

            startMatchingTimer(
                order
            );

        }



    }
    catch(error){


        console.log(
            "ORDER STATUS ERROR:",
            error
        );


    }


}









/* =====================================================
   START ORDER
===================================================== */


async function startOrder(){


    try{


        const res =
        await fetch(
            ORDER_START_URL,
            {

                method:"POST",

                credentials:"include",

                headers:{

                    "Content-Type":
                    "application/json"

                }

            }
        );



        const data =
        await res.json();



        console.log(
            "ORDER START:",
            data
        );



        if(!data.success){


            alert(
                data.message
            );


            return;


        }





        if(data.order){


            startMatchingTimer(
                data.order
            );


        }



        await loadOrderStatus();



    }
    catch(error){


        console.log(
            "ORDER START ERROR:",
            error
        );


    }


}









/* =====================================================
   MATCH ORDER
===================================================== */


async function matchOrder(orderId){


    try{


        const res =
        await fetch(
            ORDER_MATCH_URL,
            {

                method:"POST",

                credentials:"include",

                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:

                JSON.stringify({

                    order_id:
                    orderId

                })

            }
        );



        const data =
        await res.json();



        console.log(
            "ORDER MATCH:",
            data
        );



        if(!data.success){


            console.log(
                data.message
            );


            return;


        }



        await loadOrderStatus();



    }
    catch(error){


        console.log(
            "ORDER MATCH ERROR:",
            error
        );


    }


}









/* =====================================================
   MATCH TIMER
===================================================== */


function startMatchingTimer(order){


    if(
        !order ||
        !order.matching_end_at
    ){

        return;

    }



    if(
        matchingTimer
    ){

        clearInterval(
            matchingTimer
        );

    }




    matchingTimer =
    setInterval(()=>{


        const now =
        new Date();



        const end =
        new Date(
            order.matching_end_at
        );



        const diff =
        end - now;




        console.log(

            "MATCH COUNTDOWN:",

            Math.max(
                0,
                Math.ceil(
                    diff/1000
                )
            )

        );





        if(diff <=0){



            clearInterval(
                matchingTimer
            );



            matchingTimer =
            null;



            matchOrder(
                order.id
            );



        }



    },1000);


}









/* =====================================================
   RENDER ORDER STATUS
===================================================== */


function renderOrderStatus(data){



    /*
        Coins
    */


    const coins =
    document.getElementById(
        "coinsDisplay"
    );



    if(
        coins &&
        data.user
    ){


        coins.innerText =
        Number(
            data.user.coins
        )
        .toFixed(2);


    }








    /*
        Round
    */


    const roundDisplay =
    document.getElementById(
        "roundDisplay"
    );



    if(
        roundDisplay &&
        data.round
    ){


        roundDisplay.innerText =

        `${data.round.completed_orders}/${data.round.orders_per_round}`;


    }








    /*
        Order
    */


    const order =
    data.order ||
    data.activeOrder;





    const status =
    document.getElementById(
        "orderStatus"
    );



    if(status){


        if(order){


            status.innerText =
            order.status;


        }
        else{


            status.innerText =
            "Ready";


        }


    }









    /*
        Product
    */


    const productBox =
    document.getElementById(
        "productBox"
    );



    if(
        order &&
        order.products
    ){


        const product =
        order.products;



        if(productBox){

            productBox.classList.remove(
                "hidden"
            );

        }



        const name =
        document.getElementById(
            "productName"
        );



        if(name){

            name.innerText =
            product.name;

        }





        const price =
        document.getElementById(
            "orderPrice"
        );



        if(price){

            price.innerText =
            Number(
                product.price
            )
            .toFixed(2);

        }






        const profit =
        document.getElementById(
            "orderProfit"
        );



        if(profit){

            profit.innerText =
            Number(
                product.profit
            )
            .toFixed(2);

        }



    }
    else{


        if(productBox){

            productBox.classList.add(
                "hidden"
            );

        }


    }









    /*
        Buttons
    */


    const startButton =
    document.getElementById(
        "startOrderButton"
    );



    const completeButton =
    document.getElementById(
        "completeOrderButton"
    );





    if(startButton){


        startButton.disabled =
        !!order;


    }





    if(completeButton){


        completeButton.disabled =
        !order ||
        order.status !== "pending";


    }



}









/* =====================================================
   INIT
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


    loadOrderStatus();



    const startButton =
    document.getElementById(
        "startOrderButton"
    );



    if(startButton){


        startButton.addEventListener(
            "click",
            startOrder
        );


    }



});
