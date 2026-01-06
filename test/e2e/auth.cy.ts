describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/auth/login");
  });

  describe("Login Page", () => {
    // it('should show validation errors for empty fields', () => {
    //     cy.get('input[autocomplete="username"]').focus().blur();
    //     cy.contains('Username is required').should('be.visible');
    //
    //     cy.get('input[autocomplete="current-password"]').focus().blur();
    //     cy.contains('Password is required').should('be.visible');
    //
    //     cy.get('button').contains('Sign In').should('be.disabled');
    // });

    it("should toggle to register page", () => {
      cy.contains("Don't have an account? Sign up").click();
      cy.url().should("include", "/auth/register");
      cy.get("h1").should("contain", "Create Account");
    });

    // it('should show error on invalid credentials', () => {
    //     cy.get('input[autocomplete="username"]').type('unknown_user');
    //     cy.get('input[autocomplete="current-password"]').type('wrongpassword123');
    //     cy.get('button').contains('Sign In').click();
    //
    //     // Wait for the API response error alert
    //     cy.get('.v-alert').should('be.visible')
    //         .and('contain', 'Invalid username or password');
    // });
  });
  //
  // describe('Registration Page', () => {
  //     beforeEach(() => {
  //         cy.visit('/auth/register');
  //     });
  //
  //     it('should validate password matching', () => {
  //         cy.get('label').contains('Password').parent().find('input').type('Password123!');
  //         cy.get('label').contains('Confirm Password').parent().find('input').type('Password456!');
  //         cy.get('label').contains('Confirm Password').parent().find('input').blur();
  //
  //         cy.contains('Passwords do not match').should('be.visible');
  //     });
  //
  //     it('should validate email format', () => {
  //         cy.get('input[type="email"]').type('not-an-email');
  //         cy.get('input[type="email"]').blur();
  //         cy.contains('Email must be valid').should('be.visible');
  //     });
  // });
});
