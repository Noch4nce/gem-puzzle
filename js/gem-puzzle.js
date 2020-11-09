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
    }
}
