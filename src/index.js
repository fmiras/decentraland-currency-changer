const { COINMARKETKAP_MANA_API } = process.env

const formatPrice = price => price.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')

const convertToUsd = async mana => {
  const response = await fetch(COINMARKETKAP_MANA_API)
  const { data } = await response.json()
  return data.quotes.USD.price * mana
}

const manas = [...document.getElementsByClassName('Mana')]
manas.forEach(async mana => {
  const manaAmount = mana.innerText.split(',').join('')
  const usdAmount = await convertToUsd(manaAmount)
  mana.innerText = formatPrice(usdAmount)
})