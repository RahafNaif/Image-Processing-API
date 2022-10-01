import supertest from "supertest";
import app from "../index";
import resizeImage from "../controller/image-processing";

const request = supertest(app);
describe("Test endpoint responses", () => {
  it("test the api endpoint", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });

  it("test /api/images with valid query", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "fjord", width: 400, height: 300 });
    expect(response.status).toBe(200);
  });

  it("test /api/images with does not exist image", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "test", width: 400, height: 300 });
    expect(response.status).toBe(400);
  });

  it("test /api/images with unvalid width", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "fjord", width: 0, height: 300 });
    expect(response.status).toBe(400);
  });

  it("test /api/images with unvalid height", async () => {
    const response = await request
      .get("/api/images")
      .query({ filename: "fjord", width: 0, height: -3 });
    expect(response.status).toBe(400);
  });
});

describe("Test image processing functionalites", async() => {
  it("Test image processing", async () => {
    const response = await resizeImage("fjord",200,200);
    expect(response).toBeTrue();
  });
});