//Event Checker
let eventInProgress = false;


//Dropdown
function select(e){
    e.classList.toggle('active');
}

//Dice Roll
function diceRoll(e){
    if(eventInProgress){
        return
    }

    eventInProgress = true;

    diceIcon = e.children[0];
    diceIcon.style.transform = ('rotate(360deg)')
    diceIcon.style.transition = ('transform .3s ease')

    e.style.transform = ('scale(1.2)');

    filterData(document.querySelector('.js-select p').innerHTML);
    document.querySelector('.js-content p').style.animation = "showText .3s ease";

    setTimeout(function(){
        e.style.transform = ('scale(1)');
        diceIcon.style.transition = ('none')
        diceIcon.style.transform = ('rotate(0deg)')
        document.querySelector('.js-content p').style.animation = "";
        eventInProgress = false;
    },300)

    
}

//Selection
const selection = document.querySelector('.js-select p');
const option = document.querySelectorAll('.js-option ul li');

option.forEach(options => {
    options.addEventListener('click', (e) => {
        selection.innerHTML = e.target.innerHTML
    })
})

//Copy to clipboard
const copyText = document.querySelector('.js-content p');


function copyToClipboard(e) {

    if(eventInProgress){
        return
    }

    eventInProgress = true;
    let tempInput = document.createElement("textarea");
    tempInput.style.position = "absolute";
    tempInput.style.right = "-999999px";
    document.body.appendChild(tempInput);

    tempInput.value = copyText.innerHTML;

    tempInput.select()
    tempInput.setSelectionRange(0, 999999);

    document.execCommand("copy");

    document.body.removeChild(tempInput);

    origtext = e.innerHTML;
    e.innerHTML = "&check;Copied!"

    setTimeout(function(){
        e.innerHTML = origtext;
        eventInProgress = false;
    },1000)
    
}


//filter category
const categories = document.querySelectorAll('.js-option ul li');
categories.forEach(category => {
    category.addEventListener('click', (e) => {
        filterData(e.target.innerHTML);
        document.querySelector('.js-content p').style.animation = "showText .3s ease";
        setTimeout(function(){
            document.querySelector('.js-content p').style.animation = "";
        },300)
    })
})

function filterData(category){
        selectedCategory = category;
        fetch('/data/researchTitles.json')
        .then(response => response.json())
        .then(data => {
        const filteredTitles = data.researchTitles.filter(title => selectedCategory.includes(title.category));
        if(filteredTitles.length > 0){
            const index = Math.floor(Math.random() * filteredTitles.length);
            const title = filteredTitles[index].title;
            document.querySelector('.js-content p').innerHTML = title;
        }else{
            const index = Math.floor(Math.random() * data.researchTitles.length);
            const title = data.researchTitles[index].title;
            document.querySelector('.js-content p').innerHTML = title;
        }
        });
}