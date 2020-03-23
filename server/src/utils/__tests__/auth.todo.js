import { isPasswordAllowed, userToJSON } from "../auth";

// TODO: refactor
describe("isPasswordAllowed", () => {
  const allowedPassword = ["sfkl.e903f.s"];
  const disallowedPassword = ["", "ffffffffff", "8888888888"];

  allowedPassword.forEach(pwd => {
    it(`"${pwd}" should be allowed`, () => {
      expect(isPasswordAllowed(pwd)).toBe(true);
    });
  });

  disallowedPassword.forEach(pwd => {
    it(`"${pwd}" should be allowed`, () => {
      expect(isPasswordAllowed(pwd)).toBe(false);
    });
  });
});

test("isPasswordAllowed only allows some passwords", () => {
  // here's where I'll demo things for you :)
  expect(isPasswordAllowed("")).toBe(false);
  expect(isPasswordAllowed("ffffffffff")).toBe(false);
  expect(isPasswordAllowed("8888888888")).toBe(false);
  expect(isPasswordAllowed("sfkl.e903f.s")).toBe(true);
});

test("userToJSON excludes secure properties", () => {
  // Here you'll need to create a test user object
  // pass that to the userToJSON function
  // and then assert that the test user object
  // doesn't have any of the properties it's not
  // supposed to.
  // Here's an example of a user object:
  const safeUser = {
    id: "some-id",
    username: "sarah"
  };
  const user = {
    ...safeUser,
    // ↑ above are properties which should
    // be present in the returned object

    // ↓ below are properties which shouldn't
    // be present in the returned object
    exp: new Date(),
    iat: new Date(),
    hash: "some really long string",
    salt: "some shorter string"
  };

  const schema = {
    id: expect.any(String),
    username: expect.any(String)
  };

  const jsonUser = userToJSON(user);
  // 2 ways of do the same task
  expect(jsonUser).toEqual(schema);
  expect(jsonUser).toEqual(safeUser);
});

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=auth%20util&em=
*/
test.skip("I submitted my elaboration and feedback", () => {
  const submitted = false; // change this when you've submitted!
  expect(submitted).toBe(true);
});
////////////////////////////////
