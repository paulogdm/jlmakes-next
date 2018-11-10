import React, {Component} from 'react';

class Canvas extends Component {
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
        <canvas ref={this.ref} {...dimensions} />
        {this.props.children(this.ctx)}
      </>
    );
  }
}

export default Canvas;
