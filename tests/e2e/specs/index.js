// https://docs.cypress.io/api/introduction/api.html

const envs = ['dev', 'stg', 'prod', 'development', 'staging', 'production']

describe(`Default options for each env ${envs.toString()}`, () => {

  it('force env works', () => {
    cy.visit('/')

    envs.forEach((env) => {
      cy.get(`#${env}`)
      .should('have.descendants', 'pre')
      })
    

  })
  it('overwriting defaults work', () => {
    cy.visit('/')

    envs.forEach((env) => {
      cy.get(`#x${env}`)
        .should('be.visible')
      })
  })

})
