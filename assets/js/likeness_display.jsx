import React from 'react';
import TerminalRow from './terminal_row.jsx';
import GuessList from './guess_list.jsx';

var LikenessDisplay = React.createClass({
  getDefaultProps: function() {
    return {
      defaultHoveredWord: "_",
      garbledLetters: '(){}[]<>@?!+=-_|^;:%$#,`\'"',
      guesses: [],
      rowInterval: 8,
      base: 16,
      charPerRow: 16,
      minRows: 16,
      maxColumns: 2,
    }
  },

  getInitialState: function() {
    return {
      columns: this.generateBody(),
      hoveredWord: this.props.defaultHoveredWord
    }
  },

  validRowNumber: function() {
    return Math.floor(Math.random() * Math.pow(16,4));
  },

  hoveredText: function(text) {
    this.setState({
      hoveredWord: text || this.props.defaultHoveredWord
    });
  },

  getRandBetween: function(min, max) {
    return Math.random() * (max - min) + min;
  },

  garbageString: function(length){
    let returnStr = '';
    let junk = this.props.garbledLetters;
    for (let i = 0; i < length; i++) {
      returnStr += junk.charAt(this.getRandBetween(0, junk.length - 1));
    }
    return returnStr;
  },

  numberOfRows: function() {
    return Math.max(this.props.minRows, this.props.words.length * 2);
  },

  numberOfColumns: function() {
    return Math.min(this.props.maxColumns, Math.floor(this.numberOfRows() / 4));
  },

  generateRow: function(lineLength, word) {
    let prefix, suffix;
    if (typeof word === "undefined") {
      prefix = this.garbageString(lineLength);
    } else if (word.length < lineLength) {
      let startIndex = _.floor(this.getRandBetween(0, lineLength - word.length));
      prefix = this.garbageString(startIndex);
      suffix = this.garbageString(lineLength - word.length - startIndex);
    } else {
      prefix = null;
      suffix = null;
    }
    return {prefix: prefix, suffix: suffix, word: word};
  },

  refreshBoard: function() {
    this.setState({
      columns: this.generateBody(),
    });
  },

  generateBody: function() {
    let that = this;
    let rowNumberStart = this.validRowNumber();
    let formatRow = this.generateRow.bind(this, this.props.charPerRow);
    let words = _.shuffle(this.props.words);
    let rows = this.numberOfRows();
    let columns = this.numberOfColumns();
    let rowsPerColumn = Math.floor(rows/columns);
    let iterator = new Array(rowsPerColumn*columns);
    let wordArray = [];
    for (let i = 0; i < iterator.length; i++){
      iterator[i] = i
    }
    iterator = _.shuffle(iterator);
    _.forEach(iterator, function(randomIndex) {
      wordArray.push(words[randomIndex]);
    });
    return (
      _.chunk(_.map(wordArray, function(word, index) {
        return (
          <TerminalRow
            key={index}
            body={formatRow(word)}
            onHover={that.hoveredText}
            onGuess={that.props.onGuess}
            rowNumber={rowNumberStart + index * that.props.rowInterval}
          />);
      }),
        rowsPerColumn
      )
    )
  },

  render: function() {
    let that = this;
    return (
      <div className="guess-display">
        {_.map(this.state.columns, function(column, index) {
          return (
            <div key={index} className="code-column">
              {column}
            </div>
          );
        })}
        <div id="guess-container">
          <GuessList style={{minHeight: "200px"}} guesses={this.props.guesses} hovered={this.state.hoveredWord}/>
        </div>
      </div>
    );
  }
});

module.exports = LikenessDisplay;
