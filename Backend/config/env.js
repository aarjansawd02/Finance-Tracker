import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 5001,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

export default env;
