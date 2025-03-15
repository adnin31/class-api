process.env.DATABASE_URL="mysql://user:password123@localhost:3306/school"

export default {
  testEnvironment: "node",
  transform: {},
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
};