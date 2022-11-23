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
var CreateDigimonCachemanagerAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDigimonCachemanagerAdapter = void 0;
const common_1 = require("@nestjs/common");
const exception_utils_1 = require("../../utils/exception.utils");
const not_available_exception_1 = require("../../exception/not.available.exception");
const error_description_1 = require("../../../config/error.description");
let CreateDigimonCachemanagerAdapter = CreateDigimonCachemanagerAdapter_1 = class CreateDigimonCachemanagerAdapter {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.logger = new common_1.Logger(CreateDigimonCachemanagerAdapter_1.name);
        this.KEY = "digimon:";
        this.exceptions = new Map([
            [exception_utils_1.UNHANDLED_EXCEPTION,
                new not_available_exception_1.NotAvailableException(error_description_1.ErrorDescription.UNHANDLED)]
        ]);
    }
    async execute(digimon) {
        try {
            this.logger.log(`Creando digimon : ${JSON.stringify(digimon)}`);
            await this.cacheManager.set(this.KEY + digimon.name, digimon, { ttl: 39600 });
            this.logger.log(`Digimon creado`);
        }
        catch (e) {
            this.logger.error(`Hubo un error creando el digimon y el error es : ${e}`);
            throw this.exceptions.get(this.exceptions.has((0, exception_utils_1.getException)(e))
                ? (0, exception_utils_1.getException)(e)
                : exception_utils_1.UNHANDLED_EXCEPTION);
        }
    }
};
CreateDigimonCachemanagerAdapter = CreateDigimonCachemanagerAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], CreateDigimonCachemanagerAdapter);
exports.CreateDigimonCachemanagerAdapter = CreateDigimonCachemanagerAdapter;
//# sourceMappingURL=create.digimon.cachemanager.adapter.js.map