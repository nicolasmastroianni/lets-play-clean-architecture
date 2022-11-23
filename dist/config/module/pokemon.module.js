"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonModule = void 0;
const common_1 = require("@nestjs/common");
const pokemon_controller_adapter_1 = require("../../adapter/in/controller/pokemon.controller.adapter");
const pokemon_rest_adapter_1 = require("../../adapter/out/rest/pokemon.rest.adapter");
const get_pokemon_by_name_use_case_1 = require("../../application/usecase/get.pokemon.by.name.use.case");
const common_module_1 = require("./common.module");
const axios_1 = require("@nestjs/axios");
const configuration_properties_1 = require("../configuration.properties");
const kafka_module_1 = require("../../kafka/kafka.module");
let PokemonModule = class PokemonModule {
};
PokemonModule = __decorate([
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
            })
        ],
        controllers: [pokemon_controller_adapter_1.PokemonControllerAdapter],
        providers: [
            {
                useClass: pokemon_rest_adapter_1.PokemonRestAdapter,
                provide: "pokemonRepository"
            },
            {
                useClass: get_pokemon_by_name_use_case_1.GetPokemonByNameUseCase,
                provide: "getPokemonByNameQuery"
            }
        ]
    })
], PokemonModule);
exports.PokemonModule = PokemonModule;
//# sourceMappingURL=pokemon.module.js.map