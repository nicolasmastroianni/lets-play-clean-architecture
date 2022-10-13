import { CacheModule, Module } from "@nestjs/common";
import { DigimonControllerAdapter } from "../../adapter/in/controller/digimon.controller.adapter";
import { CreateDigimonCachemanagerAdapter } from "../../adapter/out/cachemanager/create.digimon.cachemanager.adapter";
import { GetDigimonInfoByNameRestAdapter } from "../../adapter/out/rest/get.digimon.info.by.name.rest.adapter";
import { CreateDigimonUseCase } from "../../application/usecase/create.digimon.use.case";
import { ConfigurationProperties } from "../configuration.properties";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "config/.env"
    }), HttpModule.register({
      timeout: 5000
    }), CacheModule.register()
  ],
  controllers: [DigimonControllerAdapter],
  providers: [ConfigurationProperties,
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
    }]
})
export class DigimonModule {
}