import React, { Component } from 'react';
import Complex from 'complex';
import './App.css';

function calculateNewViewport(oldPosition,
  oldHeight, oldAspectRatio, newAspectRatio) {
    if (oldAspectRatio === newAspectRatio) {
      return {position: oldPosition, height: oldHeight};
    } else if (oldAspectRatio < newAspectRatio) {
      const newPosition = oldPosition - Complex(
        height * (newAspectRatio -  oldAspectRatio) / 2.0, 0);
      
      return {position: newPosition, height: oldHeight};
    } else {
      const heightDiff = height * (oldAspectRatio / newAspectRatio - 1)
      const newPosition = oldPosition + Complex(0, heightDiff / 2.0);
      const newHeight = oldHeight + heightDiff;

      return {position: newPosition, height: newHeight}
    }
}

class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      canvasHeight: undefined,
      aspectRatio: 3.0 / 2.0,
      viewport: {
        position: Complex(-2, 1),
        height: 2
      }
    }
  }

  handleWindowResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newAspectRatio = width / height;

    this.setState((prevState) => {
      return {
        canvasHeight: height,
        aspectRatio: newAspectRatio,
        viewport: calculateNewViewport(prevState.viewport.position,
          prevState.viewport.height, prevState.aspectRatio, newAspectRatio)
      }
    })
  }

  componentDidMount() {
    this.handleWindowResize()
    window.addEventListener("resize", this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize)
  }

  render() {
    return (
      <div class="app">
        <MandelbrotCanvas
          height={this.state.canvasHeight}
          aspectRatio={this.state.aspectRatio}
          viewport={this.state.viewport} />
        <ControlPanel />
      </div>
    );
  }

}

class MandelbrotCanvas extends Component {

  constructor(props) {
    super(props);

    this.renderer = undefined;
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.renderer = MandelbrotRenderer(this.canvasRef.current); // FIXME
  }

  render() {
    return (
      <canvas ref={this.canvasRef} class="mandelbrot-canvas" />
    )
  }

  componentDidUpdate(prevProps, prevState) {
    this.renderer.
  }

}

class ControlPanel extends Component {

  render() {
    return (
      <div class="control-panel">Control Panel</div>
    )
  }

}

export default App;
