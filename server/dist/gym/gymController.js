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
const routing_controllers_1 = require("routing-controllers");
const gymProvider_1 = __importDefault(require("./gymProvider"));
const typedi_1 = require("typedi");
const Gym_1 = require("../models/Gym");
const passport = require("passport");
const createGymValidation_1 = require("../validations/createGymValidation");
const gymUploadHelper_1 = require("../helpers/gymUploadHelper");
let GymController = class GymController {
    constructor(gymProvider) {
        this.gymProvider = gymProvider;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allGymsResponse = yield Gym_1.Gym.findAll();
            return res.json(allGymsResponse);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { errors, isValid } = createGymValidation_1.validateCreateGym(req.body);
            // check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            try {
                const name = req.body.name;
                const city = req.body.city;
                const description = req.body.description;
                const website = req.body.website;
                const image = req.body.image;
                const gym = new Gym_1.Gym({
                    name,
                    city,
                    description,
                    website,
                    image
                });
                yield gym.save();
                return res.status(201).json(gym);
            }
            catch (e) {
                res.status(501).json({ errors: "Error when creating a gym" });
            }
        });
    }
    getOne(id, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Gym_1.Gym.findById({
                    _id: id
                });
                return res.status(200).json(result);
            }
            catch (e) {
                res.status(404).json({ errors: "Gym does not exist" });
            }
        });
    }
    updateGym(id) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteGym(id) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // probably i need to create another controller
    addReview(id) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteReview(id, reviewId) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    updateReview(id, reviewId) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    likeGym(id) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    unlikeGym(id) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    uploadGymImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                return res.status(400).json({ errors: "Error when uploading image " });
            }
            return res.status(200).json(req.file.secure_url);
        });
    }
};
__decorate([
    routing_controllers_1.Get("/"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Post("/"),
    routing_controllers_1.UseBefore(passport.authenticate("jwt", { session: false })),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "create", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __param(1, routing_controllers_1.Req()),
    __param(2, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "getOne", null);
__decorate([
    routing_controllers_1.Put("/:id"),
    routing_controllers_1.UseBefore(passport.authenticate("jwt", { session: false })),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "updateGym", null);
__decorate([
    routing_controllers_1.Delete("/:id"),
    routing_controllers_1.UseBefore(passport.authenticate("jwt", { session: false })),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "deleteGym", null);
__decorate([
    routing_controllers_1.Post("/:id/reviews"),
    routing_controllers_1.UseBefore(passport.authenticate("jwt", { session: false })),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "addReview", null);
__decorate([
    routing_controllers_1.Delete("/:id/reviews/:reviewId"),
    routing_controllers_1.UseBefore(passport.authenticate("jwt", { session: false })),
    __param(0, routing_controllers_1.Param("id")),
    __param(1, routing_controllers_1.Param("reviewId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "deleteReview", null);
__decorate([
    routing_controllers_1.Put("/:id/reviews/:reviewId"),
    routing_controllers_1.UseBefore(passport.authenticate("jwt", { session: false })),
    __param(0, routing_controllers_1.Param("id")),
    __param(1, routing_controllers_1.Param("reviewId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "updateReview", null);
__decorate([
    routing_controllers_1.Put("/:id/like"),
    routing_controllers_1.UseBefore(passport.authenticate("jwt", { session: false })),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "likeGym", null);
__decorate([
    routing_controllers_1.Put("/:id/unlike"),
    routing_controllers_1.UseBefore(passport.authenticate("jwt", { session: false })),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "unlikeGym", null);
__decorate([
    routing_controllers_1.Post("/files"),
    routing_controllers_1.UseBefore(gymUploadHelper_1.parser.single("image")),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GymController.prototype, "uploadGymImage", null);
GymController = __decorate([
    typedi_1.Service(),
    routing_controllers_1.JsonController("/gyms"),
    __metadata("design:paramtypes", [gymProvider_1.default])
], GymController);
exports.GymController = GymController;
//# sourceMappingURL=gymController.js.map