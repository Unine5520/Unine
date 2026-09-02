/* =====================================================
   U9 ORDER STATUS
   Cookie Session Version
===================================================== */


const SUPABASE_FUNCTION_URL =
"https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";





/* =====================================================
   LOAD ORDER STATUS
===================================================== */


async function loadOrderStatus(){


    try{


        const res =
        await fetch(
            `${SUPABASE_FUNCTION_URL}/order-status`,
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



    }
    catch(error){


        console.log(
            "ORDER STATUS ERROR:",
            error
        );


    }


}








/* =====================================================
   RENDER
===================================================== */


function renderOrderStatus(data){



    /*
        ======================
        Coins
        ======================
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
        ======================
        Round
        ======================
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
        ======================
        Order
        ======================
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
        ======================
        Product
        ======================
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
        ======================
        Buttons
        ======================
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


});
