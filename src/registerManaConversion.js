import { CurrencyLoader } from './modules/currency'

window.loader = new CurrencyLoader()
export const registerManaConversion = () => {
  window.loader.reload()
  setTimeout(registerManaConversion, 1000)
}

registerManaConversion()
console.log('DCL Marketplace currency changer extension loaded.')
