const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const Game = require("../models/gameModel");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {});
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Game Routes", () => {
    it("should start a new game", async () => {
        const res = await request(app).post("/games/").send({ level: 1 });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body).toHaveProperty("attempts", 10);
    });

    it("should make a guess", async () => {
        const resStart = await request(app).post("/games/").send({ level: 1 });
        const _id = resStart.body._id;

        const res = await request(app)
            .post(`/games/guess/${_id}`)
            .send({ guess: 50 });
    
        expect(res.statusCode).toBe(200);
    });

    it("should get game status", async () => {
        const resStart = await request(app).post("/games/").send({ level: 1 });
        const game = resStart.body;
    
        const res = await request(app).get(`/games/${game._id}`).send();

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("status");
    });

    it("should return 400 for invalid guess", async () => {
        const resStart = await request(app).post("/games/").send({ level: 1 });
        const game = resStart.body;
    
        const res = await request(app)
            .post(`/games/guess/${game._id}`)
            .send({ guess: "invalid" });
    
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty("error");
    });

    it("should return 404 for non-existent game", async () => {
        const res = await request(app).get(`/games/invalid_id`).send();

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty("error");
    });
});

