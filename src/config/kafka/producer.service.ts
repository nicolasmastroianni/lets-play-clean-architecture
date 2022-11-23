import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";
import { ConfigurationProperties } from "src/config/configuration.properties";

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown{
    private readonly kafka: Kafka
    private readonly producer: Producer

    constructor(config: ConfigurationProperties){
        this.kafka = new Kafka({ brokers: [config.kafkaConfiguration] })
        this.producer = this.kafka.producer();
    }

    async onModuleInit() {
        await this.producer.connect()
    }

    async produce(record: ProducerRecord){
        await this.producer.send(record)
    }

   async onApplicationShutdown() {
    this.producer.disconnect()   
   }
}