import { DataTypes, Model } from "sequelize";
import db from "@/lib/db";
import { Report } from "../types";
import { generateULID } from "@/features/common/helpers";
import { REPORTS_TABLE_NAME } from "../constants";

class ReportModel extends Model<Report, Partial<Report>> {}

ReportModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: generateULID,
      unique: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transcript: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    strengths: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    weaknesses: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    suggestions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db.sequelize,
    indexes: [
      { fields: ["score"] },
      { fields: ["score", "filename"] },
      { fields: ["filename"] },
    ],
    modelName: REPORTS_TABLE_NAME,
  }
);

export default ReportModel;
