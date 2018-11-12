import React, {Component} from 'react';
import Vector2 from '../utils/Vector2';
import SimplexNoise from 'simplex-noise';
import rangeMap from '../utils/rangeMap';
import Sign from '../utils/Sign';

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
    this.scale = 1;
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

    ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    ctx.fillStyle = '#888888';
    this.state.particles.forEach(({position}) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(position.x, position.y, 1.25, 0, Math.PI * 2);
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
    return new Vector2(
      (Math.PI / 2) * Sign.random() - Math.random(),
      (Math.PI / 2) * Sign.random() - Math.random()
    );
  };

  loop = () => {
    this.update();
    this.frameIds.push(requestAnimationFrame(this.loop));
  };

  move = particle => {
    const {width, height} = this.props.dimensions;

    const delta = Vector2.add(particle.position, particle.velocity);
    const deltaMapX = rangeMap(delta.x, 0, width, 0, this.scale);
    const deltaMapY = rangeMap(delta.y, 0, height, 0, this.scale);

    const theta = this.simplex.noise2D(deltaMapX, deltaMapY);
    const thetaMap = rangeMap(theta, -1, 1, 0, Math.PI * 2);

    const noiseVector = Vector2.fromAngle(thetaMap);
    const noise = Vector2.multiply(noiseVector, 3);

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
