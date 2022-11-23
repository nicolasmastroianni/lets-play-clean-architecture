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
var PokemonControllerAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonControllerAdapter = void 0;
const common_1 = require("@nestjs/common");
const pokemon_response_1 = require("./model/pokemon.response");
const swagger_1 = require("@nestjs/swagger");
let PokemonControllerAdapter = PokemonControllerAdapter_1 = class PokemonControllerAdapter {
    constructor(getPokemonByNameQuery) {
        this.getPokemonByNameQuery = getPokemonByNameQuery;
        this.logger = new common_1.Logger(PokemonControllerAdapter_1.name);
    }
    async get(name) {
        this.logger.log(`Obteniendo pokemon con nombre : ${name}`);
        const pokemon = await this.getPokemonByNameQuery.execute(name);
        const pokemonResponse = pokemon_response_1.PokemonResponse.fromDomain(pokemon);
        this.logger.log(`Devolviendo : ${JSON.stringify(pokemonResponse)}`);
        return pokemonResponse;
    }
};
__decorate([
    (0, common_1.Get)('/:name'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Pokemon by name' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pokemon found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pokemon not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Business Error' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal error' }),
    (0, swagger_1.ApiResponse)({ status: 503, description: 'Service unavailable' }),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PokemonControllerAdapter.prototype, "get", null);
PokemonControllerAdapter = PokemonControllerAdapter_1 = __decorate([
    (0, swagger_1.ApiTags)('pokemons'),
    (0, common_1.Controller)('api/v1/pokemons'),
    __param(0, (0, common_1.Inject)("getPokemonByNameQuery")),
    __metadata("design:paramtypes", [Object])
], PokemonControllerAdapter);
exports.PokemonControllerAdapter = PokemonControllerAdapter;
//# sourceMappingURL=pokemon.controller.adapter.js.map