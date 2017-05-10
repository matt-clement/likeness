import React from 'react';
import Attempts from './attempts.jsx';
import LikenessDisplay from './likeness_display.jsx';

var WordsApi = {
  // This was originally going to hit an external endpoint to grab a
  // dynamically generated list of words. It may do that someday, but
  // that's outside of the scope of this project.
  get: function(onSuccess) {
    onSuccess(['test', 'word', 'list', 'best', 'most', 'host', 'lose', 'ship']);
  }
}

class LikenessApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      garbledLetters: '(){}[],`\'"',
      winCount: 0,
      lossCount: 0,
      attempts: 4,
      maxAttempts: 4,
      guesses: [],
      repeatChar: '.',
    }

    this.onGuess = this.onGuess.bind(this);
    this.win = this.win.bind(this);
    this.bumpAttempts = this.bumpAttempts.bind(this);
    this.bumpWinCount = this.bumpWinCount.bind(this);
    this.selectWinningWord = this.selectWinningWord.bind(this);
    this.newGame = this.newGame.bind(this);
    this.newGameButton = this.newGameButton.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
    this.randomLetters = this.randomLetters.bind(this);
    this.textBlock = this.textBlock.bind(this);
    this.terminalTitle = this.terminalTitle.bind(this);
  }

  componentDidMount() {
    this.newGame();
  }

  likeness(winningWord, guessWord) {
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
  }

  onGuess(ev) {
    let currentGuess = ev.currentTarget.textContent;
    let guessTest = this.likeness(this.state.winner, currentGuess);
    this.setState({guesses: this.state.guesses.concat(guessTest)});
    if (guessTest.alike) {
      this.win();
    } else {
      this.bumpAttempts();
    }
  }

  win() {
    this.bumpWinCount();
    this.newGame();
  }

  bumpAttempts() {
    let attempts = this.state.attempts;
    if(attempts -= 1 > 0) {
      this.setState({
        attempts: attempts,
      });
    } else {
      this.setState((prevState, props) => ({
        lossCount: prevState.lossCount + 1,
        attempts: this.state.maxAttempts,
      }));
      this.newGame();
    }
    
  }
  
  bumpWinCount() {
    this.setState((prevState, props) => ({
      winCount: prevState.winCount + 1,
    }));
  }

  selectWinningWord(words) {
    return words[_.random(0,words.length - 1)];
  }

  newGame() {
    WordsApi.get((resp) => {this.resetBoard(resp)});
  }

  newGameButton() {
    return (
      <button
        type="button"
        onClick={this.newGame}>
        New Game!
      </button>
    );
  }

  resetBoard(words) {
    this.setState({
      words: words,
      winner: this.selectWinningWord(words),
      guesses: [],
      attempts: this.state.maxAttempts,
    }, this.refs.ld.refreshBoard)
  }

  randomLetters(letterSet, length) {
    let retStr = "";
    _.times(length, function() {
      retStr = retStr.concat(letterSet[_.random(0, letterSet.length - 1)]);
    });
    return retStr;
  }

  textBlock() {
    return (
      <div className="code">
        {this.randomLetters(this.state.garbledLetters, 500)}
      </div>
    );
  }

  terminalTitle() {
    let title = "BOBCO Industries Terminal (tm) | Wins: " + this.state.winCount + " | Losses: " + this.state.lossCount;
    let instruction = "Please enter password now.";
    return (
      <div>
        <p>{title}<br />{instruction}</p>
      </div>
    );
  }

  render() {
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
}

export default LikenessApp;
