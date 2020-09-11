import { DeleteSkillRequest } from "../../src/request/DeleteSkillRequest";
import { validate } from "class-validator";

describe("request/DeleteSkillRequest", () => {
  let deleteSkillRequest: DeleteSkillRequest;
  const validatorOptions = {};

  beforeAll(() => {
    deleteSkillRequest = new DeleteSkillRequest();
  });

  it(`has the expected class properties`, async () => {
    deleteSkillRequest.skill = "A skill skill here";
    expect(deleteSkillRequest.skill).toBeDefined();
  });

  describe(`'skill' validation`, () => {
    it("is valid", async () => {
      for (let i = 1; i <= 20; ++i) {
        deleteSkillRequest.skill = "x".repeat(i);
        expect(
          await validate(deleteSkillRequest, validatorOptions)
        ).toHaveLength(0);
      }
    });

    it("must have a length of 1 character or greater", async () => {
      deleteSkillRequest.skill = "";
      expect(await validate(deleteSkillRequest, validatorOptions)).toHaveLength(
        1
      );
    });

    it("must have a length of 20 characters or fewer", async () => {
      deleteSkillRequest.skill = "testing is dope mane.".repeat(21);
      expect(await validate(deleteSkillRequest, validatorOptions)).toHaveLength(
        1
      );
    });
  });
});
