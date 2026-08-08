const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');

let currentInput = '';

function updateDisplay(value) {
  screen.value = value || '0';
}

function handleInput(key) {
  if (key === 'all-clear' || key === 'Escape') {
    currentInput = '';
  } else if (key === 'delete' || key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
  } else if (key === '=') {
    try {
      if (currentInput) {
        // Evaluate input safely
        let result = eval(currentInput.replace(/÷/g, '/').replace(/×/g, '*'));
        if (isNaN(result) || !isFinite(result)) {
          currentInput = 'Error';
        } else {
          currentInput = String(result);
        }
      }
    } catch (error) {
      currentInput = 'Error';
    }
  } else {
    if (currentInput === 'Error') {
      currentInput = '';
    }
    // Prevent starting with consecutive operators
    const lastChar = currentInput.slice(-1);
    const operators = ['+', '-', '*', '/', '%'];
    if (operators.includes(key) && operators.includes(lastChar)) {
      currentInput = currentInput.slice(0, -1) + key;
    } else {
      currentInput += key;
    }
  }
  updateDisplay(currentInput);
}

// Event listener for button clicks
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) return;
  handleInput(target.value);
});

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    handleInput(key);
  } else if (key === 'Enter') {
    handleInput('=');
  } else if (key === 'Backspace') {
    handleInput('Backspace');
  } else if (key === 'Escape') {
    handleInput('Escape');
  }
});

updateDisplay(currentInput);
