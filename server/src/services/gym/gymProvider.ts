import { Service } from 'typedi';
import { Gym } from "../../models/gym/Gym";

@Service()
export default class GymProvider {
  constructor() {}
  
  public async getAll() {
    const gyms = await Gym.findAll();
    return gyms;
  }
}
