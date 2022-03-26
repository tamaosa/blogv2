/// <reference types="Cypress" />

const axeRunContext = {
  exclude: [[".adsbygoogle"], [".gatsby-highlight"]],
}

const axeRunOptions = {
  rules: {
    region: { enabled: false },
  },
}

describe("Accessibility tests on light mode", () => {
  beforeEach(() => {
    cy.visit("/").get("main").injectAxe()
  })
  it("Checks light mode", () => {
    cy.get("body.light-mode").should("exist")
    cy.findAllByText("🌞").should("exist")
    cy.get("body.dark-mode ").should("not.exist")
    cy.findAllByText("🌛").should("not.exist")
  })
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y(axeRunContext, axeRunOptions)
  })
  it("Navigates to entry and checks for accessibility violations", () => {
    cy.findAllByRole("link", { name: "記事へのリンク" }).first().click()
    cy.location("pathname").should("match", /\/[0-9]{4}\//)
    cy.checkA11y(axeRunContext, axeRunOptions)
  })
  it("Navigates to tag and checks for accessibility violations", () => {
    cy.findAllByRole("link", { name: "タグへのリンク" }).first().click()
    cy.location("pathname").should("match", /\/tags\//)
    cy.checkA11y(axeRunContext, axeRunOptions)
  })
  it("Navigates to Privacy Policy and checks for accessibility violations", () => {
    cy.findByText(/Privacy Policy/i).click()
    cy.location("pathname").should("match", /\/privacy-policy$/)
    cy.checkA11y(axeRunContext, axeRunOptions)
  })
})

describe("Accessibility tests on dark mode", () => {
  beforeEach(() => {
    cy.visit("/").get("main").injectAxe()
    cy.findByRole("button", { name: /🌞/i }).click()
  })
  it("Checks dark mode", () => {
    cy.get("body.light-mode").should("not.exist")
    cy.findAllByText("🌞").should("not.exist")
    cy.get("body.dark-mode ").should("exist")
    cy.findAllByText("🌛").should("exist")
  })
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y(axeRunContext, axeRunOptions)
  })
  it("Navigates to entry and checks for accessibility violations", () => {
    cy.findAllByRole("link", { name: "記事へのリンク" }).first().click()
    cy.location("pathname").should("match", /\/[0-9]{4}\//)
    cy.checkA11y(axeRunContext, axeRunOptions)
  })
  it("Navigates to tag and checks for accessibility violations", () => {
    cy.findAllByRole("link", { name: "タグへのリンク" }).first().click()
    cy.location("pathname").should("match", /\/tags\//)
    cy.checkA11y(axeRunContext, axeRunOptions)
  })
  it("Navigates to Privacy Policy and checks for accessibility violations", () => {
    cy.findByText(/Privacy Policy/i).click()
    cy.location("pathname").should("match", /\/privacy-policy$/)
    cy.checkA11y(axeRunContext, axeRunOptions)
  })
})
