/// <reference types="cypress" />

describe("order is correct", function () {
    before(() => {
        //перед тем как оформить заказ авторизуемся

        const email = "necrofallen@yandex.ru";
        const pass = "qwerty123";

        cy.visit("http://localhost:3000/login");

        cy.get("#emailLoginInput").type(`${email}{enter}`);
        cy.get("#passwordLoginInput").type(`${pass}{enter}`);

        cy.get("#loginBtn").click();
    });

    it("should order contain a number", () => {
        //жмем кнопку заказа
        cy.get("#checkoutBtn").click();
        //ответ от сервера с номером заказа срабатывает не сразу
        //ждем 15 секунд
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(15000);
        //проверям номер заказа
        cy.get("#orderNumberModal")
            .invoke("text")
            .should("match", /^[0-9]*$/);
    });
});
