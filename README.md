# SauceDemo — Page Object tests

End-to-end tests for [SauceDemo](https://www.saucedemo.com/) in TypeScript +
Playwright, written as coursework for a QA automation course.

The scope of this assignment is the Page Object pattern: locators and page
actions live in classes, tests only call their methods.

## Setup

```bash
npm install
npx playwright install
```

Create an environment file in the project root with a single variable:

```
BASE_URL=https://www.saucedemo.com
```

It is git-ignored, so every machine needs its own copy.

## Run

```bash
npx playwright test                      # all tests
npx playwright test tests/cart.spec.ts   # one file
npx playwright test --headed             # with a visible browser
```

## Report

```bash
npx playwright show-report
```

A trace is recorded on the first retry (`trace: 'on-first-retry'`) and opens
from the report.

## Structure

```
src/pages/        page objects, one class per page
src/constants/    users, passwords, generated checkout data
tests/            specs, one file per area
```

| Class | Page |
|---|---|
| `LoginPage` | sign-in form |
| `InventoryPage` | product catalog |
| `CartPage` | cart |
| `CheckoutStepOnePage` | customer details |
| `CheckoutStepTwoPage` | order summary |
| `CheckoutCompletePage` | confirmation |

`BasePage` holds what the pages share: the `page` reference and a helper that
narrows a list of cards down to the one with a given title. Methods ending in
`ByTitle` take the product name as an argument, so the same method works for
any product.

Checkout data (first name, last name, postal code) is generated with Faker on
every call, so no two runs submit the same values.

## CI

GitHub Actions runs the suite on every pull request and on pushes to `main`
(`.github/workflows/playwright.yml`). `BASE_URL` has to be set in the
repository variables — Settings → Secrets and variables → Actions → Variables.
