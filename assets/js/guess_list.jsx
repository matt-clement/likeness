import React from 'react';

class GuessList extends React.Component {
  constructor(props) {
    super(props);
    this.guessList = this.guessList.bind(this);
  }

  guessList() {
    return (
      <ul className="guess-list">
        {_.map(this.props.guesses, (guessData) => {
            let guessWord = guessData.word;
            let likeness = guessData.likeness;
            let entry = likeness == guessWord.length ? "Entry accepted." : "Entry denied."
            let numberCorrect = likeness + "/" + guessWord.length + " correct."
            return <li key={guessWord}>{guessWord}<br />{entry}<br />{numberCorrect}</li>
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <div id="guess-list">
        {this.guessList()}
        <ul>
          <li key="newEntry">{this.props.hovered}</li>
        </ul>
      </div>
    );
  }
}

export default GuessList;
