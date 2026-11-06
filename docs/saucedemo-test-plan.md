# SauceDemo Comprehensive Test Plan

## Application Overview

Comprehensive independent manual test scenarios for https://www.saucedemo.com/, covering sign-in and account variants, six-item inventory, sorting and product details, cart operations, checkout validation and completion, navigation/session behavior, app-state reset, accessibility/responsive smoke checks, and negative/error handling. Each scenario starts from a fresh browser session with no persisted app state unless the scenario explicitly creates state within its own steps. Use the documented demo users and shared password secret_sauce. Core observed checkout reference: Sauce Labs Backpack $29.99 plus Sauce Labs Bike Light $9.99 gives $39.98 item total, $3.20 tax, and $43.18 grand total.

## Test Scenarios

### 1. Authentication and Session

**Seed:** `tests/seed.spec.ts`

#### 1.1. AUTH-01 Login with standard user

**File:** `tests/authentication/AUTH-01-standard-login.spec.ts`

**Steps:**
  1. Start with a fresh browser session at https://www.saucedemo.com/. Enter standard_user and secret_sauce, then select Login.
    - expect: The user is authenticated and redirected to /inventory.html.
    - expect: The Products heading and six distinct inventory items are visible.
    - expect: The cart badge is empty and no login error is shown.

#### 1.2. AUTH-02 Reject empty credentials

**File:** `tests/authentication/AUTH-02-empty-credentials.spec.ts`

**Steps:**
  1. Start fresh on the login page and select Login without entering either field.
    - expect: Authentication does not occur.
    - expect: A visible validation alert identifies Username as required.
    - expect: The login form remains available and entered state is not silently changed.

#### 1.3. AUTH-03 Reject missing password

**File:** `tests/authentication/AUTH-03-missing-password.spec.ts`

**Steps:**
  1. Start fresh, enter standard_user as the username, leave Password blank, and select Login.
    - expect: The user remains on the login page.
    - expect: A visible validation alert identifies Password as required.

#### 1.4. AUTH-04 Reject missing username

**File:** `tests/authentication/AUTH-04-missing-username.spec.ts`

**Steps:**
  1. Start fresh, enter secret_sauce as the password, leave Username blank, and select Login.
    - expect: The user remains on the login page.
    - expect: A visible validation alert identifies Username as required.

#### 1.5. AUTH-05 Reject unknown username and incorrect password

**File:** `tests/authentication/AUTH-05-invalid-credentials.spec.ts`

**Steps:**
  1. Start fresh, enter an unknown username and an incorrect password, then select Login.
    - expect: The user remains on the login page.
    - expect: A clear invalid-credentials alert is displayed and can be dismissed.
    - expect: The password is not exposed in page text or the URL.

#### 1.6. AUTH-06 Reject locked-out account

**File:** `tests/authentication/AUTH-06-locked-user.spec.ts`

**Steps:**
  1. Start fresh, enter locked_out_user and secret_sauce, then select Login.
    - expect: Authentication is denied and the user remains on the login page.
    - expect: The error explains that the account is locked out.
    - expect: No inventory or cart content is exposed.

#### 1.7. AUTH-07 Logout invalidates the active session

**File:** `tests/authentication/AUTH-07-logout.spec.ts`

**Steps:**
  1. Start fresh, sign in as standard_user, open the navigation menu, and select Logout.
    - expect: The login page is displayed.
    - expect: Using browser Back or directly opening /inventory.html does not restore authenticated inventory access without signing in again.

#### 1.8. AUTH-08 Password field masking and error dismissal

**File:** `tests/authentication/AUTH-08-password-and-alert-ui.spec.ts`

**Steps:**
  1. Start fresh, enter a password and verify it is masked, submit invalid credentials, then select the alert's dismiss control.
    - expect: Password characters are masked while typing.
    - expect: The invalid-credentials alert is removed when dismissed.
    - expect: The login form remains usable after dismissal.

#### 1.9. AUTH-09 Demo account behavior smoke checks

**File:** `tests/authentication/AUTH-09-demo-account-variants.spec.ts`

**Steps:**
  1. Run as separate fresh sessions for problem_user, performance_glitch_user, error_user, and visual_user, each with secret_sauce. For each, sign in and exercise inventory rendering, sorting, add/remove, and checkout progression where possible.
    - expect: Each account's actual behavior is recorded independently; do not treat known demo-account anomalies as desired behavior.
    - expect: No account exposes another session's cart or credentials.
    - expect: Unexpected delays, wrong images, action failures, or broken layout are logged with the account and exact step; the standard_user core flow remains the release baseline.

### 2. Inventory and Navigation

**Seed:** `tests/seed.spec.ts`

#### 2.1. INV-01 Render complete inventory

**File:** `tests/INV-01-inventory-rendering.spec.ts`

