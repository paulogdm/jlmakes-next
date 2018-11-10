import React, {Component} from 'react';
import Vector2 from '../utils/vector2';

class Particles extends Component {
  constructor(props) {
    super(props);
    let particles = [];
    for (let i = 0; i < props.count; i++) {
      particles.push({
        position: new Vector2(
          Math.random() * props.dimensions.width,
          Math.random() * props.dimensions.height
        ),
      });
    }
    this.state = {particles};
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw = () => {
    const {
      ctx,
      dimensions: {width, height},
    } = this.props;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#FFFFFF';

    this.state.particles.forEach(({position: {x, y}}) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  };

  render() {
    return null;
  }
}

export default Particles;
