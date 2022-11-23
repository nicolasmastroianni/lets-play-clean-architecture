import { Module } from "@nestjs/common";
import { ConfigurationProperties } from "src/config/configuration.properties";
import { ConsumerService } from "./consumer.service";
import { ProducerService } from "./producer.service";

@Module({
    providers: [ProducerService, ConsumerService, ConfigurationProperties],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}