import { Controller, Get, HttpCode, HttpStatus, Inject, Logger, Param } from "@nestjs/common";
import { GetPokemonByNameQuery } from "../../../application/port/in/get.pokemon.by.name.query";
import { PokemonResponse } from "./model/pokemon.response";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('pokemons')
@Controller('api/v1/pokemons')
export class PokemonControllerAdapter {
  private readonly logger = new Logger(PokemonControllerAdapter.name);

  constructor(@Inject("getPokemonByNameQuery") private readonly getPokemonByNameQuery: GetPokemonByNameQuery) {}

  @Get('/:name')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Pokemon by name' })
  @ApiResponse({ status: 200, description: 'Pokemon found' })
  @ApiResponse({ status: 404, description: 'Pokemon not found' })
  @ApiResponse({ status: 409, description: 'Business Error' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiResponse({ status: 503, description: 'Service unavailable' })
  async get(@Param('name') name : string): Promise<PokemonResponse> {
    this.logger.log(`Obteniendo pokemon con nombre : ${name}`)
    const pokemon = await this.getPokemonByNameQuery.execute(name);
    const pokemonResponse = PokemonResponse.fromDomain(pokemon);
    this.logger.log(`Devolviendo : ${JSON.stringify(pokemonResponse)}`)
    return pokemonResponse;
  }
}