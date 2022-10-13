import { Injectable } from "@nestjs/common";
import { PokemonConfiguration } from "./model/pokemon.configuration";
import { ConfigService } from "@nestjs/config";
import * as yaml from "js-yaml";
import { readFileSync } from "fs";
import { join } from "path";
import { DEFAULT_ENVIRONMENT, ENVIRONMENT, ENVIRONMENTS } from "./constants.environment";
import { DigimonConfiguration } from "./model/digimon.configuration";

@Injectable()
export class ConfigurationProperties {
  private readonly _pokemonConfiguration: PokemonConfiguration;
  private readonly _digimonConfiguration: DigimonConfiguration;

  constructor(private readonly configService: ConfigService) {
    const environment = configService.get<string>(ENVIRONMENT);
    const prefixConfigFile = ENVIRONMENTS.get(environment) || DEFAULT_ENVIRONMENT;
    const config = yaml.load(
      readFileSync(join(__dirname, "../../config/", `${prefixConfigFile}-config.yaml`), "utf8")
    ) as Record<string, any>;
    this._pokemonConfiguration = new PokemonConfiguration(config.service.uri.pokemon);
    this._digimonConfiguration = new DigimonConfiguration(config.service.uri.digimon);
  }

  get pokemonConfiguration() : PokemonConfiguration{
    return this._pokemonConfiguration
  }

  get digimonConfiguration() : DigimonConfiguration{
    return this._digimonConfiguration
  }
}