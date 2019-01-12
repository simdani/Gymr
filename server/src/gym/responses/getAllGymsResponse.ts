import GymDto from "../dto/GymDto";

export default class GetAllGymsResponse {
  constructor(public gyms: GymDto[]) {}
}