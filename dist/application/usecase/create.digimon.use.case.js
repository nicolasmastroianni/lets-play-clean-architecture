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
var CreateDigimonUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDigimonUseCase = void 0;
const common_1 = require("@nestjs/common");
const producer_service_1 = require("../../kafka/producer.service");
let CreateDigimonUseCase = CreateDigimonUseCase_1 = class CreateDigimonUseCase {
    constructor(getDigimonInfoByNameRepository, createDigimonRepository, produceServices) {
        this.getDigimonInfoByNameRepository = getDigimonInfoByNameRepository;
        this.createDigimonRepository = createDigimonRepository;
        this.produceServices = produceServices;
        this.logger = new common_1.Logger(CreateDigimonUseCase_1.name);
    }
    async execute(command) {
        this.logger.log(`Iniciando caso de uso para creacion de digimon : ${JSON.stringify(command)}`);
        const digimonToCreate = await this.getDigimonInfoByNameRepository.execute(command.name);
        await this.createDigimonRepository.execute(digimonToCreate);
        this.logger.log(`Comenzando creacion por kafka`);
        await this.produceServices.produce({
            topic: 'Digimon',
            messages: [{
                    key: 'asd',
                    value: digimonToCreate.name + digimonToCreate.level
                }]
        });
        this.logger.log(`Finalizacion creacion por kafka`);
        this.logger.log(`Digimon creado exitosamente`);
    }
};
CreateDigimonUseCase = CreateDigimonUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("getDigimonInfoByNameRepository")),
    __param(1, (0, common_1.Inject)("createDigimonRepository")),
    __metadata("design:paramtypes", [Object, Object, producer_service_1.ProducerService])
], CreateDigimonUseCase);
exports.CreateDigimonUseCase = CreateDigimonUseCase;
//# sourceMappingURL=create.digimon.use.case.js.map