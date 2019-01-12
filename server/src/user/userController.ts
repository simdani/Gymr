import { Request, Response } from "express";
import { JsonController, Req, Res, Post, UseBefore } from "routing-controllers";
// import UserProvider from "./userProvider";
import { Service } from "typedi";

import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport = require("passport");
import { signToken } from "../utils/signToken";

@Service()
@JsonController()
export class UserController {
  constructor() {}

  @Post("/oauth/google")
  @UseBefore(passport.authenticate("googleToken", { session: false }))
  public async oauthGoogle(@Req() req: Request, @Res() res: Response) {
    try {
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

      res.status(200).json(result);
    } catch (e) {
      res.status(501).json("Error when loggin in with google");
    }
  }

  @Post("/login")
  public async login(@Req() req: Request, @Res() res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("user not found");
    } else {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        };

        const token = jwt.sign(payload, "super-secret", { expiresIn: 3600 });

        return res.status(200).json({
          success: true,
          token: "Bearer " + token
        });
      } else {
        return res.status(400).json("wrong password");
      }
    }

    // const allGymsResponse = await this.userProvider.login();
    // return response.json(allGymsResponse);
  }

  @Post("/register")
  public async register(@Req() req: Request, @Res() res: Response) {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json("already exists");
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      const createUser = await newUser.save();
      res.status(201).json(createUser);

      // const salt = await
      // const gyms = await Gym.findAll();
      // res.json(gyms);
    }
  }

  // @Post("/register")
  // public async register(@Req() request: Request, @Res() response: Response) {
  //   const allGymsResponse = await this.gymProvider.getAll();
  //   return response.json(allGymsResponse);
  // }
}
