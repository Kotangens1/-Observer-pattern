const btnSubcribe = document.querySelector('.btnSubcribe');
const subscribeKate = document.querySelector('#kate');
const subscribeKsu = document.querySelector('#ksu');
const authors = document.querySelector('.authors');
const subscribes = document.querySelector('.subscribes');

const delayTime = 1000 //Время задержки отправления поста подписчикам

function Author(myName) {
    let subscribes = [];
    let nameSubscribes =[];
    this.sendArt = function (art, nameArt, message, time){
        for (let i = 0, sub = subscribes.length; i<sub;i++ ){
            subscribes[i].arts(art, nameArt, message, time);
        }
    };
    this.addSubscribes = function (subscribe, name){
        if (nameSubscribes.includes(name,0))return;

        nameSubscribes.push(name);
        subscribes.push(subscribe);

        renderNumberSubscribes(subscribes, myName);
        renderNumberAuthors(myName, name);
    };
    this.deleteSubscribes = function (subscribe,name){
        if (!nameSubscribes.includes(name,0))return;
        console.log('отписка');

        const index = nameSubscribes.indexOf(name);
        subscribes.pop(subscribe);
        nameSubscribes.splice(index, 1);
        renderNumberSubscribes(subscribes, myName);
        renderNumberAuthors(myName, name);
    };
};

function Subscribes (behavior) {
    this.arts = function (art, nameArt, message, time){
        behavior(art, nameArt, message, time);
    }
};

let sadovod = new Author('sadovod');
let slava = new Author('slava');
let kate = new Subscribes(function (art, nameArt, message, time){
        news(art,subscribeKate,nameArt, message, time);
    });
let ksu = new Subscribes(function (art,nameArt, message, time){
        news(art,subscribeKsu,nameArt, message, time);
    });


const renderNumberSubscribes = (subscribes, author) => {
    let authorHtml = '';
    const listAuthor = authors.childNodes[7].childNodes;

    for (let i = 0; i < listAuthor.length; i++) {
        if (listAuthor[i].id == author){
            authorHtml = listAuthor[i].childNodes[1].childNodes[3].childNodes[3];
            break;
        };
    };

    const numberSubscribes = subscribes.length;

    authorHtml.innerHTML = `
    subscribes: ${numberSubscribes} 
    `;
};

const renderNumberAuthors = (nameAuthor, nameSubscribe) => { 
    //Функция -> Рендер подписок на авторов: сделана криво, 
    //в идеале должна рендерить массив авторов, на которые подписан человек, но у меня такого массива нет
    //поэтому она сначала вычисляет, нет ли повторений имён авторов, и, если повторяния есть - убирает повтор.
    //Если повторов нет, то функция вызывалась, чтобы добавить имя автора, а, если повторение есть, то для удаления имени.
    //Логически - это тупое решение, но технически всё работает без проблем. Пока мне так и нужно. 

    let subscribeHtml;
    const listSubscribes = subscribes.childNodes[7].childNodes;

    for (let i = 0; i < listSubscribes.length; i++) { 
        //Поиск тега, в котором хранится список авторов для текущего подписчика
        if (listSubscribes[i].id == nameSubscribe){
            subscribeHtml = listSubscribes[i].childNodes[1].childNodes[5];
            break;
        };
    };

    for (let i = 0; i < subscribeHtml.childNodes.length; i++){
        //Проверяю, нет ли повторений в списке авторов
        if (subscribeHtml.childNodes[i].textContent == nameAuthor){
            subscribeHtml.childNodes[i].remove();
            return;
        };
        
    };

    subscribeHtml.innerHTML += `<h6>${nameAuthor}</h6>`;
};
    
const clearInput = (input) => {
  input.value = '';
};

const toPublish = (input) => {
    const eventTarget = input;
    const nameFile = input.value;
    const message = input.parentElement.childNodes[1].childNodes[1].value;
    const authorPublication = input.parentElement.parentElement.childNodes[7];
    const author = input.parentElement.parentElement.id;
    const time = new Date();

    authorPublication.innerHTML += `
        <li class="authors__post">
        <img class="authors__post__art" src="authors/${author}/${nameFile}">
           <div class="authors__post__info">
               <div>
                   <h4 class="authors__post__message">${message}</h4>
                   <h6 class="authors__post__name">${author}</h6>
               </div>
               <h6>${time}</h6>
           </div>
       </li>
    `
    setTimeout(function () {
        if (author == 'sadovod') {sadovod.sendArt(eventTarget, nameFile, message, time);};
        if (author == 'slava'){slava.sendArt(eventTarget, nameFile, message, time);};
    },delayTime);
    clearInput(input);
};

const subscribeTo = (subscribe) => {
    const author = subscribe.childNodes[5].value;

    if (author == 'sadovod'){
        if (subscribe.id == 'kate'){sadovod.addSubscribes(kate, 'kate');
            console.log('kate подписалась на садовода');}
        else if(subscribe.id =='ksu'){sadovod.addSubscribes(ksu, 'ksu');
            console.log('ksu подписалась на славу')};
    }
    if(author == 'slava'){
        if (subscribe.id == 'kate'){slava.addSubscribes(kate, 'kate');
            console.log('kate подписалась на славу');}
        else if(subscribe.id =='ksu'){slava.addSubscribes(ksu, 'ksu');
            console.log('ksu подписалась на славу')};
    };
};

const unsubscribeFrom = (subscribe) => {
    const author = subscribe.childNodes[5].value;

    if (author == 'sadovod'){
        if (subscribe.id == 'kate'){
            sadovod.deleteSubscribes(kate, 'kate');
            console.log('kate отписалась от садовода');
        }
        else if(subscribe.id =='ksu'){sadovod.deleteSubscribes(ksu, 'ksu');
            console.log('ksu отписалась от садовода')};
    };
    if(author == 'slava'){
        if (subscribe.id == 'kate'){slava.deleteSubscribes(kate, 'kate');
            console.log('kate отписалась от славы');}
        else if(subscribe.id =='ksu'){slava.deleteSubscribes(ksu, 'ksu');
            console.log('ksu отписалась от славы')};
    };
};

const news = (input, subscribe, nameFile, message, time) => {
    const author = input.parentElement.parentElement.id;
    const subscribePublication = subscribe.childNodes[9];

    console.log(author);
    subscribePublication.innerHTML += `
    <li class="authors__post">
        <img class="authors__post__art" src="authors/${author}/${nameFile}">
           <div class="authors__post__info">
               <div>
                   <h4 class="authors__post__message">${message}</h4>
                   <h6 class="authors__post__name">${author}</h6>
               </div>
               <h6>${time}</h6>
           </div>
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

    const input = event.target.parentElement.childNodes[3];
    console.log(input);
    toPublish(input);
});

document.addEventListener('click', event => {
    const currentElementClicked = event.target.classList.contains('btnSubcribe');

    if (!currentElementClicked) return;

    subscribeTo(event.target.parentElement.parentElement);
});

document.addEventListener('click', event => {
    const currentElementClicked = event.target.classList.contains('btnUnsubscribe');

    if (!currentElementClicked) return;

    unsubscribeFrom(event.target.parentElement.parentElement);
});
