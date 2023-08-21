console.log('gday');

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


async function fadeTitle(id) {
    var x = document.getElementById(id);
    x.classList.add("fade");
    console.log('faded');

    await setTimeout(() => {
        x.remove();
        console.log('gone');
        addNew('win1', 'win2');
        console.log('new')
    }, 1100);
}
