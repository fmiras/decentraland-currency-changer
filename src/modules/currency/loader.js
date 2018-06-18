import { formatValue, getManaPrice } from './utils'

export default class CurrencyLoader {
  constructor(currency = 'USD') {
    this.currency = currency
    this.virtualMana = []
  }

  setCurrency(currency) {
    this.currency = currency
    this.reload()
  }

  reload() {
    this.convertPrices()
  }

  getPrice() {
    return getManaPrice(this.currency)
  }

  hasManaPrice(manaElement) {
    return manaElement.innerHTML.includes('svg')
  }

  async convertPrices() {
    const price = await this.getPrice()
    const manas = [...document.getElementsByClassName('Mana')]
    manas.forEach(mana => {
      const manaAmount = mana.getAttribute('amount')
      const value = price * manaAmount
      mana.innerHTML = formatValue(this.currency, value)
    })
  }
}
