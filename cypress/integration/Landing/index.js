import { LOCATORS_TO_HIDE, PAGE_SNAPSHOT_OPTIONS, VIEWPORTS } from '../../support/landing.js'

const page = `${Cypress.env('host')}/`

VIEWPORTS.forEach((viewport) => {
  const contextName = `Visual testing with viewport: ${viewport}`

  context(contextName, () => {
    beforeEach(() => {
      cy
        .visit(page)
        .viewport(viewport)
    })

    describe('Testing header block content on the page', () => {
      it('Check menu snapshot', () => {
        cy
          .get('.menu-header')
          .matchImageSnapshot(`menu-${viewport}`, { disableTimersAndAnimations: false })
      })

      it('Check header block snapshot', () => {
        cy
          .hide(LOCATORS_TO_HIDE)
          .get('header')
          .matchImageSnapshot(`header-${viewport}`, { disableTimersAndAnimations: false })
      })
    })

    describe('Testing other blocks content on the page', () => {
      beforeEach(() => {
        cy
          .hide(LOCATORS_TO_HIDE)
      })

      const sections_locator = [
        'section.main__idea-wait',
        'section.main__stylish-design:nth-child(2)',
        'section.main__stylish-design:nth-child(3)',
        'section.main__stylish-design:nth-child(4)',
        'section.main__features',
        'section.main__adaptive',
        'section.main__main-reviews',
        'section.main__beside',
      ]
      sections_locator.forEach((locator) => {
        const number = sections_locator.indexOf(locator) + 1

        const testName = `Check section #${number} snapshot`
        const screenshotName = `section${number}-${viewport}`

        it(testName, () => {
          cy
            .get(locator)
            .matchImageSnapshot(screenshotName)
        })
      })

      it('Check footer snapshot', () => {
        cy
          .get('.footer')
          .matchImageSnapshot(`footer-${viewport}`)
      })

      it('Check full page snapshot', () => {
        cy
          .hide(LOCATORS_TO_HIDE)

        cy
          .matchImageSnapshot(`fullPage-${viewport}`, PAGE_SNAPSHOT_OPTIONS);
      })
    })
  })
})


describe('Visual testing hover effects', () => {
  it('Check button "Посмотреть каталог дизайнов" snapshot', () => {
    const locator = '.header__button a'

    cy
      .task('resetCRI')
      .visit(page)
      .hide(LOCATORS_TO_HIDE)

    cy
      .get(locator)
      .matchImageSnapshot('button', { disableTimersAndAnimations: false, padding: 3 })
    
    // https://github.com/cypress-io/cypress-example-recipes
    cy
      .task('activateHoverPseudo', { selector: locator })
    
    cy
      .get(locator)
      .matchImageSnapshot('buttonHover', { disableTimersAndAnimations: false, padding: 3 })
  })
})