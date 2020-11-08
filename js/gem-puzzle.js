export default class GemPuzzle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.gameFormat();
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

        console.log(this.arrGemPuzzle);
    }
}
