import React, {Component} from 'react';
import Vector2 from '../utils/vector2';

class Particles extends Component {
  constructor(props) {
    super(props);
    let particles = [];
    for (let i = 0; i < props.count; i++) {
      particles.push({
        position: this.getInitialPosition(),
        velocity: new Vector2(0, Math.random() * -1),
      });
    }
    this.state = {particles};
  }

  componentDidMount() {
    this.loop();
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

  getInitialPosition = () => {
    return new Vector2(
      Math.random() * this.props.dimensions.width,
      this.props.dimensions.height
    );
  };

  loop = () => {
    window.requestAnimationFrame(() => {
      this.update();
      this.loop();
    });
  };

  move = particle => {
    const delta = Vector2.add(particle.position, particle.velocity);
    return delta.y > 0 ? delta : this.getInitialPosition();
  };

  update = () => {
    const particles = this.state.particles.map(particle => ({
      ...particle,
      position: this.move(particle),
    }));
    this.setState({particles});
  };

  render() {
    return null;
  }
}

export default Particles;
