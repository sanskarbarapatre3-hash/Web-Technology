const display = document.getElementById("display");

// 1. Display par value add karna
function appendChar(char) {
  display.value += char;
}

// 2. Display clear karna
function clearDisplay() {
  display.value = "";
}

// 3. Calculation execute karna
function calculateResult() {
  try {
    if (display.value.trim() === "") return;
    // eval() expression evaluate karta hai
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

// 4. Keyboard Event Handling (keydown)
window.addEventListener("keydown", function (event) {
  const key = event.key;

  if ((key >= "0" && key <= "9") || ["+", "-", "*", "/"].includes(key)) {
    appendChar(key);
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key === "Escape") {
    clearDisplay();
  }
});