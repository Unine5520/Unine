/* =====================================================
   U9 ORDER STATUS TEST
===================================================== */


const SUPABASE_FUNCTION_URL =
"https://layzcgktgtrqvsgxwwyc.supabase.co/functions/v1";





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


    const round =
    document.getElementById(
        "roundDisplay"
    );



    if(
        round &&
        data.round
    ){

        round.innerText =
        `${data.round.completed_orders}/${data.round.orders_per_round}`;

    }







    /*
        Order Status
    */


    const status =
    document.getElementById(
        "orderStatus"
    );



    if(status){


        if(data.order){


            status.innerText =
            data.order.status;


        }
        else{


            status.innerText =
            "Ready";


        }


    }






    /*
        Product

    */


    if(
        data.order &&
        data.order.products
    ){


        const product =
        data.order.products;



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
            product.price;

        }



        const profit =
        document.getElementById(
            "orderProfit"
        );


        if(profit){

            profit.innerText =
            product.profit;

        }



    }



}






document.addEventListener(
"DOMContentLoaded",
()=>{


    loadOrderStatus();


});
