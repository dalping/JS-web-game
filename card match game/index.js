
let arr = []
let card_val = []
let pick_card = '-1';
const $btn = document.querySelector('.btn');

const onCardHandler = (e) =>{
    if(pick_card !== '-1'){
        console.log(pick_card.innerText)
        if(String(pick_card.innerText) === String(e.target.value)){
            console.log('hello')
            pick_card.style.backgroundColor = 'white';
            pick_card.style.border = '1px solid white';
            e.target.style.backgroundColor = 'white';
        }
        pick_card.style.backgroundColor = 'pink';
        pick_card = '-1';
        //pick_card 비우기
    }else{ //pick_card가 비어있음
        pick_card = e.target;
        e.target.style.backgroundColor = 'red';
    }
}

const $cards = document.querySelectorAll(".card")

$btn.addEventListener("click",(e)=>{
    for(let i=0; i<16; i++){
        $cards[i].style.backgroundColor = "pink";
     }

    setTimeout(()=>{
        for(let i=0; i<16; i++){
           $cards[i].style.backgroundColor = "black";
        }
    },3000);
})

for(let i=0 ; i<2 ; i++){
    arr = [0,1,2,3,4,5,6,7]
    for(let j=0 ; j<8 ; j++){
        let random = [Math.floor(Math.random() * arr.length - 1)]
        let val = arr.splice(random,1)
        card_val.push(val)
        $cards[j+(i*8)].textContent = `${val}`
        $cards[j+(i*8)].addEventListener("click", onCardHandler);
    }
}

// for(let i=0; i<16; i++){
//     $cards[i].textContent = `${card_val[i]}`
// }

