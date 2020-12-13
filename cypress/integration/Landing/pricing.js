import { LOCATORS_TO_HIDE, PAGE_SNAPSHOT_OPTIONS, VIEWPORTS } from '../../support/landing.js'

const page = `${Cypress.env('host')}/pricing`

VIEWPORTS.forEach((viewport) => {
  const contextName = `Visual testing with viewport: ${viewport}`

  context(contextName, () => {
    beforeEach(() => {
      cy
        .visit(page)
        .viewport(viewport)
    })

    describe('Testing header block content on the page', () => {
      beforeEach(() => {
        cy
          .wait(2000)
      })
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
        'section.price__card-rates-wrap',
        'section.popular-questions',
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
    })

    it('Check full page snapshot', () => {
      cy
        .hide(LOCATORS_TO_HIDE)

      cy
        .matchImageSnapshot(`fullPage-${viewport}`, PAGE_SNAPSHOT_OPTIONS);
    })
  })
})

context('Visual testing tooltips in Standart cart', () => {
  before(() => {
    cy
      .visit(page)
      .hide(LOCATORS_TO_HIDE)
  })

  for (let number = 1; number <= 14; number ++) {
    const locators = {
      items: '.card-rates__card:not(.card-rates__card-business) .card-rates__item-list',
      tooltip: '.card-rates__item-list-tooltip',
    }

    const testName = `Check tooltip #${number} snapshot`
    const screenshotName = `standartTooltip${number}`

    it(testName, () => {
      cy
        .get(locators.items)
        .eq(number - 1)
        .trigger('mousemove')
        .find(locators.tooltip)
        .matchImageSnapshot(screenshotName, { disableTimersAndAnimations: false, padding: 30 })
      
      cy
        .get(locators.items)
        .eq(number - 1)
        .trigger('mouseout')
    })
  }
})

context('Visual testing tooltips in Business cart', () => {
  before(() => {
    cy
      .visit(page)
      .hide(LOCATORS_TO_HIDE)
  })

  for (let number = 1; number <= 18; number ++) {
    const locators = {
      items: '.card-rates__card.card-rates__card-business .card-rates__item-list',
      tooltip: '.card-rates__item-list-tooltip',
    }

    const testName = `Check tooltip #${number} snapshot`
    const screenshotName = `businessTooltip${number}`

    it(testName, () => {
      cy
        .get(locators.items)
        .eq(number - 1)
        .trigger('mousemove')
        .find(locators.tooltip)
        .matchImageSnapshot(screenshotName, { disableTimersAndAnimations: false, padding: 30 })
      
      cy
        .get(locators.items)
        .eq(number - 1)
        .trigger('mouseout')
    })
  }
})