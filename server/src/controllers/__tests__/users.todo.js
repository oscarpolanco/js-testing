import { omit } from "lodash";
import { initDb, generate } from "til-server-test-utils";
import * as usersController from "../users.todo";
import db from "../../utils/db";

// this setup is common across controllers, so it may be useful to
// add this to the utils, but I'll leave it here for you :)
function setup() {
  const req = {
    body: {}
  };
  const res = {};
  Object.assign(res, {
    status: jest.fn(
      function status() {
        return this;
      }.bind(res)
    ),
    json: jest.fn(
      function json() {
        return this;
      }.bind(res)
    ),
    send: jest.fn(
      function send() {
        return this;
      }.bind(res)
    )
  });
  return { req, res };
}

const safeUser = u => omit(u, ["salt", "hash"]);

beforeEach(() => initDb());

test("getUsers returns all users in the database", async () => {
  const {req, res} = setup();

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
  const {req, res} = setup();
  req.params = { id: testUser.id };
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
  const {req, res } = setup();
  req.user = { id: testUser.id };
  req.params = { id: testUser.id };
  req.body =  { username };

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

test('deleteUser will 403 if not requested by the user', async () => {
  const {req, res} = setup();
  const testUser = await db.insertUser(generate.userData());
  req.params = { id: testUser.id };
  req.user = { id: generate.id() };
  await usersController.deleteUser(req, res);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(403);
  expect(res.send).toHaveBeenCalledTimes(1);
});

test('deleteUser will 404 id user does not exist', async () => {
  const {req, res} = setup();
  req.params = { id: generate.id };
  req.user = { id: generate.id() };
  await usersController.deleteUser(req, res);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.send).toHaveBeenCalledTimes(1);
});
