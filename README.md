# Playwright Agents Automation

## Project structure

```text
Playwright_Agents_Automation/
├── tests/       # Playwright specs; keep specs directly in this folder
├── pages/       # Page objects and page manager
├── testdata/    # JSON test data
├── fixture/     # Custom Playwright fixtures
├── test-result/ # Test artifacts and HTML report
└── docs/        # Test plans and project documentation
```

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `BASE_URL` if targeting a different environment.
3. Run the authentication and inventory/navigation tests with `npm run test:chromium`.
4. Open the HTML report with `npm run test:report`.

The Playwright configuration loads `.env` using `dotenv`. Tests use the shared
`PageFixture` to receive a `PageManager`, which provides access to page objects.
Authentication credentials and expected inventory are stored in
`testdata/authentication.json` and `testdata/inventory.json`. The Inventory and
Navigation suite covers inventory rendering, sorting, product details, cart
actions, the navigation menu, Dynamic Catalog, About navigation, and protected
routes.