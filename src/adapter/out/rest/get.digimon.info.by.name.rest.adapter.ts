import { GetDigimonInfoByNameRepository } from "../../../application/port/out/get.digimon.info.by.name.repository";
import { Digimon } from "../../../application/model/digimon";
import { Injectable, Logger } from "@nestjs/common";
import { NotFoundException } from "../../exception/not.found.exception";
import { ErrorDescription } from "../../../config/error.description";
import { getException, UNHANDLED_EXCEPTION } from "../../utils/exception.utils";
import { NotAvailableException } from "../../exception/not.available.exception";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { DigimonRestModel } from "./model/digimon.rest.model";

@Injectable()
export class GetDigimonInfoByNameRestAdapter implements GetDigimonInfoByNameRepository {
  private readonly logger = new Logger(GetDigimonInfoByNameRestAdapter.name);

  private readonly exceptions = new Map([
    ["AxiosError",
      new NotFoundException(ErrorDescription.NOT_FOUND)],
    [UNHANDLED_EXCEPTION,
      new NotAvailableException(ErrorDescription.UNHANDLED)]
  ]);

  constructor(private readonly httpService: HttpService,
              private readonly config: ConfigService) {
  }

  async execute(name: string): Promise<Digimon> {
    try {
      this.logger.log(`Buscando digimon con nombre : ${name}`);
      const url = this.config.get("URL_DIGIMON");
      this.logger.log(`url a consultar : ${url + name}`);
      const { data } = await this.httpService.axiosRef.get(url + name);
      const [elemWithData] = data;
      const digimonModel = new DigimonRestModel(name, elemWithData?.level);
      this.logger.log(`Devolviendo digimon : ${JSON.stringify(digimonModel)}`)
      return digimonModel.toDomain()
    } catch (e) {
      this.logger.error(`Hubo un error buscando la informacion del digimon
       y el error es : ${e}`);
      throw this.exceptions.get(
        this.exceptions.has(getException(e))
          ? getException(e)
          : UNHANDLED_EXCEPTION
      );
    }
  }
}