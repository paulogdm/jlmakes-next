import React, {Component} from 'react';
import Vector2 from '../utils/vector2';

class Particles extends Component {
  constructor(props) {
    super(props);
    let particles = [];
    for (let i = 0; i < props.count; i++) {
      particles.push({
        position: new Vector2(),
        direction: new Vector2(),
      });
    }
    this.state = {particles};
  }

  componentDidMount() {
    const {width, height} = this.props.dimensions;
    this.props.ctx.fillStyle = '#000000';
    this.props.ctx.fillRect(0, 0, width, height);
  }

  render() {
    return null;
  }
}

export default Particles;
