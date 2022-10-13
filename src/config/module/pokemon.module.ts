import { Module } from "@nestjs/common";
import { PokemonControllerAdapter } from "../../adapter/in/controller/pokemon.controller.adapter";
import { PokemonRestAdapter } from "../../adapter/out/rest/pokemon.rest.adapter";
import { GetPokemonByNameUseCase } from "../../application/usecase/get.pokemon.by.name.use.case";
import { ConfigurationProperties } from "../configuration.properties";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "config/.env"
    }), HttpModule.register({
      timeout: 5000
    })
  ],
  controllers: [PokemonControllerAdapter],
  providers: [ConfigurationProperties,
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