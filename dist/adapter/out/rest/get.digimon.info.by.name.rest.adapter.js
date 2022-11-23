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
var GetDigimonInfoByNameRestAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDigimonInfoByNameRestAdapter = void 0;
const common_1 = require("@nestjs/common");
const not_found_exception_1 = require("../../exception/not.found.exception");
const error_description_1 = require("../../../config/error.description");
const exception_utils_1 = require("../../utils/exception.utils");
const not_available_exception_1 = require("../../exception/not.available.exception");
const axios_1 = require("@nestjs/axios");
const digimon_rest_model_1 = require("./model/digimon.rest.model");
const configuration_properties_1 = require("../../../config/configuration.properties");
let GetDigimonInfoByNameRestAdapter = GetDigimonInfoByNameRestAdapter_1 = class GetDigimonInfoByNameRestAdapter {
    constructor(httpService, config) {
        this.httpService = httpService;
        this.config = config;
        this.logger = new common_1.Logger(GetDigimonInfoByNameRestAdapter_1.name);
        this.exceptions = new Map([
            [400,
                new not_found_exception_1.NotFoundException(error_description_1.ErrorDescription.NOT_FOUND)],
            [404,
                new not_found_exception_1.NotFoundException(error_description_1.ErrorDescription.NOT_FOUND)],
            [exception_utils_1.UNHANDLED_REST_EXCEPTION,
                new not_available_exception_1.NotAvailableException(error_description_1.ErrorDescription.UNHANDLED)]
        ]);
    }
    async execute(name) {
        try {
            this.logger.log(`Buscando digimon con nombre : ${name}`);
            const url = this.config.digimonConfiguration.url;
            this.logger.log(`url a consultar : ${url + name}`);
            const { data } = await this.httpService.axiosRef.get(url + name);
            const [elemWithData] = data;
            const digimonModel = new digimon_rest_model_1.DigimonRestModel(name, elemWithData === null || elemWithData === void 0 ? void 0 : elemWithData.level);
            this.logger.log(`Devolviendo digimon : ${JSON.stringify(digimonModel)}`);
            return digimonModel.toDomain();
        }
        catch (e) {
            this.logger.error(`Hubo un error buscando la informacion del digimon
       y el error es : ${e}`);
            const status = (0, exception_utils_1.getStatus)(e);
            console.log({ status });
            throw this.exceptions.get(this.exceptions.has(status)
                ? status
                : exception_utils_1.UNHANDLED_REST_EXCEPTION);
        }
    }
};
GetDigimonInfoByNameRestAdapter = GetDigimonInfoByNameRestAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        configuration_properties_1.ConfigurationProperties])
], GetDigimonInfoByNameRestAdapter);
exports.GetDigimonInfoByNameRestAdapter = GetDigimonInfoByNameRestAdapter;
//# sourceMappingURL=get.digimon.info.by.name.rest.adapter.js.map