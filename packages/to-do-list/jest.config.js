/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
    // or "babel-jest" if you prefer Babel
  },
  transformIgnorePatterns: [
    // By default: `/node_modules/`
    // We want to MAKE SURE it does NOT ignore `@showcase-lab/components`
    "node_modules/(?!(?:@showcase-lab/components)/)",
  ],
  moduleNameMapper: {
    // Mock out all these file formats when imported in tests
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};
