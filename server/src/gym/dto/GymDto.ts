import GymLikeDto from "./GymLikeDto";

export default class GymDto {
  constructor(
    public _id: string,
    public name: string,
    public city: string,
    public description: string,
    public likes: GymLikeDto[],

  ) {}
}
