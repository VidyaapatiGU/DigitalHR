const request = require("supertest");
const app = require("../app");
const { mongoose } = require("../config/db");  // Import mongoose connection

describe("GET /api/v1/", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/api/v1/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Welcome to Backend API for DigitalHR");
  });
});

afterAll(async () => {
  await mongoose.connection.close(); // Close MongoDB connection after tests
});
