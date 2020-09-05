import { AddSkillRequest } from "../../src/request/AddSkillRequest";
import { validate } from "class-validator";

describe("request/AddSkillRequest", () => {
  let addSkillRequest: AddSkillRequest;
  const validatorOptions = {};

  beforeAll(() => {
    addSkillRequest = new AddSkillRequest();
  });

  it(`has the expected class properties`, async () => {
    addSkillRequest.name = "A skill name here";
    expect(addSkillRequest.name).toBeDefined();
  });

  describe(`'name' validation`, () => {
    it("is valid", async () => {
      for (let i = 1; i <= 20; ++i) {
        addSkillRequest.name = "x".repeat(i);
        expect(await validate(addSkillRequest, validatorOptions)).toHaveLength(
          0
        );
      }
    });

    it("must have a length of 1 character or greater", async () => {
      addSkillRequest.name = "";
      expect(await validate(addSkillRequest, validatorOptions)).toHaveLength(1);
    });

    it("must have a length of 20 characters or fewer", async () => {
      addSkillRequest.name = "testing is dope mane.".repeat(21);
      expect(await validate(addSkillRequest, validatorOptions)).toHaveLength(1);
    });
  });
});
