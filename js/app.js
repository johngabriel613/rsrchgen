//Dropdown
function select(e){
    e.classList.toggle('active');
}

//Dice Roll
function diceRoll(e){
    newRotateVal = 360;
    computedStyle = window.getComputedStyle(e);
    rotateVal = computedStyle.getPropertyValue('rotate');
    rotateVal = rotateVal.replace(/\D/g,'');

    newRotateVal = eval(rotateVal + "+" + newRotateVal);
    e.style.rotate = newRotateVal+"deg";

}

//Selection
const selection = document.querySelector('.js-select p');
const option = document.querySelectorAll('.js-option ul li');

option.forEach(options => {
    options.addEventListener('click', (e) => {
        selection.innerHTML = e.target.innerHTML
    })
})