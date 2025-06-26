describe('UserForm submission', () => {
  beforeEach(() => {
    cy.visit('/registro'); 
  });

  it('fills out and submits the form successfully', () => {
    cy.get('[data-testid="input-name"]').type('Enrique Alarcon');
    cy.get('[data-testid="input-email"]').type('enrique@gmail.com');
    cy.get('[data-testid="input-password"]').type('123456');
    cy.get('[data-testid="input-repassword"]').type('123456');
    cy.get('[data-testid="select-pregunta"]').click();
    cy.contains('¿Cuál es tu comida favorita?').click();
    cy.get('[data-testid="input-respuesta"]').type('Lomo Saltado');
    cy.get('[data-testid="check-terminos"]').click();
    cy.get('[data-testid="check-privacidad"]').click();
    cy.get('[data-testid="submit-btn"]').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Usuario registrado con éxito');
    });
  });
});
