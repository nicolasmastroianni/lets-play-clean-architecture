"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonRestModel = void 0;
const pokemon_1 = require("../../../../application/model/pokemon");
class PokemonRestModel {
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
    toDomain() {
        return new pokemon_1.Pokemon(this._name, this._types, this._abilities);
    }
}
exports.PokemonRestModel = PokemonRestModel;
//# sourceMappingURL=pokemon.rest.model.js.map