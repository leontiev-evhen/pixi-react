import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import Main from "./pages/Main";
import Options from "./pages/Options";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { getItem, setItem } from "./storage";
import { DEFAULT_OPTIONS } from "./constants";
import OptionsContext from "./context";

export default function App() {
  const [options, setOptions] = useState(getItem("options"));
  useEffect(() => {
    if (!options) {
      setItem("options", DEFAULT_OPTIONS);
      setOptions(DEFAULT_OPTIONS);
    }
  }, [options]);

  if (!options) {
    return <Spinner animation="border" />;
  }
  return (
    <OptionsContext.Provider value={options}>
      <Router>
        <Container>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/options" component={Options} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </Container>
      </Router>
    </OptionsContext.Provider>
  );
}
