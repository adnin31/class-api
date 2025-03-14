import User from "../models/user.js";

export const retrieveForNotifications = async (req, res) => {
  try {
    const { teacher, notification } = req.body;

    if (!teacher || !notification) {
      return res.status(400).json({ message: "Teacher and notification are required" });
    }

    // Find the teacher
    const teacherRecord = await User.findOne({ where: { email: teacher, role: "teacher" } });
    if (!teacherRecord) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Extract @mentioned students
    const mentionedEmails = notification.match(/@([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+)/g) || [];
    const cleanedMentionedEmails = mentionedEmails.map(email => email.replace("@", ""));

    // Find students registered under the teacher
    const registeredStudents = await teacherRecord.getStudents({
      attributes: ["email"],
      where: { suspended: false },
    });

    // Find @mentioned students who are not suspended
    const mentionedStudents = await User.findAll({
      attributes: ["email"],
      where: {
        email: cleanedMentionedEmails,
        role: "student",
        suspended: false,
      },
    });

    // Combine and remove duplicates
    const recipients = new Set([
      ...registeredStudents.map((student) => student.email),
      ...mentionedStudents.map((student) => student.email),
    ]);

    return res.status(200).json({ recipients: Array.from(recipients) });

  } catch (error) {
    console.error("Error retrieving notification recipients:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
