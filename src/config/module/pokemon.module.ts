import { Module } from "@nestjs/common";
import { PokemonControllerAdapter } from "../../adapter/in/controller/pokemon.controller.adapter";
import { PokemonRestAdapter } from "../../adapter/out/rest/pokemon.rest.adapter";
import { GetPokemonByNameUseCase } from "../../application/usecase/get.pokemon.by.name.use.case";
import { CommonModule } from "./common.module";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    CommonModule,
    HttpModule.register({
      timeout: 5000
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