import { mana } from '../mana'

export const COINMARKET_MANA = 'https://api.coinmarketcap.com/v2/ticker/1966'
export const COINMARKET_BTC = 'https://api.coinmarketcap.com/v2/ticker/1'

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
    default: {
      return formatPrice(value)
    }
  }
}

export function getAvailableCurrencies() {
  return [
    {
      label: 'USD',
      description: 'US Dollar'
    },
    {
      label: 'MANA',
      description: 'Decentraland MANA'
    },
    {
      label: 'BTC',
      description: 'Bitcoin'
    }
  ]
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
    default:
      return currency
  }
}
