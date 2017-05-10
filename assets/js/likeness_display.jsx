import React from 'react';
import TerminalRow from './terminal_row.jsx';
import GuessList from './guess_list.jsx';

class LikenessDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: this.generateBody(),
      hoveredWord: this.props.defaultHoveredWord
    }

    this.validRowNumber = this.validRowNumber.bind(this);
    this.hoveredText = this.hoveredText.bind(this);
    this.getRandBetween = this.getRandBetween.bind(this);
    this.garbageString = this.garbageString.bind(this);
    this.numberOfRows = this.numberOfRows.bind(this);
    this.numberOfColumns = this.numberOfColumns.bind(this);
    this.generateRow = this.generateRow.bind(this);
    this.refreshBoard = this.refreshBoard.bind(this);
    this.generateBody = this.generateBody.bind(this);
  }

  validRowNumber() {
    return Math.floor(Math.random() * Math.pow(16,4));
  }

  hoveredText(text) {
    this.setState({
      hoveredWord: text || this.props.defaultHoveredWord
    });
  }

  getRandBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  garbageString(length){
    let returnStr = '';
    let junk = this.props.garbledLetters;
    for (let i = 0; i < length; i++) {
      returnStr += junk.charAt(this.getRandBetween(0, junk.length - 1));
    }
    return returnStr;
  }

  numberOfRows() {
    return Math.max(this.props.minRows, this.props.words.length * 2);
  }

  numberOfColumns() {
    return Math.min(this.props.maxColumns, Math.floor(this.numberOfRows() / 4));
  }

  generateRow(lineLength, word) {
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
  }

  refreshBoard() {
    this.setState({
      columns: this.generateBody(),
    });
  }

  generateBody() {
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
  }

  render() {
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
        <GuessList guesses={this.props.guesses} hovered={this.state.hoveredWord}/>
      </div>
    );
  }
}

LikenessDisplay.defaultProps = {
  defaultHoveredWord: "_",
  garbledLetters: '(){}[]<>@?!+=-_|^;:%$#,`\'"',
  guesses: [],
  rowInterval: 8,
  base: 16,
  charPerRow: 16,
  minRows: 16,
  maxColumns: 2,
}

export default LikenessDisplay;
