/**
 * Created by chaika on 02.02.16.
 */
const Templates = require('../Templates');
const PizzaCart = require('./PizzaCart');
const Pizza_List = require('../Pizza_List');

const PizzaTypes = {
    "all": "усі",
    "meat": "м'ясні",
    "pineapple": "з ананасами",
    "mushroom": "з грибами",
    "ocean": "з морепродуктами",
    "vega": "вега"
};

function showFilters() {
    let filterBlock = $("<div></div>").attr({
        "class": "filter-block"
    });
    let header = $("<div></div>").attr({
        "class": "header"
    });
    let headTitle = $("<span>Усі піци</span>").attr({
        "class": "head-title"
    });
    let filterCounter = $("<span>" + Pizza_List.length + "</span>").attr({
        "class": "filters-counter"
    });
    header.append(headTitle, filterCounter);

    function createOneFilter(filterName, filterValue) {
        let item = $("<span>" + filterName + "</span>").attr({
            "class": "one-filter-item"
        });
        item.click(function () {
            filterPizza(filterValue);
            $(".filters-inline-wrapper .current-filter").removeClass("current-filter");
            $(this).addClass("current-filter");
            if (filterName.charAt(0) === "з")
                $(".filter-block .head-title").text("Піци " + filterName);
            else
                $(".filter-block .head-title").text(filterName + " піци");
        });
        return item;
    }

    let filtersList = $("<div></div>").attr({
        "class": "filters-list"
    });
    let filtersInlineWrapper = $("<div></div>").attr({
        "class": "filters-inline-wrapper"
    });
    for (let kee in PizzaTypes) {
        filtersInlineWrapper.append(createOneFilter(PizzaTypes[kee], kee));
    }
    filtersList.append(filtersInlineWrapper);
    filterBlock.append(header, filtersList);
    $(".main-content").prepend(filterBlock);
    $(".filters-inline-wrapper :first-child").addClass("current-filter");
}

//HTML едемент куди будуть додаватися піци
const $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        let html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        let $node = $(html_code);

        $node.find(".buy-big").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    if (filter === "all") {
        showPizzaList(Pizza_List);
        $(".filters-counter").text(Pizza_List.length);
        return;
    }
    //Масив куди потраплять піци які треба показати
    let pizza_shown = [];
    if (filter === "vega")
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру
            if (pizza.type === "Вега піца")
                pizza_shown.push(pizza);

        });
    else
        Pizza_List.forEach(function (pizza) {
            //Якщо піка відповідає фільтру
            if (filter in pizza.content)
                pizza_shown.push(pizza);

        });
    $(".filters-counter").text(pizza_shown.length);
    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    showFilters();
    showPizzaList(Pizza_List);
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;