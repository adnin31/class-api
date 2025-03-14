import User from "../models/user.js";
import TeacherStudent from "../models/teacherStudent.js";

import { Op, Sequelize } from "sequelize";

export const commonstudents = async (req, res) => {
    try {
      let { teacher } = req.query;
  
      if (!teacher) {
        return res.status(400).json({ message: "Teacher email(s) required" });
      }
  
      // Convert single teacher email to array
      const teacherEmails = Array.isArray(teacher) ? teacher : [teacher];
  
      // Find teacher IDs
      const teachers = await User.findAll({
        where: { email: teacherEmails, role: "teacher" },
        attributes: ["id"],
      });
  
      if (teachers.length !== teacherEmails.length) {
        return res.status(404).json({ message: "One or more teachers not found" });
      }
  
      const teacherIds = teachers.map((t) => t.id);
  
      // Find students who are registered to ALL given teachers
      const studentMappings = await TeacherStudent.findAll({
        where: { teacher_id: { [Op.in]: teacherIds } },
        attributes: ["student_id"],
        group: ["student_id"],
        having: Sequelize.literal(`COUNT(DISTINCT teacher_id) = ${teacherIds.length}`),
      });
  
      const studentIds = studentMappings.map((s) => s.student_id);
  
      // Fetch student emails
      const students = await User.findAll({
        where: { id: studentIds, role: "student" },
        attributes: ["email"],
      });
  
      const studentEmails = students.map((s) => s.email);
  
      return res.status(200).json({ students: studentEmails });
    } catch (error) {
      console.error("Error fetching common students:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
};
