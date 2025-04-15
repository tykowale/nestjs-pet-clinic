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
exports.OwnerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const owner_service_1 = require("./owner.service");
const owner_entity_1 = require("./entities/owner.entity");
const create_owner_input_1 = require("./dto/create-owner.input");
const pet_entity_1 = require("../pet/entities/pet.entity");
const prisma_service_1 = require("../prisma.service");
let OwnerResolver = class OwnerResolver {
    constructor(ownerService, prisma) {
        this.ownerService = ownerService;
        this.prisma = prisma;
    }
    findAllOwners() {
        return this.ownerService.findAll();
    }
    findOneOwner(id) {
        return this.ownerService.findOne(id);
    }
    createOwner(createOwnerInput) {
        return this.ownerService.create(createOwnerInput);
    }
    async getPets(owner) {
        const { id } = owner;
        return this.prisma.pet.findMany({
            where: {
                ownerId: id,
            },
        });
    }
};
exports.OwnerResolver = OwnerResolver;
__decorate([
    (0, graphql_1.Query)(() => [owner_entity_1.Owner], { name: 'owners' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OwnerResolver.prototype, "findAllOwners", null);
__decorate([
    (0, graphql_1.Query)(() => owner_entity_1.Owner, { name: 'owner', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OwnerResolver.prototype, "findOneOwner", null);
__decorate([
    (0, graphql_1.Mutation)(() => owner_entity_1.Owner),
    __param(0, (0, graphql_1.Args)('createOwnerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_owner_input_1.CreateOwnerInput]),
    __metadata("design:returntype", void 0)
], OwnerResolver.prototype, "createOwner", null);
__decorate([
    (0, graphql_1.ResolveField)('pets', () => [pet_entity_1.Pet]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [owner_entity_1.Owner]),
    __metadata("design:returntype", Promise)
], OwnerResolver.prototype, "getPets", null);
exports.OwnerResolver = OwnerResolver = __decorate([
    (0, graphql_1.Resolver)(() => owner_entity_1.Owner),
    __metadata("design:paramtypes", [owner_service_1.OwnerService,
        prisma_service_1.PrismaService])
], OwnerResolver);
//# sourceMappingURL=owner.resolver.js.map