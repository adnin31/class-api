import request from "supertest";
import app from "../src/index.js"; // Ensure this points to your Express instance

describe("Student API Tests", () => {
  test("POST /api/register - Register a teacher with students", async () => {
    const response = await request(app).post("/api/register").send({
      teacher: "teacherken@gmail.com",
      students: ["studentjon@gmail.com", "studenthon@gmail.com"],
    });

    expect(response.status).toBe(204);
  });

  test("GET /api/commonstudents - Get common students for a teacher", async () => {
    const response = await request(app).get(
      "/api/commonstudents?teacher=teacherken@gmail.com"
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("students");
    expect(Array.isArray(response.body.students)).toBe(true);
  });

  test("POST /api/retrievefornotifications - Retrieve notification recipients", async () => {
    const response = await request(app).post("/api/retrievefornotifications").send({
      teacher: "teacherken@gmail.com",
      notification: "Hello @studentjon@gmail.com @studenthon@gmail.com",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("recipients");
    expect(Array.isArray(response.body.recipients)).toBe(true);
  });

  test("POST /api/suspend - Suspend a student", async () => {
    const response = await request(app).post("/api/suspend").send({
      student: "studentjon@gmail.com",
    });

    expect(response.status).toBe(204);
  });
});
