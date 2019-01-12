import { Request, Response } from "express";
import {
  JsonController,
  Get,
  Req,
  Res,
  UseBefore,
  Param,
  Post
} from "routing-controllers";
import GymProvider from "./gymProvider";
import { Service } from "typedi";

import { Gym } from "../models/Gym";
import passport = require("passport");
import { validateCreateGym } from "../validations/createGymValidation";

@Service()
@JsonController("/gyms")
export class GymController {
  constructor(private gymProvider: GymProvider) {}

  @Get("/")
  public async getAll(@Req() req: Request, @Res() res: Response) {
    const allGymsResponse = await this.gymProvider.getAll();
    return res.json(allGymsResponse.gyms);
  }

  @Post("/")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async create(@Req() req: Request, @Res() res: Response) {
    const { errors, isValid } = validateCreateGym(req.body);

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

      const gym = new Gym({
        name,
        city,
        description,
        website,
        image
      });

      await gym.save();
      return res.status(201).json(gym);
    } catch (e) {
      res.status(501).json({ errors: "Error when creating a gym" });
    }
  }
}
