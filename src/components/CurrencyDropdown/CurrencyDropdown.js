import React from 'react'
import PropTypes from 'prop-types'
import {
  getAvailableCurrencies,
  getDefaultCurrency
} from '../../modules/currency/utils'

import './CurrencyDropdown.css'

export default class CurrencyDropdown extends React.PureComponent {
  static propTypes = { onChange: PropTypes.func.isRequired }

  constructor(props) {
    super(props)
    this.state = { value: getDefaultCurrency().label }
  }

  handleChange = e => {
    this.setState({ value: e.target.value })
    this.props.onChange(e.target.value)
  }

  render() {
    return (
      <div className="CurrencyDropdown">
        <form>
          <select value={this.state.value} onChange={this.handleChange}>
            {getAvailableCurrencies().map(currency => (
              <option value={currency.label}>{currency.description}</option>
            ))}
          </select>
        </form>
      </div>
    )
  }
}
