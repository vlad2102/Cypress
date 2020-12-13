export const LOCATORS_TO_HIDE = [
  '.menu-header',
  '#intercom-frame',
  '.intercom-lightweight-app',
]

export const PAGE_SNAPSHOT_OPTIONS = {
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.01 },
  capture: 'fullPage',
  disableTimersAndAnimations: true,
  timeout: 60000,
}

export const VIEWPORTS = [
  [1000, 600],
  'iphone-5',
]