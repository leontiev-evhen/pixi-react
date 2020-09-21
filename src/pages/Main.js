import React, { useEffect, useRef, useState, useContext } from "react";
import * as PIXI from "pixi.js";
import { Row, Col, Button } from "react-bootstrap";
import OptionsContext from "../context";

const renderer = new PIXI.autoDetectRenderer(null);
const stage = new PIXI.Container();
stage.interactive = true;

export default function App() {
  const options = useContext(OptionsContext);
  const ref = useRef(null);
  const [shapeType, setShapeType] = useState("circle");
  const [graphicsArr, setGraphicsArr] = useState([]);

  useEffect(() => {
    const el = ref.current;
    if (el && el.children.length === 0) {
      el.appendChild(renderer.view);
    }
    return () => stage.removeChildren(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, [shapeType]);

  useEffect(() => {
    function resize() {
      const size = [900, 600];
      const ratio = size[0] / size[1];
      const w = ref.current.offsetWidth;
      const h = ref.current.offsetWidth / ratio;
      renderer.view.style.width = w + "px";
      renderer.view.style.height = h + "px";
      renderer.resize(w, h);
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function handleClick(e) {
    const rect = ref.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let graphics;
    switch (true) {
      case shapeType === "circle":
        graphics = drawCircle(x, y);
        break;
      case shapeType === "rectangle":
        graphics = drawRectangle(x, y);
        break;
      case shapeType === "triangle":
        graphics = drawTriangle(x, y);
        break;
      default:
        break;
    }
    setGraphicsArr((arr) => [...arr, graphics]);
    stage.addChild(graphics);
    animate();
  }

  function drawCircle(x, y) {
    const circle = drawFigure("circle");
    circle.lineStyle(0);
    circle.drawCircle(x, y, options.circle.size);
    circle.endFill();
    return circle;
  }

  function drawRectangle(x, y) {
    const rect = drawFigure("rectangle");
    rect.drawRect(x, y, options.rectangle.size, options.rectangle.size);
    rect.endFill();
    return rect;
  }

  function drawTriangle(x, y) {
    const triangle = drawFigure("triangle");
    triangle.x = x;
    triangle.y = y;
    triangle.moveTo(options.triangle.size, 0);
    triangle.lineTo(options.triangle.size / 2, options.triangle.size);
    triangle.lineTo(0, 0);
    triangle.lineTo(options.triangle.size / 2, 0);
    triangle.endFill();
    return triangle;
  }

  function drawFigure(key) {
    const figure = new PIXI.Graphics();
    figure.beginFill(PIXI.utils.string2hex(options[key].color));
    return figure;
  }

  function animate() {
    renderer.render(stage);
    requestAnimationFrame(animate);
  }

  function handleShapeType(value) {
    setShapeType(value);
  }

  function reset() {
    graphicsArr.forEach((item) => item.clear());
    setGraphicsArr([]);
  }

  function getVariant(type) {
    return shapeType === type ? "secondary" : "primary";
  }

  return (
    <>
      <Row>
        <Col md={2} sm={12}>
          <div className="btn-groups">
            <Button
              variant={getVariant("circle")}
              onClick={() => handleShapeType("circle")}
            >
              Circle
            </Button>
            <Button
              variant={getVariant("rectangle")}
              onClick={() => handleShapeType("rectangle")}
            >
              Rectangle
            </Button>
            <Button
              variant={getVariant("triangle")}
              onClick={() => handleShapeType("triangle")}
            >
              Triangle
            </Button>
          </div>
        </Col>
        <Col md={10} sm={12}>
          <div ref={ref}></div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="danger" onClick={reset}>
            Reset
          </Button>
        </Col>
      </Row>
    </>
  );
}
