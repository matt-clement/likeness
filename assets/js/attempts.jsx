import React from 'react';

const repeatedBlocks = (repeat) => (
  <span className="attempt-counter">
    {_.repeat("\u2588 ", repeat)}
  </span>
);

const Attempts = ({remaining}) => (
  <div>
    Attempts remaining: {repeatedBlocks(remaining)}
  </div>
);

export default Attempts;
