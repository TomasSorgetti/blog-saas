export default {
  roots: ["<rootDir>/tests"],

  testEnvironment: "node",

  moduleFileExtensions: ["js", "json"],

  transform: {},

  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/tests/setup/jest.setup.js"],
};
