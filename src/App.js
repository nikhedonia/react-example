import './style.less';
import React, { Component } from 'react';


class Playground extends Component {

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      ...props
    }

    this.handle = 0;
  }

  componentDidReciveProps() {
    this.setState(this.props)

  }

  componentWillUnmount() {
    clearInterval(this.handle);
  }

  componentDidMount() {
    this.handle = setInterval(
      () => {
        const {x, y, targetX, targetY} = this.state;
        const {speed} = this.props;
        const newX = x + (targetX - x) * speed;
        const newY = y + (targetY - y) * speed;
        if(newX == x  && newY == y) return;
        if( this.props.onStateChange) {
          this.props.onStateChange({
            x: newX,
            y: newY,
            targetX,
            targetY
          })
        }

        this.setState({
          x: newX,
          y: newY
        })
    }, 20)
  }


  onClick(e) {
    const {top, left} = e.target.getBoundingClientRect();
    console.log({top, left}, e.clientY, e.clientX);
    this.setState({
      targetX: e.clientX-left,
      targetY: e.clientY-top
    });
  }

  render() {
    const {
      x, y,
      targetX, targetY
    } = this.state;

    return (
      <svg
        className="playground"
        width="500"
        height="500"
        onClick={e => this.onClick(e)}>

          <circle
            cx={x}
            cy={y}
            r="100" fill="red" />

          <circle
            cx={targetX}
            cy={targetY}
            r="10" fill="black" />

      </svg>
    );
  }
}


export default class App extends Component {
  render() {
    return <div>
      <h1> React Example </h1>
      <p> click on the playground to make the circle move </p>
      <Playground
        speed={0.1}
        {...this.props.data}
        onStateChange={this.props.onStateChange} />
      <p>
        React's hot module loader enables you to change the source
        and see the changes without reloading the page
      </p>
    </div>
  }
}
