import server from "../../src/server";
import request from "supertest";

afterEach(done => {
  server.close();
  done();
});

describe("routes/skills", () => {
  const skills = [
    "Agile Development",
    "React",
    "Webpack",
    "Babel",
    "ESLint",
    "Angular",
    "Vue",
    "Redux",
    "Hooks"
  ];

  skills.forEach((skill: string) => {
    it(`should allow adding a skill to the list - ${skill}`, async () => {
      const response = await request(server)
        .post("/skills")
        .send({ skill });

      expect(response.status).toEqual(201);
      expect(response.type).toEqual("application/json");
      expect(response.body).toEqual({
        skills: [skill]
      });
    });
  });

  it(`should keep track of all skills added to the list'`, async () => {
    const data1 = { skill: "Docker" };
    const response1 = await request(server)
      .post("/skills")
      .send(data1);

    expect(response1.status).toEqual(201);
    expect(response1.type).toEqual("application/json");
    expect(response1.body).toEqual({
      skills: [data1.skill]
    });

    const data2 = { skill: "Vue" };
    const response2 = await request(server)
      .post("/skills")
      .send(data2);

    expect(response2.status).toEqual(201);
    expect(response2.type).toEqual("application/json");
    expect(response2.body).toEqual({
      skills: [data1.skill, data2.skill]
    });
  });
});
