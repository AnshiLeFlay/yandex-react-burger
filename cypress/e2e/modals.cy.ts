/// <reference types="cypress" />

describe("modals is correct", function () {
    before(() => {
        //перед проверкой модальных окон авторизуемся

        const email = "necrofallen@yandex.ru";
        const pass = "qwerty123";

        cy.visit("http://localhost:3000/login");

        cy.get("#emailLoginInput").type(`${email}{enter}`);
        cy.get("#passwordLoginInput").type(`${pass}{enter}`);

        cy.get("#loginBtn").click();
    });

    it("should open modal with order number", () => {
        //жмем кнопку заказа
        cy.get("#checkoutBtn").click();

        //ответ от сервера с номером заказа приходит не сразу, поэтому
        //ждем 15 секунд
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(15000);

        //проверям номер заказа
        //если есть номер заказа, значит модальное окно отображается корректно
        cy.get("#orderNumberModal")
            .invoke("text")
            .should("match", /^[0-9]*$/);
    });

    it("should open modal with ingredient details", () => {
        cy.visit("http://localhost:3000");
        //находим первый элемент в секции соусов и вызываем click event
        cy.get("#sauce-section a:first").click();

        //проверям существует ли модальное окно
        //ingredientsPageModal

        cy.get("#ingredientsPageModal");
    });
});
