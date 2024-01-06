describe("template spec", () => {
  before("seed database for e2e tests", () => {
    cy.exec("npm run e2e:setup");
  });

  after("delete seed data from db", async () => {
    cy.exec("npm run e2e:teardown");
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("local log in and log out", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:5173/login");
    cy.get(".xt-row > :nth-child(1) > .w-full").type(
      "cypressadmin@example.com",
    );
    cy.get(".xt-row > :nth-child(2) > .w-full").type("123456abcde");
    cy.get(".xt-loader").click();
    cy.get(".xt-5").click();
    cy.get(".xt-5").should("have.text", " Καλωσήρθες, Cypress_Admin");
    cy.get(".rounded-full > .h").click();
    cy.get(".text-red-600").should("be.visible");
    cy.get(".rounded-full").click();
    cy.get(".text-red-600").should("have.text", " Αποσύνδεση ");
    cy.get(".rounded-full > .h").click();
    cy.get(".text-red-600").click();
    cy.location("pathname").should("eq", "/login");
    cy.get(".router-link-active").should("have.text", " Σύνδεση ");
    cy.get(".xt-list-2").should(
      "have.text",
      " La Pasticciosa  B2B Portal   Σύνδεση ",
    );
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("sign up, get accepted, log in", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:5173/login");
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get("p > a").click();
    cy.get(".xt-row > :nth-child(1) > .w-full").type("Cypress_New_User");
    cy.get(":nth-child(2) > .w-full").type("cypress_new_user@example.com");
    cy.get('[placeholder="προσθέστε έναν κωδικό πρόσβασης"]').type(
      "abcde123456",
    );
    cy.get('[placeholder="πληκτρολογήστε ξανά τον κωδικό πρόσβασης"]').type(
      "abcde123456",
    );
    cy.get(".xt-row > :nth-child(4) > .w-full").type("6909876543");
    cy.get(":nth-child(5) > .w-full").type("New User Company");
    cy.get(":nth-child(6) > .w-full").type("Default Adress");
    cy.get(":nth-child(7) > .w-full").type("987654321");
    cy.get(".xt-loader").click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".Vue-Toastification__toast-body").should(
      "have.text",
      "Η εγγραφή σας πραγματοποιήθηκε με επιτυχία! Συνδεθείτε με τους κωδικούς σας για να αιτηθείτε τοποθεσίες παράδοσης.",
    );
    cy.get(".Vue-Toastification__toast-body").should("be.visible");
    cy.get(".xt-row > :nth-child(1) > .w-full").type(
      "cypressadmin@example.com",
    );
    cy.get(".xt-row > :nth-child(2) > .w-full").type("123456abcde");
    cy.get(".xt-loader").click();
    cy.get('[href="/dashboard/users"]').click();
    cy.get(
      ':nth-child(1) > :nth-child(2) > [data-xt-tooltip=""] > .underline',
    ).should("have.text", "New User Company");
    cy.get(
      ":nth-child(1) > :nth-child(4) > [data-xt-drop=\"{ position: 'auto-end', duration: 500 }\"] > .py-1",
    ).should("have.text", " Σε αναμονή ");
    cy.get(
      ":nth-child(1) > :nth-child(4) > [data-xt-drop=\"{ position: 'auto-end', duration: 500 }\"] > .py-1",
    ).click();
    cy.get("div").contains("Αποδοχή").click();
    cy.get(
      ".xt-overflow-sub > :nth-child(1) > :nth-child(2) > :nth-child(1) > :nth-child(4) > :nth-child(2)",
    ).should("have.text", " Ενεργός");
    cy.get(".rounded-full > .h").click();
    cy.get(".text-red-600").click();
    cy.get(".xt-row > :nth-child(1) > .w-full").type(
      "cypress_new_user@example.com",
    );
    cy.get(".xt-row > :nth-child(2) > .w-full").type("abcde123456");
    cy.get(".xt-loader").click();
    cy.get(".xt-5").should("have.text", " Καλωσήρθες, Cypress_New_User");
    cy.get('[href="/dashboard/profile"]').click();
    cy.get("tbody > :nth-child(3) > .text-sm").should("have.text", "accepted");
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("add product and assign to user", function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:5173/login");
    cy.get(".xt-row > :nth-child(1) > .w-full").type(
      "cypressadmin@example.com",
    );
    cy.get(".xt-row > :nth-child(2) > .w-full").type("123456abcde");
    cy.get(".xt-loader").click();
    cy.get('[href="/dashboard/items"]').click();
    cy.get(".hover\\:bg-gray-200").click();
    cy.get('[aria-label="Name"]').type("Example Product");
    cy.get('[aria-label="Description"]').type(
      "Example description, for example product.",
    );
    cy.get(".xt-row > :nth-child(1) > .h-20").click();
    cy.get(".md\\:w-9\\/12 > .w-full").type("10");
    cy.get(".md\\:w-3\\/12 > .w-full").type("Kg");
    cy.get('[aria-label="Image"]').type(
      "https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg",
    );
    cy.get('[aria-label="Thumbnail"]').type(
      "https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg",
    );
    cy.get(".xt-row > :nth-child(1) > .xt-button").click();
    cy.get(".Vue-Toastification__toast-body").should(
      "have.text",
      "Το προϊόν προστέθηκε στον κατάλογο",
    );
    cy.get(":nth-last-child(1) > .listing-item > .py-4 > .xt-h6").should(
      "have.text",
      "Example Product",
    );
    cy.get(":nth-last-child(1) > .listing-item > .py-4 > .-mt-2").click();
    cy.get(":nth-last-child(1) > .listing-item > .py-4 > .-mt-2").should(
      "have.text",
      "10.00 € / Kg",
    );
    cy.get(":nth-last-child(1) > .listing-item > .py-4 > .text-sm").click();
    cy.get(":nth-last-child(1) > .listing-item > .py-4 > .text-sm").should(
      "have.text",
      "Example description, for example product.",
    );
    cy.get(
      ":nth-last-child(1) > .listing-item > .xt-media-container > .xt-media",
    ).should(
      "have.attr",
      "src",
      "https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg",
    );
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="/dashboard/users"]').click();
    cy.contains(/^User Company/, { timeout: 10000 })
      .parents("tr")
      .contains("Προσθήκη")
      .click();
    cy.contains(/^User Company/, { timeout: 10000 })
      .parents("tr")
      .contains("Example Product")
      .click();
    cy.contains(/^User Company/, { timeout: 10000 })
      .parents("tr")
      .contains("Sample Product")
      .click();
    cy.contains(/^User Company/, { timeout: 10000 })
      .parents("tr")
      .children("td:nth-child(3)")
      .should("contain.text", "2");
    cy.get(".rounded-full").click();
    cy.get(".text-red-600").click();
    cy.get(".xt-row > :nth-child(1) > .w-full").type("cypressuser@example.com");
    cy.get(".xt-row > :nth-child(2) > .w-full").type("123456abcde");
    cy.get(".xt-loader").click();
    cy.get('[href="/dashboard/catalogue"]').click();
    cy.get(".listing-item").should("have.length", 2);
    /* ==== End Cypress Studio ==== */
  });
});
