export default class Ui {
    constructor(rootEl, gameContainer) {
        this.rootEl = document.createElement('div');
        this.gameContainer = gameContainer;
        document.body.appendChild(this.rootEl);
    }

    generateEl = (tag, classes, text, parent) => {
        const el = document.createElement(tag);
        for (const c of classes) {
            el.classList.add(c);
        }
        if (text) {
            el.innerHTML = text;
        }
        if (parent) {
            parent.appendChild(el);
        }
        return el;
    }

    draw = (game) => {
        this.clear();
        this.drawBoard(game);
        this.addGameInfo(game);
        this.addGameControls(game);
        this.drawLadder();
    }

    drawBoard = (game) => {
        const gameBoard = this.generateEl('div', ['gameboard'], 'Gem-puzzle', this.rootEl);
        for (const row of game.gameState) {
            const rowEl = this.generateEl('div', ['row'], null, gameBoard);
            for (const cell of row) {
                if (cell.canClick && !game.solved) {
                    const clickable = this.generateEl('div', ['cell', 'clickable'], cell.number, rowEl);
                    clickable.addEventListener('click', () => {
                        if (this.gameContainer.soundEnabled) {
                            this.playAudio();
                        }
                        game.handleClick(cell);
                    });
                } else if (cell.number === '*') {
                    this.generateEl('div', ['cell', 'empty'], cell.number, rowEl);
                } else {
                    this.generateEl('div', ['cell'], cell.number, rowEl);
                }
            }
        }
    }

    addGameInfo = (game) => {
        this.generateEl('div', ['turns'], `Turn: ${game.turns}`, this.rootEl);
        this.gameStart = game.gameStart;
        this.zero();
        this.timerEl = this.generateEl('div', ['time'], this.formatTime(game), this.rootEl);
        if (game.solved) {
            this.generateEl('h2', ['finish'], `You won! Turn: ${game.turns} ${this.formatTime(game)}`, this.rootEl);
        } else {
            this.timer = setInterval(this.updTime);
        }
    }

    addGameControls = (game) => {
        this.addStartBtn();
        this.addGridControls();
        this.addSoundControl(game);
    }

    addStartBtn = () => {
        const startBtn = this.generateEl('div', ['start'], 'Start Game', this.rootEl);
        startBtn.addEventListener('click', () => {
            this.gameContainer.startGame();
        });
    }

    addGridControls = () => {
        const wrapper = this.generateEl('div', ['wrapper_field'], '', this.rootEl);
        this.addGridControlBtn(-1, 'width', 3, 8, wrapper);
        this.generateEl('div', ['width'], `${this.gameContainer.width}`, wrapper);
        this.addGridControlBtn(1, 'width', 3, 8, wrapper);
        this.addGridControlBtn(-1, 'height', 3, 8, wrapper);
        this.generateEl('div', ['height'], `${this.gameContainer.height}`, wrapper);
        this.addGridControlBtn(1, 'height', 3, 8, wrapper);
    }

    addGridControlBtn = (operation, attribute, min, max, wrapper) => {
        const currentValue = this.gameContainer[attribute];
        const nextValue = currentValue + operation;
        const text = operation > 0 ? '+' : '-';
        const btn = this.generateEl('span', ['operation'], text, wrapper);

        if (nextValue >= min && nextValue <= max) {
            btn.addEventListener('click', () => {
                this.gameContainer[attribute] = nextValue;
                this.gameContainer.startGame();
            });
        }
    }

    playAudio = () => {
        const url = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3';
        new Audio(url).play();
    }

    addSoundControl = (game) => {
        const text = this.gameContainer.soundEnabled ? 'mute' : 'unmute';
        const btn = this.generateEl('div', ['mute'], text, this.rootEl);
        btn.addEventListener('click', () => {
            this.gameContainer.soundEnabled = !this.gameContainer.soundEnabled;
            this.draw(game);
        });
    }

    drawLadder = () => {
        const { state } = this.gameContainer.ladder;
        const results = this.generateEl('div', ['ladder'], 'Best Result', this.rootEl);

        for (const result of state) {
            this.generateEl('div', ['score'], `Turn: ${result.moves} Time: ${parseInt((result.time / 3600 / 60 / 24) % 24, 10)}h ${parseInt((result.time / 1000 / 60) % 60, 10)}m ${parseInt((result.time / 1000) % 60, 10)}s`, results);
        }
    }

    updTime = () => {
        this.timerEl.innerHTML = this.formatTime();
    }

    zero = (number) => (parseInt(number, 10) < 10 ? '0' : '') + number

    formatTime = (game) => {
        let delta;
        if (game && game.solved) {
            delta = game.solvedTime;
        } else {
            const currnetTime = new Date();
            delta = currnetTime - this.gameStart;
        }

        const h = parseInt((delta / 3600 / 60 / 24) % 24, 10);
        const m = parseInt((delta / 1000 / 60) % 60, 10);
        const s = parseInt((delta / 1000) % 60, 10);

        return `Time: ${this.zero(h)}:${this.zero(m)}:${this.zero(s)}`;
    }

    clear = () => {
        this.rootEl.innerHTML = '';
        if (this.timer) clearInterval(this.timer);
    };
}
