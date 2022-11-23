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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DigimonControllerAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigimonControllerAdapter = void 0;
const common_1 = require("@nestjs/common");
const digimon_request_body_1 = require("./model/digimon.request.body");
const create_digimon_request_1 = require("../../../application/model/create.digimon.request");
const swagger_1 = require("@nestjs/swagger");
let DigimonControllerAdapter = DigimonControllerAdapter_1 = class DigimonControllerAdapter {
    constructor(createDigimonCommand) {
        this.createDigimonCommand = createDigimonCommand;
        this.logger = new common_1.Logger(DigimonControllerAdapter_1.name);
    }
    async create(body) {
        this.logger.log(`Creando digimon con body : ${JSON.stringify(body)}`);
        await this.createDigimonCommand.execute(this.buildRequest(body));
        this.logger.log(`Digimon creado`);
    }
    buildRequest(body) {
        return new create_digimon_request_1.CreateDigimonRequest(body.name);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create Digimon' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Digimon Created' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Digimon profile not found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal error' }),
    (0, swagger_1.ApiResponse)({ status: 503, description: 'Service unavailable' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [digimon_request_body_1.DigimonRequestBody]),
    __metadata("design:returntype", Promise)
], DigimonControllerAdapter.prototype, "create", null);
DigimonControllerAdapter = DigimonControllerAdapter_1 = __decorate([
    (0, swagger_1.ApiTags)('digimons'),
    (0, common_1.Controller)('api/v1/digimons'),
    __param(0, (0, common_1.Inject)('createDigimonCommand')),
    __metadata("design:paramtypes", [Object])
], DigimonControllerAdapter);
exports.DigimonControllerAdapter = DigimonControllerAdapter;
//# sourceMappingURL=digimon.controller.adapter.js.map