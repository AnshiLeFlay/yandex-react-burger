/// <reference types="cypress" />

describe("drag and drop working correctly", function () {
    before(function () {
        cy.visit("http://localhost:3000");
    });

    it("should drag first element from section sauce to constructor", () => {
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
