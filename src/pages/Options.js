import React, { useContext, useState } from "react";
import { Tabs, Tab, Toast, Button } from "react-bootstrap";
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

  function dowload() {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(options)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "options.json";
    a.click();
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
        <Tab eventKey="dowload" title="Dowload Options">
          <div className="btn-download">
            <Button variant="primary" onClick={dowload}>
              Download
            </Button>
          </div>
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
