# Copilot Instructions for Playwright Zombie Edition

## Project Overview
This repository contains automated tests for the Zombie Plus web system, built using Playwright (Node.js). The architecture is organized for clear separation of test types and reusable actions.

## Directory Structure & Key Files
- `tests/e2e/` — End-to-end test specs (login, movie, tvshow, lead)
- `tests/api/` — API-level test specs and instructions
- `tests/support/` — Shared actions, components, API helpers, and fixtures
- `playwright.config.js` — Playwright configuration
- `package.json` — Dependencies and scripts
- `playwright-report/` — Generated test reports

## Test Execution
- Run all tests: `npx playwright test`
- Run login tests: `npx playwright test tests/e2e/login.spec.js --grep "@login" --headed`
- Run movie/series tests: `npx playwright test tests/e2e/movie.spec.js --grep "@movie" --headed`
- Show test report: `npx playwright show-report`

## Patterns & Conventions
- **Tagging:** Use `@login` and `@movie` tags in test specs for targeted runs.
- **Actions:** Common UI and API actions are abstracted in `tests/support/actions/` and `tests/support/api/`.
- **Fixtures:** Test data (e.g., movies) is stored in `tests/support/fixtures/`.
- **Screenshots & Videos:** Test artifacts are saved in `test-results/` and `playwright-report/data/`.
- **Database:** Interactions are handled via `tests/support/database.js`.

## Integration Points
- Uses Faker for test data generation.
- Integrates with PostgreSQL for backend validation.

## Example Workflow
1. Add new test spec in `tests/e2e/` or `tests/api/`.
2. Use shared actions from `tests/support/actions/`.
3. Tag tests for selective execution.
4. Run tests and view reports.

## Useful References
- For login test logic, see `tests/e2e/login.spec.js` and `tests/support/actions/Login.js`.
- For movie/series test logic, see `tests/e2e/movie.spec.js` and `tests/support/actions/Movie.js`.
- For API helpers, see `tests/support/api/`.

---
For more details, see the course at https://qaxperience.com
