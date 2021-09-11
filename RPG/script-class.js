
class Game{
    constructor(name){
        this.monster = null;
        this.hero = null;
        this.monsterList=[
            {name: '피카츄', hp:25, att:10, xp:10},
            {name: '파이리', hp:50, att:15, xp:20},
            {name: '꼬부기', hp:150, att:35, xp:50},
            {name: '리자몽', hp:170, att:45, xp:60},
            {name: '야도란', hp:200, att:60, xp:80},
        ];
        this.start(name);
    }

    start(name){
        this.changeScreen("menu");
        this.hero = new Hero(this, name);
        this.updateHeroStat();
        $advan.addEventListener("click",this.onAdvanHandler);
        $rest.addEventListener("click",this.onRestHandler);
        $exit.addEventListener("click",this.onExitHandler);
        $attack .addEventListener("click",this.onAttackHandler);
        $recover.addEventListener("click",this.onRecoverHandler);
        $escape.addEventListener("click",this.onEscapeHandler);
    }

    changeScreen(screen){
        if (screen === 'start') {
            $startScreen.style.display = 'block';
            $menuScreen.style.display = 'none';
            $battleScreen.style.display = 'none';
            $restScreen.style.display = "none";
          } else if (screen === 'menu') {
            $startScreen.style.display = 'none';
            $menuScreen.style.display = 'block';
            $battleScreen.style.display = 'none';
            $restScreen.style.display = "none";
          } else if (screen === 'battle') {
            $startScreen.style.display = 'none';
            $menuScreen.style.display = 'none';
            $battleScreen.style.display = 'block';
            $restScreen.style.display = "none";
          } else if (screen==="rest"){
            $startScreen.style.display = 'none';
            $menuScreen.style.display = 'none';
            $battleScreen.style.display = 'none';
            $restScreen.style.display = "block";
          } else if (screen=="exit"){
            $startScreen.style.display = 'none';
            $menuScreen.style.display = 'none';
            $battleScreen.style.display = 'none';
            $exitScreen.style.display = "block";
          }
    }

    onStartScreenHandler = (e) =>{
        e.preventDefault();
        game = new Game(name); //새로운 게임 생성

        const name = e.target['name-input'].value;
        this.changeScreen("menu");
        $heroName.textContent = name;
        $heroLevel.textContent = `Level : ${hero.lev}`;
        $heroHp.textContent = `HP : ${hero.hp}/${hero.maxHp}`;
        $heroXp.textContent = `EXP : ${hero.xp}/${hero.hp * hero.lev}`;
        $heroAtt.textContent = `ATT : ${hero.att}`;
    }

    onAdvanHandler = (e) => {
        this.changeScreen('battle');
        const randomIndex = Math.floor(Math.random() * this.monsterList.length);
        const randomMonster = this.monsterList[randomIndex];
        this.monster = new Monster(
          this,
          randomMonster.name,
          randomMonster.hp,
          randomMonster.att,
          randomMonster.xp,
        );
        this.updateMonsterStat();
        this.showMessage(`몬스터와 마주쳤다. 야생의 [${this.monster.name}] (이)다!`);
    }

    onRestHandler = (e) => {
        this.changeScreen("rest");
        setTimeout(val=>{
            this.hero.hp = this.hero.maxHp;
            this.updateHeroStat();
            this.showMessage('충분한 휴식을 취했다.');
            this.changeScreen("menu");
        },1000);
    }

    onExitHandler = (e) => {
        this.hero = null;
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        this.changeScreen('exit');
        this.showMessage('');
        game = null;
    }

    onAttackHandler = (e) =>{
        const { hero, monster } = this;
        hero.attack(monster);
        monster.attack(hero);
        if (hero.hp <= 0) {
          this.showMessage(`${hero.lev} 레벨에서 사망.`);
          this.quit();
        } else if (monster.hp <= 0) {
          this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
          hero.getXp(monster.xp);
          this.monster = null;
          this.changeScreen('menu');
        } else { // 전투 진행 중
          this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`);
        }
        this.updateHeroStat();
        this.updateMonsterStat();
    }
    
    onRecoverHandler = (e) =>{
        const { hero, monster } = this;
        hero.hp = Math.min(hero.maxHp, hero.hp + 20);
        monster.attack(hero);
        if (hero.hp <= 0) {
            this.showMessage(`${hero.lev} 레벨에서 사망.`);
            this.quit();
            return
        }
        this.showMessage(`체력을 조금 회복했다! 회복하는 동안 공격을 받았다. `);
        this.updateHeroStat();
    }
    
    onEscapeHandler = (e) =>{
        this.changeScreen('menu');
        this.showMessage('무사히 도망쳤다.');
        this.monster = null;
        this.updateMonsterStat();
    }

    updateHeroStat() {
    const { hero } = this;
        if (hero === null) {
            $heroName.textContent = '';
            $heroLevel.textContent = '';
            $heroHp.textContent = '';
            $heroXp.textContent = '';
            $heroAtt.textContent = '';
            return;
        }
      $heroName.textContent = hero.name;
      $heroLevel.textContent = `${hero.lev}Lev`;
      $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
      $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
      $heroAtt.textContent = `ATT: ${hero.att}`;
    }

    updateMonsterStat() {
        const { monster } = this;
        if (monster === null) {
            $monsterName.textContent = '';
            $monsterHp.textContent = '';
            $monsterAtt.textContent = '';
            return;
        }  
      $monsterName.textContent = monster.name;
      $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
      $monsterAtt.textContent = `ATT: ${monster.att}`;
    }

    showMessage(text) {
        $message.textContent = text;
    }

    quit() {
        this.hero = null;
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        this.changeScreen("exit");
        game = null;
      }
}

const $restScreen = document.querySelector('.rest-screen');
const $startScreen = document.querySelector('.start-screen');
const $menuScreen = document.querySelector('.menu-screen');
const $battleScreen = document.querySelector('.battle-screen');
const $exitScreen = document.querySelector('.exit-screen');

const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');

const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('.message'); 
const $advan = document.querySelector('.advan');
const $rest = document.querySelector('.rest');
const $exit = document.querySelector('.exit');
const $attack = document.querySelector('.attack');
const $recover = document.querySelector('.recover');
const $escape = document.querySelector('.escape');

class Unit {
    constructor(game, name, hp, att, xp) {
      this.game = game;
      this.name = name;
      this.maxHp = hp;
      this.hp = hp;
      this.xp = xp;
      this.att = att;
    }
    attack(target) {
      target.hp -= this.att;
    }
  }

  class Hero extends Unit {
    constructor(game, name) {
      super(game, name, 100, 10, 0);
      this.lev = 1;
    }

    attack(target) {
      super.attack(target); // 부모 클래스의 attack
      // 부모 클래스 attack 외의 동작
    }

    heal(monster) {
      this.hp += 20;
      this.hp -= monster.att;
    }

    getXp(xp) {
      this.xp += xp;
      if (this.xp >= this.lev * 15) { // 경험치를 다 채우면
        this.xp -= this.lev * 15; // xp: 5,  lev: 2, maxXp: 15
        this.lev += 1;
        this.maxHp += 5;
        this.att += 5;
        this.hp = this.maxHp;
        this.game.showMessage(`레벨업! 레벨 ${this.lev}`);
            }
        }
    }

  class Monster extends Unit {
    constructor(game, name, hp, att, xp) {
      super(game, name, hp, att, xp);
    }
  }

let game = null;
$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target['name-input'].value;
  game = new Game(name);
});