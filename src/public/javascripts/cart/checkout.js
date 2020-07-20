document.addEventListener('DOMContentLoaded', function () {
    let summary = document.querySelectorAll('.price');
    let numpro = document.querySelectorAll('.numberproduct');
    let sumprice = document.querySelector('#sumprice');
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
    console.log(result);
    sumprice.innerHTML = result;
}, false);