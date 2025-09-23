const texts = ["Aspiring Data Scientist", "Developer"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
const animatedText = document.getElementById("animated-text");

function type() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  animatedText.textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1000);
  } else {
    setTimeout(type, 150);
  }
}

type();
