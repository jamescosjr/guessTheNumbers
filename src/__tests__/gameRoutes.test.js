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
        expect(res.body).toEqual({
             message: "The game has began!", 
             _id: expect.any(String), 
             attempts: 10,
             createdAt: expect.any(String),
            });
    });

    it("should create a field updatedAt when updating a game", async () => {
        const game = await request(app).post("/games/").send({ level: 1 });
        const _id = game.body._id;
    
        expect(game.body).toHaveProperty("createdAt");
    
        const res = await request(app)
            .post(`/games/guess/${_id}`)
            .send({ guess: 2 });
    
        const updatedGame = await Game.findById(_id).lean();
    
        expect(res.statusCode).toBe(200);
        expect(updatedGame).toMatchObject({
            _id: expect.any(Object),
            secretNumber: expect.any(Number),
            attempts: 10,
            remainingAttempts: 9,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
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
        expect(res.body).toEqual({ remainingAttempts: 10, status: "The game is in progress.", attemptsUsed: 0 });
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

    it("should start a new game with level 2, make a guess and check the status", async () => {
        const resStart = await request(app).post("/games/").send({ level: 2 });
        const game = resStart.body;
    
        const resGuess = await request(app)
            .post(`/games/guess/${game._id}`)
            .send({ guess: 50 });
    
        expect(resGuess.statusCode).toBe(200);
    
        const resStatus = await request(app).get(`/games/${game._id}`).send();
    
        expect(resStatus.statusCode).toBe(200);
        expect(resStatus.body).toEqual({ remainingAttempts: 7, status: "The game is in progress.", attemptsUsed: 1 });
});
});

