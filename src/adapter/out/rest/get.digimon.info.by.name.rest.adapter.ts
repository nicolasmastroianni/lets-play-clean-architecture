import { GetDigimonInfoByNameRepository } from "../../../application/port/out/get.digimon.info.by.name.repository";
import { Digimon } from "../../../application/model/digimon";
import { Injectable, Logger } from "@nestjs/common";
import { NotFoundException } from "../../exception/not.found.exception";
import { ErrorDescription } from "../../../config/error.description";
import { getException, getStatus, UNHANDLED_EXCEPTION, UNHANDLED_REST_EXCEPTION } from "../../utils/exception.utils";
import { NotAvailableException } from "../../exception/not.available.exception";
import { HttpService } from "@nestjs/axios";
import { DigimonRestModel } from "./model/digimon.rest.model";
import { ConfigurationProperties } from "../../../config/configuration.properties";

@Injectable()
export class GetDigimonInfoByNameRestAdapter implements GetDigimonInfoByNameRepository {
  private readonly logger = new Logger(GetDigimonInfoByNameRestAdapter.name);

  private readonly exceptions = new Map([
    [400,
      new NotFoundException(ErrorDescription.NOT_FOUND)],
    [404,
      new NotFoundException(ErrorDescription.NOT_FOUND)],
    [UNHANDLED_REST_EXCEPTION,
      new NotAvailableException(ErrorDescription.UNHANDLED)]
  ]);

  constructor(private readonly httpService: HttpService,
              private readonly config: ConfigurationProperties) {
  }

  async execute(name: string): Promise<Digimon> {
    try {
      this.logger.log(`Buscando digimon con nombre : ${name}`);
      const url = this.config.digimonConfiguration.url;
      this.logger.log(`url a consultar : ${url + name}`);
      const { data } = await this.httpService.axiosRef.get(url + name);
      const [elemWithData] = data;
      const digimonModel = new DigimonRestModel(name, elemWithData?.level);
      this.logger.log(`Devolviendo digimon : ${JSON.stringify(digimonModel)}`);
      return digimonModel.toDomain();
    } catch (e) {
      this.logger.error(`Hubo un error buscando la informacion del digimon
       y el error es : ${e}`);
      const status = getStatus(e)
      console.log({status})
      throw this.exceptions.get(
        this.exceptions.has(status)
          ? status
          : UNHANDLED_REST_EXCEPTION
      );
    }
  }
}