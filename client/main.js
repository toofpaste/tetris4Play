const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local');
localTetris.run();
// const song = require('./audio/song.mp3');
// let music = new Audio(song);
let pause = false;
let x = document.getElementById("myAudio");

const connectionManager = new ConnectionManager(tetrisManager);

connectionManager.connect('wss://mp-tetris.herokuapp.com/');

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;
var yDown = null;
function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;

}
function handleTouchMove(evt) {
    const player = localTetris.player;
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    // console.log("-------------------------------------------");
    // console.log(xUp);
    // console.log(yUp);
    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            player.move(-1);
            /* left swipe */
        } else {
            player.move(1);
            /* right swipe */
        }
    } else {
        if (yDiff > 0) {
            player.rotate(1);
            /* up swipe */
        } else {
            player.playerSwipeDrop();
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
}
const keyListener = (e) => {
    [
        //[37, 39, 38, 69, 40],
        [65, 68, 87, 69, 83],

    ].forEach((key, index) => {
        const player = localTetris.player;
        let brookeMode = false;
        if (e.type === 'keydown') {
            if(!pause){
                x.play();
                pause = true;
            }else if(e.keyCode === 80){
                x.pause();
                pause = false;
            }
            if (e.keyCode === key[0]) {

                player.move(-1);
                //otherPlayer.move(-1);
                //otherPlayer1.move(-1);
            } else if (e.keyCode === key[1]) {
                player.move(1);
                brookeMode = true;
                player.bMode(brookeMode);
            }  else if (e.keyCode === key[2]) {
                player.rotate(-1);
            } else if (e.keyCode === key[3]) {
                player.rotate(1);
            }else if (e.keyCode === 74){
                player.freeze();
            }else if(e.keyCode === 66){
                brookeMode = true;
                player.bMode(brookeMode);
            }
    }

        if (e.keyCode === key[4]) {
            if (e.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
            }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }
    });
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
