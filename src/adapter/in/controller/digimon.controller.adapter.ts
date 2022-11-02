import { Body, Controller, HttpCode, HttpStatus, Inject, Logger, Post } from "@nestjs/common";
import { DigimonRequestBody } from "./model/digimon.request.body";
import { CreateDigimonCommand } from "../../../application/port/in/create.digimon.command";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateDigimonRequest } from "src/application/model/create.digimon.request";

@ApiTags('digimons')
@Controller('api/v1/digimons')
export class DigimonControllerAdapter {
  private readonly logger = new Logger(DigimonControllerAdapter.name);

  constructor(@Inject('createDigimonCommand') private readonly createDigimonCommand : CreateDigimonCommand){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create Digimon' })
  @ApiResponse({ status: 201, description: 'Digimon Created' })
  @ApiResponse({ status: 404, description: 'Digimon profile not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiResponse({ status: 503, description: 'Service unavailable' })
  async create(@Body() body : DigimonRequestBody) : Promise<void> {
    this.logger.log(`Creando digimon con body : ${JSON.stringify(body)}`)
    await this.createDigimonCommand.execute(this.buildRequest(body))
    this.logger.log(`Digimon creado`)
  }

  private buildRequest(body : DigimonRequestBody) : CreateDigimonRequest {
    return new CreateDigimonRequest(body.name);
  }
}