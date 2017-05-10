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
    return (
      <span>
        {_.map(text.split(""), (ch, index)  => (
            <LikenessWord
              enabled={true}
              inert={true}
              key={index}
              onHover={this.props.onHover}
              onGuess={this.noop}
              word={ch}
            />
        ))}
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

TerminalRow.defaultProps = {
  base: 16,
  rowPrefixLength: 4,
}

export default TerminalRow;
