console.log('gday');

let roomCount = 0;

let bgs = ["url(./img/background/dungeon_bg1.jpg)", "url(./img/background/dungeon_bg2.jpg)", 
"url(./img/background/dungeon_bg3.jpg)","url(./img/background/dungeon_bg4.jpg)" , 
"url(./img/background/dungeon_bg5.jpg)",
"url(./img/background/dungeon_bg7.jpg)", "url(./img/background/dungeon_bg8.jpg)",
"url(./img/background/dungeon_bg9.jpg)"]

// console.log(bgs.length)

// EFFECTS

var start = document.getElementById('start')

function addFlash() {
    start.classList.add("flash");
}

function cutFlash() {
    start.classList.remove("flash");
}

function lightUp(elem) {
    elem.style.opacity = 1;
}

function lightDown(elem) {
    elem.style.opacity = 0.3;
}


function rolShad(elem){
    elem.classList.add('rol-shad')
}

function remShad(elem){
    elem.classList.remove('rol-shad')
}

setInterval(addFlash, 600);
setInterval(cutFlash, 1200);

// TRANSITIONS => BATTLE GENERATION(?)

function addNew(id1, id2){
    var old = document.getElementById(id1)
    var add = document.getElementById(id2)
    
    old.innerHTML += add.innerHTML; 
}


function fadeTitle(id) {
    var x = document.getElementById(id);
    x.classList.add("fade");
    console.log('faded');

    setTimeout(() => {
        x.remove();
        addNew('win1', 'win2');
    }, 1100);
}

function move(id){
    var x = document.getElementById('content4');
    var butt = document.getElementById(id);
    var gobs = document.getElementById('e-frame5');
    // var gob2 = document.getElementById('gob2');

    x.style.opacity = 0;
    setTimeout(() => {
        butt.remove();
        roomCount++;
        if (roomCount >= 5){
            butt.remove();
            x.style.backgroundImage = "url(./img/background/prompt.jpg)";
        }
        if (roomCount === 4){
            x.style.backgroundImage = "url(./img/background/pre.jpg)";
        }
        if (roomCount < 4){
            x.style.backgroundImage = bgs[Math.round(Math.random() * (bgs.length-1))];
            // x.innerHTML += gobs.innerHTML;
            x.innerHTML += gobs.innerHTML; 
        }
        console.log(roomCount)
    }, 700)
    setTimeout(() => {
        x.style.opacity = 1;
    }, 1200)
}
//CHARACTERS

let pChar = '';




// COMBAT

let pRoll = 0;

function roll(id){
    var dia = document.getElementById('dialogue')
    var num = Math.round(Math.random()*(19) + 1);
    id.innerText = num;
    
    pRoll = num;
    if (num == 20){
        dia.innerText = num + '! Critical strike!';
    }
    else if (num == 8 || num == 11 || num == 18){
        dia.innerText = 'You rolled an ' + num + '!';
    }
    else {
        dia.innerText = 'You rolled a ' + num + '!';
    }
    console.log(pRoll)
}

function eqSel(elem){
    elem.classList.add('equip-sel')
}


const monstLife = {
    goblin1: [50, 50],
    goblin2: [50, 50],
    imp: [69, 69],
    wraith: [60, 60],
    troll: [123, 123]
}


function getHit(id, mon){
    var mLife = monstLife[mon][0];
    mLife -= pRoll;
    if (mLife <= 0){
        mLife = 0
    }
    monstLife[mon][0] = mLife;
    console.log(monstLife[mon][0]);
    var mBar = document.getElementById(id);
    var b =(mLife * 100) / monstLife[mon][1];
    mBar.style.width = b +"%";
    console.log(b);
}   
