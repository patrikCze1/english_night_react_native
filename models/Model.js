class Model {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }
}

export default Model;