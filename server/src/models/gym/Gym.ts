import {Document, Schema, Model, model} from "mongoose";
import { IGym } from "../interfaces/gym";

export interface IGymModel extends IGym , Document {
    getName(): string;
    getCity(): string;
}

export var GymSchema: Schema = new Schema({
    createdAt: Date,
    name: String,
    city: String
});

GymSchema.pre("save", function(next) {
    let now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

GymSchema.methods.getName = function (): string {
    return this.name;
};

GymSchema.methods.getCity = function (): string {
    return this.city;
};

