import { Inject, Injectable, Logger } from "@nestjs/common";
import { CreateDigimonCommand } from "../port/in/create.digimon.command";
import { CreateDigimonRequest } from "../model/create.digimon.request";
import { Digimon } from "../model/digimon";
import { GetDigimonInfoByNameRepository } from "../port/out/get.digimon.info.by.name.repository";
import { CreateDigimonRepository } from "../port/out/create.digimon.repository";
import { ProducerService } from "src/kafka/producer.service";

@Injectable()
export class CreateDigimonUseCase implements CreateDigimonCommand {
  private readonly logger = new Logger(CreateDigimonUseCase.name);

  constructor(@Inject("getDigimonInfoByNameRepository") private readonly getDigimonInfoByNameRepository: GetDigimonInfoByNameRepository,
              @Inject("createDigimonRepository") private readonly createDigimonRepository: CreateDigimonRepository,
              private readonly produceServices: ProducerService) {
  }

  async execute(command: CreateDigimonRequest): Promise<void> {
    this.logger.log(`Iniciando caso de uso para creacion de digimon : ${JSON.stringify(command)}`);
    const digimonToCreate: Digimon = await this.getDigimonInfoByNameRepository.execute(command.name);
    await this.createDigimonRepository.execute(digimonToCreate);
    this.logger.log(`Comenzando creacion por kafka`);
    await this.produceServices.produce({
      topic: 'Digimon',
      messages: [{
        key: 'asd',
        value: digimonToCreate.name + digimonToCreate.level
      }]
    })
    this.logger.log(`Finalizacion creacion por kafka`);
    this.logger.log(`Digimon creado exitosamente`);
  }
}