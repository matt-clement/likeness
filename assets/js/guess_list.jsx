import React from 'react';
import _ from 'lodash';

const previousGuesses = (guesses) => {
  return (
    <ul id="previous-guesses" className="guess-list">
      {_.map(guesses, (guessData) => {
        let guessWord = guessData.word;
        let likeness = guessData.likeness;
        let entry = likeness == guessWord.length ? "Entry accepted." : "Entry denied."
        let numberCorrect = likeness + "/" + guessWord.length + " correct."
        return <li key={guessWord}>{guessWord}<br />{entry}<br />{numberCorrect}</li>
      })}
    </ul>
  );
};

class GuessList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="guess-list">
        {previousGuesses(this.props.guesses)}
        <ul id="new-entry-list">
          <li id="new-entry" key="new-entry">{this.props.hovered}</li>
        </ul>
      </div>
    );
  }
}

export default GuessList;
