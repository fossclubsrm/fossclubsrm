import { config } from "dotenv";

config();

export const env = {
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.DATABASE_URL ||
    "mongodb://localhost:27017/fossclubsrm",
};
