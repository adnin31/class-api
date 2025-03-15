import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./user.js";

class TeacherStudent extends Model {}

TeacherStudent.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    teacher_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    student_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "TeacherStudent",
  }
);

User.belongsToMany(User, {
  as: "Students",
  through: TeacherStudent,
  foreignKey: "teacher_id",
});
User.belongsToMany(User, {
  as: "Teachers",
  through: TeacherStudent,
  foreignKey: "student_id",
});

export default TeacherStudent;
