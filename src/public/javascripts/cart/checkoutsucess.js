$(document).ready(function () {
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
        if (temp[0].trim() === 'paysucess') {
           if(temp[1].trim() === 'true')
           {
            $('#paysucess').click();
            createCookie(temp[0], "", -1);
           }
        }
    })
});