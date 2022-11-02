import { Digimon } from "../../../../application/model/digimon";
import { digimonLevels } from "./digimon.levels";

export class DigimonRestModel{
  constructor(private readonly name : string,
              private readonly level : string) {}

  getName(): string {
    return this.name
  }

  getLevel() : string {
    return this.level
  }

  toDomain() : Digimon {
    return new Digimon(this.name,
      digimonLevels.has(this.level) ? digimonLevels.get(this.level) : -1)
}
}