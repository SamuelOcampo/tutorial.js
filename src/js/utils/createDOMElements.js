function createDOMElement({ className, title, type }) {
  const element = document.createElement(type);
  element.className = className;
  if (title) {
    element.innerText = title;
  }
  return element;
}

function stepEl() {
  return createDOMElement({
    className: 'step step--hidden',
    type: 'div',
  });
}

function stepContainer() {
  return createDOMElement({
    className: 'step__container',
    type: 'div',
  });
}

function stepContinue() {
  const el = createDOMElement({
    className: 'step__continue',
    title: 'Got it',
    type: 'button',
  });
  el.dataset.action = 'continue';
  return el;
}

function stepText() {
  return createDOMElement({
    className: 'step__text',
    type: 'p',
  });
}

function stepDismiss() {
  const el = createDOMElement({
    className: 'step__dismiss',
    title: 'Hide these tips',
    type: 'button',
  });
  el.dataset.action = 'dismiss';
  return el;
}

function stepArrow() {
  const el = createDOMElement({
    className: 'step__arrow',
    type: 'div',
  });
  el.setAttribute('x-arrow', '');
  return el;
}

function stepMask() {
  return createDOMElement({
    className: 'step-mask step-mask--hidden',
    type: 'div',
  });
}

export {
  createDOMElement,
  stepEl,
  stepContainer,
  stepContinue,
  stepText,
  stepDismiss,
  stepArrow,
  stepMask,
};
