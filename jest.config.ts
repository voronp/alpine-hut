const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/backend-iot',
    '<rootDir>/libs/feature-peripherals/list',
  ],
};
