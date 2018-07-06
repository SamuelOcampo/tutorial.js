import PopperJs from 'popper.js';
import createStep from './utils/createStep';
import stepConf from './utils/stepConf';

class Step {
  constructor(conf) {
    this.ref = createStep();
    this.conf = {
      ...stepConf,
      ...conf,
    };
    this.popper = null;
    this.render();
  }

  render = () => {
    this.conf.appendTo.appendChild(this.ref);
  }

  append = (step) => {
    this.changeText(step.text);
    const options = {
      placement: 'auto',
    };
    this.popper = new PopperJs(step.element, this.ref, options);
  }

  changeText = (text) => {
    this.ref.text = text;
  }
}

export default Step;
