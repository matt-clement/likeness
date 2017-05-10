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
      winCount: 0,
      lossCount: 0,
      attempts: this.props.maxAttempts,
      guesses: [],
    }

    this.onGuess = this.onGuess.bind(this);
    this.win = this.win.bind(this);
    this.bumpAttempts = this.bumpAttempts.bind(this);
    this.bumpWinCount = this.bumpWinCount.bind(this);
    this.bumpLossCount = this.bumpLossCount.bind(this);
    this.selectWinningWord = this.selectWinningWord.bind(this);
    this.newGame = this.newGame.bind(this);
    this.newGameButton = this.newGameButton.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
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
    this.setState((prevState, props) => ({
      guesses: prevState.guesses.concat(guessTest)
    }));
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

  lose() {
    this.bumpLossCount();
    this.newGame();
  }

  bumpAttempts() {
    if(this.state.attempts > 1) {
      this.setState((prevState, props) => ({
        attempts: prevState.attempts - 1
      }));
    } else {
      this.lose();
      this.newGame();
    }
    
  }
  
  bumpWinCount() {
    this.setState((prevState, props) => ({
      winCount: prevState.winCount + 1,
    }));
  }

  bumpLossCount() {
    this.setState((prevState, props) => ({
      lossCount: prevState.lossCount + 1,
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
        className="control"
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
      attempts: this.props.maxAttempts,
    }, this.refs.ld.refreshBoard)
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
      <div id="app-container">
        <div className="code-container">
          {this.terminalTitle()}
          <Attempts remaining={this.state.attempts} />
          <LikenessDisplay ref="ld" onGuess={this.onGuess} words={this.state.words} guesses={this.state.guesses}/>
        </div>
        <div className="app-control">
          {this.newGameButton()}
        </div>
      </div>
    );
  }
}

LikenessApp.defaultProps = {
  maxAttempts: 4,
}
export default LikenessApp;
