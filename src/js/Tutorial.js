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
    const { el } = this.step && this.step.refs;
    if (el) {
      el.addEventListener('click', debounce(this.handleClick));
    }
  }

  handleClick = ({ target }) => {
    const key = target.dataset.action;
    if (this[key]) {
      this[key]();
    }
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

  dismiss = () => {
    this.finish();
  }

  finish = () => {
    const { steps, activeIndex } = this.state;
    this.step.clean();
    delete this.step;
    this.onChange(
      steps[activeIndex],
      null,
      false,
    );
  }

  continue = () => {
    const { steps, activeIndex } = this.state;
    const nextIndex = activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
    if (this.onChange) {
      this.onChange(
        steps[activeIndex],
        steps[nextIndex],
        steps[nextIndex] ? this.showStep : this.finish,
      );
    } else if (steps[nextIndex]) {
      this.showStep();
    } else {
      this.finish();
    }
  }
}

export default Tutorial;
