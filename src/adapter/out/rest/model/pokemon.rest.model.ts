import { Pokemon } from "../../../../application/model/pokemon";

export class PokemonRestModel {
  constructor(
    private readonly _name: string,
    private readonly _types: string[],
    private readonly _abilities: string[],
  ) {}

  get name(): string {
    return this._name;
  }

  get types(): string[] {
    return this._types;
  }

  get abilities(): string[] {
    return this._abilities;
  }


  toDomain() : Pokemon {
    return new Pokemon(this._name,
      this._types,
      this._abilities)
  }

}