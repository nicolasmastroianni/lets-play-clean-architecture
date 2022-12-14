import { Inject, Injectable, Logger } from "@nestjs/common";
import { CreateDigimonCommand } from "../port/in/create.digimon.command";
import { CreateDigimonRequest } from "../model/create.digimon.request";
import { Digimon } from "../model/digimon";
import { GetDigimonInfoByNameRepository } from "../port/out/get.digimon.info.by.name.repository";
import { CreateDigimonRepository } from "../port/out/create.digimon.repository";
import { EventRepository } from "../port/out/event.repository";

@Injectable()
export class CreateDigimonUseCase implements CreateDigimonCommand {
  private readonly logger = new Logger(CreateDigimonUseCase.name);

  constructor(@Inject("getDigimonInfoByNameRepository") private readonly getDigimonInfoByNameRepository: GetDigimonInfoByNameRepository,
              @Inject("createDigimonRepository") private readonly createDigimonRepository: CreateDigimonRepository,
              @Inject("eventRepository") private readonly eventRepository: EventRepository) {
  }

  async execute(command: CreateDigimonRequest): Promise<void> {
    this.logger.log(`Iniciando caso de uso para creacion de digimon : ${JSON.stringify(command)}`);
    const digimonToCreate: Digimon = await this.getDigimonInfoByNameRepository.execute(command.name);
    await this.createDigimonRepository.execute(digimonToCreate);
    await this.eventRepository.create(digimonToCreate)
    this.logger.log(`Digimon creado exitosamente`);
  }
}