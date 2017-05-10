import React from 'react';
import LikenessWord from './likeness_word.jsx';

var TerminalRow = React.createClass({
  getDefaultProps: function() {
    return {
      base: 16,
      rowPrefixLength: 4
    }
  },

  propTypes: {
    body: React.PropTypes.object.isRequired,
    onGuess: React.PropTypes.func.isRequired,
    onHover: React.PropTypes.func.isRequired,
    rowNumber: React.PropTypes.number.isRequired
  },

  rowPrefix: function() {
    return "0x" + this.translateRowNumber(this.props.rowNumber);
  },
  
  translateRowNumber: function(rowNumber) {
    let convertedNumber = rowNumber.toString(this.props.base);
    let truncatedNumber = convertedNumber.substring(convertedNumber.length - this.props.rowPrefixLength);
    let rowPadding = "0".repeat(this.props.rowPrefixLength - truncatedNumber.length);
    return rowPadding + truncatedNumber;
  },

  noop: function() {
    return false;
  },

  translateGarbage: function(text) {
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
  },

  render: function() {
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
});

module.exports = TerminalRow;
