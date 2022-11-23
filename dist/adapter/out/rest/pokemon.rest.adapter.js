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
var PokemonRestAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonRestAdapter = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const pokemon_rest_model_1 = require("./model/pokemon.rest.model");
const not_available_exception_1 = require("../../exception/not.available.exception");
const exception_utils_1 = require("../../utils/exception.utils");
const error_description_1 = require("../../../config/error.description");
const not_found_exception_1 = require("../../exception/not.found.exception");
const configuration_properties_1 = require("../../../config/configuration.properties");
let PokemonRestAdapter = PokemonRestAdapter_1 = class PokemonRestAdapter {
    constructor(httpService, config) {
        this.httpService = httpService;
        this.config = config;
        this.logger = new common_1.Logger(PokemonRestAdapter_1.name);
        this.exceptions = new Map([
            [404,
                new not_found_exception_1.NotFoundException(error_description_1.ErrorDescription.NOT_FOUND)],
            [exception_utils_1.UNHANDLED_REST_EXCEPTION,
                new not_available_exception_1.NotAvailableException(error_description_1.ErrorDescription.UNHANDLED)]
        ]);
    }
    async get(name) {
        try {
            this.logger.log(`Buscando pokemon con nombre : ${name}`);
            const url = this.config.pokemonConfiguration.url;
            this.logger.log(`url a consultar : ${url + name}`);
            const { data } = await this.httpService.axiosRef.get(url + name);
            const pokemonModel = new pokemon_rest_model_1.PokemonRestModel(name, data === null || data === void 0 ? void 0 : data.types.map((elem) => { var _a; return (_a = elem === null || elem === void 0 ? void 0 : elem.type) === null || _a === void 0 ? void 0 : _a.name; }), data === null || data === void 0 ? void 0 : data.abilities.map((elem) => { var _a; return (_a = elem === null || elem === void 0 ? void 0 : elem.ability) === null || _a === void 0 ? void 0 : _a.name; }));
            this.logger.log(`Devolviendo pokemon : ${JSON.stringify(pokemonModel)}`);
            return pokemonModel.toDomain();
        }
        catch (e) {
            this.logger.error(`Hubo un error buscando pokemon y el error es : ${e}`);
            const status = (0, exception_utils_1.getStatus)(e);
            throw this.exceptions.get(this.exceptions.has(status)
                ? status
                : exception_utils_1.UNHANDLED_REST_EXCEPTION);
        }
    }
};
PokemonRestAdapter = PokemonRestAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        configuration_properties_1.ConfigurationProperties])
], PokemonRestAdapter);
exports.PokemonRestAdapter = PokemonRestAdapter;
//# sourceMappingURL=pokemon.rest.adapter.js.map