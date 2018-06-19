import React from 'react'
import PropTypes from 'prop-types'
import { getAvailableCurrencies } from '../../modules/currency/utils'

import './CurrencyDropdown.css'

export default class CurrencyDropdown extends React.PureComponent {
  static propTypes = { onChange: PropTypes.func.isRequired }

  constructor(props) {
    super(props)
    this.state = { value: 'USD' }
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
    this.props.onChange(e.target.value)
  }

  getOptions() {
    return getAvailableCurrencies().map(currency => ({
      text: currency.label,
      value: currency.label,
      description: currency.text
    }))
  }

  render() {
    return (
      <div className="CurrencyDropdown">
        <form>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="USD">USD</option>
            <option value="MANA">MANA</option>
            <option value="BTC">BTC</option>
          </select>
        </form>
      </div>
    )
  }
}
