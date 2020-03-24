import { omit } from "lodash";
import { initDb, generate } from "til-server-test-utils";
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

test("getUser returns the specific user", async () => {
  const testUser = await db.insertUser(generate.userData());
  const req = {
    params: { id: testUser.id }
  };
  const res = {
    json: jest.fn()
  };

  await usersController.getUser(req, res);

  expect(res.json).toHaveBeenCalledTimes(1);
  const firstCall = res.json.mock.calls[0];
  const firstArg = firstCall[0];
  const { user } = firstArg;
  expect(user).toEqual(safeUser(testUser));
  const userFromDb = await db.getUser(user.id);
  expect(userFromDb).toEqual(testUser);
});

test("updateUser updates the user with the given changes", async () => {
  const testUser = await db.insertUser(generate.userData());
  const username = generate.username();
  const req = {
    user: { id: testUser.id },
    params: { id: testUser.id },
    body: { username }
  };

  const res = {
    json: jest.fn()
  }

  const updatedUser = { ...testUser, username };

  await usersController.updateUser(req, res);

  expect(res.json).toHaveBeenCalledTimes(1);
  const firstCall = res.json.mock.calls[0];
  const firstArg = firstCall[0];
  const { user } = firstArg;
  expect(user).toEqual(safeUser(updatedUser));
  const userFromDb = await db.getUser(user.id);
  expect(userFromDb).toEqual(updatedUser);
});

