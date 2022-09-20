import { Controller, Get, Inject, Logger, Param } from "@nestjs/common";
import { GetPokemonByNameQuery } from "../../../application/port/in/get.pokemon.by.name.query";
import { PokemonResponse } from "./model/pokemon.response";

@Controller('api/v1/pokemons')
export class PokemonControllerAdapter {
  private readonly logger = new Logger(PokemonControllerAdapter.name);

  constructor(@Inject("getPokemonByNameQuery") private readonly getPokemonByNameQuery: GetPokemonByNameQuery) {}

  @Get('/:name')
  async get(@Param('name') name : string): Promise<PokemonResponse> {
    this.logger.log(`Obteniendo pokemon con nombre : ${name}`)
    const pokemon = await this.getPokemonByNameQuery.execute(name);
    const pokemonResponse = PokemonResponse.fromDomain(pokemon);
    this.logger.log(`Devolviendo : ${JSON.stringify(pokemonResponse)}`)
    return pokemonResponse;
  }
}