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