**Steps:**
  1. Start fresh, sign in as standard_user, and inspect the Products page.
    - expect: Exactly six distinct products are listed with a name, description, price, image, and Add to cart action.
    - expect: Each image has an accessible product-specific name and each product can be opened.
    - expect: The initial order is alphabetical from Sauce Labs Backpack through Test.allTheThings() T-Shirt (Red).

#### 2.2. INV-02 Verify all inventory sort modes

**File:** `tests/INV-02-sorting.spec.ts`

**Steps:**
  1. Start fresh and sign in. Select Name (A to Z), Name (Z to A), Price (low to high), and Price (high to low) one at a time; inspect the selected mode and full product order after each selection.
    - expect: The selected option matches the active order.
    - expect: A-to-Z and Z-to-A orders are exact reverses by product name.
    - expect: Price low-to-high starts with Sauce Labs Onesie ($7.99) and ends with Sauce Labs Fleece Jacket ($49.99); high-to-low is the reverse.
    - expect: Equal-price items remain present exactly once, with a consistent and acceptable tie order.
    - expect: Changing sort does not alter cart contents.

#### 2.3. INV-03 Open product details and return

**File:** `tests/INV-03-product-details.spec.ts`

**Steps:**
  1. Start fresh and sign in. Open each product by its image or name, inspect its detail page, then select Back to products.
    - expect: The detail page shows the matching product name, description, image, price, and Add to cart action.
    - expect: Back to products returns to the inventory list without losing the signed-in session or existing cart state.
    - expect: All six products resolve to the matching item rather than the same or an incorrect item.

#### 2.4. INV-04 Add and remove an item from inventory

**File:** `tests/INV-04-inventory-add-remove.spec.ts`

**Steps:**
  1. Start fresh and sign in. Add Sauce Labs Backpack from the inventory, then select its Remove action.
    - expect: After adding, its action changes to Remove and the cart badge shows 1.
    - expect: After removal, its action returns to Add to cart and the cart badge is empty.
    - expect: No other product's action changes.

#### 2.5. INV-05 Add item from detail page

**File:** `tests/INV-05-detail-add-to-cart.spec.ts`

**Steps:**
  1. Start fresh and sign in. Open Sauce Labs Bike Light, add it from the detail page, return to inventory, and open the cart.
    - expect: The detail-page action changes from Add to cart to Remove.
    - expect: The cart badge shows 1 and the cart contains exactly Sauce Labs Bike Light at $9.99.
    - expect: The item remains selected after navigating between detail, inventory, and cart.

#### 2.6. INV-06 Navigation menu and All Items

**File:** `tests/INV-06-navigation-menu.spec.ts`

**Steps:**
  1. Start fresh, sign in, open the menu, inspect each menu item, and select All Items.
    - expect: The menu exposes All Items, Dynamic Catalog, About, Logout, Reset App State, and a Close Menu control.
    - expect: All Items returns to the inventory view.
    - expect: Closing and reopening the menu works without changing the current cart.

#### 2.7. INV-07 Dynamic Catalog navigation

**File:** `tests/INV-07-dynamic-catalog.spec.ts`

**Steps:**
  1. Start fresh, sign in, open the menu, and select Dynamic Catalog. Exercise any visible catalog content and return using the available navigation.
    - expect: The selected destination loads a usable page rather than a blank or broken state.
    - expect: Visible controls respond and navigation back to All Items remains available.
    - expect: Any catalog-specific content or limitations are recorded; the core six-item inventory remains intact.

#### 2.8. INV-08 About link navigation

**File:** `tests/INV-08-about-link.spec.ts`

**Steps:**
  1. Start fresh, sign in, open the menu, and select About.
    - expect: The Sauce Labs destination opens or navigates as the site intends.
    - expect: Navigation behavior is understandable and the user can return to the demo without being left in a broken state.

#### 2.9. INV-09 Direct inventory access without authentication

**File:** `tests/INV-09-protected-route.spec.ts`

**Steps:**
  1. Start fresh without signing in and directly navigate to /inventory.html, /cart.html, and a checkout URL.
    - expect: Protected shopping pages redirect to login or otherwise deny access.
    - expect: No private cart or checkout data is displayed before authentication.

### 3. Cart and Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. CART-01 Cart contents and continue shopping

**File:** `tests/cart-checkout/CART-01-cart-and-continue-shopping.spec.ts`

**Steps:**
  1. Start fresh, sign in, add Sauce Labs Backpack and Sauce Labs Bike Light, open the cart, then select Continue Shopping.
    - expect: The cart shows exactly two rows, each with quantity 1, correct name, description, price, and Remove action; badge shows 2.
    - expect: Continue Shopping returns to inventory and both selections remain in the cart.

#### 3.2. CART-02 Remove one of multiple cart items

