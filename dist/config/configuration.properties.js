"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationProperties = void 0;
const common_1 = require("@nestjs/common");
const pokemon_configuration_1 = require("./model/pokemon.configuration");
const config_1 = require("@nestjs/config");
const yaml = require("js-yaml");
const fs_1 = require("fs");
const path_1 = require("path");
const constants_environment_1 = require("./constants.environment");
const digimon_configuration_1 = require("./model/digimon.configuration");
const rest_client_configuration_1 = require("./model/rest.client.configuration");
let ConfigurationProperties = class ConfigurationProperties {
    constructor(configService) {
        this.configService = configService;
        const environment = configService.get(constants_environment_1.ENVIRONMENT);
        const prefixConfigFile = constants_environment_1.ENVIRONMENTS.get(environment) || constants_environment_1.DEFAULT_ENVIRONMENT;
        const config = yaml.load((0, fs_1.readFileSync)((0, path_1.join)(__dirname, "../../config/", `${prefixConfigFile}-config.yaml`), "utf8"));
        this._pokemonConfiguration = new pokemon_configuration_1.PokemonConfiguration(config.service.uri.pokemon);
        this._digimonConfiguration = new digimon_configuration_1.DigimonConfiguration(config.service.uri.digimon);
        this._restClientConfiguration = new rest_client_configuration_1.RestClientConfiguration(config.rest.client.default.timeout);
    }
    get pokemonConfiguration() {
        return this._pokemonConfiguration;
    }
    get digimonConfiguration() {
        return this._digimonConfiguration;
    }
    get restClientConfiguration() {
        return this._restClientConfiguration;
    }
};
ConfigurationProperties = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfigurationProperties);
exports.ConfigurationProperties = ConfigurationProperties;
//# sourceMappingURL=configuration.properties.js.map