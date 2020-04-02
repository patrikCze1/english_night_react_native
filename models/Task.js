import Model from './Model';

class Task extends Model {
    constructor(id, gameId, title, position, completed) {
        super(id);
        this._gameId = gameId;
        this._title = title;
        this._position = position;
        this._completed = completed;
    }

    get completed() {
        return this._completed;
    }
}

export default Task;