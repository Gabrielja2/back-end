import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const JWT_EXPIRE_IN_SECONDS = Number(process.env.JWT_EXPIRE_IN_SECONDS);
export const JWT_SECRET = process.env.JWT_SECRET;

