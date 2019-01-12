import { Service } from "typedi";
import { signToken } from "../utils/signToken";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

@Service()
export default class UserProvider {
  constructor() {}

  public async loginGoogle(req: any) {
    const payload = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    };

    const token = signToken(payload);

    const result = {
      success: true,
      token: "Bearer " + token
    };

    return result;
  }

  public async createUser(req: any) {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (user) {
      return null;
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const createUser = await newUser.save();
    return createUser;
  }

  public async loginUser(req: any) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });
    if (!user) {
      return null;
    }

    const checkPassword = await bcrypt.compare(password, user!.password);
    if (checkPassword) {
      const payload = {
        id: user!.id,
        username: user!.username,
        email: user!.email,
        role: user!.role
      };

      const token = jwt.sign(payload, "super-secret", { expiresIn: 3600 });

      const result = {
        success: true,
        token: "Bearer " + token
      };

      return result;
    }
  }
}
