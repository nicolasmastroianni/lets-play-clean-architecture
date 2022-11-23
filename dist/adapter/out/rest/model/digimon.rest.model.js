"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigimonRestModel = void 0;
const digimon_1 = require("../../../../application/model/digimon");
const digimon_levels_1 = require("./digimon.levels");
class DigimonRestModel {
    constructor(_name, _level) {
        this._name = _name;
        this._level = _level;
    }
    get name() {
        return this._name;
    }
    get level() {
        return this._level;
    }
    toDomain() {
        return new digimon_1.Digimon(this._name, digimon_levels_1.digimonLevels.has(this.level) ? digimon_levels_1.digimonLevels.get(this.level) : -1);
    }
}
exports.DigimonRestModel = DigimonRestModel;
//# sourceMappingURL=digimon.rest.model.js.map