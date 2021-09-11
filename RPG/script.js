let monster = null;

const hero={
    name : '',
    lev:1,
    maxHp:100,
    hp:100,
    xp:0, //level * 15 
    att:10,
    attack(monster){
        monster.hp -= this.att;
        this.hp -= monster.att;
    },
    heal(monster){
        this.hp += 20;
        this.hp -= monster.att;
    },
};

const monsterList = [
    {name: '피카츄', hp:25, att:10,xp:10},
    {name: '파이리', hp:50, att:15,xp:20},
    {name: '꼬부기', hp:150, att:35,xp:50},
    {name: '리자몽', hp:170, att:45,xp:60},
    {name: '야도란', hp:200, att:60,xp:80},
];

class Monster{
    constructor(name, hp, att, xp){ //생성자
        this.name = name;
        this.hp = hp;
        this.att = att;
        this.xp = xp;
    }

    attack(monster){
        monster.hp -= this.att;
        this.hp -= monster.att;
    }

    heal(monster){
        this.hp += 20;
        this.hp -= monster.att;
    }
} 

const $startScreen = document.querySelector('.start-screen');
$startScreen.addEventListener('submit',(e)=>{
    e.preventDefault();
    var name = e.target['name-input'].value;

    $startScreen.style.display = 'none';
    $menuScreen.style.display = 'block';

    $heroName.textContent = name;
    $heroLevel.textContent = `Level : ${hero.lev}`;
    $heroHp.textContent = `HP : ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `EXP : ${hero.xp}/${hero.hp * hero.lev}`;
    $heroAtt.textContent = `ATT : ${hero.att}`;
})

const $menuScreen = document.querySelector('.menu-screen');
const $battleScreen = document.querySelector('.battle-screen');

const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');

const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');

const $message = document.querySelector('#message'); 

//모험
const $advan = document.querySelector('.advan');
$advan.addEventListener('click',(e)=>{
    $menuScreen.style.display = 'none';
    $battleScreen.style.display = 'block';
    
    //몬스터 생성//객체 복사
    monster = JSON.parse(
        JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
    )

    monster.maxHp = monster.hp;
    $monsterName.textContent =  monster.name;
    $monsterHp.textContent = `HP : ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT : ${monster.att}`;
});

//휴식
const $rest = document.querySelector('.rest');
$rest.addEventListener('click',(e)=>{
});

//종료
const $exit = document.querySelector('.exit');
$exit.addEventListener('click',(e)=>{
});

//공격
const $attack = document.querySelector('.attack');
$attack.addEventListener('click',(e)=>{
    hero.attack(monster);
    monster.attack(hero);

    $heroHp.textContent = `HP : ${hero.hp}/${hero.maxHp}`;
    $monsterHp.textContent = `HP : ${monster.hp}/${monster.maxHp}`;
    $message.textContent = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`;
});

//회복
const $recover = document.querySelector('.recover');
$recover.addEventListener('click',(e)=>{
});

//도망
const $escape = document.querySelector('.escape');
$escape.addEventListener('click',(e)=>{
});

