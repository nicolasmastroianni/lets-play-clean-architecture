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
  private readonly _pokemonConfiguration: PokemonConfiguration;
  private readonly _digimonConfiguration: DigimonConfiguration;
  private readonly _restClientConfiguration: RestClientConfiguration;
  private readonly _kafkaConfiguration: string;

  constructor(private readonly configService: ConfigService) {
    const environment = configService.get<string>(ENVIRONMENT);
    const prefixConfigFile = ENVIRONMENTS.get(environment) || DEFAULT_ENVIRONMENT;
    const config = yaml.load(
      readFileSync(join(__dirname, "../../config/", `${prefixConfigFile}-config.yaml`), "utf8")
    ) as Record<string, any>;
    this._pokemonConfiguration = new PokemonConfiguration(config.service.uri.pokemon);
    this._digimonConfiguration = new DigimonConfiguration(config.service.uri.digimon);
    this._restClientConfiguration = new RestClientConfiguration(config.rest.client.default.timeout)
    this._kafkaConfiguration = `${config.dataBase.kafkaUrl}:${config.dataBase.kafkaPort}`
  }

  get pokemonConfiguration() : PokemonConfiguration{
    return this._pokemonConfiguration
  }

  get digimonConfiguration() : DigimonConfiguration{
    return this._digimonConfiguration
  }

  get restClientConfiguration() : RestClientConfiguration{
    return this._restClientConfiguration
  }

  get kafkaConfiguration() : string{
    return this._kafkaConfiguration
  }
}