/**
 * Created by chaika on 25.01.16.
 */

$(document).ready(function () {
    //This code will execute when the page is ready
    let PizzaMenu = require('./pizza/PizzaMenu');
    let PizzaCart = require('./pizza/PizzaCart');
    //var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

});