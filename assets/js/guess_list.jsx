import React from 'react';

var GuessList = React.createClass({
  propTypes: {
    guesses: React.PropTypes.array,
    hovered: React.PropTypes.string,
  },

  guessList: function(){
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
  },

  render: function() {
    return (
      <div id="guess-list">
        {this.guessList()}
      </div>
    );
  }
});

module.exports = GuessList;
