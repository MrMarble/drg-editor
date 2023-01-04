describe('Basic flow', () => {
  it('Upload, edit and download save', () => {
    cy.visit('/');

    cy.log('Upload save');
    cy.get("input[type='file']").selectFile(
      'cypress/fixtures/without_overclocks.sav',
      { force: true }
    );

    cy.findByText('Resources').should('exist').and('be.visible');

    // Download should not be available
    cy.findByText('Download').should('not.exist');

    cy.log('Edit save');
    cy.get('input#magnite').clear().type('1337').blur();

    cy.log('Download save');
    cy.findByText('Download').should('be.visible').click();
    cy.readFile('cypress/downloads/without_overclocks.sav');
  });
});
