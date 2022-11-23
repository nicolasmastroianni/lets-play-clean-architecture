import { OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";
export declare class DigimonConsumer implements OnModuleInit {
    private readonly consumerService;
    constructor(consumerService: ConsumerService);
    onModuleInit(): Promise<void>;
}
