import { Digimon } from "../../../../application/model/digimon";
import { digimonLevels } from "./digimon.levels";

export class DigimonRestModel{
  constructor(private readonly _name : string,
              private readonly _level : string) {}

  get name(): string {
    return this._name
  }

  get level() : string {
    return this._level
  }

  toDomain() : Digimon {
    return new Digimon(this._name,
      digimonLevels.has(this.level) ? digimonLevels.get(this.level) : -1)
}
}