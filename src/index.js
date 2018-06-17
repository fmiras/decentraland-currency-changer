import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { registerManaConversion } from "./registerManaConversion";

import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerManaConversion()
