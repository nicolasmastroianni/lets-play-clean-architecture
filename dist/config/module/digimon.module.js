"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigimonModule = void 0;
const common_1 = require("@nestjs/common");
const digimon_controller_adapter_1 = require("../../adapter/in/controller/digimon.controller.adapter");
const create_digimon_cachemanager_adapter_1 = require("../../adapter/out/cachemanager/create.digimon.cachemanager.adapter");
const get_digimon_info_by_name_rest_adapter_1 = require("../../adapter/out/rest/get.digimon.info.by.name.rest.adapter");
const create_digimon_use_case_1 = require("../../application/usecase/create.digimon.use.case");
const common_module_1 = require("./common.module");
const axios_1 = require("@nestjs/axios");
const configuration_properties_1 = require("../configuration.properties");
const kafka_module_1 = require("../../kafka/kafka.module");
let DigimonModule = class DigimonModule {
};
DigimonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            kafka_module_1.KafkaModule,
            common_module_1.CommonModule,
            axios_1.HttpModule.registerAsync({
                imports: [common_module_1.CommonModule],
                useFactory: (config) => ({
                    timeout: config.restClientConfiguration.timeout,
                }),
                inject: [configuration_properties_1.ConfigurationProperties],
            }),
            common_1.CacheModule.register()
        ],
        controllers: [digimon_controller_adapter_1.DigimonControllerAdapter],
        providers: [
            {
                useClass: create_digimon_cachemanager_adapter_1.CreateDigimonCachemanagerAdapter,
                provide: "createDigimonRepository"
            },
            {
                useClass: get_digimon_info_by_name_rest_adapter_1.GetDigimonInfoByNameRestAdapter,
                provide: "getDigimonInfoByNameRepository"
            },
            {
                useClass: create_digimon_use_case_1.CreateDigimonUseCase,
                provide: "createDigimonCommand"
            }
        ]
    })
], DigimonModule);
exports.DigimonModule = DigimonModule;
//# sourceMappingURL=digimon.module.js.map