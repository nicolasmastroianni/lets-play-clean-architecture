import { Pokemon } from "src/application/model/pokemon";
import { PokemonRepository } from "../../../application/port/out/pokemon.repository";
import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { PokemonRestModel } from "./model/pokemon.rest.model";
import { NotAvailableException } from "../../exception/not.available.exception";
import {  getStatus, UNHANDLED_REST_EXCEPTION } from "../../utils/exception.utils";
import { ErrorDescription } from "../../../config/error.description";
import { NotFoundException } from "../../exception/not.found.exception";
import { ConfigurationProperties } from "../../../config/configuration.properties";

@Injectable()
export class PokemonRestAdapter implements PokemonRepository {

  private readonly logger = new Logger(PokemonRestAdapter.name);

  private readonly exceptions = new Map([
    [404,
      new NotFoundException(ErrorDescription.NOT_FOUND)],
    [UNHANDLED_REST_EXCEPTION,
      new NotAvailableException(ErrorDescription.UNHANDLED)]
  ]);

  constructor(private readonly httpService: HttpService,
              private readonly config: ConfigurationProperties) {
  }

  async get(name: string): Promise<Pokemon> {
    try {
      this.logger.log(`Buscando pokemon con nombre : ${name}`);
      const url = this.config.pokemonConfiguration.url;
      this.logger.log(`url a consultar : ${url + name}`);
      const { data } = await this.httpService.axiosRef.get(url + name);
      const pokemonModel = new PokemonRestModel(name,
        data?.types.map((elem) => elem?.type?.name),
        data?.abilities.map((elem) => elem?.ability?.name));
      this.logger.log(`Devolviendo pokemon : ${JSON.stringify(pokemonModel)}`);
      return pokemonModel.toDomain();
    } catch (e) {
      this.logger.error(`Hubo un error buscando pokemon y el error es : ${e}`);
      const status = getStatus(e)
      throw this.exceptions.get(
        this.exceptions.has(status)
          ? status
          : UNHANDLED_REST_EXCEPTION
      );
    }
  }
}
