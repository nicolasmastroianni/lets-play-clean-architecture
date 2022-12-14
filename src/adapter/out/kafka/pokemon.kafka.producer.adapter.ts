import { Injectable, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";
import { Digimon } from "src/application/model/digimon";
import { EventRepository } from "src/application/port/out/event.repository";
import { ConfigurationProperties } from "src/config/configuration.properties";
import { DigimonKafkaModel } from "./model/digimon.kafka.model";
import { TypeEvent } from "./model/type.event";

@Injectable()
export class PokemonKafkaProducerAdapter implements OnModuleInit, OnApplicationShutdown, EventRepository{
    private readonly kafka: Kafka
    private readonly producer: Producer

    constructor(config: ConfigurationProperties){
        this.kafka = new Kafka({ brokers: [config.kafkaConfiguration] })
        this.producer = this.kafka.producer();
    }

    async onModuleInit() {
        await this.producer.connect()
    }

    async create(object: Digimon){
        const digimon: DigimonKafkaModel = new DigimonKafkaModel(object.name, object.level, TypeEvent.create)
        await this.producer.send({ topic: 'pokemon', messages: [{ value: JSON.stringify(digimon)}] } )
    }

    async update(object: Digimon){
        const digimon: DigimonKafkaModel = new DigimonKafkaModel(object.name, object.level, TypeEvent.update)
        await this.producer.send({ topic: 'pokemon', messages: [{ value: JSON.stringify(digimon)}] } )
    }

    async delete(object: Digimon){
        const digimon: DigimonKafkaModel = new DigimonKafkaModel(object.name, object.level, TypeEvent.delete)
        await this.producer.send({ topic: 'pokemon', messages: [{ value: JSON.stringify(digimon)}] } )
    }

    async get(object: Digimon){
        const digimon: DigimonKafkaModel = new DigimonKafkaModel(object.name, object.level, TypeEvent.get)
        await this.producer.send({ topic: 'pokemon', messages: [{ value: JSON.stringify(digimon)}] } )
    }

   async onApplicationShutdown() {
    this.producer.disconnect()   
   }
}
