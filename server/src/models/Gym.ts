import { Document, Schema, Model } from "mongoose";
import mongoose from "mongoose";

export interface IGym extends Document {
  website: any;
  name: string;
  city: string;
  description: string;
  reviews: any[];
  likes: any[];
}

export interface IGymModel extends Model<IGym> {
  findAll(): Promise<IGym[]>;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 50
  },
  city: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 60
  },
  description: {
    type: String,
    required: true,
    minlength: 1
  },
  website: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      username: {
        type: String
      },
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

schema.static("findAll", () => {
  return Gym.find().exec();
});

export const Gym = mongoose.model<IGym>("Gym", schema) as IGymModel;
