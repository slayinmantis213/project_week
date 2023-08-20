console.log('gday');

var start = document.getElementById('start')

function addFlash(){
    start.classList.add("flash");
}

function cutFlash(){
    start.classList.remove("flash");
}

setInterval(addFlash, 600);
setInterval(cutFlash, 1200);

function next(id){
    let x = document.getElementById(id);
    x.remove();
}

function fade(id){
    let x = document.getElementById(id);
    x.classList.add("fade");
    console.log('faded');
    // setTimeout(next(id), 3000);
    // console.log('gone');
}

