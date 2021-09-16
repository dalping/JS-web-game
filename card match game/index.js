
let arr = []
const card_val = []
var pick_card = '-1';
let result = 0;

const $btn = document.querySelector('.btn');
const $cards = document.querySelectorAll(".card")
const $board = document.querySelector(".board");

colors = ["red","orange","yellow","green","blue","pink","pupple"]
let colorCopy = colors.concat(colors);
let shuffled = [];
const total = 16;

const onCardHandler = (e) => {

    if(pick_card !== '-1'){
    
        if(e.target === pick_card) return //자기 자신을 선택할 시 스킵

        if(pick_card.innerText === e.target.innerText){ //맞음
            onCardClear(pick_card);
            onCardClear(e.target);
            pick_card = '-1';
        } else { //틀림
            e.target.style.backgroundColor = 'pink';
            setTimeout(()=>{
                e.target.style.backgroundColor = 'black';
                pick_card.style.backgroundColor = 'black'; //머임 왜 안돼
                pick_card = '-1';
            },500)
        }
        
    }else{ //pick_card가 비어있음
        pick_card = e.target;
        e.target.style.backgroundColor = 'pink';
    }
}

const onCardClear = (card) => {
    card.style.backgroundColor = 'white';
    card.style.border = '1px solid white';
    card.textContent = '';
    card.removeEventListener('click',onCardHandler);
    card.style.cursor = 'default';
}

$btn.addEventListener("click",(e)=>{

    startGame();

})

const shuffle = () =>{ //피셔-예이츠 셔플
 
    for(let i=0 ; colorCopy.length > 0 ; i++){ 
        let random = Math.floor(Math.random() * colorCopy.length)
        shuffled = shuffled.concat(colorCopy.splice(random,1))
    }
}

const createCard = (i) =>{ // div.card > div.card-inner > ( div.card-front + div.card-back )
    const card = document.createElement('div');
    card.className = 'card';
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = shuffled[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    return card;
}

const startGame = () =>{
        shuffle();
        for (let i=0 ; i < total; i++){
            const card = createCard(i);
            $board.appendChild(card);
        }
    }

// for(let i=0; i<16; i++){
//     $cards[i].textContent = `${card_val[i]}`
// }

