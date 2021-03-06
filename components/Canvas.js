import React, {PureComponent} from 'react';

class Canvas extends PureComponent {
  ref = React.createRef();
  state = {
    width: 0,
    height: 0,
  };

  componentDidMount() {
    this.ctx = this.ref.current.getContext('2d');
    this.updateDimensions();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  handleResize = () => {
    window.requestAnimationFrame(() => this.updateDimensions());
  };

  render() {
    const dimensions = {
      width: this.state.width,
      height: this.state.height,
    };

    return (
      <>
        <canvas ref={this.ref} {...dimensions} style={{display: 'block'}} />
        {dimensions.width &&
          dimensions.height &&
          this.props.children(this.ctx, dimensions)}
      </>
    );
  }
}

export default Canvas;
