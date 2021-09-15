
let arr = []
const card_val = []
var pick_card = '-1';
let result = 0;
let colors = []

const $btn = document.querySelector('.btn');
const $cards = document.querySelectorAll(".card")

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

    startGame()

    for(let i=0; i<16; i++){
        $cards[i].style.backgroundColor = "pink";
     }

    setTimeout(()=>{
        for(let i=0; i<16; i++){
           $cards[i].style.backgroundColor = "black";
           $cards[i].addEventListener("click", onCardHandler);
        }
    },3000);
})

const startGame = () =>{
    for(let i=0 ; i<2 ; i++){
        arr = [0,1,2,3,4,5,6,7]
        color = ["red","orange","yellow","green","blue","pink","pupple"]
        for(let j=0 ; j<8 ; j++){
            let random = [Math.floor(Math.random() * arr.length - 1)]
            let val = arr.splice(random,1)
            card_val.push(val)
            $cards[j+(i*8)].textContent = `${val}`
        }
    }
}

// for(let i=0; i<16; i++){
//     $cards[i].textContent = `${card_val[i]}`
// }

