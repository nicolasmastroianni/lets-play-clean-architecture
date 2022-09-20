import { Pokemon } from "../../../../application/model/pokemon";

export class PokemonResponse{
  constructor(
    private readonly _name: string,
    private readonly _types: string[],
    private readonly _abilities: string[]
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

  static fromDomain(pokemon : Pokemon) : PokemonResponse {
    return new PokemonResponse(
      pokemon.name,
      pokemon.types,
      pokemon.abilities
    );
  }
}