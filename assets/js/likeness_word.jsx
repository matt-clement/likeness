import React from 'react';

class LikenessWord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highlighted: false,
      enabled: true
    }

    // TODO: Replace these with arrow functions
    // so we don't have to explicitely bind.
    this.enable = this.enable.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({enabled: nextProps.enabled});
  }

  enable() {
    this.setState({enabled: true});
  }

  onMouseEnter() {
    if (this.state.enabled) {
      this.setState({highlighted: true});
      this.props.onHover(this.props.word);
    }
  }
  onMouseLeave() {
    if (this.state.enabled) {
      this.setState({highlighted: false});
      this.props.onHover("");
    }
  }
  onClick(ev) {
    if (this.state.enabled) {
      this.props.onGuess(ev);
      this.setState({enabled: false, highlighted: false});
    }
  }

  render() {
    let spanClass = 'code' + (this.state.highlighted ? ' code-highlighted' : null);
    return (
      <span
        className={spanClass}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.props.inert ? null : this.onClick}
      >
        {this.state.enabled ? this.props.word : _.repeat(".", this.props.word.length)}
      </span>
    );
  }
}

export default LikenessWord;
