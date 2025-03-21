import User from "../models/user.js";

export const suspendStudent = async (req, res) => {
  try {
    const { student } = req.body;

    if (!student) {
      return res.status(400).json({ message: "Student email is required" });
    }

    const studentRecord = await User.findOne({ where: { email: student, role: 'student' } });

    if (!studentRecord) {
      return res.status(404).json({ message: "Student not found" });
    }

    studentRecord.suspended = true;
    await studentRecord.save();

    return res.status(204).json({ message: `Student ${student} has been suspended` });
  } catch (error) {
    console.error("Error suspending student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
