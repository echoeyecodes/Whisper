import db from "../db";

export const database = () => {
  return db.authenticate();
};
