describe("Dwarf edit", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.log("Upload save");
    cy.get("input[type='file']").selectFile(
      "cypress/fixtures/without_overclocks.sav",
      { force: true }
    );
  });

  it("Should edit dwarf level", () => {
    const dwarfs = [
      { name: "driller", level: 2 },
      { name: "gunner", level: 1 },
      { name: "scout", level: 25 },
      { name: "engineer", level: 1 },
    ];

    dwarfs.forEach(({ name, level }) => {
      cy.log(`Edit ${name} level`);
      cy.findByText(name).click();
      cy.get("input#level").should("have.value", level);
      cy.get("input#level + button").click();
      cy.get("input#level").should("have.value", "25");
    });
  });

  it("Should edit dwarf xp", () => {
    const dwarfs = [
      { name: "driller", progress: 3093, max: 4000 },
      { name: "gunner", progress: 1066, max: 3000 },
      { name: "scout", progress: 0, max: 0 },
      { name: "engineer", progress: 0, max: 3000 },
    ];

    dwarfs.forEach(({ name, progress, max }) => {
      cy.log(`Edit ${name} xp`);
      cy.findByText(name).click();
      cy.get("input#progress").should("have.value", progress);
      if (max === 0) {
        cy.get("input#progress + button").should("have.attr", "disabled");
      } else {
        cy.get("input#progress + button").click();
      }
      cy.get("input#progress").should("have.value", max);
    });
  });

  it("Should edit dwarf promotion", () => {
    const dwarfs = [
      { name: "driller", promotion: 0 },
      { name: "gunner", promotion: 1 },
      { name: "scout", promotion: 10 },
      { name: "engineer", promotion: 0 },
    ];

    dwarfs.forEach(({ name, promotion }) => {
      cy.log(`Edit ${name} promotion`);
      cy.findByText(name).click();
      cy.get("select#promotion").should("have.value", promotion);
      cy.get("select#promotion").select("18");
    });
  });
});
