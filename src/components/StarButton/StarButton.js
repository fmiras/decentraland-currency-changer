import React from 'react'

import './StarButton.css'

export default class StarButton extends React.PureComponent {
  render() {
    return (
      <div className="StarButton">
        <iframe
          title="Github Button"
          src="https://ghbtns.com/github-btn.html?user=fmiras&repo=decentraland-currency-changer&type=star&count=true"
          frameBorder="0"
          scrolling="0"
          width="72px"
          height="30px"
        />
      </div>
    )
  }
}
