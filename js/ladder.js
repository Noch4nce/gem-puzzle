function set(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
}

function get(name, subst = null) {
    return JSON.parse(window.localStorage.getItem(name) || subst);
}

export default class Ladder {
    constructor() {
        this.state = get('ladder', '[]');
        this.max = 10;
    }

    addNewResult = (moves, time) => {
        this.state.push({ moves, time });
        this.state.sort((a, b) => {
            if (a.moves === b.moves) {
                return a.time - b.time;
            }
            return a.moves - b.moves;
        });
        while (this.state.length > this.max) {
            this.state.pop();
        }

        set('ladder', this.state);
    }
}
