import User from "../models/user.js";
import TeacherStudent from "../models/teacherStudent.js";


export const register = async (req, res) => {
    try {
      const { teacher, students } = req.body;
  
      // Validate input
      if (!teacher || !students || !Array.isArray(students)) {
        return res.status(400).json({ message: "Invalid request body" });
      }
  
      // Check if teacher exists, create if not
      let teacherUser = await User.findOne({ where: { email: teacher } });
  
      if (!teacherUser) {
        teacherUser = await User.create({
          email: teacher,
          name: teacher.split("@")[0], // Default name from email
          role: "teacher",
        });
      } else if (teacherUser.role !== "teacher") {
        return res.status(400).json({ message: "This email is not a teacher" });
      }
  
      // Check if students exist, create if not
      const studentUsers = [];
      for (const studentEmail of students) {
        let studentUser = await User.findOne({ where: { email: studentEmail } });
  
        if (!studentUser) {
          studentUser = await User.create({
            email: studentEmail,
            name: studentEmail.split("@")[0], // Default name from email
            role: "student",
          });
        } else if (studentUser.role !== "student") {
          return res.status(400).json({ message: `${studentEmail} is not a student` });
        }
  
        studentUsers.push(studentUser);
      }
  
      // Register students to the teacher
      const registrations = studentUsers.map((student) => ({
        teacher_id: teacherUser.id,
        student_id: student.id,
      }));
  
      await TeacherStudent.bulkCreate(registrations, {
        ignoreDuplicates: true, // Avoid duplicate registrations
      });
  
      return res.status(201).json({ message: "Teacher & students registered successfully" });
    } catch (error) {
      console.error("Error in registration:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
