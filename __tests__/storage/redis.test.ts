import { redisStorage } from "../../src/storage/redis";

describe("storage/redis", () => {
  describe("get", () => {
    it("should initially return an empty list", () => {
      const list_name = "my_test_list";
      expect(redisStorage.get(list_name)).toEqual([]);
    });
  });
  xdescribe("add", () => {});
  xdescribe("remove", () => {});
});
