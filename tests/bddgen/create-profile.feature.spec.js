/** Generated from: tests/features/create-profile.feature */
import { test } from "playwright-bdd";

test.describe("Create Profile", () => {

  test("Renders a visual editor with defaults", async ({ Given, When, Then }) => {
    await Given("I navigate to \"/\"");
    await Then("the h1 contains \"Create a new Profile\"");
    await When("I mouse hover the container \"root\"");
    await Then("the current path tooltip reads \"root\"");
  });

  test("Builds a complex profile and navigates to it", async ({ Given, When, Then }) => {
    await Given("I navigate to \"/\"");
    await When("I click the container \"root\"");
    await When("I select the option \"Add container\" from the Container Modal");
    await When("I click the \"Confirm\" button");
    await When("I mouse hover the container \"root > row:0\"");
    await Then("the current path tooltip reads \"root > row:0\"");
    await When("I click the container \"root\"");
    await When("I select the option \"Add container\" from the Container Modal");
    await When("I click the \"Confirm\" button");
    await When("I mouse hover the container \"root > row:1\"");
    await Then("the current path tooltip reads \"root > row:1\"");
    await When("I click the container \"root > row:0\"");
    await When("I select the option \"Add container\" from the Container Modal");
    await When("I click the \"Confirm\" button");
    await When("I mouse hover the container \"root > row:0 > row:0\"");
    await Then("the current path tooltip reads \"root > row:0 > row:0\"");
    await When("I click the container \"root > row:0\"");
    await When("I select the option \"Add container\" from the Container Modal");
    await When("I click the \"Confirm\" button");
    await When("I mouse hover the container \"root > row:0 > row:1\"");
    await Then("the current path tooltip reads \"root > row:0 > row:1\"");
    await When("I click the container \"root > row:0\"");
    await When("I select the option \"Transform in a column\" from the Container Modal");
    await When("I click the \"Confirm\" button");
    await When("I mouse hover the container \"root > row:0 > column:0\"");
    await Then("the current path tooltip reads \"root > row:0 > column:0\"");
    await When("I click the container \"root > row:0 > column:0\"");
    await When("I select the option \"Add bookmark\" from the Container Modal");
    await When("I type in the fields", {"dataTable":{"rows":[{"cells":[{"value":"label"},{"value":"value"},{"value":"nth"}]},{"cells":[{"value":"Label"},{"value":"gmail"},{"value":"-1"}]},{"cells":[{"value":"Icon"},{"value":"https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"},{"value":"-1"}]},{"cells":[{"value":"Title (Optional)"},{"value":"home"},{"value":"0"}]},{"cells":[{"value":"URL"},{"value":"https://mail.google.com/mail/u/0/#inbox"},{"value":"0"}]}]}});
    await When("I click the \"Add Row\" button");
    await When("I type in the fields", {"dataTable":{"rows":[{"cells":[{"value":"label"},{"value":"value"},{"value":"nth"}]},{"cells":[{"value":"Title (Optional)"},{"value":"work"},{"value":"1"}]},{"cells":[{"value":"URL"},{"value":"https://mail.google.com/mail/u/0/#inbox"},{"value":"1"}]}]}});
    await When("I click the \"Confirm\" button");
    await When("I mouse hover the container \"root > row:0 > column:0 > bookmark:gmail\"");
    await Then("the current path tooltip reads \"root > row:0 > column:0 > bookmark:gmail\"");
    await When("I click the container \"root > row:0 > column:1\"");
    await When("I select the option \"Add bookmark\" from the Container Modal");
    await When("I type in the fields", {"dataTable":{"rows":[{"cells":[{"value":"label"},{"value":"value"},{"value":"nth"}]},{"cells":[{"value":"Label"},{"value":"gdrive"},{"value":"-1"}]},{"cells":[{"value":"Icon"},{"value":"https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"},{"value":"-1"}]},{"cells":[{"value":"Title (Optional)"},{"value":"home"},{"value":"0"}]},{"cells":[{"value":"URL"},{"value":"https://drive.google.com/drive/my-drive"},{"value":"0"}]}]}});
    await When("I click the \"Confirm\" button");
    await When("I mouse hover the container \"root > row:0 > column:1 > bookmark:gdrive\"");
    await Then("the current path tooltip reads \"root > row:0 > column:1 > bookmark:gdrive\"");
    await Then("I click the \"Commit\" button");
    await Then("the page URL matches \"/profile/[\\w-]+\"");
  });

});