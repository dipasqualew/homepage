/** Generated from: tests/features/edit-profile.feature */
import { test } from "playwright-bdd";

test.describe("Edit Profile", () => {

  test("Handles missing profiles", async ({ Given, When, Then }) => {
    await Given("I have stored a profile \"PROFILE_DEFAULT\"");
    await Given("I navigate to \"/edit/missing\"");
    await Then("the h1 contains \"Profile not found.\"");
    await Then("the router-view contains \"Profile not found!\"");
  });

  test("Edits a bookmark", async ({ Given, When, Then }) => {
    await Given("I have stored a profile \"PROFILE_DEFAULT\"");
    await Given("I navigate to \"/edit/b3c7ada7-dd26-4521-87f4-5fe5f6b11c46\"");
    await Then("the h1 contains \"Edit Profile: Default Profile\"");
    await When("I click the container \"root > row:0 > column:0 > bookmark:gmail\"");
    await When("I select the option \"Edit bookmark\" from the Container Modal");
    await When("I type in the fields", {"dataTable":{"rows":[{"cells":[{"value":"label"},{"value":"value"},{"value":"nth"}]},{"cells":[{"value":"Label"},{"value":"GOOGLE GMAIL"},{"value":"-1"}]},{"cells":[{"value":"Title (Optional)"},{"value":"EDITED"},{"value":"0"}]}]}});
    await When("I click the \"Confirm\" button");
    await Then("the router-view contains \"GOOGLE GMAIL:EDITED\"");
    await Then("the router-view contains \"GOOGLE GMAIL:work\"");
  });

});