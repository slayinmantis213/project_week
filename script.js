console.log('gday');

let roomCount = 0;

var bgs = ["url(./img/background/dungeon_bg1.jpg)", "url(./img/background/dungeon_bg2.jpg)", 
"url(./img/background/dungeon_bg3.jpg)","url(./img/background/dungeon_bg4.jpg)" , 
"url(./img/background/dungeon_bg5.jpg)", "url(./img/background/pre_boss_room.jpg)"]

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

setInterval(addFlash, 600);
setInterval(cutFlash, 1200);

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

function rolShad(elem){
    elem.classList.add('rol-shad')
}

function remShad(elem){
    elem.classList.remove('rol-shad')
}

function roll(id){
    var dia = document.getElementById('dialogue')
    var num = Math.round(Math.random()*(19) + 1);
    id.innerText = num;
    dia.innerText = 'Your attack deals ' + num + ' damage!';
}

function eqSel(elem){
    elem.classList.add('equip-sel')
}

function move(id){
    var x = document.getElementById('content3');
    var butt = document.getElementById(id);
    x.style.opacity = 0;
    setTimeout(() => {
        x.style.backgroundImage = bgs[Math.round(Math.random() * (bgs.length-1))];
        butt.remove();
        roomCount++;
        console.log(roomCount)
    }, 500)
    setTimeout(() => {
        x.style.opacity = 1;
    }, 1000)
}
