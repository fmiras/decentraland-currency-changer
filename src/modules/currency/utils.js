export const COINMARKETKAP_MANA_API = "https://api.coinmarketcap.com/v2/ticker/1966"

export const formatPrice = price =>
  price.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,");
