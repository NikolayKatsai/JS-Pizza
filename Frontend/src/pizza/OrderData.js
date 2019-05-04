const API = require('../API.js');
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
                        console.log(data);
                    }
                });
            } catch (e) {
                alert('Error-2');
            }
        }
    });
}