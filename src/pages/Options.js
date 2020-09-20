import React, { useContext, useState } from "react";
import { Tabs, Tab, Toast } from "react-bootstrap";
import OptionTab from "../components/OptionTab";
import { setItem } from "../storage";
import OptionsContext from "../context";

export default function Options() {
  const options = useContext(OptionsContext);
  const [hasAlert, setHasAlert] = useState(false);

  function handleTab(key, value) {
    options[key] = value;
    setItem("options", options);
    setHasAlert(true);
  }

  return (
    <>
      <Tabs defaultActiveKey="circle" id="uncontrolled-tab-example">
        <Tab eventKey="circle" title="Circle">
          <OptionTab option={options.circle} name="circle" onSave={handleTab} />
        </Tab>
        <Tab eventKey="rectangle" title="Rectangle">
          <OptionTab
            option={options.rectangle}
            name="rectangle"
            onSave={handleTab}
          />
        </Tab>
        <Tab eventKey="triangle" title="Triangle">
          <OptionTab
            option={options.triangle}
            name="triangle"
            onSave={handleTab}
          />
        </Tab>
      </Tabs>
      <Toast
        onClose={() => setHasAlert(false)}
        show={hasAlert}
        delay={3000}
        autohide
      >
        <Toast.Body>Options were saved successfully!</Toast.Body>
      </Toast>
    </>
  );
}
