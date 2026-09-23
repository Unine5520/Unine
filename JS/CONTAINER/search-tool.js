
/* =========================
   SEARCH
========================= */

const searchInput =
  document.getElementById(
    "U9-page-container-search-input"
  );


const searchButton =
  document.getElementById(
    "U9-page-container-search-button"
  );


/* =========================
   CHECK SEARCH INPUT
========================= */

function updateSearchButton() {

  if (
    searchInput.value.trim() === ""
  ) {

    searchButton.style.backgroundColor =
      "#abacb2";

    return;

  }


  searchButton.style.backgroundColor =
    "#30bff1";

}


/* =========================
   INPUT
========================= */

searchInput.addEventListener(
  "input",
  updateSearchButton
);


/* =========================
   SEARCH BUTTON
========================= */

searchButton.addEventListener(
  "click",
  function () {

    const keyword =
      searchInput.value.trim();


    /* Empty */

    if (keyword === "") {

      return;

    }


    /* Search */

    console.log(
      "Search:",
      keyword
    );

  }
);


/* =========================
   INITIAL STATE
========================= */

updateSearchButton();
