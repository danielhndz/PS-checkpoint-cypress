const url = "http://www.omdbapi.com/?t=the+lord+of+the+rings&apikey=35dbfc73";
const method = "GET";

describe("api call", () => {
  it("api call", () => {
    cy.request({
      method: method,
      url: url,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property("headers");
      expect(response.body)
        .to.have.property("Title")
        .to.eq("The Lord of the Rings");
      expect(response.body).to.have.property("Response").to.eq("True");
    });
  });
});
