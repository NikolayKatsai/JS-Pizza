/**
 * Created by chaika on 02.02.16.
 */
const Storage = localStorage;
const Templates = require('../Templates');
const API = require('../API.js');

//Перелік розмірів піци
const PizzaSize = {
    Big: "Велика",
    Small: "Мала"
};

//Змінна в якій зберігаються перелік піц в кошику
const Cart = [];
const $totalPrise = $(".right-panel").find("#total_prise");
const $ordersCount = $(".right-panel").find(".orders-counter");


//HTML едемент куди будуть додаватися піци
const $cart = $("#cart");

function findOrder(order) {
    for (let i = 0; i < Cart.length; i++) {
        if (Cart[i].size === order.size && Cart[i].pizza.title === order.pizza.title)
            return i;
    }
    return -1;
}

function addToCart(pizza, size) {

    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    let newPizza = {
        pizza: pizza,
        size: size,
        quantity: 1
    };
    let newOrder = findOrder(newPizza);
    if (newOrder >= 0)
        Cart[newOrder].quantity++;
    else
        Cart.push(newPizza);

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(order) {
    //Видалити піцу з кошика
    let newOrder = findOrder(order);
    Cart.splice(newOrder, 1);


    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Зчитати вміст корзини який збережено в Local Storage то показати його

    const arr = JSON.parse(Storage.getItem("cart"));
    for (let kee in arr) {
        Cart.push(arr[kee]);
    }
    updateCart();
    $(".right-panel .clear-order").click(function () {
        Cart.splice(0);
        updateCart();
    });
    $(document).on("click", "span, button", function () {
        if ($(".orders-counter").text() == "0") {
            $("#order-btn").attr({
                "disabled": "true"
            });
        } else
            $("#order-btn").removeAttr("disabled");
    });
    if ($(".orders-counter").text() == "0") {
        $("#order-btn").attr({
            "disabled": "true"
        });
    }
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Зберегти вміт кошика в Local Storage
    Storage.setItem("cart", JSON.stringify(Cart));

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        let html_code = Templates.PizzaCart_OneItem(cart_item);

        let $node = $(html_code);
        $node.find(".reduce-btn").click(function () {
            if (cart_item.quantity <= 1) {
                return removeFromCart(cart_item);
            }
            cart_item.quantity -= 1;

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".add-btn").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".refuse-btn").click(function () {
            removeFromCart(cart_item);
        });
        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    // $ordersCount.html("");
    $ordersCount.html(Cart.length);
    $totalPrise.html(function () {
        let result = 0;

        for (let i = 0; i < Cart.length; i++) {
            if (Cart[i].size === PizzaSize.Big)
                result += Cart[i].pizza.big_size.price * Cart[i].quantity;
            else
                result += Cart[i].pizza.small_size.price * Cart[i].quantity;
        }
        return result;
    });

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;