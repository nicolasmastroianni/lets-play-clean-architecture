import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "./config/all.exceptions.filter";
import { PokemonModule } from "./config/module/pokemon.module";
import { DigimonModule } from "./config/module/digimon.module";

@Module({
  imports: [
    PokemonModule,
    DigimonModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {
}
