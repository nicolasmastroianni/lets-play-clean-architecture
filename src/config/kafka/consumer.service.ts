import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";
import { ConfigurationProperties } from "src/config/configuration.properties";

@Injectable()
export class ConsumerService implements OnApplicationShutdown{
    private readonly kafka: Kafka;
    private readonly consumers: Consumer[] = [];
    
    constructor(config: ConfigurationProperties){
        this.kafka = new Kafka({ brokers: [config.kafkaConfiguration] })  
    }

    async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig){
        const consumer = this.kafka.consumer({ groupId: 'lets-play-clean-architecture' })
        await consumer.connect()
        await consumer.subscribe(topics)
        await consumer.run(config)
        this.consumers.push(consumer)
    }

   async onApplicationShutdown() {
        for(const consumer of this.consumers){
            await consumer.disconnect()
        }
   }
}