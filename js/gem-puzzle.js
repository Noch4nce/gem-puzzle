/* eslint-disable no-continue */
export default class Game {
    constructor(width, height, ui, gameContainer) {
        this.width = width;
        this.height = height;
        this.ui = ui;
        this.gameContainer = gameContainer;
        this.generateGame();
        if (ui) ui.draw(this);
    }

    generateGame = () => {
        this.gameState = [];
        this.turns = 0;
        this.gameStart = new Date();
        let number = 1;
        for (let i = 0; i < this.height; i += 1) {
            const row = [];
            for (let j = 0; j < this.width; j += 1) {
                row.push({
                    number,
                    canClick: false,
                });
                number += 1;
            }
            this.gameState.push(row);
        }
        this.empty = [this.height - 1, this.width - 1];
        const [row, column] = this.empty;
        this.gameState[row][column] = {
            number: '*',
            canClick: false,
        };

        this.random();
        this.findEmptyCell();
        this.setEventClick();
    };

    random = () => {
        const getShuffled = this.setRandom();
        this.setShuffled(getShuffled);
    }

    setRandom = () => {
        const arr = this.gameState.flat();
        const shuffled = arr.sort(() => Math.random() - 0.5);

        return shuffled;
    }

    setShuffled = (shuffled) => {
        let count = 0;
        for (let horizontal = 0; horizontal < this.height; horizontal += 1) {
            for (let column = 0; column < this.width; column += 1) {
                this.gameState[horizontal][column] = shuffled[count];
                count += 1;
            }
        }
    };

    findEmptyCell = () => {
        const emptyCoor = [];

        for (let i = 0; i < this.height; i += 1) {
            for (let k = 0; k < this.width; k += 1) {
                if (this.gameState[i][k].number === '*') {
                    emptyCoor.push(i, k);
                }
            }
        }

        this.empty = emptyCoor;
    }

    setEventClick = () => {
        this.setAllUnClickable();
        const clickCoordinates = this.getClick();
        const filterCoordinates = this.filterClick(clickCoordinates);
        this.setClickable(filterCoordinates);
    };

    setAllUnClickable = () => {
        for (const row of this.gameState) {
            for (const cell of row) {
                cell.canClick = false;
            }
        }
    };

    getClick = () => {
        const [row, column] = this.empty;

        return [
            [row - 1, column],
            [row + 1, column],
            [row, column - 1],
            [row, column + 1],
        ];
    };

    filterClick = (clickCoordinates) => {
        const out = [];

        for (const coordinate of clickCoordinates) {
            const [row, column] = coordinate;
            if (row >= 0 && row < this.height && column >= 0 && column < this.width) {
                out.push(coordinate);
            }
        }

        return out;
    };

    setClickable = (filterCoordinates) => {
        for (const coordinate of filterCoordinates) {
            const [row, column] = coordinate;
            const cell = this.gameState[row][column];
            cell.canClick = true;
        }
    };

    handleClick = (cell) => {
        this.turns += 1;
        const coor2 = this.getCellCoord(cell);
        this.swapCells(this.empty, coor2);
        this.empty = coor2;
        this.setEventClick();
        this.checkIsFinished();
        this.ui.draw(this);
    }

    getCellCoord = (cell) => {
        for (let row = 0; row < this.height; row += 1) {
            for (let column = 0; column < this.width; column += 1) {
                const currentCell = this.gameState[row][column];
                if (currentCell === cell) return [row, column];
            }
        }
        return true;
    };

    swapCells = (coor1, coor2) => {
        const [row, column] = coor1;
        const [row2, column2] = coor2;
        const cell1 = this.gameState[row][column];
        const cell2 = this.gameState[row2][column2];

        this.gameState[row][column] = cell2;
        this.gameState[row2][column2] = cell1;
    }

    checkIsFinished = () => {
        if (this.checkCellsArranged() && !this.solved) {
            this.solved = true;
            this.solvedTime = new Date() - this.gameStart;
            this.gameContainer.ladder.addNewResult(this.turns, this.solvedTime);
        }
    }

    checkCellsArranged = () => {
        let count = 0;
        for (const cell of this.gameState.flat()) {
            count += 1;
            if (cell.number === '*') {
                continue;
            } else if (cell.number !== count) {
                return false;
            }
        }
        return true;
    }
}
