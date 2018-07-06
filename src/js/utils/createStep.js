
function createStep() {
  const button = document.createElement('button');
  button.innerText = 'Next';
  button.style.position = 'absolute';
  button.style.bottom = '0';
  button.style.right = '0';
  button.dataset.action = 'next';

  const p = document.createElement('p');
  p.innerText = 'Hello';

  const div = document.createElement('div');
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.background = 'red';
  div.style.color = 'white';

  div.appendChild(p);
  div.appendChild(button);
  return div;
}

export default createStep;
