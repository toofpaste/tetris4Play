const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local');
localTetris.run();

const connectionManager = new ConnectionManager(tetrisManager);

connectionManager.connect('wss://mp-tetris.herokuapp.com/');


document.addEventListener('keydown', event => {
    if (event.keyCode === 37) { // left arrow
        player.move(-1);
    } else if (event.keyCode === 39) { // right arrow
        player.move(1);
    } else if (event.keyCode === 40) { // Down arrow
        player.drop();
    } else if (event.keyCode === 38) { // Up arrow
        player.rotate(1);
        rotatePlayer.play();
    } else if (event.keyCode === 80) { // P button
        pause = !pause;
        musicPlayer.play();
        player.update();
    } else if (event.keyCode === 66) { // B button
        brookeMode = !brookeMode;
        updateScore();
    } else if (event.keyCode === 192) { // ~ button
        artMode = !artMode;
        tetris.updateScore();
    } else if (event.keyCode === 54) { // 6 Key
        insaneMode = !insaneMode;
        tetris.updateScore();
    } else if (event.keyCode === 32) { // space bar
        if (gameOver) {
            newGame();  // Probably doesnt' exist yet
        }
    } else if (event.keyCode === 72) { // H key
        hardMode = !hardMode;
    }

});

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
