const titleArea = document.getElementById("title-cont");
const aboutArea = document.getElementById("writing");
const footerArea = document.getElementById("footer");


function spark(event) {
  let i = document.createElement("i");
  i.style.left = event.pageX + "px";
  i.style.top = event.pageY + "px";
  i.style.scale = `${Math.random() * 2 + 1}`;
  i.style.setProperty("--random-color", getRandomColor());
  i.style.setProperty(`--x`, getRandomTransitionVal());
  i.style.setProperty(`--y`, getRandomTransitionVal());

  document.body.appendChild(i);

  setTimeout(() => {
    document.body.removeChild(i);
  }, 800);
}

function getRandomTransitionVal() {
  return `${Math.random() * 200 - 100}px`;
}

function getRandomColor() {
  const red = Math.floor(Math.random() + 250); // Random integer between 0 and 255
  const green = Math.floor(Math.random() + 120);
  const blue = Math.floor(Math.random() * 200);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}

titleArea.addEventListener("mousemove", spark);
footerArea.addEventListener("mousemove", spark);
aboutArea.addEventListener("mousemove", spark);
