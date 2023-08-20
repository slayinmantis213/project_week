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

async function fade(id) {
    var x = document.getElementById(id);
    x.classList.add("fade");
    console.log('faded');

    await setTimeout(() => {
        x.remove();
        console.log('gone');
    }, 1150);
}