import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import CountdownCircle from './../../src/components/CountdownCircle';

describe('Component: CountdownCircle module', () => {

  it('Does not render if count is not provided or is not a number', () => {
    const wrapper = shallow(<CountdownCircle count="s" />);
    expect(wrapper.children().length).to.equal(0);
  });

  it('Renders all the required nodes', () => {
    const wrapper = shallow(<CountdownCircle count="10" />);
    expect(wrapper.children().length).to.equal(2); // Two child elements
    expect(wrapper.find('div.countdown__number').length).to.equal(1); // One be div for count number
    expect(wrapper.find('svg').length).to.equal(1); // Other for svg
  });

  it('Shows the count number', () => {
    const wrapper = shallow(<CountdownCircle count="10" />);
    expect(isNaN(wrapper.find('div.countdown__number').text())).to.equal(false);
    expect(wrapper.find('div.countdown__number').text()).to.equal('9');
  });

  it('Should invoke the callback passed when the countdown has ended', () => {
    const testCountdownCb = sinon.spy();
    const wrapper = shallow(<CountdownCircle count="10" countdownCb={testCountdownCb} />);
    const setState = sinon.stub(CountdownCircle.prototype, 'setState').callsFake((newState, cb) => cb());
    wrapper.instance().updateCountdown(0);
    expect(testCountdownCb).to.have.property('callCount', 1);
  });
});