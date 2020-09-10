import { redisStorage } from "../../src/storage/redis";

describe("storage/redis", () => {
  describe("get", () => {
    const list_name = "get_test_list";

    it("should initially return an empty list", async () => {
      expect(await redisStorage.get(list_name)).toEqual([]);
    });

    xit("should return all items in a list", async () => {
      expect(await redisStorage.get(list_name)).toEqual([]);
    });
  });
  xdescribe("add", () => {
    const list_name = "add_test_list";

    it("should allow adding an element to a list", async () => {
      expect(await redisStorage.add(list_name, "Maxwell")).toEqual(["Maxwell"]);
    });
  });

  describe("remove", () => {
    const list_name = "remove_test_list";

    it("should allow removing an element from a list", async () => {
      const name1 = "Maxwell";
      const name2 = "ISHABOI";

      await redisStorage.add(list_name, name1);
      await redisStorage.add(list_name, name2);

      expect(await redisStorage.get(list_name)).toEqual([name1, name2]);
    });
  });
});
