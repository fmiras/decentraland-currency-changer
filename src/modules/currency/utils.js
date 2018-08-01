import { mana } from '../mana'

export const COINMARKET_MANA = 'https://api.coinmarketcap.com/v2/ticker/1966'
export const COINMARKET_BTC = 'https://api.coinmarketcap.com/v2/ticker/1'
export const COINMARKET_ETH = 'https://api.coinmarketcap.com/v2/ticker/1027'

function formatPrice(value, decimals = 2) {
  return value.toFixed(decimals).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export function formatValue(currency, value) {
  switch (currency) {
    case 'MANA': {
      return `${mana} ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    }
    case 'USD': {
      return `$${formatPrice(value)}`
    }
    case 'BTC': {
      return `฿${formatPrice(value)}`
    }
    case 'ETH': {
      return `Ξ${formatPrice(value)}`
    }
    default: {
      return formatPrice(value)
    }
  }
}

export function getAvailableCurrencies() {
  return [
    { label: 'ETH', description: 'Ethereum', default: true },
    { label: 'BTC', description: 'Bitcoin' },
    { label: 'MANA', description: 'Decentraland MANA' },
    { label: 'USD', description: 'US Dollar' }
  ]
}

export function getDefaultCurrency() {
  return getAvailableCurrencies().find(currency => currency.default)
}

async function getPriceFromUrl(url) {
  const response = await fetch(url)
  const { data } = await response.json()
  return data.quotes.USD.price
}

export async function getManaPrice(currency) {
  switch (currency) {
    case 'MANA':
      return 1
    case 'USD': {
      return getPriceFromUrl(COINMARKET_MANA)
    }
    case 'BTC': {
      const manaUsdPrice = await getPriceFromUrl(COINMARKET_MANA)
      const bitcoinUsdPrice = await getPriceFromUrl(COINMARKET_BTC)
      return manaUsdPrice / bitcoinUsdPrice
    }
    case 'ETH': {
      const manaUsdPrice = await getPriceFromUrl(COINMARKET_MANA)
      const etherUsdPrice = await getPriceFromUrl(COINMARKET_ETH)
      return manaUsdPrice / etherUsdPrice
    }
    default:
      return currency
  }
}

export function getCurrencyFromLocalstorage() {
  // TODO add chrome storage as feature
  // return new Promise(resolve => {
  //   chrome.storage.sync.get('currency', currency => {
  //     resolve(currency)
  //   })
  // })
  return localStorage['currency']
}

export function setLocalStorageCurrency(currency) {
  // chrome.storage.sync.set({ currency })
  localStorage['currency'] = currency
}

export function isValid(currency) {
  if (!currency) {
    return false
  }

  return getAvailableCurrencies().some(c => c.label === currency)
}
