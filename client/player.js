class Player {

    constructor(tetris) {

        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;
        this.count = 0;

        this.events = new Events();

        this.tetris = tetris;
        this.arena = tetris.arena;
        //this.id =
        this.dropCounter = 0;
        this.dropInterval = 1000;

        this.pos = {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;

        this.reset();
    }

    move(dir) {
        this.pos.x += dir;
        if (this.arena.collide(this)) {
            this.pos.x -= dir;
            return;
        }
        this.events.emit('pos', this.pos);
    }

    reset() {
        let pieces = 'TJLOSZI';
        this.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
        this.pos.y = 0;
        this.pos.x = (this.arena.matrix[0].length / 2 | 0) -
        (this.matrix[0].length / 2 | 0);
        if (this.arena.collide(this)) {
            // Game Over
            this.arena.clear();
            this.score = 0;
            this.events.emit('score', this.score);
        }
        this.events.emit('pos', this.pos);
        this.events.emit('matrix', this.matrix);
    }

    rotate(dir) {
        const pos = this.pos.x;
        let offset = 1;
        this._rotateMatrix(this.matrix, dir);
        while (this.arena.collide(this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length) {
                this._rotateMatrix(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
        this.events.emit('matrix', this.matrix);
    }
    freeze(){

        this.matrix = this.createPiece('I');
        this.pos.y = 16;
        this.pos.x = -1 + this.count;
        if(this.count === 11){
            this.count = 0;
        }else this.count += 1;
        //this.count += 1;
        this.score += 10000;
    }
    spin(player2){
        player2.rotate(1);
    }

    createPiece(type) {
       if (type === 'I') {
           return [
               [0, 1, 0, 0],
               [0, 1, 0, 0],
               [0, 1, 0, 0],
               [0, 1, 0, 0],
           ];
       } else if (type === 'L') {
           return [
               [0, 2, 0],
               [0, 2, 0],
               [0, 2, 2],
           ];
       } else if (type === 'J') {
           return [
               [0, 3, 0],
               [0, 3, 0],
               [3, 3, 0],
           ];
       } else if (type === 'O') {
           return [
               [4, 4],
               [4, 4],
           ];
       } else if (type === 'Z') {
           return [
               [5, 5, 0],
               [0, 5, 5],
               [0, 0, 0],
           ];
       } else if (type === 'S') {
           return [
               [0, 6, 6],
               [6, 6, 0],
               [0, 0, 0],
           ];
       } else if (type === 'T') {
           return [
               [0, 7, 0],
               [7, 7, 7],
               [0, 0, 0],
           ];
       } else if (type === 'W') {
           return [
               [0, 8, 0],
               [8, 0, 8],
               [0, 8, 0],
           ];
       } else if (type === 'X') {
           return [
               [9, 0, 9],
               [0, 0, 0],
               [9, 0, 9],
           ];
       } else if (type === 'Y') {
           return [
               [10, 0, 10],
               [0, 10, 0],
               [0, 10, 0],
           ];
       } else if (type === 'Q') {
           return [
               [11, 11, 0],
               [0, 0, 0],
               [0, 11, 11],
           ];
       } else if (type === 'E') {
           return [
               [0, 12, 12],
               [0, 0, 0],
               [0, 12, 12],
           ];
       } else if (type === 'K') {
           return [
               [0, 13, 13],
               [0, 0, 0],
               [13, 13, 0],
           ];
    }

    drop() {
        this.pos.y++;
        this.dropCounter = 0;
        if (this.arena.collide(this)) {
            this.pos.y--;
            this.arena.merge(this);
            this.reset();
            this.score += this.arena.sweep();
            this.events.emit('score', this.score);
            return;
        }
        this.events.emit('pos', this.pos);

    }

    _rotateMatrix(matrix, dir) {
        for (let y = 0; y < this.matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    this.matrix[x][y],
                    this.matrix[y][x],
                ] = [
                    this.matrix[y][x],
                    this.matrix[x][y],
                ];
            }
        }

        if (dir > 0) {
            this.matrix.forEach(row => row.reverse());
        } else {
            this.matrix.reverse();
        }
    }

    update(deltaTime) {
        this.dropCounter += deltaTime;
        if(this.dropCounter > this.dropInterval) {
            this.drop();

        }
    }
}
