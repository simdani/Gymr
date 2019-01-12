import { Request, RequestHandler, Response } from "express";
import { JsonController, Get } from "routing-controllers";
import GymProvider from "./gymProvider";
import { Service } from "typedi";

@Service()
@JsonController()
export class GymController {
  constructor(private gymProvider: GymProvider) {}

  @Get("/gyms")
  getAll() {
    return this.gymProvider.getAll();
  }
}
