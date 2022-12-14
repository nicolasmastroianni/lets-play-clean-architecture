import { Module } from "@nestjs/common";
import { PokemonControllerAdapter } from "../../adapter/in/controller/pokemon.controller.adapter";
import { PokemonRestAdapter } from "../../adapter/out/rest/pokemon.rest.adapter";
import { GetPokemonByNameUseCase } from "../../application/usecase/get.pokemon.by.name.use.case";
import { CommonModule } from "./common.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigurationProperties } from "../configuration.properties";
import { KafkaModule } from "../kafka/kafka.module";
import { PokemonKafkaProducerAdapter } from "src/adapter/out/kafka/pokemon.kafka.producer.adapter";


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
    })
  ],
  controllers: [PokemonControllerAdapter],
  providers: [
    {
      useClass: PokemonRestAdapter,
      provide: "pokemonRepository"
    },
    {
      useClass: GetPokemonByNameUseCase,
      provide: "getPokemonByNameQuery"
    },
    {
      useClass: PokemonKafkaProducerAdapter,
      provide: "eventRepository"
    }]
})
export class PokemonModule {
}