**File:** `tests/cart-checkout/CART-02-remove-one-item.spec.ts`

**Steps:**
  1. Start fresh, sign in, add Backpack and Bike Light, open the cart, and remove only Backpack.
    - expect: Backpack is removed from the cart and Bike Light remains.
    - expect: The badge changes from 2 to 1.
    - expect: No unintended product is removed.

#### 3.3. CART-03 Remove all items and verify empty cart

**File:** `tests/cart-checkout/CART-03-empty-cart.spec.ts`

**Steps:**
  1. Start fresh, sign in, add one product, open the cart, and remove it.
    - expect: The cart is empty and its badge is absent or indicates zero.
    - expect: No checkout action is available for an empty cart.
    - expect: The empty cart does not display stale item rows or totals.

#### 3.4. CART-04 Cart remains consistent across navigation and sorting

**File:** `tests/cart-checkout/CART-04-cart-persistence.spec.ts`

**Steps:**
  1. Start fresh, sign in, add two different items, change sort order, visit a product detail page, return to inventory, and open the cart.
    - expect: The same two items remain selected exactly once.
    - expect: Badge count and cart rows agree after every navigation.
    - expect: Sorting and viewing details do not add, remove, or duplicate cart items.

#### 3.5. CART-05 Checkout blocked for empty cart

**File:** `tests/cart-checkout/CART-05-empty-cart-checkout.spec.ts`

**Steps:**
  1. Start fresh, sign in, open the empty cart, and attempt to proceed to checkout; also try directly opening the checkout URL.
    - expect: The normal UI provides no checkout action while the cart is empty.
    - expect: Direct navigation does not permit completion of an order with no items.

#### 3.6. CHK-01 Require first name

**File:** `tests/cart-checkout/CHK-01-required-first-name.spec.ts`

**Steps:**
  1. Start fresh, sign in, add one item, open the cart, choose Checkout, leave First Name blank, fill Last Name and Zip/Postal Code, and select Continue.
    - expect: The user stays on Checkout: Your Information.
    - expect: A visible error states that First Name is required; no overview is shown and the cart remains unchanged.

#### 3.7. CHK-02 Require last name

**File:** `tests/cart-checkout/CHK-02-required-last-name.spec.ts`

**Steps:**
  1. Start fresh, sign in, add one item, open Checkout, fill First Name and Zip/Postal Code, leave Last Name blank, and select Continue.
    - expect: The user stays on the information step.
    - expect: A visible error states that Last Name is required and the cart remains unchanged.

#### 3.8. CHK-03 Require postal code

**File:** `tests/cart-checkout/CHK-03-required-postal-code.spec.ts`

**Steps:**
  1. Start fresh, sign in, add one item, open Checkout, fill First Name and Last Name, leave Zip/Postal Code blank, and select Continue.
    - expect: The user stays on the information step.
    - expect: A visible error states that Postal Code is required and the cart remains unchanged.

#### 3.9. CHK-04 Reject all checkout fields blank

**File:** `tests/cart-checkout/CHK-04-empty-checkout-form.spec.ts`

**Steps:**
  1. Start fresh, sign in, add one item, open Checkout, leave all customer fields blank, and select Continue.
    - expect: The user stays on the information step.
    - expect: A visible error identifies the first missing required field, and repeated submission never advances until all required fields are supplied.

#### 3.10. CHK-05 Handle whitespace-only customer fields

**File:** `tests/cart-checkout/CHK-05-whitespace-fields.spec.ts`

**Steps:**
  1. Start fresh, sign in, add one item, open Checkout, enter only spaces into each customer field, and select Continue.
    - expect: Whitespace-only values are not accepted as valid required data.
    - expect: The user remains on the information step with a clear validation message and the cart is preserved.

#### 3.11. CHK-06 Accept valid customer information and verify order overview

**File:** `tests/cart-checkout/CHK-06-checkout-overview-totals.spec.ts`

**Steps:**
  1. Start fresh, sign in, add Backpack ($29.99) and Bike Light ($9.99), open Checkout, enter Ada, Lovelace, and 12345, then select Continue.
    - expect: Checkout: Overview lists both correct items and quantities.
    - expect: Payment and shipping information are present.
    - expect: Item total is $39.98, tax is $3.20, and total is $43.18; totals equal item subtotal plus tax.

#### 3.12. CHK-07 Cancel checkout information

**File:** `tests/cart-checkout/CHK-07-cancel-information.spec.ts`

**Steps:**
  1. Start fresh, sign in, add one item, enter the checkout information step, and select Cancel.
    - expect: The user returns to shopping rather than advancing or placing an order.
    - expect: The selected cart item is preserved and no order confirmation is shown.

#### 3.13. CHK-08 Cancel order overview

