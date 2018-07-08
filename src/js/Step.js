import PopperJs from 'popper.js';
import {
  stepContainer,
  stepContinue,
  stepDismiss,
  stepText,
  stepEl,
  stepArrow,
} from './utils/createDOMElements';
import stepConf from './utils/stepConf';

const render = child => parent => parent.appendChild(child);

class Step {
  constructor(conf) {
    this.refs = {};
    this.popper = null;
    this.conf = {
      ...stepConf,
      ...conf,
    };
    this.render();
  }

  render = () => {
    const { appendTo } = this.conf;
    const el = stepEl();
    const container = render(stepContainer())(el);
    this.refs = {
      el,
      container,
      text: render(stepText())(container),
      dismiss: render(stepDismiss())(container),
      continue: render(stepContinue())(container),
      arrow: render(stepArrow())(el),
    };
    render(el)(appendTo);
  }

  clean = () => {
    this.popper.destroy();
    this.popper = null;
  }

  updatePopper = (refence, popper, options) => {
    if (this.popper != null) this.clean();
    this.popper = new PopperJs(refence, popper, options);
  }

  append = (step) => {
    const { el, arrow } = this.refs;
    this.updateTextRef('text', step.text, step.plain);
    this.updateTextRef('dismiss', step.dismiss, step.plain);
    this.updateTextRef('continue', step.continue, step.plain);

    this.updatePopper(step.element, el, {
      placement: step.placement || 'auto',
      arrow: {
        element: arrow,
      },
    });
  }

  updateTextRef = (key, text, plain = true) => {
    const ref = key && this.refs[key];
    if (!text || !ref) {
      return;
    }
    if (plain) {
      ref.innerText = text;
    } else {
      ref.innerHTML = text;
    }
  }
}

export default Step;
