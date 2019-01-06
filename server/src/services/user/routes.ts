import { Request, Response } from "express";
import { User } from "../../models/user/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default [
  {
    path: "/api/v1/users/register",
    method: "post",
    handler: async (req: Request, res: Response) => {
      const user = await User.findOne({email: req.body.email});

      if (user) {
        res.status(400).json("already exists");
      } else {

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        const createUser = await newUser.save();
        res.status(201).json(createUser);

        // const salt = await
        // const gyms = await Gym.findAll();
        // res.json(gyms);
      }
    }
  },
  {
    path: "/api/v1/users/login",
    method: "post",
    handler: async (req: Request, res: Response) => {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json("user not found");
      } else {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          };

          const token = jwt.sign(
              payload,
              "super-secret",
              { expiresIn: 3600 }
          );

          res.status(200).json({
            success: true,
            token: 'Bearer ' + token
          });
        } else {
          res.status(400).json("wrong password");
        }
      }
    }
  }
];
