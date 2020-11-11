export default class GemUi {
    constructor(mainEl) {
        this.mainEl = document.createElement('div');
        document.body.appendChild(this.mainEl);
        console.log(mainEl);
    }

    generateGemEl = (tag, className, value, parent) => {
        const tagEl = document.createElement(tag);
        for (const c of className) {
            tagEl.classList.add(c);
        }
        if (value) {
            tagEl.innerHTML = value;
        }
        if (parent) {
            parent.appendChild(tagEl);
        }
        return tagEl;
    }

    draw = (GemPuzzle) => {
        this.clear();
        this.drawBoard(GemPuzzle);
    }

    drawBoard = (GemPuzzle) => {
        const gameBoard = this.generateGemEl('div', ['gameboard'], 'Gem-Puzzle', this.mainEl);
        for (const horizontal of GemPuzzle.arrGemPuzzle) {
            const horizontalEl = this.generateGemEl('div', ['horizontal'], null, gameBoard);
            for (const column of horizontal) {
                if (column.isClick) {
                    this.generateGemEl('div', ['column', 'clickable'], column.number, horizontalEl);
                } else {
                    this.generateGemEl('div', ['column'], column.number, horizontalEl);
                }
            }
        }
    }

    clear = () => {
        this.mainEl.innerHTML = '';
    }
}
