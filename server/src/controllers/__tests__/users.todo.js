import { initDb } from "til-server-test-utils";
import * as userController from "../users";

test("getUsers returns all users in the database", async () => {
  await initDb();
  const req = {};
  const res = {
    json: jest.fn()
  };

  await userController.getUsers(req, res);
  expect(res.json).toHaveBeenCalledTimes(1);
  console.log(res.json.mock.calls[0]);
});
