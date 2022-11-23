import { DigimonRequestBody } from "./model/digimon.request.body";
import { CreateDigimonCommand } from "../../../application/port/in/create.digimon.command";
export declare class DigimonControllerAdapter {
    private readonly createDigimonCommand;
    private readonly logger;
    constructor(createDigimonCommand: CreateDigimonCommand);
    create(body: DigimonRequestBody): Promise<void>;
    private buildRequest;
}
