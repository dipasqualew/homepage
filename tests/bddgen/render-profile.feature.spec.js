/** Generated from: tests/features/render-profile.feature */
import { test } from "playwright-bdd";

test.describe("Profile View", () => {

  test("Handles missing profiles", async ({ Given, When, Then }) => {
    await Given("I have stored a profile \"PROFILE_DEFAULT\"");
    await Given("I navigate to \"/profile/missing\"");
    await Then("the h1 contains \"404\"");
    await Then("the router-view contains \"Profile not found!\"");
  });

  test("Renders an existing profile", async ({ Given, When, Then }) => {
    await Given("I have stored a profile \"PROFILE_DEFAULT\"");
    await Given("I navigate to \"/profile/b3c7ada7-dd26-4521-87f4-5fe5f6b11c46\"");
    await Then("the h1 contains \"Profile: Default Profile\"");
    await Then("there is a BigCard with label \"gmail:home\"");
    await Then("there is a BigCard with label \"gdrive:home\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"home\"");
  });

  test("Switches between different bookmark rows", async ({ Given, When, Then }) => {
    await Given("I have stored a profile \"PROFILE_DEFAULT\"");
    await Given("I navigate to \"/profile/b3c7ada7-dd26-4521-87f4-5fe5f6b11c46\"");
    await When("I hover the bookmark \"gmail\"");
    await When("I scroll \"up\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"home\"");
    await When("I scroll \"down\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"work\"");
    await When("I scroll \"down\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"work\"");
    await When("I scroll \"up\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"home\"");
  });

  test("Switches between different bookmark rows (1)", async ({ Given, When, Then }) => {
    await Given("I have stored a profile \"PROFILE_DEFAULT\"");
    await Given("I navigate to \"/profile/b3c7ada7-dd26-4521-87f4-5fe5f6b11c46\"");
    await When("I hover the bookmark \"gmail\"");
    await When("I press \"ArrowUp\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"home\"");
    await When("I press \"ArrowDown\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"work\"");
    await When("I press \"ArrowDown\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"work\"");
    await When("I press \"ArrowUp\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"home\"");
  });

  test("Switches between different bookmark rows (1) (2)", async ({ Given, When, Then }) => {
    await Given("I have stored a profile \"PROFILE_DEFAULT\"");
    await Given("I navigate to \"/profile/b3c7ada7-dd26-4521-87f4-5fe5f6b11c46\"");
    await When("I hover the bookmark \"gmail\"");
    await When("I press \"w\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"home\"");
    await When("I press \"s\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"work\"");
    await When("I press \"s\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"work\"");
    await When("I press \"w\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"home\"");
  });

  test("Sets the focus following the mouse pointer", async ({ Given, When, Then }) => {
    await Given("I have stored a profile \"PROFILE_DEFAULT\"");
    await Given("I navigate to \"/profile/b3c7ada7-dd26-4521-87f4-5fe5f6b11c46\"");
    await When("I hover the bookmark \"gmail\"");
    await When("I hover the bookmark \"gdrive\"");
    await When("I scroll \"down\"");
    await Then("it renders the default row for the bookmark \"gmail\" and the row \"home\"");
  });

});