/* global chrome */

import { CurrencyLoader } from './modules/currency'
import {
  getCurrencyFromLocalstorage,
  getDefaultCurrency,
  isValid,
  setLocalStorageCurrency
} from './modules/currency/utils'

function init(currency) {
  if (isValid(currency)) {
    console.log(
      `Detected already configured currency "${currency}" from localstorage.`
    )
  } else {
    currency = getDefaultCurrency().label
    console.log(`No configured currency detected, using default "${currency}".`)
  }

  const loader = new CurrencyLoader(currency)

  chrome.runtime.onMessage.addListener(({ currency }) => {
    loader.setCurrency(currency)
    setLocalStorageCurrency(currency)
  })

  function registerManaConversion() {
    loader.reload()
    setTimeout(registerManaConversion, 1000)
  }

  registerManaConversion()
  console.log('DCL Marketplace currency changer extension loaded.')
}

init(getCurrencyFromLocalstorage())
