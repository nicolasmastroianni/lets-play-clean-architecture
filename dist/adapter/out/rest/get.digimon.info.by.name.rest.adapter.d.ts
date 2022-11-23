import { GetDigimonInfoByNameRepository } from "../../../application/port/out/get.digimon.info.by.name.repository";
import { Digimon } from "../../../application/model/digimon";
import { HttpService } from "@nestjs/axios";
import { ConfigurationProperties } from "../../../config/configuration.properties";
export declare class GetDigimonInfoByNameRestAdapter implements GetDigimonInfoByNameRepository {
    private readonly httpService;
    private readonly config;
    private readonly logger;
    private readonly exceptions;
    constructor(httpService: HttpService, config: ConfigurationProperties);
    execute(name: string): Promise<Digimon>;
}
