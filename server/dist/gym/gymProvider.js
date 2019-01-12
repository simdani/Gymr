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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const Gym_1 = require("../models/gym/Gym");
const getAllGymsResponse_1 = __importDefault(require("./responses/getAllGymsResponse"));
const GymDto_1 = __importDefault(require("./dto/GymDto"));
let GymProvider = class GymProvider {
    constructor() { }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const gyms = yield Gym_1.Gym.findAll();
            const resultItems = gyms.map((entry) => new GymDto_1.default(entry.name));
            console.log(resultItems);
            return new getAllGymsResponse_1.default(resultItems);
        });
    }
};
GymProvider = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], GymProvider);
exports.default = GymProvider;
//# sourceMappingURL=gymProvider.js.map