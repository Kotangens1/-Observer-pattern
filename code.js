const btnSubcribe = document.querySelector('.btnSubcribe');
const subscribeKate = document.querySelector('#kate');
const subscribeKsu = document.querySelector('#ksu');

// const authorsEditInput = document.querySelector('.authors__edit__input');
// const authorsEdit = document.querySelector('.authors__edit');


function Author() {
    let subscribes = [];
    this.sendArt = function (art, nameArt){
        for (let i = 0, sub = subscribes.length; i<sub;i++ ){
            subscribes[i].arts(art, nameArt);
        }
    };
    this.addSubscribes = function (subscribe){
        subscribes.push(subscribe);
    };
};

function Subscribes (behavior) {
    this.arts = function (art, nameArt){
        behavior(art, nameArt);
    }
};

let sadovod = new Author();
let slava = new Author();
let kate = new Subscribes(function (art, nameArt){
    news(art,subscribeKate,nameArt);
    console.log('Kate: Wow! New art! That: '+nameArt)});
let ksu = new Subscribes(function (art,nameArt){
    news(art,subscribeKsu,nameArt);
    console.log('Ksu! - '+nameArt)});


//setTimeout(function (){sadovod.sendArt('Гирс ')},3000);

const clearInput = (input) => {
  input.value = '';
};

const toPublish = (input) => {
    const eventTarget = input;
    const nameFile = input.value;
    const message = input.parentElement.childNodes[5].value;
    const authorPublication = input.parentElement.parentElement.childNodes[5];
    const author = input.parentElement.parentElement.childNodes[1].childNodes[1].textContent;

    authorPublication.innerHTML += `
    <li class="authors__post">
       <h2 class="authors__post__message">${message}</h2>
        <h3 class="authors__post__name">${author}</h3>
       <img class="authors__post__art" src="authors/${author}/${nameFile}.jpg">
    </li>
    `
    console.log(`author - ${author}`);
    setTimeout(function () {
        if (author == 'sadovod') {sadovod.sendArt(eventTarget, nameFile);};//почему то не всем подписчикам доходит публикация
        if (author == 'slava'){slava.sendArt(eventTarget, nameFile);};
    },1000);
    clearInput(input);
};

const subscribeTo = (subscribe) => {
    const sadovodCheck = subscribe.childNodes[3].childNodes[1].childNodes[1].childNodes[1].checked; //true или false
    const slavaCheck = subscribe.childNodes[3].childNodes[1].childNodes[3].childNodes[1].checked;

    if (sadovodCheck){
        if (subscribe.id == 'kate'){sadovod.addSubscribes(kate);
            console.log('kate подписалась');}
        else if(subscribe.id =='ksu'){sadovod.addSubscribes(ksu);
            console.log('ksu подписалась')};
    }
    else if(slavaCheck){
        if (subscribe.id == 'kate'){slava.addSubscribes(kate);
            console.log('kate подписалась на славу');}
        else if(subscribe.id =='ksu'){slava.addSubscribes(ksu);
            console.log('ksu подписалась на славу')};
    };



    // slava.addSubscribes(kate);
    // slava.addSubscribes(ksu);
};

const news = (input, subscribe, nameFile) => {
    const message = input.parentElement.childNodes[5].value;
    const author = input.parentElement.parentElement.childNodes[1].childNodes[1].textContent;

    const subscribePublication = subscribe.childNodes[5];

    subscribePublication.innerHTML += `
    <li class="authors__post">
       <h2 class="authors__post__message">${message}</h2>
        <h3 class="authors__post__name">${author}</h3>
       <img class="authors__post__art" src="authors/${author}/${nameFile}.jpg">
    </li>
    `
};

document.addEventListener('keypress', event => {
    if (!(event.code === 'Enter')) return;

    const currentElementClicked = event.target.classList.contains('authors__edit__input');
    if (!currentElementClicked) return;


    toPublish(event.target);
});

document.addEventListener('click', event => {
    const currentElementClicked = event.target.classList.contains('btnPublication');

    if (!currentElementClicked) return;

    const input = event.target.parentElement.childNodes[1];

    toPublish(input);
});

document.addEventListener('click', event => {
    const currentElementClicked = event.target.classList.contains('btnSubcribe');

    if (!currentElementClicked) return;

    subscribeTo(event.target.parentElement.parentElement);
});
