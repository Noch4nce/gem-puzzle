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
        this.gameInfo(GemPuzzle);
    }

    drawBoard = (GemPuzzle) => {
        const gameBoard = this.generateGemEl('div', ['gameboard'], 'Gem-Puzzle', this.mainEl);
        for (const horizontal of GemPuzzle.arrGemPuzzle) {
            const horizontalEl = this.generateGemEl('div', ['horizontal'], null, gameBoard);
            for (const block of horizontal) {
                if (block.isClick) {
                    const clickable = this.generateGemEl('div', ['block', 'clickable'], block.number, horizontalEl);
                    clickable.addEventListener('click', () => {
                        GemPuzzle.handleClick(block);
                    });
                } else {
                    this.generateGemEl('div', ['block'], block.number, horizontalEl);
                }
            }
        }
    }

    gameInfo = (GemPuzzle) => {
        this.generateGemEl('div', ['turn'], `${GemPuzzle.turns}`, this.mainEl);
    }

    clear = () => {
        this.mainEl.innerHTML = '';
    }
}
