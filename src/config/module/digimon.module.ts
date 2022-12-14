import { CacheModule, Module } from "@nestjs/common";
import { DigimonControllerAdapter } from "../../adapter/in/controller/digimon.controller.adapter";
import { CreateDigimonCachemanagerAdapter } from "../../adapter/out/cachemanager/create.digimon.cachemanager.adapter";
import { GetDigimonInfoByNameRestAdapter } from "../../adapter/out/rest/get.digimon.info.by.name.rest.adapter";
import { CreateDigimonUseCase } from "../../application/usecase/create.digimon.use.case";
import { CommonModule } from "./common.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigurationProperties } from "../configuration.properties";
import { KafkaModule } from "../kafka/kafka.module";
import { DigimonKafkaConsumerAdapter } from "src/adapter/in/digimon.kafka.consumer.adapter";
import { DigimonKafkaProducerAdapter } from "src/adapter/out/kafka/digimon.kafka.producer.adapter";


@Module({
  imports: [
    KafkaModule,
    CommonModule,
    HttpModule.registerAsync({
      imports:[CommonModule],
      useFactory: (config: ConfigurationProperties) => ({
        timeout: config.restClientConfiguration.timeout,
      }),
      inject: [ConfigurationProperties],
    }),
    CacheModule.register()
  ],
  controllers: [DigimonControllerAdapter],
  providers: [
    {
      useClass: CreateDigimonCachemanagerAdapter,
      provide: "createDigimonRepository"
    },
    {
      useClass: GetDigimonInfoByNameRestAdapter,
      provide: "getDigimonInfoByNameRepository"
    },
    {
      useClass: CreateDigimonUseCase,
      provide: "createDigimonCommand"
    },
    {
      useClass: DigimonKafkaProducerAdapter,
      provide: "eventRepository"
    },
    DigimonKafkaConsumerAdapter]
})
export class DigimonModule {
}