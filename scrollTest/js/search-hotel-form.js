    var link = document.querySelector(".btn-search-hotel");
    var popup = document.querySelector(".search-hotel-form");
        
    link.addEventListener("click", function (evt) {
        evt.preventDefault();
        popup.classList.toggle("search-hotel-form-none");
    });