import React from 'react';

class GuessList extends React.Component {
  constructor(props) {
    super(props);
    this.guessList = this.guessList.bind(this);
  }

  guessList() {
    var that = this;
    return (
      <ul>
        {_.map(this.props.guesses, function(guessData) {
            let guessWord = guessData.word;
            let likeness = guessData.likeness;
            let entry = likeness == guessWord.length ? "Entry accepted." : "Entry denied."
            let numberCorrect = likeness + "/" + guessWord.length + " correct."
            return <li key={guessWord}>{guessWord}<br />{entry}<br />{numberCorrect}</li>
          })
        }
        <li key="newEntry">{this.props.hovered}</li>
      </ul>
    );
  }

  render() {
    return (
      <div id="guess-list">
        {this.guessList()}
      </div>
    );
  }
}

export default GuessList;
