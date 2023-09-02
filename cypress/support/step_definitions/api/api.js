import data from "../../../fixtures/data.json";
import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

const url = "http://www.omdbapi.com/?t=the+lord+of+the+rings&apikey=35dbfc73";
const method = "GET";

let response = null;

When("I send a GET request", () => {
  cy.request({ method: method, url: url }).then((res) => {
    response = res;
  });
});

Then("I should receive a proper response", () => {
  expect(response.status).to.eq(200);
  expect(response).to.have.property("headers");
  expect(response.body).to.have.property("Title").to.eq(data.title);
  expect(response.body).to.have.property("Response").to.eq("True");
});
