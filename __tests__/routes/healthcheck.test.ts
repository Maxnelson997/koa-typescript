import server from '../../src/server';
import request from "supertest";

afterEach(done => {
    server.close();
    done();
})

describe("routes/healthcheck", () => {
    it("should get whats good", async () => {
        const response = await request(server).get('/whats');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json")
        expect(response.body.data).toEqual("good");
    })
})