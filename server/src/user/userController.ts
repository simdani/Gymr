import { Request, Response } from "express";
import { JsonController, Req, Res, Post, UseBefore } from "routing-controllers";
import { Service } from "typedi";

import passport = require("passport");
import UserProvider from "./userProvider";

@Service()
@JsonController("/users")
export class UserController {
  constructor(private userProvider: UserProvider) {}

  @Post("/oauth/google")
  @UseBefore(passport.authenticate("googleToken", { session: false }))
  public async oauthGoogle(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.userProvider.loginGoogle(req);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(501).json("Error when loggin in with google");
    }
  }

  // TODO: add validations
  @Post("/login")
  public async login(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.userProvider.loginUser(req);
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json("user does not exist");
      }
    } catch (e) {
      return res.status(400).json("wrong password");
    }
  }

  // TODO: add validations
  @Post("/register")
  public async register(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.userProvider.createUser(req);
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json("already exists");
      }
    } catch (e) {
      return res.status(400).json("Error creating new user");
    }
  }
}
