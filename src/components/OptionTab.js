import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

export default function OptionTab({ name, option, onSave }) {
  const [color, setColor] = useState(option.color);
  const [size, setSize] = useState(option.size);

  function save() {
    onSave(name, {
      size,
      color,
    });
  }

  return (
    <>
      <div className="option-item">
        <div>Color</div>
        <input
          type="color"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="option-item">
        <div>Size</div>
        <RangeSlider
          min={10}
          max={100}
          value={size}
          onChange={(e) => setSize(+e.target.value)}
        />
      </div>
      <Button variant="primary" onClick={save}>
        Save
      </Button>
    </>
  );
}

OptionTab.propTypes = {
  name: PropTypes.string.isRequired,
  option: PropTypes.shape({
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
};
