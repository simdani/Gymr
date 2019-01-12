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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const Gym_1 = require("../models/Gym");
const regexHelper_1 = require("../helpers/regexHelper");
let GymProvider = class GymProvider {
    constructor() { }
    findGym(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return Gym_1.Gym.findById({
                _id: req.params.id
            });
        });
    }
    updateReview(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const gym = yield Gym_1.Gym.findById(req.params.id);
            const reviewIndex = gym.reviews
                .map(item => item._id.toString())
                .indexOf(req.params.reviewId);
            const text = req.body.text;
            gym.reviews[reviewIndex].text = text;
            gym.save();
            return gym.reviews[reviewIndex];
        });
    }
    deleteReview(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const gym = yield Gym_1.Gym.findById(req.params.id);
            if (gym.reviews.filter(review => review._id.toString() === req.params.reviewId).length === 0) {
                return null;
            }
            // ret review index
            const removeIndex = gym.reviews
                .map(item => item._id.toString())
                .indexOf(req.params.reviewId);
            yield gym.reviews.splice(removeIndex, 1);
            yield gym.save();
            return gym;
        });
    }
    addReview(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const gym = yield Gym_1.Gym.findById(req.params.id);
            const newReview = {
                username: req.body.username,
                text: req.body.text,
                user: req.user.id
            };
            yield gym.reviews.unshift(newReview);
            yield gym.save();
            return gym.reviews[0];
        });
    }
    deleteGym(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const gym = yield Gym_1.Gym.findOneAndDelete({
                _id: req.params.id
            });
            return gym;
        });
    }
    updateGym(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const gym = yield Gym_1.Gym.findById(req.params.id);
            const name = req.body.name;
            const city = req.body.city;
            const description = req.body.description;
            const website = req.body.website;
            gym.name = name;
            gym.city = city;
            gym.description = description;
            gym.website = website;
            return gym.save();
        });
    }
    createGym(req) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return gym.save();
        });
    }
    getGyms(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let perPage = 12; // gyms per page
            let page = parseInt(req.query.page) || 1; // curent page
            let gyms;
            let count;
            if (req.query.sort) {
                if (req.query.sort === "newest") {
                    gyms = yield Gym_1.Gym.find()
                        .sort({ date: "descending" })
                        .skip(perPage * page - perPage)
                        .limit(perPage);
                }
                else if (req.query.sort === "oldest") {
                    gyms = yield Gym_1.Gym.find()
                        .sort({ date: "ascending" })
                        .skip(perPage * page - perPage)
                        .limit(perPage);
                }
                else if (req.query.sort === "likes") {
                    gyms = yield Gym_1.Gym.find()
                        .sort({ likes: "descending" })
                        .skip(perPage * page - perPage)
                        .limit(perPage);
                }
            }
            else {
                gyms = yield Gym_1.Gym.find()
                    .skip(perPage * page - perPage)
                    .limit(perPage);
            }
            count = yield Gym_1.Gym.countDocuments();
            return {
                gyms,
                current: page,
                pages: Math.ceil(count / perPage)
            };
        });
    }
    // get all gyms
    getAllGyms(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let gyms;
            if (req.query.sort) {
                if (req.query.sort === "newest") {
                    gyms = yield Gym_1.Gym.find().sort({ date: "descending" });
                }
                else if (req.query.sort === "oldest") {
                    gyms = yield Gym_1.Gym.find().sort({ date: "ascending" });
                }
                else if (req.query.sort === "likes") {
                    gyms = yield Gym_1.Gym.find().sort({ likes: "descending" });
                }
            }
            else {
                gyms = yield Gym_1.Gym.find();
            }
            return gyms;
        });
    }
    // find gyms by city
    searchGyms(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let gyms;
            const regex = new RegExp(regexHelper_1.escapeRegex(req.query.search), "gi");
            if (req.query.sort) {
                if (req.query.sort === "newest") {
                    gyms = yield Gym_1.Gym.find({ city: regex }).sort({ date: "descending" });
                }
                else if (req.query.sort === "oldest") {
                    gyms = yield Gym_1.Gym.find({ city: regex }).sort({ date: "ascending" });
                }
                else if (req.query.sort === "likes") {
                    gyms = yield Gym_1.Gym.find({ city: regex }).sort({ likes: "descending" });
                }
            }
            else {
                gyms = yield Gym_1.Gym.find({ city: regex });
            }
            return gyms;
        });
    }
};
GymProvider = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], GymProvider);
exports.default = GymProvider;
//# sourceMappingURL=gymProvider.js.map