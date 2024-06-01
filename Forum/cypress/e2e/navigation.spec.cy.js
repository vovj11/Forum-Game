describe('Navegação e Exibição de Posts', () => {
  it('Deve carregar a página inicial e exibir os posts', () => {
    cy.visit('/');
    cy.contains('Vital Fórum').should('be.visible');
    cy.contains('Tópico').should('be.visible');
  });

  it('Deve navegar para a página de perfil', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.get('input[type="email"]').type('l@l');
    cy.get('input[type="password"]').type('1');
    cy.contains('Login').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Login bem-sucedido!');
      cy.get('.alert-button').click();
    });

    cy.get('#profile-icon', { timeout: 10000 }).should('be.visible').click();
    cy.contains('Acessar Perfil').click();
    cy.url().should('include', '/perfil');
  });

  it('Deve navegar para a página de criação de novo post', () => {
    cy.visit('/');
    cy.contains('Login').click();
    cy.get('input[type="email"]').type('l@l');
    cy.get('input[type="password"]').type('1');
    cy.contains('Login').click();

    cy.log('Tentando fazer login...');

    cy.wait(10000);

    cy.contains('Login').should('not.exist');
    cy.get('#profile-icon', { timeout: 10000 }).should('be.visible').click();
    cy.contains('Nova Publicação').click();
    cy.url().should('include', '/new-post');
    cy.contains('Crie seu post').should('be.visible');
  });
});
