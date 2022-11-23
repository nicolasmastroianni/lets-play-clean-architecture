"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
class Pokemon {
    constructor(_name, _types, _abilities) {
        this._name = _name;
        this._types = _types;
        this._abilities = _abilities;
    }
    get name() {
        return this._name;
    }
    get types() {
        return this._types;
    }
    get abilities() {
        return this._abilities;
    }
}
exports.Pokemon = Pokemon;
//# sourceMappingURL=pokemon.js.map