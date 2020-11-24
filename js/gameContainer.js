import Game from './gem-puzzle';
import Ui from './gem-ui';
import Ladder from './ladder';

export default class GameContainer {
    constructor() {
        this.ui = new Ui('rootEl', this);
        this.width = 4;
        this.height = 4;
        this.soundEnabled = false;
        this.ladder = new Ladder();
        this.startGame();
    }

    startGame = () => {
        this.gameMain = new Game(this.width, this.height, this.ui, this);
    }
}
