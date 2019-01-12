import {Request, Response} from "express";
import { JsonController, Get, Req, Res } from "routing-controllers";
import GymProvider from "./gymProvider";
import { Service } from "typedi";

@Service()
@JsonController()
export class GymController {
  constructor(private gymProvider: GymProvider) {}

  @Get("/gyms")
  public async getAll(@Req() request: Request, @Res() response: Response) {
    return response.json(this.gymProvider.getAll());
  }
}
