import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { PokemonRestAdapter } from "./adapter/out/rest/pokemon.rest.adapter";
import { GetPokemonByNameUseCase } from "./application/usecase/get.pokemon.by.name.use.case";
import { PokemonControllerAdapter } from "./adapter/in/controller/pokemon.controller.adapter";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./config/all.exceptions.filter";
import { CreateDigimonUseCase } from "./application/usecase/create.digimon.use.case";
import { CreateDigimonCachemanagerAdapter } from "./adapter/out/cachemanager/create.digimon.cachemanager.adapter";
import { GetDigimonInfoByNameRestAdapter } from "./adapter/out/rest/get.digimon.info.by.name.rest.adapter";
import { DigimonControllerAdapter } from "./adapter/in/controller/digimon.controller.adapter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "config/.env"
    }), HttpModule.register({
      timeout: 5000
    }), CacheModule.register()],
  controllers: [PokemonControllerAdapter, DigimonControllerAdapter],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      useClass: CreateDigimonCachemanagerAdapter,
      provide: "createDigimonRepository"
    },
    {
      useClass: GetDigimonInfoByNameRestAdapter,
      provide: "getDigimonInfoByNameRepository"
    },
    {
      useClass: PokemonRestAdapter,
      provide: "pokemonRepository"
    },
    {
      useClass: GetPokemonByNameUseCase,
      provide: "getPokemonByNameQuery"
    },
    {
      useClass: CreateDigimonUseCase,
      provide: "createDigimonCommand"
    },
  ]
})
export class AppModule {
}
