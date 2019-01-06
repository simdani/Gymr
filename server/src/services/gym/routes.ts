import { Request, Response } from "express";
import { Gym } from "../../models/gym/Gym";

export default [
    {
        path: "/api/v1/gyms",
        method: "get",
        handler: async (req: Request, res: Response) => {
            const gyms = await Gym.findAll();
            res.json(gyms);
        }
    }
];
