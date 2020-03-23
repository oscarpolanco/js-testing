import { omit } from "lodash";
import { initDb } from "til-server-test-utils";
import * as usersController from "../users";
import db from "../../utils/db";


const safeUser = u => omit(u, ["salt", "hash"]);

beforeEach(() => initDb());

test("getUsers returns all users in the database", async () => {
  const req = {};
  const res = {
    json: jest.fn()
  }

  await usersController.getUsers(req, res);

  expect(res.json).toHaveBeenCalledTimes(1);
  const firstCall = res.json.mock.calls[0];
  const firstArg = firstCall[0];
  const { users } = firstArg;
  expect(users.length).toBeGreaterThan(0);
  const actualUsers = await db.getUsers();
  expect(users).toEqual(actualUsers.map(safeUser));
});
