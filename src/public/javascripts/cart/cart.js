document.addEventListener('DOMContentLoaded', function () {
    //price
    let summary = document.querySelectorAll('.summary');
    let numpro = document.querySelectorAll('.numpro');
    let sumprice = document.querySelectorAll('.sumprice');
    let sum = 0;
    summary.forEach((element, index) => {
        let arr = element.innerHTML.split(',');
        let str = '';
        arr.map((value) => {
            str += value;
        })
        sum += Number(str) * Number(numpro[index].innerHTML);
    });
    let temp = String(sum);
    let result = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    sumprice.forEach(element => {
        element.innerHTML = result;
    })

    // cookie add favorite
    let notihead = document.querySelector('#notihead');
    let notibody = document.querySelector('#notibody');
    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    let cookie = document.cookie;
    let arrcokkie = cookie.split(';');
    arrcokkie.map(value => {
        let temp = value.split('=');
        if (temp[0].trim() === 'favoriteexist' && temp[1].trim() === 'true') {
            notihead.innerHTML='Success';
            notibody.innerHTML = 'Add to Favorive List Success!!!'
            $('#btnfavorite').click();
            createCookie(temp[0], "", -1);
            return;

        } else if (temp[0].trim() === 'favoriteexist' && temp[1].trim() === 'false') {
            notihead.innerHTML='Fail';
            notibody.innerHTML = 'Add to Favorive List Fail!!!'
            $('#btnfavorite').click();
            createCookie(temp[0], "", -1);
            return;

        }
    })
}, false);