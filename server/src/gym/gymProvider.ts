import { Service } from 'typedi';
import { Gym } from '../models/Gym';
import GetAllGymsResponse from './responses/getAllGymsResponse';
import GymDto from './dto/GymDto';
import { escapeRegex } from '../helpers/regexHelper';

@Service()
export default class GymProvider {
  constructor() {}

  public async findGym(req: any) {
    return Gym.findById({
      _id: req.params.id
    });
  }

  public async updateReview(req: any) {
    const gym = await Gym.findById(req.params.id);

    const reviewIndex = gym!.reviews
      .map(item => item._id.toString())
      .indexOf(req.params.reviewId);

    const text = req.body.text;

    gym!.reviews[reviewIndex].text = text;

    gym!.save();

    return gym!.reviews[reviewIndex];
  }

  public async deleteReview(req: any) {
    const gym = await Gym.findById(req.params.id);

    if (
      gym!.reviews.filter(
        review => review._id.toString() === req.params.reviewId
      ).length === 0
    ) {
      return null;
    }
    // ret review index
    const removeIndex = gym!.reviews
      .map(item => item._id.toString())
      .indexOf(req.params.reviewId);

    await gym!.reviews.splice(removeIndex, 1);
    await gym!.save();

    return gym;
  }

  public async addReview(req: any) {
    const gym = await Gym.findById(req.params.id);

    const newReview = {
      username: req.body.username,
      text: req.body.text,
      user: req.user.id
    };

    await gym!.reviews.unshift(newReview);
    await gym!.save();

    return gym!.reviews[0];
  }

  public async deleteGym(req: any) {
    const gym = await Gym.findOneAndDelete({
      _id: req.params.id
    });
    return gym;
  }

  public async updateGym(req: any) {
    const gym = await Gym.findById(req.params.id);
    const name = req.body.name;
    const city = req.body.city;
    const description = req.body.description;
    const website = req.body.website;

    gym!.name = name;
    gym!.city = city;
    gym!.description = description;
    gym!.website = website;

    return gym!.save();
  }

  public async createGym(req: any) {
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

    return gym.save();
  }

  public async getGyms(req: any) {
    let perPage = 12; // gyms per page
    let page = parseInt(req.query.page) || 1; // curent page

    let gyms;
    let count;

    if (req.query.sort) {
      if (req.query.sort === 'newest') {
        gyms = await Gym.find()
          .sort({ date: 'descending' })
          .skip(perPage * page - perPage)
          .limit(perPage);
      } else if (req.query.sort === 'oldest') {
        gyms = await Gym.find()
          .sort({ date: 'ascending' })
          .skip(perPage * page - perPage)
          .limit(perPage);
      } else if (req.query.sort === 'likes') {
        gyms = await Gym.find()
          .sort({ likes: 'descending' })
          .skip(perPage * page - perPage)
          .limit(perPage);
      }
    } else {
      gyms = await Gym.find()
        .skip(perPage * page - perPage)
        .limit(perPage);
    }
    count = await Gym.countDocuments();

    return {
      gyms,
      current: page,
      pages: Math.ceil(count / perPage)
    };
  }

  // get all gyms
  public async getAllGyms(req: any) {
    let gyms;

    if (req.query.sort) {
      if (req.query.sort === 'newest') {
        gyms = await Gym.find().sort({ date: 'descending' });
      } else if (req.query.sort === 'oldest') {
        gyms = await Gym.find().sort({ date: 'ascending' });
      } else if (req.query.sort === 'likes') {
        gyms = await Gym.find().sort({ likes: 'descending' });
      }
    } else {
      gyms = await Gym.find();
    }

    return gyms;
  }

  // find gyms by city
  async searchGyms(req: any) {
    let perPage = 12; // gyms per page
    let page = parseInt(req.query.page) || 1; // curent page

    let gyms;
    let count;
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');

    if (req.query.sort) {
      if (req.query.sort === 'newest') {
        gyms = await Gym.find({ city: regex })
          .sort({ date: 'descending' })
          .skip(perPage * page - perPage)
          .limit(perPage);
      } else if (req.query.sort === 'oldest') {
        gyms = await Gym.find({ city: regex })
          .sort({ date: 'ascending' })
          .skip(perPage * page - perPage)
          .limit(perPage);
      } else if (req.query.sort === 'likes') {
        gyms = await Gym.find({ city: regex })
          .sort({ likes: 'descending' })
          .skip(perPage * page - perPage)
          .limit(perPage);
      }
    } else {
      gyms = await Gym.find({ city: regex })
        .skip(perPage * page - perPage)
        .limit(perPage);
    }

    count = await Gym.countDocuments({ city: regex });

    return {
      gyms,
      current: page,
      pages: Math.ceil(count / perPage)
    };
  }

  // public async getAll(): Promise<GetAllGymsResponse> {
  //   const gyms = await Gym.findAll();

  //   // const resultItems = gyms.map(entry => new GymDto(entry.id, entry.name));
  //   // console.log(resultItems);

  //   return new GetAllGymsResponse(gyms);
  // }
}
