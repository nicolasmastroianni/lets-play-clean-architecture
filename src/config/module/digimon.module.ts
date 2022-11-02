import { CacheModule, Module } from "@nestjs/common";
import { DigimonControllerAdapter } from "../../adapter/in/controller/digimon.controller.adapter";
import { CreateDigimonCachemanagerAdapter } from "../../adapter/out/cachemanager/create.digimon.cachemanager.adapter";
import { GetDigimonInfoByNameRestAdapter } from "../../adapter/out/rest/get.digimon.info.by.name.rest.adapter";
import { CreateDigimonUseCase } from "../../application/usecase/create.digimon.use.case";
import { CommonModule } from "./common.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
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
    }]
})
export class DigimonModule {
}