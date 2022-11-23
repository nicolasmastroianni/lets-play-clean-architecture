import { PokemonConfiguration } from "./model/pokemon.configuration";
import { ConfigService } from "@nestjs/config";
import { DigimonConfiguration } from "./model/digimon.configuration";
import { RestClientConfiguration } from "./model/rest.client.configuration";
export declare class ConfigurationProperties {
    private readonly configService;
    private readonly _pokemonConfiguration;
    private readonly _digimonConfiguration;
    private readonly _restClientConfiguration;
    constructor(configService: ConfigService);
    get pokemonConfiguration(): PokemonConfiguration;
    get digimonConfiguration(): DigimonConfiguration;
    get restClientConfiguration(): RestClientConfiguration;
}
