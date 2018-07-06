import debounce from 'lodash.debounce';

import Step from './Step';

class Tutorial {
  constructor(steps, onChange) {
    this.state = {
      steps,
      activeIndex: 0,
    };
    this.onChange = onChange;
    this.start();
  }

  start = () => {
    this.step = new Step();
    this.showStep();
    this.bindStep();
  }

  bindStep = () => {
    this.step.ref.addEventListener('click', debounce(this.handleClick));
  }

  handleClick = ({ target }) => {
    const key = target.dataset.action;
    this[key] && this[key]();
  }

  showStep = () => {
    const { steps, activeIndex } = this.state;
    const step = steps[activeIndex];
    this.step.append(step);
  }

  setState = (state) => {
    this.state = {
      ...this.state,
      ...state,
    };
  }

  next = () => {
    const { steps, activeIndex } = this.state;
    const nextIndex = activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
    /*  eslint no-unused-expressions: ["error", { "allowShortCircuit": true }]  */
    this.onChange && this.onChange(
      steps[activeIndex],
      steps[nextIndex],
      this.showStep,
    );
  }
}

export default Tutorial;
