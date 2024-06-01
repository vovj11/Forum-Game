import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {},
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/*.spec.cy.js',
  },
});
