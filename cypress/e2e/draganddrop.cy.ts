/// <reference types="cypress" />

describe("drag and drop working correctly", function () {
    before(function () {
        cy.visit("http://localhost:3000");
    });

    it("should drag visit beach to the to-do list", () => {
        const dataTransfer = new DataTransfer();

        cy.get(
            "#sauce-section .draganddrop_container_drag__SkXLU:first"
        ).trigger("dragstart", {
            dataTransfer,
        });

        cy.get("#dropConstructor").trigger("drop", {
            dataTransfer,
        });
    });
});
