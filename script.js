console.log('gday');

let roomCount = 0;

let bgs = ["url(./img/background/dungeon_bg1.jpg)", "url(./img/background/dungeon_bg2.jpg)",
    "url(./img/background/dungeon_bg3.jpg)", "url(./img/background/dungeon_bg4.jpg)",
    "url(./img/background/dungeon_bg5.jpg)",
    "url(./img/background/dungeon_bg7.jpg)", "url(./img/background/dungeon_bg8.jpg)",
    "url(./img/background/dungeon_bg9.jpg)"]

// console.log(bgs.length)
var startSwitch = true;

var charSwitch = true;

let switchRoll = false;

let switchMove = true;

let pTurn = false;

let pChar = '';

let charW = '';

let pLife = 100;

let pRoll = 0;

let monCount = 0;

// EFFECTS


function addFlash(elem) {
    elem.classList.add("flash");
}

function cutFlash(elem) {
    elem.classList.remove("flash");
}

function lightUp(elem) {
    elem.style.opacity = 1;
}

function lightDown(elem) {
    elem.style.opacity = 0.3;
}

function mAtk(id) {
    var a = document.getElementById(id);
    a.classList.add('m-atk')
    setTimeout(() => {
        a.classList.remove('m-atk')
    }, 100)
}

function rolShad(elem) {
    elem.classList.add('rol-shad')
}

function remShad(elem) {
    elem.classList.remove('rol-shad')
}

function eqSel(elem) {
    elem.classList.add('equip-sel')
}

// TRANSITIONS

function addNew(id1, id2) {
    var old = document.getElementById(id1)
    var add = document.getElementById(id2)

    old.innerHTML += add.innerHTML;
}


function fadeTitle(id) {
    if (startSwitch == false){
        return;
    }
    startSwitch = false;
    var x = document.getElementById(id);
    x.classList.add("fade");
    setTimeout(() => {
        x.remove();
        addNew('win1', 'win2');
    }, 1100);
}


function charSelect(char, id, con) {
    if (charSwitch == false){
        return;
    }
    charSwitch = false;
    switchRoll = false;
    pTurn = false;
    charW = con;
    roomCount = 0;
    pLife = 100;
    var v = document.getElementById('win1');
    var w = document.getElementById(id);
    pChar = char;
    v.innerHTML = w.innerHTML;
    var dia = document.getElementById('dialogue');
    dia.innerText = '...'
}


function menu(){
    var v = document.getElementById('win1');
    var t = document.getElementById('title-frame');
    startSwitch = true;
    charSwitch = true;
    v.innerHTML = t.innerHTML;
}

// encounters: [number of monsters, max monsters, containing element]

const encount = {
    e1: [2, 2, 'e-frame1'],
    e2: [1, 1, 'e-frame2'],
    e3: [2, 2, 'e-frame3'],
    e4: [1, 1, 'e-frame4'],
    e5: [2, 2, 'e-frame5'],
    e6: [2, 2, 'e-frame6'],
    e7: [3, 3, 'e-frame7'],
    e8: [2, 2, 'e-frame8'],
    e9: [1, 1, 'e-frame9'],
    e10: [1, 1, 'e-frame10'],
    e11: [2, 2, 'e-frame11'],
    e12: [1, 1, 'e-frame12']
}

// COMBAT

//!!monster stats: [current life, max life, dmg range]!!//

const monsters = {
    goblin1: [35, 35, 3],
    goblin2: [35, 35, 3],
    imp: [50, 50, 5],
    wraith: [40, 40, 7],
    troll: [85, 85, 6],
    iguana: [65, 65, 6],
    infernal: [85, 85, 8],
    horror: [95, 95, 7],
    dragon: [200, 200, 11]
}

function monDie(id) {
    var c = document.getElementById('c-frame')
    var ded = document.getElementById(id);
    var vic = document.getElementById('vic-box');
    if (monCount <= 0) {
        if (roomCount >= 5){
            vic = document.getElementById('clear-box')
        }
        c.innerHTML = vic.innerHTML;
    }
    ded.remove()
}

function pDie() {
    var x = document.getElementById(charW);
    var d = document.getElementById('coffin');
    x.innerHTML = d.innerHTML;
}


function roll(id) {
    if (switchRoll == false) {
        return;
    }
    switchRoll = false;
    var dia = document.getElementById('dialogue');
    var num = Math.round(Math.random() * (19) + 1);
    id.innerText = num;

    pRoll = num;
    if (num == 20) {
        dia.innerText = num + '! Critical strike!';
    }
    else if (num == 8 || num == 11 || num == 18) {
        dia.innerText = 'You rolled an ' + num + '!';
    }
    else {
        dia.innerText = 'You rolled a ' + num + '!';
    }
    pTurn = true;
}


