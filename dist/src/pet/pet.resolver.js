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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const pet_service_1 = require("./pet.service");
const pet_entity_1 = require("./entities/pet.entity");
let PetResolver = class PetResolver {
    constructor(petService) {
        this.petService = petService;
    }
    findAllPets() {
        return this.petService.findAll();
    }
    findOnePet(id) {
        return this.petService.findOne(id);
    }
};
exports.PetResolver = PetResolver;
__decorate([
    (0, graphql_1.Query)(() => [pet_entity_1.Pet], { name: 'pets' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PetResolver.prototype, "findAllPets", null);
__decorate([
    (0, graphql_1.Query)(() => pet_entity_1.Pet, { name: 'pet', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PetResolver.prototype, "findOnePet", null);
exports.PetResolver = PetResolver = __decorate([
    (0, graphql_1.Resolver)(() => pet_entity_1.Pet),
    __metadata("design:paramtypes", [pet_service_1.PetService])
], PetResolver);
//# sourceMappingURL=pet.resolver.js.map