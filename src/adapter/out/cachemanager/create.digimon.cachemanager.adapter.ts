import { CreateDigimonRepository } from "../../../application/port/out/create.digimon.repository";
import { Digimon } from "../../../application/model/digimon";
import { CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import { Cache } from "cache-manager";
import { getException, UNHANDLED_EXCEPTION } from "../../utils/exception.utils";
import { NotAvailableException } from "../../exception/not.available.exception";
import { ErrorDescription } from "../../../config/error.description";

@Injectable()
export class CreateDigimonCachemanagerAdapter implements CreateDigimonRepository {

  private readonly logger = new Logger(CreateDigimonCachemanagerAdapter.name);
  private KEY = "digimon:";

  private readonly exceptions = new Map([
    [UNHANDLED_EXCEPTION,
      new NotAvailableException(ErrorDescription.UNHANDLED)]
  ]);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
  }

  async execute(digimon: Digimon): Promise<void> {
    try {
      this.logger.log(`Creando digimon : ${JSON.stringify(digimon)}`);
      await this.cacheManager.set(this.KEY + digimon.getName(), digimon, { ttl: 39600 });
      this.logger.log(`Digimon creado`);
    } catch (e) {
      this.logger.error(`Hubo un error creando el digimon y el error es : ${e}`);
      throw this.exceptions.get(
        this.exceptions.has(getException(e))
          ? getException(e)
          : UNHANDLED_EXCEPTION
      );
    }
  }
}