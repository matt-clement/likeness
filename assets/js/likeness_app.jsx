import React from 'react';
import Attempts from './attempts.jsx';
import LikenessDisplay from './likeness_display.jsx';

var WordsApi = {
  get: function(onSuccess) {
    onSuccess(['test', 'word', 'list', 'best', 'most', 'host', 'lose', 'ship']);
  }
}

var LikenessApp = React.createClass({
  getInitialState: function() {
    let garbledLetters = '(){}[],`\'"';
    let maxAttempts = 4;
    return {
      words: [],
      garbledLetters: garbledLetters,
      winCount: 0,
      lossCount: 0,
      attempts: maxAttempts,
      maxAttempts: maxAttempts,
      guesses: [],
      repeatChar: '.',
    }
  },

  componentDidMount: function() {
    this.newGame();
  },

  likeness: function(winningWord, guessWord) {
    let wordLength = winningWord.length;
    let likeLetters = 0;
    _.forIn(winningWord, function(letter, index){
      if (letter == guessWord[index]) {
        likeLetters++;
      }
    });
    let alike = likeLetters == wordLength;
    return {
      word: guessWord,
      alike: alike,
      likeness: likeLetters
    };
  },

  onGuess: function(ev) {
    let currentGuess = ev.currentTarget.textContent;
    let guessTest = this.likeness(this.state.winner, currentGuess);
    this.setState({guesses: this.state.guesses.concat(guessTest)});
    if (guessTest.alike) {
      this.win();
    } else {
      this.bumpAttempts();
    }
  },

  win: function() {
    this.setState({winCount: this.state.winCount + 1});
    this.newGame();
  },

  bumpAttempts: function() {
    let attempts = this.state.attempts;
    if(attempts -= 1 > 0) {
      this.setState({
        attempts: attempts,
      });
    } else {
      this.setState({
        lossCount: this.state.lossCount + 1,
        attempts: this.state.maxAttempts
      });
      this.newGame();
    }
    
  },
  
  selectWinningWord: function(words) {
    return words[_.random(0,words.length - 1)];
  },

  bumpCount: function() {
    this.setState((prevSate, props) => ({
      winCount: prevState.winCount + 1,
    }));
  },

  newGame: function() {
    var that = this;
    WordsApi.get(function(resp) {
      that.resetBoard(resp)
    });
  },

  resetBoard: function(words) {
    this.setState({
      words: words,
      winner: this.selectWinningWord(words),
      guesses: [],
      attempts: this.state.maxAttempts,
    })
    this.refs.ld.refreshBoard();
  },

  newGameButton: function() {
    return (
      <button
        type="button"
        onClick={this.newGame}>
        New Game!
      </button>
    );
  },

  randomLetters: function(letterSet, length) {
    let retStr = "";
    _.times(length, function() {
      retStr = retStr.concat(letterSet[_.random(0, letterSet.length - 1)]);
    });
    return retStr;
  },

  textBlock: function() {
    return (
      <div className="code">
        {this.randomLetters(this.state.garbledLetters, 500)}
      </div>
    );
  },

  terminalTitle: function() {
    let title = "BOBCO Industries Terminal (tm) | Wins: " + this.state.winCount + " | Losses: " + this.state.lossCount;
    let instruction = "Please enter password now.";
    return (
      <div>
        <p>{title}<br />{instruction}</p>
      </div>
    );
  },

  render: function() {
    return (
      <div id="app_container">
        <div className="code-container">
          {this.terminalTitle()}
          <Attempts remaining={this.state.attempts} />
          <LikenessDisplay ref="ld" onGuess={this.onGuess} words={this.state.words} guesses={this.state.guesses}/>
        </div>
        {this.newGameButton()}
      </div>
    );
  }
});

module.exports = LikenessApp;
