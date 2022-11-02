import { Injectable } from "@nestjs/common";
import { PokemonConfiguration } from "./model/pokemon.configuration";
import { ConfigService } from "@nestjs/config";
import * as yaml from "js-yaml";
import { readFileSync } from "fs";
import { join } from "path";
import { DEFAULT_ENVIRONMENT, ENVIRONMENT, ENVIRONMENTS } from "./constants.environment";
import { DigimonConfiguration } from "./model/digimon.configuration";
import { RestClientConfiguration } from "./model/rest.client.configuration";

@Injectable()
export class ConfigurationProperties {
  private readonly pokemonConfiguration: PokemonConfiguration;
  private readonly digimonConfiguration: DigimonConfiguration;
  private readonly restClientConfiguration: RestClientConfiguration;

  constructor(private readonly configService: ConfigService) {
    const environment = configService.get<string>(ENVIRONMENT);
    const prefixConfigFile = ENVIRONMENTS.get(environment) || DEFAULT_ENVIRONMENT;
    const config = yaml.load(
      readFileSync(join(__dirname, "../../config/", `${prefixConfigFile}-config.yaml`), "utf8")
    ) as Record<string, any>;
    this.pokemonConfiguration = new PokemonConfiguration(config.service.uri.pokemon);
    this.digimonConfiguration = new DigimonConfiguration(config.service.uri.digimon);
    this.restClientConfiguration = new RestClientConfiguration(config.rest.client.default.timeout)
  }

  getPokemonConfiguration() : PokemonConfiguration{
    return this.pokemonConfiguration
  }

  getDigimonConfiguration() : DigimonConfiguration{
    return this.digimonConfiguration
  }

  getRestClientConfiguration() : RestClientConfiguration{
    return this.restClientConfiguration
  }
}