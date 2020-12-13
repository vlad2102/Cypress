// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand()

Cypress.Commands.add('hide', (locators) => {
  locators.forEach((locator) => {
    cy
      .get(locator)
      .invoke('css', 'visibility', 'hidden')
      .invoke('css', 'display', 'none')
  })
})

Cypress.Commands.overwrite('viewport', (originalFn, size, options) => {
  if (Cypress._.isArray(size)) {
    return originalFn(size[0], size[1], options)
  }

  return originalFn(size, options)
})