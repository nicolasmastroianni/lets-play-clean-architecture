import { GetPokemonByNameQuery } from "../port/in/get.pokemon.by.name.query";
import { Pokemon } from "../model/pokemon";
import { PokemonRepository } from "../port/out/pokemon.repository";
export declare class GetPokemonByNameUseCase implements GetPokemonByNameQuery {
    private readonly pokemonRepository;
    private readonly logger;
    private readonly digimons;
    constructor(pokemonRepository: PokemonRepository);
    execute(name: string): Promise<Pokemon>;
}
