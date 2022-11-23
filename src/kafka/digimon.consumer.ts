import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "./consumer.service";

@Injectable()
export class DigimonConsumer implements OnModuleInit{
    constructor(private readonly consumerService: ConsumerService){}

    async onModuleInit() { 
        await this.consumerService.consume({ topics: ['Digimon']}, {
            eachMessage: async ({topic, partition, message}) => {
                console.log({
                    value: message.value.toString(),
                    topic: topic.toString(),
                    partition: partition.toString()
                })
            }}
        )
    }
}
