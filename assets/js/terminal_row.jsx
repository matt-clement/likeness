import React from 'react';
import LikenessWord from './likeness_word.jsx';

class TerminalRow extends React.Component {
  constructor(props) {
    super(props);
    this.rowPrefix = this.rowPrefix.bind(this);
    this.translateRowNumber = this.translateRowNumber.bind(this);
    this.translateGarbage = this.translateGarbage.bind(this);
  }

  rowPrefix() {
    return "0x" + this.translateRowNumber(this.props.rowNumber);
  }
  
  translateRowNumber(rowNumber) {
    let convertedNumber = rowNumber.toString(this.props.base);
    let truncatedNumber = convertedNumber.substring(convertedNumber.length - this.props.rowPrefixLength);
    let rowPadding = "0".repeat(this.props.rowPrefixLength - truncatedNumber.length);
    return rowPadding + truncatedNumber;
  }

  translateGarbage(text) {
    if(!text){
      return;
    }
    var that = this;
    return (
      <span>
        {_.map(text.split(""), function(ch, index) {
          return (
            <LikenessWord
              enabled={true}
              inert={true}
              key={index}
              onHover={that.props.onHover}
              onGuess={that.noop}
              word={ch}
            />)
        })}
      </span>
    );
  }

  render() {
    return (
      <div className='terminal-row'>
        {this.rowPrefix()}: {this.translateGarbage(this.props.body.prefix)}{
          this.props.body.word ?
            <LikenessWord
              enabled={true}
              onGuess={this.props.onGuess}
              onHover={this.props.onHover}
              word={this.props.body.word}
            /> : null
        }
        {this.translateGarbage(this.props.body.suffix)}
      </div>
    );
  }
}

export default TerminalRow;
