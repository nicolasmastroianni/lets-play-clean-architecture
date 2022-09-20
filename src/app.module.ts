import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { PokemonRestAdapter } from "./adapter/out/rest/pokemon.rest.adapter";
import { GetPokemonByNameUseCase } from "./application/usecase/get.pokemon.by.name.use.case";
import { PokemonControllerAdapter } from "./adapter/in/controller/pokemon.controller.adapter";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./config/all.exceptions.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "config/.env"
    }), HttpModule.register({
      timeout: 5000
    })],
  controllers: [PokemonControllerAdapter],
  providers: [GetPokemonByNameUseCase,
    PokemonRestAdapter,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      useClass: PokemonRestAdapter,
      provide: "pokemonRepository"
    },
    {
      useClass: GetPokemonByNameUseCase,
      provide: "getPokemonByNameQuery"
    },
  ]
})
export class AppModule {
}
