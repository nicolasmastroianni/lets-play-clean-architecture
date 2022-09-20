import { Pokemon } from "../../model/pokemon";

export interface GetPokemonByNameQuery {
  execute(name: string) : Promise<Pokemon>;
}