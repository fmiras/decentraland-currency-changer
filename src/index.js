const COINMARKETKAP_MANA_API = 'https://api.coinmarketcap.com/v2/ticker/1966'
const formatPrice = price => price.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')

const getManaPriceUsd = async mana => {
  const response = await fetch(COINMARKETKAP_MANA_API)
  const { data } = await response.json()
  return data.quotes.USD.price
}

const hasManaPrice = mana => {
  return mana.innerHTML.includes('svg')
}

const convertPrices = async () => {
  const manaPriceUsd = await getManaPriceUsd()
  const manas = [...document.getElementsByClassName('Mana')]
  manas.forEach(mana => {
    if(!hasManaPrice(mana)){
      return
    }
    const manaAmount = mana.innerText.split(',').join('')
    const usdAmount = manaPriceUsd * manaAmount
    mana.innerText = `$${formatPrice(usdAmount)}`
  })
}

convertPrices()

const loop = () => {
  convertPrices()
  setTimeout(loop, 1000)
}

loop()