import { formatPrice, COINMARKETKAP_MANA_API } from "./utils"

export default class CurrencyService {
  static async getManaPriceUsd() {
    const response = await fetch(COINMARKETKAP_MANA_API)
    const { data } = await response.json()
    return data.quotes.USD.price
  }

  static hasManaPrice(manaElement) {
    return manaElement.innerHTML.includes("svg");
  }

  static async convertPrices() {
    const manaPriceUsd = await this.getManaPriceUsd()
    const manas = [...document.getElementsByClassName('Mana')]
    manas.forEach(mana => {
      if (!this.hasManaPrice(mana)) {
        return
      }
      const manaAmount = mana.innerText.split(',').join('')
      const usdAmount = manaPriceUsd * manaAmount
      mana.innerText = `$${formatPrice(usdAmount)}`;
    })
  }
}