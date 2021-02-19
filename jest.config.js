module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // The directory where Jest should output its coverage files
    coverageDirectory: '__tests__/.coverage',
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    setupFilesAfterEnv: ['<rootDir>/__tests__/config/jest/setupTests.js'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/', '__tests__/config'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '^.+\\.css$': '<rootDir>/__tests__/config/jest/cssTransform.js',
    },
    transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    moduleNameMapper: {
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/$1' // important map for jest to read absolute imports correctly
    },
}