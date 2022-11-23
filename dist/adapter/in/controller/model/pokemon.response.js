"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonResponse = void 0;
class PokemonResponse {
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
    static fromDomain(pokemon) {
        return new PokemonResponse(pokemon.name, pokemon.types, pokemon.abilities);
    }
}
exports.PokemonResponse = PokemonResponse;
//# sourceMappingURL=pokemon.response.js.map