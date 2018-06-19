import React from 'react'
import CurrencyDropdown from './components/CurrencyDropdown'
import StarButton from './components/StarButton'

import logo from './logo.svg'
import './App.css'

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { currency: 'USD' }
  }

  handleChange(currency) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { currency })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">Marketplace currency:</p>
        <CurrencyDropdown onChange={this.handleChange} />
        <StarButton />
      </div>
    )
  }
}

export default App
