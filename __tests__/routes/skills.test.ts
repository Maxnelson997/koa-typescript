import server from "../../src/server";
import request from "supertest";
import * as storage from "../../src/storage/redis";

jest.mock("../../src/storage/redis");
console.log(storage);
afterEach(done => {
  server.close();
  done();
});

describe("routes/skills", () => {
  describe("post", () => {
    const skills = [
      "Agile Development",
      "React"
      // "Webpack",
      // "Babel",
      // "ESLint",
      // "Angular",
      // "Vue",
      // "Redux",
      // "Hooks"
    ];

    skills.forEach((skill: string) => {
      it(`should allow adding a skill to the list - ${skill}`, async () => {
        // storage.redisStorage = jest.fn(() => {

        // });
        const mockGet = jest.fn((list: string) => Promise.resolve([skill]));

        storage.redisStorage = jest.fn(() => {
          return {
            get: mockGet,
            add: (list: string) => Promise.resolve(false),
            remove: (list: string) => Promise.resolve(false)
          };
        });

        const response = await request(server)
          .post("/skills")
          .send({ skill });

        expect(response.status).toEqual(201);
        expect(response.type).toEqual("application/json");
        expect(response.body).toEqual({
          skills: [skill]
        });

        expect(mockGet).toHaveBeenCalled();
      });
    });

    it(`should keep track of all skills added to the list'`, async () => {
      const list_of_skills: string[] = [];
      const mockGet = jest.fn((list: string) =>
        Promise.resolve(list_of_skills)
      );
      const mockAdd = jest.fn((list: string, name: string) => {
        list_of_skills.push(name);
        return list_of_skills.length > 0;
      });

      storage.redisStorage = jest.fn(() => {
        return {
          get: mockGet,
          add: mockAdd,
          remove: (list: string) => Promise.resolve(false)
        };
      });

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

    xit("should return a validation failure if the skill data is incorrect", async () => {
      const response = await request(server)
        .post("/skills")
        .send({ skill: "" });

      expect(response.status).toEqual(400);
      expect(response.type).toEqual("application/json");
      expect(response.body).toEqual({
        status: "error",
        data: [
          {
            target: {
              skill: ""
            },
            value: "",
            property: "skill",
            children: [],
            constraints: {
              length: "skill must be longer than or equal to 1 characters"
            }
          }
        ]
      });
    });
  });

  describe("delete", () => {
    it("returns an empty list when the list is empty", async () => {
      const skill = "C++";

      const list_of_skills: string[] = [skill];

      const mockGet = jest.fn((list: string) =>
        Promise.resolve(list_of_skills)
      );
      const mockAdd = jest.fn();
      const mockRemove = jest.fn((list: string, skill: string) => {
        const index = list_of_skills.indexOf(skill);
        if (index === -1) {
          return false;
        }
        list_of_skills.splice(index, 1);
        return true;
      });

      storage.redisStorage = jest.fn(() => {
        return {
          get: mockGet,
          add: mockAdd,
          remove: mockRemove
        };
      });

      const response = await request(server)
        .delete("/skills")
        .send({ name: skill });

      expect(response.status).toEqual(200);
      expect(response.type).toEqual("application/json");
      expect(response.body).toEqual({
        skills: []
      });

      expect(mockGet).toHaveBeenCalled();
      expect(mockRemove).toHaveBeenCalled();
      expect(mockAdd).not.toHaveBeenCalled();
    });
  });

  it("returns an updated list when deleting a skill", async () => {
    const skill = "Overwatch";

    const list_of_skills: string[] = ["GTA 5", skill, "Diablo 3"];

    const mockGet = jest.fn((list: string) => Promise.resolve(list_of_skills));
    const mockAdd = jest.fn();
    const mockRemove = jest.fn((list: string, skill: string) => {
      const index = list_of_skills.indexOf(skill);
      if (index === -1) {
        return false;
      }
      list_of_skills.splice(index, 1);
      return true;
    });

    storage.redisStorage = jest.fn(() => {
      return {
        get: mockGet,
        add: mockAdd,
        remove: mockRemove
      };
    });

    const response = await request(server)
      .delete("/skills")
      .send({ name: skill });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual("application/json");
    expect(response.body).toEqual({
      skills: list_of_skills.filter(item => item !== skill)
    });

    expect(mockGet).toHaveBeenCalled();
    expect(mockRemove).toHaveBeenCalled();
    expect(mockAdd).not.toHaveBeenCalled();
  });
});
