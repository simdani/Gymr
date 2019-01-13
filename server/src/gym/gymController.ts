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
  Delete,
  UploadedFile
} from "routing-controllers";
import GymProvider from "./gymProvider";
import { Service } from "typedi";

import { Gym } from "../models/Gym";
import passport = require("passport");
import { validateCreateGym } from "../validations/createGymValidation";
import { parser } from "../helpers/gymUploadHelper";
import { USER_ROLES } from "../enums/userRoles";
import { updateGymReviewValidation } from "../validations/updateGymReviewValidation";

@Service()
@JsonController("/gyms")
export class GymController {
  constructor(private gymProvider: GymProvider) {}

  @Get("/")
  public async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      if (req.query.search) {
        const result = await this.gymProvider.searchGyms(req);
        res.set("total-pages", result.pages.toString());
        res.set("Access-Control-Expose-Headers", "total-pages");
        return res.status(200).json(result.gyms);
      } else {
        const result = await this.gymProvider.getGyms(req);
        res.set("total-pages", result.pages.toString());
        res.set("Access-Control-Expose-Headers", "total-pages");
        return res.status(200).json(result.gyms);
      }
    } catch (err) {
      return res.status(400).json({ errors: "failed to get gyms" });
    }
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
      const result = await this.gymProvider.createGym(req);
      return res.status(201).json(result);
    } catch (e) {
      return res.status(501).json({ errors: "Error when creating a gym" });
    }
  }

  @Get("/:id")
  public async getOne(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const result = await this.gymProvider.findGym(req);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(404).json({ errors: "Gym does not exist" });
    }
  }

  @Put("/:id")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async updateGym(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const { errors, isValid } = validateCreateGym(req.body);

    if (req.user.role !== USER_ROLES.ADMIN) {
      return res.status(300).json({
        errors: "You must have an admin access to delete gym"
      });
    }
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const result = await this.gymProvider.updateGym(req);
      return res.status(201).json(result);
    } catch (e) {
      return res.status(404).json({ errors: "Gym does not exists" });
    }
  }

  @Delete("/:id")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async deleteGym(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      if (req.user.role !== USER_ROLES.ADMIN) {
        return res.status(300).json({
          errors: "You must have an admin access to delete gym"
        });
      } else {
        const gym = await this.gymProvider.deleteGym(req);
        if (!gym) {
          return res.status(400).json({
            errors: "Gym not found"
          });
        } else {
          return res.status(200).json({
            success: true
          });
        }
      }
    } catch (e) {
      return res.status(404).json({ errors: "Gym does not exist" });
    }
  }

  // probably i need to create another controller
  @Post("/:id/reviews")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async addReview(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const { errors, isValid } = updateGymReviewValidation(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const result = await this.gymProvider.addReview(req);
      return res.status(201).json(result);
    } catch (e) {
      return res
        .status(501)
        .json({ errors: "Error when creating a new review" });
    }
  }

  @Delete("/:id/reviews/:reviewId")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async deleteReview(
    @Param("id") id: string,
    @Param("reviewId") reviewId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      if (req.user.role !== USER_ROLES.ADMIN) {
        return res.status(300).json({
          errors: "You must have an admin access to delete gym"
        });
      } else {
        const result = await this.gymProvider.deleteReview(req);
        if (result) {
          return res.status(200).json({ success: true });
        } else {
          return res.status(404).json({ errors: "Review does not exist" });
        }
      }
    } catch (e) {
      return res.status(404).json({ errors: "Gym review does not exist" });
    }
  }

  @Put("/:id/reviews/:reviewId")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async updateReview(
    @Param("id") id: string,
    @Param("reviewId") reviewId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const { errors, isValid } = updateGymReviewValidation(req.body);

    if (req.user.role !== USER_ROLES.ADMIN) {
      return res.status(300).json({
        errors: "You must have an admin access to delete gym"
      });
    }

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const result = await this.gymProvider.updateReview(req);
      return res.status(201).json(result);
    } catch (e) {
      return res.status(404).json({ errors: "Gym or review does not exist" });
    }
  }

  @Post("/:id/like")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async likeGym(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const gym = await Gym.findById(req.params.id);
      if (
        gym!.likes.filter(like => like.user.toString() === req.user.id).length >
        0
      ) {
        return res.status(400).json({ errors: "error liking" });
      } else {
        gym!.likes.unshift({ user: req.user.id });
        await gym!.save();
        return res.status(201).json(gym);
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  }

  @Post("/:id/unlike")
  @UseBefore(passport.authenticate("jwt", { session: false }))
  public async unlikeGym(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const gym = await Gym.findById(req.params.id);
      if (
        gym!.likes.filter(like => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ errors: "You have already liked" });
      } else {
        const removeIndex = gym!.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);
        gym!.likes.splice(removeIndex, 1);
        await gym!.save();
        return res.status(201).json(gym);
      }
    } catch (e) {
      return res.status(404).json(e);
    }
  }

  @Post("/files")
  @UseBefore(parser.single("image"))
  public async uploadGymImage(@Req() req: Request, @Res() res: Response) {
    if (!req.file) {
      return res.status(400).json({ errors: "Error when uploading image " });
    }
    return res.status(200).json(req.file.secure_url);
  }
}
