import { Body, Controller, HttpCode, HttpStatus, Inject, Logger, Post } from "@nestjs/common";
import { DigimonRequestBody } from "./model/digimon.request.body";
import { CreateDigimonCommand } from "../../../application/port/in/create.digimon.command";
import { CreateDigimonRequest } from "../../../application/model/create.digimon.request";

@Controller('api/v1/digimons')
export class DigimonControllerAdapter {
  private readonly logger = new Logger(DigimonControllerAdapter.name);

  constructor(@Inject('createDigimonCommand') private readonly createDigimonCommand : CreateDigimonCommand){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body : DigimonRequestBody) : Promise<void> {
    this.logger.log(`Creando digimon con body : ${JSON.stringify(body)}`)
    await this.createDigimonCommand.execute(this.buildRequest(body))
    this.logger.log(`Digimon creado`)
  }

  private buildRequest(body : DigimonRequestBody) : CreateDigimonRequest {
    return new CreateDigimonRequest(body.name);
  }
}