module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    clearMocks: true,
    setupFilesAfterEnv: ["./src/lib/client.mock.ts",
    "./src/lib/middleware/multer.mock.ts",
    "./src/lib/middleware/passport.mock.ts"
  ]
  };