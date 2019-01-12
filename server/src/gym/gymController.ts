import { Request, Response } from "express";
import { JsonController, Get, Req, Res, UseBefore } from "routing-controllers";
import GymProvider from "./gymProvider";
import { Service } from "typedi";
import passport = require("passport");

@Service()
@JsonController()
export class GymController {
  constructor(private gymProvider: GymProvider) {}

  @Get("/gyms")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async getAll(@Req() request: Request, @Res() response: Response) {
    const allGymsResponse = await this.gymProvider.getAll();
    return response.json(allGymsResponse.gyms);
  }
}
