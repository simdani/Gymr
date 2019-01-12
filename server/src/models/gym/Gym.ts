import {Document, Schema, Model } from "mongoose";
import mongoose from "mongoose";

export interface IGym extends Document {
    name: string;
    city: string;
    description: string;
}

export interface IGymModel extends Model<IGym> {
    findAll(): Promise<IGym[]>
}

const schema = new Schema({
    name: String,
    city: String,
    description: String
});

schema.static("findAll", () => {
    return Gym.find().exec();
});

export const Gym = mongoose.model<IGym>("Gym", schema) as IGymModel;