function getHit(bar, mon, id) {
    if (pTurn == false) {
        return;
    }
    pTurn = false;
    let dia = document.getElementById('dialogue');
    var pBar = document.getElementById('p-life');
    var mLife = monsters[mon][0];
    // pRoll = 100;
    if (pChar == 'rogue'){
        console.log('rog')
        if (pRoll == 17 || pRoll == 18 || pRoll == 19){
            pRoll = 20;
        }
    }
    if (pRoll == 20){
        pRoll = 25;
    }
    if (pChar == 'warrior'){
        console.log('war')
        pRoll += 2;
    }
    if (pChar == 'mage'){
        console.log('mag')
        if (pRoll == 1){
            pLife -= 5;
            pBar.style.width = pLife + '%';
        }
        pRoll += Math.round(Math.random()*4 + 1);
    }
    console.log(pRoll);
    mLife -= pRoll;
    dia.innerText = 'You deal ' + pRoll + ' damage!';
    if (mLife <= 0) {
        mLife = 0;
    }
    monsters[mon][0] = mLife;
    var mBar = document.getElementById(bar);
    var b = (mLife * 100) / monsters[mon][1];
    mBar.style.width = b + "%";

    if (mLife == 0) {
        monCount--;
        monDie(id);
        switchRoll = true;
        return
    }

    var mRoll = Math.round(Math.random() * (monsters[mon][2] - 1) + 1);
    mAtk(id);
    pLife -= mRoll;
    console.log(pLife);
    if (pLife <= 0) {
        pLife = 0;
        pDie();
    }
    pBar.style.width = pLife + '%'
    switchRoll = true;
}

function heal(elem) {
    pLife = 100;
    var pBar = document.getElementById('p-life');
    pBar.style.width = pLife + '%';
    elem.remove();
}

// MOVEMENT  => BATTLE GENERATION(?)

function proceed(nav) {
    var n = document.getElementById(nav);
    var c = document.getElementById('c-frame');
    c.innerHTML = n.innerHTML;
}



function move(id) {
    if (switchMove == false){
        return;
    }
    switchMove = false;
    var x = document.getElementById(charW);
    var c = document.getElementById('c-frame');
    var butt = document.getElementById(id);
    var enc = '';
    var mons = '';
    roomCount++;
    pRoll = 0;
    switchRoll = true;
    pTurn = false;
    for (const key in monsters) {
        monsters[key][0] = monsters[key][1];
    }
    x.style.opacity = 0;
    setTimeout(() => {
        butt.remove();
        switchMove = true;
        if (roomCount == 1) {
            x.style.backgroundImage = bgs[Math.round(Math.random() * (bgs.length - 1))];
            enc = document.getElementById('e-frame1');
            monCount = 2;
            // currentE = 'e1';
            c.innerHTML += enc.innerHTML;
        }
        else if (roomCount >= 5) {
            x.style.backgroundImage = "url(./img/background/prompt.jpg)";
            enc = document.getElementById(encount['e12'][2]);
            monCount = 1;
            // currentE = 'e12'
            c.innerHTML += enc.innerHTML;
        }
        else if (roomCount == 4) {
            x.style.backgroundImage = "url(./img/background/pre.jpg)";
            mons = 'e' + Math.round(Math.random() * (2) + 9)
            monCount = encount[mons][0];
            // currentE = mons;
            enc = document.getElementById(encount[mons][2]);
            c.innerHTML += enc.innerHTML;
        }
        else if (roomCount == 3) {
            x.style.backgroundImage = bgs[Math.round(Math.random() * (bgs.length - 1))];
            mons = 'e' + Math.round(Math.random() * (2) + 6)
            monCount = encount[mons][0];
            // currentE = mons;
            enc = document.getElementById(encount[mons][2]);
            c.innerHTML += enc.innerHTML;
        }
        else if (roomCount == 2) {
            x.style.backgroundImage = bgs[Math.round(Math.random() * (bgs.length - 1))];
            mons = 'e' + Math.round(Math.random() * (3) + 2)
            monCount = encount[mons][0];
            // currentE = mons;
            enc = document.getElementById(encount[mons][2]);
            c.innerHTML += enc.innerHTML;
        }
        // console.log(roomCount)
    }, 700)
    setTimeout(() => {
        x.style.opacity = 1;
    }, 1200)
}