import { Request, Response } from "express";
import {
  JsonController,
  Get,
  Req,
  Res,
  UseBefore,
  Param,
  Post,
  Put,
  Delete
} from "routing-controllers";
import GymProvider from "./gymProvider";
import { Service } from "typedi";

import { Gym } from "../models/Gym";
import passport = require("passport");
import { validateCreateGym } from "../validations/createGymValidation";
import { parser } from "../helpers/gymUploadHelper";

@Service()
@JsonController("/gyms")
export class GymController {
  constructor(private gymProvider: GymProvider) {}

  @Get("/")
  public async getAll(@Req() req: Request, @Res() res: Response) {
    const allGymsResponse = await Gym.findAll();
    return res.json(allGymsResponse);
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

  @Get("/:id")
  public async getOne(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const result = await Gym.findById({
        _id: id
      });

      return res.status(200).json(result);
    } catch (e) {
      res.status(404).json({ errors: "Gym does not exist" });
    }
  }

  @Put("/:id")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async updateGym(@Param("id") id: string) {}

  @Delete("/:id")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async deleteGym(@Param("id") id: string) {}

  // probably i need to create another controller
  @Post("/:id/reviews")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async addReview(@Param("id") id: string) {}

  @Delete("/:id/reviews/:reviewId")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async deleteReview(
    @Param("id") id: string,
    @Param("reviewId") reviewId: string
  ) {}

  @Put("/:id/reviews/:reviewId")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async updateReview(
    @Param("id") id: string,
    @Param("reviewId") reviewId: string
  ) {}

  @Put("/:id/like")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async likeGym(@Param("id") id: string) {}

  @Put("/:id/unlike")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async unlikeGym(@Param("id") id: string) {}

  @Post("/files")
  public async uploadGymImage(@Req() req: Request, @Res() res: Response) {
    const errors: any = {};
    const upload = parser.single("image");

    upload(req, res, err => {
      if (err) {
        errors.image = "Error when uploading file";
        return res.status(501).json(errors);
      } else {
        return res.status(200).json(req.file.secure_url);
      }
    });
  }
}
