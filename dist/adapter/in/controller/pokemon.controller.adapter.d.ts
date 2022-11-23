import { GetPokemonByNameQuery } from "../../../application/port/in/get.pokemon.by.name.query";
import { PokemonResponse } from "./model/pokemon.response";
export declare class PokemonControllerAdapter {
    private readonly getPokemonByNameQuery;
    private readonly logger;
    constructor(getPokemonByNameQuery: GetPokemonByNameQuery);
    get(name: string): Promise<PokemonResponse>;
}
