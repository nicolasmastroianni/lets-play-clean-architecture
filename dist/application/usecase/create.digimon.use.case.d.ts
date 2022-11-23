import { CreateDigimonCommand } from "../port/in/create.digimon.command";
import { CreateDigimonRequest } from "../model/create.digimon.request";
import { GetDigimonInfoByNameRepository } from "../port/out/get.digimon.info.by.name.repository";
import { CreateDigimonRepository } from "../port/out/create.digimon.repository";
import { ProducerService } from "src/kafka/producer.service";
export declare class CreateDigimonUseCase implements CreateDigimonCommand {
    private readonly getDigimonInfoByNameRepository;
    private readonly createDigimonRepository;
    private readonly produceServices;
    private readonly logger;
    constructor(getDigimonInfoByNameRepository: GetDigimonInfoByNameRepository, createDigimonRepository: CreateDigimonRepository, produceServices: ProducerService);
    execute(command: CreateDigimonRequest): Promise<void>;
}
