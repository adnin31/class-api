import User from "../models/user.js";
import TeacherStudent from "../models/teacherStudent.js";


export const register = async (req, res) => {
    try {
      const { teacher, students } = req.body;

      if (!teacher || !students || !Array.isArray(students)) {
        return res.status(400).json({ message: "Invalid request body" });
      }
  
      let teacherUser = await User.findOne({ where: { email: teacher } });
  
      if (!teacherUser) {
        teacherUser = await User.create({
          email: teacher,
          name: teacher.split("@")[0],
          role: "teacher",
        });
      } else if (teacherUser.role !== "teacher") {
        return res.status(400).json({ message: "This email is not a teacher" });
      }
  
      const studentUsers = [];
      for (const studentEmail of students) {
        let studentUser = await User.findOne({ where: { email: studentEmail } });
  
        if (!studentUser) {
          studentUser = await User.create({
            email: studentEmail,
            name: studentEmail.split("@")[0],
            role: "student",
          });
        } else if (studentUser.role !== "student") {
          return res.status(400).json({ message: `${studentEmail} is not a student` });
        }
  
        studentUsers.push(studentUser);
      }
  
      const registrations = studentUsers.map((student) => ({
        teacher_id: teacherUser.id,
        student_id: student.id,
      }));
  
      await TeacherStudent.bulkCreate(registrations, {
        ignoreDuplicates: true,
      });
  
      return res.status(204).json({ message: "Teacher & students registered successfully" });
    } catch (error) {
      console.error("Error in registration:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
