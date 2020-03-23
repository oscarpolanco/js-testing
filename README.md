# Testing course
The main goal of the practice is to introduce the testing on my developer skillset.

## Section 1: Intro to testing

A little definition of what is a [Bugs](https://en.wikipedia.org/wiki/Software_bug) on software.

### How to prevent bugs

Here are some ways on how to prevent bugs:

- [Static types](https://en.wikipedia.org/wiki/Type_system) => [flow](https://flow.org/)/[TypeScript](https://www.typescriptlang.org/)
- [Linting](https://en.wikipedia.org/wiki/Lint_(software)) => [Eslint](https://eslint.org/)
- Testing => The previous can't catch logic errors

### How to run the examples

- Need to install [nodejs](https://nodejs.org/en/)
- Open your terminal
- Go to the file directory
- Use the `node` comand to run the file => `node todo.js`

## Section 2: Unit test

On this section, we will do a couple of [unit test](https://en.wikipedia.org/wiki/Unit_testing) examples using [jest](https://jestjs.io/)

### Test factory

On pure functions that you need to test you can use a `test factory` and group the same kind of the test using a lot of properties. Something that helps when you use the `test factory` y put an error message that represents each value, not a generic message.

One useful tool on jest is [jest in case](https://github.com/atlassian/jest-in-case) that will help you to create the variations of the test that you need. An example using `jest in case` => https://github.com/kentcdodds/rtl-css-js

Here an usefull article about [colocation](https://kentcdodds.com/blog/colocation)

### How to run the test

Just need be in the root directory of the project on your console and type `npm run test` from there just follow the instructions.
