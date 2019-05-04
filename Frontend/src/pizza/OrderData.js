const API = require('../API.js');
const PizzaCart = require('./PizzaCart');
let map = window.map;

function initialize() {
    var point = new google.maps.LatLng(50.464379, 30.519131);
    var marker = new google.maps.Marker({
        position: point,
//map	- це змінна карти створена за допомогою new google.maps.Map(...)
        map: map,
        icon: "assets/images/map-icon.png"
    });

    google.maps.event.addListener(map,
        'click', function (me) {
            let coordinates = me.latLng;
            console.log(coordinates);
            calculateRoute({lat: 50.464379, lng: 30.519131}, coordinates, function (err, time) {
                if (!err) {
//Дізналися час
                    $(".order-summery-time-val").text(time.duration.text);
                } else {
                    console.log("Немає маршруту")
                }
            });
            geocodeLatLng(coordinates, function (err, adress) {
                if (!err) {
//Дізналися адресу
                    $(".order-summery-adress-val").text(adress);
                    $("#inputAddress").val(adress);
                } else {
                    console.log("Немає адреси")
                }
            })
        });
}

function geocodeLatLng(latlng, callback) {
//Модуль за роботу з адресою
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latlng}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK && results[1]) {
            let address = results[1].formatted_address;
            callback(null, address);
        } else {
            callback(new Error("Can't find adress"));
        }
    });
}

var directionsDisplay;

function calculateRoute(A_latlng, B_latlng, callback) {
    if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
    }
    directionsDisplay = new google.maps.DirectionsRenderer();
    var directionService = new google.maps.DirectionsService();
    directionService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: google.maps.TravelMode["DRIVING"]
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var leg = response.routes[0].legs[0];
            callback(null, {
                duration: leg.duration
            });
        } else {
            callback(new Error("Can'	not	find	direction"));
        }
    });
    directionsDisplay.setMap(map);
}

exports.initialiseMaps = initialize;
exports.checkData = function () {
    let validNum = false,
        validName = false,
        validAddress = false;
    let numberPattern = /^(\+380|0)\d{9}$/;
    $('#inputPhone').on('keyup', (function () {
        if (numberPattern.test($(this).val())) {
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            validNum = true;
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            validNum = false;
        }
    }));
    let namePatter = /[a-zA-Zа-яіїєґА-ЯІЇЄҐ]/;
    $('#inputName').on('keyup', function () {
        if (namePatter.test($(this).val())) {
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            validName = true;
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            validName = false;
        }
    });
    let addressPatter = /[a-zA-Zа-яіїєґА-ЯІЇЄҐ]/;
    $('#inputAddress').on('keyup', function () {
        if (addressPatter.test($(this).val())) {
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            validAddress = true;
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            validAddress = false;
        }
    });
    $('#inputAddress').on('click', function () {
        if (addressPatter.test($(this).val())) {
            $(this).addClass('is-valid');
            $(this).removeClass('is-invalid');
            validAddress = true;
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            validAddress = false;
        }
    });
    $('#buy').click(function () {
        if (!validName)
            $("#inputName").removeClass('is-invalid').addClass('is-invalid');
        if (!validNum)
            $("#inputPhone").removeClass('is-invalid').addClass('is-invalid');
        if (!validAddress)
            $("#inputAddress").removeClass('is-invalid').addClass('is-invalid');
        if (!(validNum && validName && validAddress))
            alert('Введіть валідні данні')

        else {
            try {
                let order = JSON.parse(localStorage.getItem('cart'));
                console.log(order);
                API.createOrder(order, function (err, data) {
                    if (err)
                        alert('Error');
                    else {
                        alert('Замовлення створенно');
                        PizzaCart.clearCart();
                    }
                });
            } catch (e) {
                alert('Error-2');
            }
        }
    });
}