import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY || "default-secret-key";

export const verifyToken = (token: string) => {
  return jwt.verify(token, secretKey);
};
