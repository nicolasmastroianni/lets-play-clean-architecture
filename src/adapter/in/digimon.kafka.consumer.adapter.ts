import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConsumerService } from "src/config/kafka/consumer.service";

@Injectable()
export class DigimonKafkaConsumerAdapter implements OnModuleInit{
    constructor(private readonly consumerService: ConsumerService){}

    async onModuleInit() { 
        await this.consumerService.consume({ topics: ['digimon']}, {
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
