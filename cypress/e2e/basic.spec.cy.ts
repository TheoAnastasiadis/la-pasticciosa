describe("template spec", () => {
  before("seed database for e2e tests", () => {
    cy.task("setup");
  });

  after("delete seed data from db", () => {
    cy.task("teardown");
  });

  const emailInputSelctor = 'input[name="email"]';
  const passwordInputSelector = 'input[name="password"]';
  const loginBtnSelector = 'button[type="submit"]';

  it("local log in and log out", function () {
    cy.visit("/login").wait(6000);
    cy.get(emailInputSelctor).type("cypressadmin@example.com");
    cy.get(passwordInputSelector).type("123456abcde");
    cy.get(loginBtnSelector).click();
    cy.get("header input").should(
      "have.attr",
      "placeholder",
      "Τι ψάχνεις Cypress_Admin;",
    );
    cy.get(".h-logout")
      .should("be.visible")
      .click()
      .location("pathname")
      .should("eq", "/login");
  });

  it("sign up, get accepted, log in", function () {
    // fill signup form
    cy.visit("/login").wait(6000);
    cy.get("p > a").click().wait(1000);
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

    // submit
    cy.get(".Vue-Toastification__toast-body").should(
      "have.text",
      "Η εγγραφή σας πραγματοποιήθηκε με επιτυχία! Συνδεθείτε με τους κωδικούς σας για να αιτηθείτε τοποθεσίες παράδοσης.",
    );
    cy.get(".Vue-Toastification__toast-body").should("be.visible");

    // admin can accept
    cy.get(emailInputSelctor).type("cypressadmin@example.com");
    cy.get(passwordInputSelector).type("123456abcde");
    cy.get(".xt-loader").click();
    cy.get("i.h-menu").last().click();
    cy.get('[href="/dashboard/users"]').click({ force: true });
    cy.get('[data-xt-tooltip=""] > .underline')
      .first()
      .should("have.text", "New User Company");
    cy.get(".inset-0").click();
    cy.get(
      ":nth-child(4) > .gap-3 > .flex > .block > [data-xt-drop=\"{ position: 'auto-end', duration: 500 }\"] > .py-1",
    ).should("have.text", " Σε αναμονή ");
    cy.get(
      ":nth-child(4) > .gap-3 > .flex > .block > [data-xt-drop=\"{ position: 'auto-end', duration: 500 }\"] > .py-1",
    ).click();
    cy.get(
      ".flex-col > :nth-child(1) > .xt-button > .xt-list > :nth-child(2) > .text-xs",
    ).click();
    cy.get(
      ":nth-child(1) > :nth-child(4) > .items-center > .flex > .block > :nth-child(2)",
    ).should("have.text", " Ενεργός");
  });

  it("add product and assign to user", function () {
    context("login as admin", () => {
      cy.visit("/login");
      cy.wait(6000);
      cy.get(emailInputSelctor).type("cypressadmin@example.com");
      cy.get(passwordInputSelector).type("123456abcde");
      cy.get(loginBtnSelector).click();
      cy.get("i.h-menu").last().click();
      cy.get('[href="/dashboard/items"]').click();
      cy.get(".inset-0").first().click();
    });

    context("create product", () => {
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
      cy.get(".Vue-Toastification__toast-body", { timeout: 15000 }).should(
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
      cy.get("i.h-menu").last().click();
      cy.get('[href="/dashboard/users"]').click();
      cy.get(".inset-0").eq(0).click({ force: true });
      cy.contains(/^User Company/, { timeout: 10000 })
        .parents("tr")
        .contains("Προσθήκη")
        .click();
      cy.contains(/^User Company/, { timeout: 10000 })
        .parents("tr")
        .contains("Example Product")
        .click();
      cy.wait(2000);
      cy.contains(/^User Company/, { timeout: 10000 })
        .parents("tr")
        .contains("Sample Product")
        .click({ force: true });
      cy.contains(/^User Company/, { timeout: 10000 })
        .parents("tr")
        .children("td:nth-child(3)")
        .should("contain.text", "2");
    });

    context("login as user", () => {
      cy.get(".h-logout").click();
      cy.wait(6000);
      cy.get(emailInputSelctor).type("cypressuser@example.com");
      cy.get(passwordInputSelector).type("123456abcde");
      cy.get(loginBtnSelector).click();
      cy.get("i.h-menu").last().click();
      cy.get('[href="/dashboard/catalogue"]').click();
      cy.get(".inset-0").first().click();
      cy.wait(1000);
      cy.get(".listing-item").should("have.length", 2);
    });
  });

  it("request delivery, have it accepted", function () {
    context("login as user", () => {
      cy.visit("/login");
      cy.wait(6000);
      cy.get(emailInputSelctor).type("cypressuser@example.com");
      cy.get(passwordInputSelector).type("123456abcde");
      cy.get(loginBtnSelector).click();
    });

    context("request new delivery address", () => {
      cy.get("i.h-menu").last().click();
      cy.get('[href="/dashboard/locations"]').click();
      cy.get(".inset-0").first().click();
      cy.get(".xt-row > :nth-child(1) > .w-full").type("Sample New Delivery");
      cy.get(".w-9\\/12 > .w-full").type("Default Address");
      cy.get(".w-3\\/12 > .block").type("1");
      cy.get(":nth-child(4) > .w-full").type("12345");
      cy.get(":nth-child(5) > .w-full").click();
      cy.get(":nth-child(6) > .xt-button").click();
      cy.get(":nth-child(1) > .card > .xt-h5").click();
      cy.get(":nth-child(1) > .card > .xt-h5").should(
        "have.text",
        "Sample New Delivery",
      );
      cy.get(":nth-child(1) > .card").click();
      cy.get(".text-lg > strong").should("have.text", "Default Address 1");
      cy.get(".decoration-none").should("have.text", "Σε Αναμονή ");
    });

    context("login as admin", () => {
      cy.get(".h-logout").click();
      cy.wait(6000);
      cy.get(emailInputSelctor).type("cypressadmin@example.com");
      cy.get(passwordInputSelector).type("123456abcde");
      cy.get(loginBtnSelector).click();
      cy.get("i.h-menu").last().click();
      cy.get('[href="/dashboard/deliveries"]').click();
      cy.get(".inset-0").first().click();
    });

    context("accept delivery", () => {
      cy.contains(/^User Company/, { timeout: 10000 })
        .parents("tr")
        .contains("Σε Αναμονή")
        .should("exist");
      cy.contains(/^User Company/, { timeout: 10000 })
        .parents("tr")
        .contains("Σε Αναμονή")
        .click();
      cy.contains(/^User Company/, { timeout: 10000 })
        .parents("tr")
        .contains("Αποδοχή")
        .click();
      cy.contains(/^User Company/, { timeout: 10000 })
        .parents("tr")
        .contains("Ενεργή")
        .should("exist");
    });

    context("see the new delivery accepted as user", () => {
      cy.get(".h-logout").click();
      cy.wait(6000);
      cy.wait(6000);
      cy.get(emailInputSelctor).type("cypressuser@example.com");
      cy.get(passwordInputSelector).type("123456abcde");
      cy.get(loginBtnSelector).click();
      cy.get("i.h-menu").last().click();
      cy.get('[href="/dashboard/locations"]').click();
      cy.get(".inset-0").first().click();
    });
  });

  it("place an order, have it accepted", function () {
    context("login as user", () => {
      cy.visit("/login");
      cy.wait(6000);
      cy.get(emailInputSelctor).type("cypressassigneduser@example.com");
      cy.get(passwordInputSelector).type("123456abcde");
      cy.get(loginBtnSelector).click();
    });

    context("place order", () => {
      cy.contains("Nεα παραγγελια").click();
      cy.contains("Sample Product").should("exist");
      cy.contains("Example Accepted Delivery").should("exist");
      cy.contains("Sample Product")
        .get(".h-plus-circle")
        .click()
        .click()
        .click();
      cy.contains("Example Accepted Delivery").click();
      cy.contains("αποστολη").click();
      cy.get("tbody").contains("30.00 € ").should("exist");
      cy.get(".xt-check").check();
      cy.get(":nth-child(6) > .xt-button").click();

      cy.get(".underline").should("contain.text", "λίγα δευτερόλεπτα");
      cy.contains("λίγα δευτερόλεπτα")
        .parents("tr")
        .contains("30.00 €")
        .should("exist");
      cy.contains("λίγα δευτερόλεπτα")
        .parents("tr")
        .contains("Σε αναμονή")
        .should("exist");
      cy.contains("λίγα δευτερόλεπτα")
        .parents("tr")
        .contains("N/A")
        .should("exist");
      cy.get(".h-logout").click();
      cy.wait(6000);
    });

    context("edit order as admin", () => {
      cy.get(emailInputSelctor).type("cypressadmin@example.com");
      cy.get(passwordInputSelector).type("123456abcde");
      cy.get(loginBtnSelector).click();
      cy.contains("Assigned User Company")
        .parents("tr")
        .contains("30.00 €")
        .should("exist");
      cy.contains("Assigned User Company")
        .parents("tr")
        .contains("Σε Αναμονή")
        .should("exist");
      cy.contains("Assigned User Company")
        .parents("tr")
        .contains("Σε Αναμονή")
        .parents("p");
      cy.get("i.h-edit-3").eq(0).click();
      cy.contains("Αποδοχή").click();
      cy.contains("Assigned User Company")
        .parents("tr")
        .eq(0)
        .contains("Έγινε Αποδοχή")
        .should("exist");
      cy.get("#headlessui-popover-button-1 > .relative").click({ force: true });
      cy.get(":nth-child(8) > .vtd-datepicker-date").click({ force: true });
      cy.contains("ενημερωση").click({ force: true });
      cy.contains("Assigned User Company")
        .parents("tr")
        .eq(0)
        .should("not.contain.text", "N/A");
      cy.get(".h-logout").click();
      cy.wait(6000);
    });

    context("see changes as user", () => {
      cy.get(emailInputSelctor).type("cypressassigneduser@example.com");
      cy.get(passwordInputSelector).type("123456abcde");
      cy.get(loginBtnSelector).click();
      cy.get("tr").eq(1).should("contain.text", "Έγινε Αποδοχή");
      cy.get("tr").eq(1).should("not.contain.text", "N/A");
    });
  });

  it("change password", () => {
    cy.visit("/login");
    cy.get(emailInputSelctor).type("cypressuser@example.com");
    cy.get(passwordInputSelector).type("123456abcde");
    cy.get(loginBtnSelector).click();
    cy.get('[href="/dashboard/profile"]').eq(1).click();
    cy.get('[aria-label="Old Password"]').type("123456abcde");
    cy.get('[aria-label="New Password"]').type("123456edcba");
    cy.get('[aria-label="Password Repeat"]').type("123456edcba");
    cy.contains("ΑΛΛΑΓΗ").click();
    cy.wait(1000);
    cy.get(".h-logout").click();
    cy.wait(6000);

    cy.get(emailInputSelctor).type("cypressuser@example.com");
    cy.get(passwordInputSelector).type("123456edcba");
    cy.get(loginBtnSelector).click();
    cy.location("pathname").should("eq", "/dashboard/orders");
  });

  it("delete item", () => {
    cy.visit("/login");
    cy.get(emailInputSelctor).type("cypressadmin@example.com");
    cy.get(passwordInputSelector).type("123456abcde");
    cy.get(loginBtnSelector).click();
    cy.get("i.h-menu").last().click();
    cy.get('[href="/dashboard/items"]').click();
    cy.get(".inset-0").first().click();

    cy.contains("Sample Product")
      .parents(".listing-item")
      .find("button")
      .click();

    cy.get("i.h-menu").last().click();
    cy.get('[href="/dashboard/users"]').click();
    cy.get(".inset-0").first().click();

    cy.contains(/^Cypress_User/)
      .parents("tr")
      .find("td:nth-child(2)")
      .find("span")
      .invoke("text")
      .should("match", /[0,1]/);
  });
});
