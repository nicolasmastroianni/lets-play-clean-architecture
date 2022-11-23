import { CreateDigimonRepository } from "../../../application/port/out/create.digimon.repository";
import { Digimon } from "../../../application/model/digimon";
import { Cache } from "cache-manager";
export declare class CreateDigimonCachemanagerAdapter implements CreateDigimonRepository {
    private cacheManager;
    private readonly logger;
    private KEY;
    private readonly exceptions;
    constructor(cacheManager: Cache);
    execute(digimon: Digimon): Promise<void>;
}
