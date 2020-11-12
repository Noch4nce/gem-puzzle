export default class GemPuzzle {
    constructor(width, height, UiGemPuzzle) {
        this.width = width;
        this.height = height;
        this.gameFormat();
        this.UiGamePuzzle = UiGemPuzzle;
        if (UiGemPuzzle) UiGemPuzzle.draw(this);
    }

    gameFormat = () => {
        this.arrGemPuzzle = [];
        let number = 1;

        for (let i = 0; i < this.height; i += 1) {
            const horizontal = [];
            for (let j = 0; j < this.width; j += 1) {
                horizontal.push({
                    number,
                    isClick: false,
                });
                number += 1;
            }
            this.arrGemPuzzle.push(horizontal);
        }

        this.emptyGem = [this.height - 1, this.width - 1];
        const [column, horizontal] = this.emptyGem;
        this.arrGemPuzzle[column][horizontal] = {
            number: '*',
            isClick: false,
        };
        this.setEventClick();
    }

    setEventClick = () => {
        this.setAllClickBlocks();
        const getClickableBlocks = this.getClick();
        const getFilterBlocks = this.filterBlocks(getClickableBlocks);
        this.setIsClickable(getFilterBlocks);
    }

    setAllClickBlocks = () => {
        for (const arrBlock of this.arrGemPuzzle) {
            for (const objBlock of arrBlock) {
                objBlock.isClick = false;
            }
        }
    }

    getClick = () => {
        const [horizontal, column] = this.emptyGem;

        return [
            [horizontal - 1, column],
            [horizontal + 1, column],
            [horizontal, column - 1],
            [horizontal, column + 1],
        ];
    }

    filterBlocks = (getClickableBlocks) => {
        const clickableBlocks = [];

        for (const arrBlocks of getClickableBlocks) {
            const [firstColumn, secondColumn] = arrBlocks;
            if (firstColumn >= 0 && firstColumn < this.height
                && secondColumn >= 0 && secondColumn < this.width) {
                clickableBlocks.push(arrBlocks);
            }
        }

        return clickableBlocks;
    }

    setIsClickable = (getFilterBlocks) => {
        for (const arrBlock of getFilterBlocks) {
            const [firstColumn, secondColumn] = arrBlock;
            const block = this.arrGemPuzzle[firstColumn][secondColumn];
            block.isClick = true;
        }
    }

    handleClick = (block) => {
        const clickableCoordinate = this.getClickableCoor(block);
    }

    getClickableCoor = (block) => {
        for (let horizontal = 0; horizontal < this.height; horizontal += 1) {
            for (let column = 0; column < this.width; column += 1) {
                const currentBlock = this.arrGemPuzzle[horizontal][column];
                if (currentBlock === block) return [horizontal][column];
            }
        }

        return true;
    }
}
