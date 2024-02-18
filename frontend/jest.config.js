// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testMatch: [
        "**/__tests__/**/*.tsx?(x)",
        "**/?(*.)+(spec|test).tsx?(x)"
    ],
};
  