import React, {Component} from 'react';
import Vector2 from '../utils/vector2';
import SimplexNoise from 'simplex-noise';

class Particles extends Component {
  constructor(props) {
    super(props);
    let particles = [];
    for (let i = 0; i < props.count; i++) {
      particles.push({
        position: this.getRandomPosition(),
        velocity: this.getInitialVelocity(),
      });
    }
    this.state = {particles};
    this.simplex = new SimplexNoise();
    this.frameIds = [];
  }

  componentDidMount() {
    this.loop();
  }

  componentDidUpdate() {
    this.draw();
  }

  componentWillUnmount() {
    this.frameIds.forEach(cancelAnimationFrame);
  }

  draw = () => {
    const {ctx, dimensions} = this.props;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    ctx.fillStyle = '#FFFFFF';
    this.state.particles.forEach(({position}) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(position.x, position.y, 1.5, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  };

  getRandomPosition = () => {
    return new Vector2(
      Math.random() * this.props.dimensions.width,
      Math.random() * this.props.dimensions.height
    );
  };

  getInitialVelocity = () => {
    return new Vector2(0, Math.PI / -3 - Math.random());
  };

  loop = () => {
    this.update();
    this.frameIds.push(requestAnimationFrame(this.loop));
  };

  move = particle => {
    const delta = Vector2.add(particle.position, particle.velocity);
    const theta = this.simplex.noise2D(delta.x, delta.y);
    const simplex = Vector2.fromAngle(theta);
    const noise = Vector2.multiply(simplex, -1);

    let position;
    if (delta.y > 0) {
      position = Vector2.add(delta, noise);
    } else {
      position = this.getRandomPosition();
      position.y = this.props.dimensions.height;
    }
    return {
      ...particle,
      position,
    };
  };

  update = () => {
    const particles = this.state.particles.map(this.move);
    this.setState({particles});
  };

  render() {
    return null;
  }
}

export default Particles;
