import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import { expect } from 'chai';
import { mount, render } from 'enzyme';

import GuessList from '../assets/js/guess_list.jsx'

describe('<GuessList />', function() {
  describe('#guess-list', function() {
    it('renders two sub-lists', function() {
      const wrapper = mount(<GuessList />);
      expect(wrapper.find('#guess-list ul')).to.have.length(2);
    });
  });

  describe('#previous-guesses', function() {
    it('contains 0 items when no prop is passed', function() {
      const wrapper = render(<GuessList />);
      const previousGuesses = wrapper.find('#previous-guesses li');
      expect(previousGuesses).to.have.length(0);
    });

    it('contains 0 items when guesses is empty', function() {
      const wrapper = render(<GuessList guesses={[]} />);
      const previousGuesses = wrapper.find('#previous-guesses li');
      expect(previousGuesses).to.have.length(0);
    });

    it('contains one item per guess', function() {
      const guesses = [
        { word: 'abc', likeness: 1 },
        { word: 'def', likeness: 0 },
        { word: 'ghi', likeness: 3 },
      ];
      const wrapper = render(<GuessList guesses={guesses} />);
      const previousGuesses = wrapper.find('#previous-guesses li');
      expect(previousGuesses).to.have.length(3);
    });
  });

  describe('#new-entry-list', function() {
    context('when something is hovered', function() {
      it('renders the hovered item', function() {
        const wrapper = render(<GuessList hovered="test-thing" />);
        const entryList = wrapper.find('#new-entry-list');
        expect(entryList.find('li')).to.have.length(1);

        const item = entryList.find('#new-entry');
        expect(item.text()).to.equal('test-thing');
      });
    });

    context('when nothing is hovered', function() {
      it('is empty', function() {
        const wrapper = render(<GuessList />);
        const entryList = wrapper.find('#new-entry-list');
        expect(entryList.find('li')).to.have.length(1);

        const item = entryList.find('#new-entry');
        expect(item.text()).to.equal('');
      });
    });
  });
});
