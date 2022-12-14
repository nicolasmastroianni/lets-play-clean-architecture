import { Module } from "@nestjs/common";
import { ConfigurationProperties } from "src/config/configuration.properties";
import { ConsumerService } from "./consumer.service";
import { DigimonKafkaProducerAdapter } from "../../adapter/out/kafka/digimon.kafka.producer.adapter";
import { PokemonKafkaProducerAdapter } from "src/adapter/out/kafka/pokemon.kafka.producer.adapter";

@Module({
    providers: [DigimonKafkaProducerAdapter, PokemonKafkaProducerAdapter, ConsumerService, ConfigurationProperties],
    exports: [DigimonKafkaProducerAdapter, PokemonKafkaProducerAdapter, ConsumerService],
})
export class KafkaModule {}