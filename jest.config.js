module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/examples/**',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^next/head$': '<rootDir>/__mocks__/next/head.tsx',
    '^next/router$': '<rootDir>/__mocks__/next/router.tsx',
    '^next/image$': '<rootDir>/__mocks__/next/image.tsx',
    '^next/dynamic$': '<rootDir>/__mocks__/next/dynamic.tsx',
  },
};
