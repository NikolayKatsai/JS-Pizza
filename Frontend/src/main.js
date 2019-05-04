/**
 * Created by chaika on 25.01.16.
 */

$(document).ready(function () {
    //This code will execute when the page is ready
    const PizzaMenu = require('./pizza/PizzaMenu');
    const PizzaCart = require('./pizza/PizzaCart');
    const OrderData = require('./pizza/OrderData');
    //var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    if ($("title").text() === "Вибір Піци - Pizza")
        PizzaMenu.initialiseMenu();
    if ($("title").text() === "Замовлення Піци - Pizza") {
        OrderData.initialiseMaps();
        OrderData.checkData();
    }
});