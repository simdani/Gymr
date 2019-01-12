import jwt from "jsonwebtoken";

export const signToken = (payload: any) => {
  return jwt.sign(payload, "super-secret", { expiresIn: 3600 });
};
