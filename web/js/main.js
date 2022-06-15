
const search_input = document.querySelector(".header-search__search-input");
const search = document.querySelector(".header-search");
const burger = document.querySelector(".header-menu-burger");
const header_function_menu = document.querySelector(".header-content__function-menu");
const main_menu_remove = document.querySelector(".main-menu-remove");
const key = '5ba78f463e9dddeead6f1f0cf154d3ca';

function display_weather(place) {

    if (!place) {
        return;
    }

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + place + ",&appid=" + key + "&lang=ru&cnt=8")  
    .then(function(resp) { return resp.json() })
    .then(function(data) {

        error_index = 0;

        if (data.cod == 404) {
            console.log("town not found");
            return;
        } else if (data.cod != 200) {
            return;
        }
    })
    .catch(function() {
        if (!error_index) {
            return;
        }
        console.log("town not found");
    }); 
}

function document_events() {

    window.addEventListener("keydown", function(event) {
        if (event.keyCode == 27) {
            console.log("1");
        }
    });

    search_input.addEventListener("focus", function() {
        search.classList.add("header-search--active");
    });

    search_input.addEventListener("blur", function() {
        search.classList.remove("header-search--active");
    });

    search_input.addEventListener("keydown", function(event) {
        if (event.keyCode == 27) {
            search_input.blur();
        }
    });

    window.addEventListener("keydown", function(event) {
        if (event.keyCode == 111) {
            setTimeout(() => {
                search_input.focus();
            }, 10);
        }
    });

    burger.addEventListener("click", function() {
        if (window.innerWidth <= 768 && !burger.classList.contains("active")) {
            setTimeout(function() {
                document.body.style = "overflow: hidden; height: 100vh;";
            }, 200);
        } else if (burger.classList.contains("active")) {
            setTimeout(function() {
                document.body.style = "";
            }, 200);
        }

        if (burger.classList.contains("active")) {
            disactive_menu();
        } else {
            burger.classList.add("active");
            header_function_menu.classList.add("menu-active");
            main_menu_remove.classList.remove("disactive");
        }
    });
    main_menu_remove.addEventListener("click", function() {
        disactive_menu();
    });
}

function disactive_menu() {
    burger.classList.remove("active");
    header_function_menu.classList.remove("menu-active");
    main_menu_remove.classList.add("disactive");
}


document_events();