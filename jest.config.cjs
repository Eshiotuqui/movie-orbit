/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          verbatimModuleSyntax: false,
          module: "CommonJS",
          moduleResolution: "node",
          types: ["jest", "@testing-library/jest-dom"],
        },
        diagnostics: {
          ignoreCodes: [1343, 2339],
        },
        astTransformers: {
          before: [
            {
              path: "ts-jest-mock-import-meta",
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_TMDB_API_KEY: "test-api-key",
                    VITE_TMDB_SESSION_ID: "test-session-id",
                    VITE_TMDB_ACCOUNT_ID: "123456",
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
};