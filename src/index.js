import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
