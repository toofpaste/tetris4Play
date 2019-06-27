class Arena {

    constructor(w, h) {

        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        this.matrix = matrix;

        this.events = new Events;

    }

    clear() {
        this.matrix.forEach(row => row.fill(0));
        this.events.emit('matrix', this.matrix);
    }

    collide(player) {
        const mat = player.matrix;
        const pos = player.pos;
        for (let y = 0; y < mat.length; ++y) {
            for (let x = 0; x < mat[y].length; ++x) {
                if (mat[y][x] !== 0 &&
                    (this[y + pos.y] &&
                        this[y + pos.y][x + pos.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    merge(player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.matrix[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
        this.events.emit('matrix', this.matrix);
    }

    sweep() {
        if (!gameOver) {
            let rowCount = 1;
            let score = 0;
            outer: for (let y = this.matrix.length - 1; y > 0; --y) {
                for (let x = 0; x < this.matrix[y].length; ++x) {
                    if (this.matrix[y][x] === 0) {
                        continue outer;
                    }
                }
                const row = this.matrix.splice(y, 1)[0].fill(0);
                this.matrix.unshift(row);
                ++y;
                score += rowCount;
            }
            this.events.emit('matrix', this.matrix);
            return score;
        }
    }
}