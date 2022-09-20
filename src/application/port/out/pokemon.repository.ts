import { Pokemon } from "../../model/pokemon";

export interface PokemonRepository {
  get(name : string) : Promise<Pokemon>;
}