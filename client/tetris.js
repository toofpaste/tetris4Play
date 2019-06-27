class Tetris {

    constructor(element) {

        this.element = element;
        this.canvas = element.querySelector('canvas');

        this.context = this.canvas.getContext('2d');
        this.context.scale(20, 20);

        this.arena = new Arena(12, 20);
        this.player = new Player(this);

        this.player.events.listen('score', score => {
            this.updateScore(score);
        });



        //
        // this.colors = [
        //     null,
        //     '#A4A4A4',
        //     '#BDBDBD',
        //     '#848484',
        //     '#D8D8D8',
        //     '#E6E6E6',
        //     '#F2F2F2',
        //     '#6E6E6E',
        // ];

        this.colors = [
            null,
            '#F5A9A9',
            '#BCF5A9',
            '#8181F7',
            '#F5A9F2',
            '#F7819F',
            '#81F7F3',
            '#F2F5A9',
        ];

        let lastTime = 0;

        this._update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            this.player.update(deltaTime);

            this.draw();
            requestAnimationFrame(this._update);
        }


        this.updateScore(0);

    }

    draw() {
        this.context.fillStyle = '#A4A4A4';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


        this.drawMatrix(this.arena.matrix, {x: 0, y: 0});
        this.drawMatrix(this.player.matrix, this.player.pos);
    }
    randomColor() {
        var h = Math.round(Math.random() * 360);
        var color = "hsl(" + h + ", 50%, 80%)";
        // hsl(360, 100%, 100%);
        return color;
    };
    brokeMode(tf){
        this.context.fillStyle = this.randomColor();
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    }

    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value !== 0) {
                    this.context.fillStyle = this.colors[value];
                    this.context.fillRect(x + offset.x,
                                     y + offset.y,
                                     1, 1);
                    //this.context.setAttribute("style", "stroke:#FFFFF");
                }
            });
        });
    }

    run() {
        this._update();
    }

    updateScore(score) {
        this.element.querySelector('.score').innerText = score;
    }

    serialize() {
        return {
            arena: {
                matrix: this.arena.matrix,
            },
            player: {
                matrix: this.player.matrix,
                pos: this.player.pos,
                score: this.player.score,
            },
        };
    }

    unserialize(state) {
        this.arena = Object.assign(state.arena);
        this.player = Object.assign(state.player);
        this.updateScore(this.player.score);
        this.draw();
    }

}
