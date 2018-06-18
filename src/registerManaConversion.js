import { CurrencyLoader } from './modules/currency'

const loader = new CurrencyLoader()
chrome.runtime.onMessage.addListener(message => {
  loader.setCurrency(message.currency)
})

export const registerManaConversion = () => {
  loader.reload()
  setTimeout(registerManaConversion, 1000)
}

registerManaConversion()
console.log('DCL Marketplace currency changer extension loaded.')
