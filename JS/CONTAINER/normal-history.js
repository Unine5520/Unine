document.addEventListener(
  "DOMContentLoaded",
  () => {


    const button =
      document.getElementById(
        "U9-page-container-tool-inbox"
      );


    const modal =
      document.getElementById(
        "U9-inbox-normal-modal"
      );


    const close =
      document.getElementById(
        "U9-inbox-normal-modal-close"
      );



    if(
      !button ||
      !modal ||
      !close
    ) return;



    function openModal(){

      modal.style.display =
        "flex";

    }



    function closeModal(){

      modal.style.display =
        "none";

    }



    button.addEventListener(
      "click",
      openModal
    );



    close.addEventListener(
      "click",
      closeModal
    );



    modal.addEventListener(
      "click",
      (e)=>{


        if(
          e.target === modal
        ){

          closeModal();

        }


      }
    );



    document.addEventListener(
      "keydown",
      (e)=>{


        if(
          e.key === "Escape"
        ){

          closeModal();

        }


      }
    );


  }
);
