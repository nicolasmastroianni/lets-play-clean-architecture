import { Pokemon } from "../../../../application/model/pokemon";

export class PokemonResponse {
  constructor(
    readonly name: string,
    readonly types: string[],
    readonly abilities: string[]
  ) {}

  static fromDomain(pokemon: Pokemon): PokemonResponse {
    return new PokemonResponse(
      pokemon.getName(),
      pokemon.getTypes(),
      pokemon.getAbilities()
    );
  }
}
