describe('Autenticação de Usuário', () => {
  it('Deve exibir a popup de login', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.get('input[type="email"]').should('be.visible');
  });

  it('Deve fazer login com sucesso', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.get('input[type="email"]').type('l@l');
    cy.get('input[type="password"]').type('1');
    cy.contains('Login').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login bem-sucedido!');
    });
  });

  it('Deve exibir a popup de cadastro', () => {
    cy.visit('/');
    cy.contains('Cadastre-se').click();
    cy.get('input[type="text"]').should('be.visible');
  });

  it('Deve cadastrar um novo usuário', () => {
    cy.visit('/');
    cy.contains('Cadastre-se').click();
    cy.get('input[type="text"]', { timeout: 10000 })
      .should('be.visible')
      .type('Felix');
    cy.get('input[type="email"]').type('d@d');
    cy.get('input[type="password"]').type('1');
    cy.contains('Cadastre-se').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Cadastro bem-sucedido!');
    });
  });
});
