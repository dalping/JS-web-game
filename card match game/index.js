
let clicked = [];
let completed = [];
let shuffled = [];
const total = 16;
let clickable = true;
let startTime = 0;

const $btn = document.querySelector('.btn');
const $cards = document.querySelectorAll(".card")
const $board = document.querySelector(".board");

colors = ["red","orange","yellow","green","blue","pink","violet","white"]
let colorCopy = colors.concat(colors);


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

function onClickCard(){
    //카드 배치중, 이미 완성된 카드, 나를 한번 더 클릭했을 때..
    if(clickable === false || completed.includes(this) || clicked[0] === this){
        return;
    }
    this.classList.toggle('flipped');
    
    clicked.push(this);
    if (clicked.length !== 2) {
        return;
    }
    
    const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
    const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;
    
    if ( firstBackColor === secondBackColor ){ //선택한 카드가 동일
        
        completed.push(clicked[0]);
        completed.push(clicked[1]);
        clicked = [];
        
        if (completed.length !== total){
            return;
        }
        const endTime = new Date();
        setTimeout(() => {
            alert(`축하합니다! ${Math.round((endTime - startTime)/1000)}초 걸렸습니다.`); 
            resetGame();
        },1000);
        return; 
    }
    clickable = false;
    setTimeout(() => { //선택한 카드가 다름 : 카드 초기화
        clicked[0].classList.remove('flipped');
        clicked[1].classList.remove('flipped');
        clicked = [];
        clickable = true;
    },500);
}

const resetGame = () => {
    $btn.addEventListener("click",startGame);
    $board.innerHTML = '';
    colorCopy = colors.concat(colors);
    shuffled = [];
    completed = [];
    //startGame();
}

const startGame = () =>{
    $btn.removeEventListener("click", startGame);
    clickable = false;
    shuffle();
    for (let i=0 ; i < total; i++){
        const card = createCard(i);
        card.addEventListener('click', onClickCard);
        $board.appendChild(card);
    }
    
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => { // 초반 카드 공개
            card.classList.add('flipped');
        }, 1000 + 100 * index); //카드가 촤르륵 뒤집히는 효과 발생
    });
    
    setTimeout(()=>{ // 카드 감추기
        document.querySelectorAll('.card').forEach((card) => {
            card.classList.remove('flipped');
        });
        clickable = true;
        startTime = new Date();
    },5000);
}

$btn.addEventListener("click",startGame);

