import { Module } from "@nestjs/common";
import { PokemonControllerAdapter } from "../../adapter/in/controller/pokemon.controller.adapter";
import { PokemonRestAdapter } from "../../adapter/out/rest/pokemon.rest.adapter";
import { GetPokemonByNameUseCase } from "../../application/usecase/get.pokemon.by.name.use.case";
import { CommonModule } from "./common.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigurationProperties } from "../configuration.properties";

@Module({
  imports: [
    CommonModule,
    HttpModule.registerAsync({
      imports:[CommonModule],
      useFactory: (config: ConfigurationProperties) => ({
        timeout: config.getRestClientConfiguration().getTimeout(),
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
    }]
})
export class PokemonModule {
}