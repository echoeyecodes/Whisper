import { ulid } from "ulid";

export const isProductionEnvironment = () =>
  process.env.NODE_ENV === "production";

export const generateULID = () => {
  return ulid();
};
