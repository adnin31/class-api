import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("teacher", "student"),
      allowNull: false,
    },
    suspended: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: false, 
      allowNull: false ,
    },

  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
