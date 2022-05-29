const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/backend-iot',
    '<rootDir>/libs/feature-peripherals/list',
  ],
};
