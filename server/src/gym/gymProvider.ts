import { Service } from 'typedi';
import { Gym } from "../models/gym/Gym";
import GetAllGymsResponse from './responses/getAllGymsResponse';
import GymDto from './dto/GymDto';

@Service()
export default class GymProvider {
  constructor() {}

  public async getAll(): Promise<GetAllGymsResponse> {
    const gyms = await Gym.findAll();

    const resultItems = gyms.map((entry) => new GymDto(entry.name));
    console.log(resultItems);

    return new GetAllGymsResponse(resultItems);
  }
}