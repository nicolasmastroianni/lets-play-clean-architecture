import { GetPokemonByNameQuery } from "../port/in/get.pokemon.by.name.query";
import { Pokemon } from "../model/pokemon";
import { PokemonRepository } from "../port/out/pokemon.repository";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { BusinessException } from "../exception/business.exception";
import { ErrorDescription } from "../../config/error.description";

@Injectable()
export class GetPokemonByNameUseCase implements GetPokemonByNameQuery {
  private readonly logger = new Logger(GetPokemonByNameUseCase.name);

  private readonly digimons : string[] = ['agumon'];

  constructor(@Inject("pokemonRepository") private readonly pokemonRepository: PokemonRepository) {}

  async execute(name: string): Promise<Pokemon> {
    this.logger.log(`Buscando pokemon con nombre : ${name}`);
    if(this.digimons.includes(name)){
      throw new BusinessException(ErrorDescription.INCONSISTENCY_DIGIMON);
    }
    const pokemon: Pokemon = await this.pokemonRepository.get(name);
    this.logger.log(`Devolviendo pokemon : ${JSON.stringify(pokemon)}`);
    return pokemon;
  }
}