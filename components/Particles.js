import {Component} from 'react';
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
    this.state = {
      particles,
      phase: 0,
      scale: 1,
    };
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

    ctx.fillStyle = 'rgba(5, 5, 15, 0.08)';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    ctx.fillStyle = '#befffc80';
    this.state.particles.forEach(({position}) => {
      let isInBoundsX = position.x > 0 && position.x <= dimensions.width;
      let isInBoundsY = position.y > 0 && position.y <= dimensions.height;
      if (isInBoundsX && isInBoundsY) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(position.x, position.y, 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
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
    const {phase, scale} = this.state;

    const delta = Vector2.add(particle.position, particle.velocity);
    const deltaMapX = rangeMap(delta.x, 0, width, phase, phase + scale);
    const deltaMapY = rangeMap(delta.y, 0, height, phase, phase + scale);

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
    this.setState(prevState => ({
      particles,
      phase: prevState.phase + prevState.scale / 2000,
    }));
  };

  render() {
    return null;
  }
}

export default Particles;
