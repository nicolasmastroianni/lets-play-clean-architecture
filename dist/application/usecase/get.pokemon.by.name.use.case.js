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
var GetPokemonByNameUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPokemonByNameUseCase = void 0;
const common_1 = require("@nestjs/common");
const business_exception_1 = require("../exception/business.exception");
const error_description_1 = require("../../config/error.description");
let GetPokemonByNameUseCase = GetPokemonByNameUseCase_1 = class GetPokemonByNameUseCase {
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
        this.logger = new common_1.Logger(GetPokemonByNameUseCase_1.name);
        this.digimons = ['agumon'];
    }
    async execute(name) {
        this.logger.log(`Buscando pokemon con nombre : ${name}`);
        if (this.digimons.includes(name)) {
            throw new business_exception_1.BusinessException(error_description_1.ErrorDescription.INCONSISTENCY_DIGIMON);
        }
        const pokemon = await this.pokemonRepository.get(name);
        this.logger.log(`Devolviendo pokemon : ${JSON.stringify(pokemon)}`);
        return pokemon;
    }
};
GetPokemonByNameUseCase = GetPokemonByNameUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("pokemonRepository")),
    __metadata("design:paramtypes", [Object])
], GetPokemonByNameUseCase);
exports.GetPokemonByNameUseCase = GetPokemonByNameUseCase;
//# sourceMappingURL=get.pokemon.by.name.use.case.js.map