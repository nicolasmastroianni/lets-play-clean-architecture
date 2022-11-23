import { Pokemon } from "src/application/model/pokemon";
import { PokemonRepository } from "../../../application/port/out/pokemon.repository";
import { HttpService } from "@nestjs/axios";
import { ConfigurationProperties } from "../../../config/configuration.properties";
export declare class PokemonRestAdapter implements PokemonRepository {
    private readonly httpService;
    private readonly config;
    private readonly logger;
    private readonly exceptions;
    constructor(httpService: HttpService, config: ConfigurationProperties);
    get(name: string): Promise<Pokemon>;
}