**File:** `tests/cart-checkout/CHK-08-cancel-overview.spec.ts`

**Steps:**
  1. Start fresh, sign in, add one item, submit valid customer information, and select Cancel on Checkout: Overview.
    - expect: The user returns to inventory as intended.
    - expect: No order is placed, and cart state follows the site's cancel behavior consistently without an erroneous confirmation.

#### 3.14. CHK-09 Complete order and verify confirmation

**File:** `tests/cart-checkout/CHK-09-complete-order.spec.ts`

**Steps:**
  1. Start fresh, sign in, add Backpack and Bike Light, submit valid customer information, verify overview items and totals, then select Finish.
    - expect: Checkout: Complete! displays a thank-you/order-dispatched confirmation.
    - expect: The cart is empty after successful completion.
    - expect: Back Home returns to inventory and a new order can be started.

#### 3.15. CHK-10 Prevent duplicate order submission

**File:** `tests/cart-checkout/CHK-10-repeat-finish.spec.ts`

**Steps:**
  1. Start fresh and proceed to a valid order overview. Select Finish once, then attempt browser Back and any repeat submission or refresh available.
    - expect: The completed order is not placed twice by a repeat click, back navigation, or refresh.
    - expect: The confirmation remains coherent and the completed cart is not restored as an unsubmitted order.

#### 3.16. CHK-11 Generate order PDF

**File:** `tests/cart-checkout/CHK-11-order-pdf.spec.ts`

**Steps:**
  1. Start fresh, complete an order, and select Generate PDF order on the confirmation page.
    - expect: A valid PDF download or browser PDF response is produced.
    - expect: The file is non-empty, opens successfully, and contains order confirmation details rather than an error page.

### 4. State, Compatibility, and Quality

**Seed:** `tests/seed.spec.ts`

#### 4.1. STATE-01 Reset App State clears cart and selections

**File:** `tests/state-quality/STATE-01-reset-app-state.spec.ts`

**Steps:**
  1. Start fresh, sign in, add at least two products, open the menu, and select Reset App State. Reopen inventory and cart.
    - expect: Cart badge and cart rows are cleared.
    - expect: Product actions return to Add to cart and no stale checkout/order state remains.
    - expect: The signed-in session stays usable unless the product explicitly logs out as part of reset behavior.

#### 4.2. STATE-02 Session state does not leak between users

**File:** `tests/state-quality/STATE-02-user-isolation.spec.ts`

**Steps:**
  1. Start fresh, sign in as standard_user, add an item, log out, then sign in as another account in the same browser session.
    - expect: The second account does not inherit the prior user's cart or checkout data.
    - expect: Logout prevents access to authenticated pages until the second login succeeds.

#### 4.3. STATE-03 Browser refresh and back/forward behavior

**File:** `tests/state-quality/STATE-03-history-refresh.spec.ts`

**Steps:**
  1. Start fresh, sign in, add a product, navigate through cart and checkout, then use refresh and browser Back/Forward at each stage.
    - expect: The app does not show contradictory cart badges, duplicated items, stale validation errors, or an unauthorized protected page.
    - expect: State persistence or clearing is consistent with the current session and completed-order state.

#### 4.4. STATE-04 Responsive layout smoke test

**File:** `tests/state-quality/STATE-04-responsive-layout.spec.ts`

**Steps:**
  1. Start fresh and inspect login, inventory, product detail, cart, checkout form, overview, and confirmation at a narrow mobile viewport and a desktop viewport.
    - expect: All content and controls remain visible or reachable without clipped text or horizontal overflow.
    - expect: Menu, cart, forms, product actions, and checkout actions remain operable by touch and pointer.
    - expect: Product names, prices, and validation alerts do not overlap adjacent content.

#### 4.5. STATE-05 Keyboard and accessibility smoke test

**File:** `tests/state-quality/STATE-05-accessibility-keyboard.spec.ts`

**Steps:**
  1. Start fresh and navigate login, inventory, cart, and checkout using keyboard only. Inspect accessible names, focus order, alerts, headings, and product image alternatives.
    - expect: Every interactive control is reachable and operable by keyboard with a visible focus indicator.
    - expect: Controls have meaningful accessible names; images have appropriate alternatives and form fields are labeled.
    - expect: Validation errors are perceivable and associated with the relevant form; focus is not lost in menus or after navigation.

#### 4.6. STATE-06 Links and external navigation

**File:** `tests/state-quality/STATE-06-footer-links.spec.ts`

**Steps:**
  1. Start fresh and inspect footer links on login and authenticated pages. Open each social link and the About link using the intended browser behavior.
    - expect: Each link resolves to its intended destination without replacing the app unexpectedly where a new tab is intended.
    - expect: Returning to the demo preserves a valid session or returns to login cleanly.
    - expect: No footer link points to a malformed or empty destination.
