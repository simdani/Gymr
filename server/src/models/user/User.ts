import { Document, Schema, Model } from "mongoose";
import mongoose from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserModel extends Model<IUser> {
  findAll(): Promise<IUser[]>;
}

const schema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: "USER",
    required: true
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});

schema.static("findUser", (email: string) => {
  return User.findOne({ email }).exec();
});

schema.static("saveUser", (user: IUser) => {
  return user.save();
});

// schema.static("findAll", () => {
//     return Gym.find().exec();
// });

export const User = mongoose.model<IUser>("User", schema) as IUserModel;
