import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./config/all.exceptions.filter";
import { PokemonModule } from "./config/module/pokemon.module";
import { DigimonModule } from "./config/module/digimon.module";
import { ConfigurationProperties } from "./config/configuration.properties";

@Module({
  imports: [PokemonModule, DigimonModule],
  providers: [
    ConfigurationProperties,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    DigimonModule
  ]
})
export class AppModule {
}
