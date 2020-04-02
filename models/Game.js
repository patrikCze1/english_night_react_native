import Model from './Model';

class Game extends Model {
    constructor(id, name, date) {
        super(id);
        this._name = name;
        this._date = date;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get date() {
        return this._date;
    }

    set date(date) {
        this._date = date;
    }
}

export default Game;