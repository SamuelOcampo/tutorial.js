import PopperJs from 'popper.js';
import {
  stepContainer,
  stepContinue,
  stepDismiss,
  stepText,
  stepEl,
  stepArrow,
  stepMask,
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
      mask: render(stepMask())(document.getElementsByTagName('body')[0]),
      text: render(stepText())(container),
      dismiss: render(stepDismiss())(container),
      continue: render(stepContinue())(container),
      arrow: render(stepArrow())(el),
    };
    render(el)(appendTo);
  }

  clean = () => {
    const references = this.refs;
    Object.keys(references).forEach((ref) => {
      const el = references[ref];
      el.remove();
    });
    this.popper.destroy();
    this.popper = null;
  }

  updatePopper = (refence, popper, options) => {
    this.popper = new PopperJs(refence, popper, options);
  }

  mask = (action) => {
    const { mask } = this.refs;
    let className = '';
    switch (action) {
      case 'show': {
        className = 'step-mask';
        break;
      }
      case 'hide': {
        className = 'step-mask step-mask--hidden';
        break;
      }
      default:
        break;
    }
    if (className) {
      mask.className = className;
    }
  }

  append = (step) => {
    const { el, arrow } = this.refs;
    this.updateTextRef('text', step.text, step.plain);
    this.updateTextRef('dismiss', step.dismiss, step.plain);
    this.updateTextRef('continue', step.continue, step.plain);

    this.mask('show');
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
