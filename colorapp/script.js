const colors = ["#ff6b6b", "#6bc1ff", "#6bff95", "#ffe16b", "#b76bff"];
let index = 0;

function changeColor() {
  document.body.style.backgroundColor = colors[index];
  index = (index + 1) % colors.length;
}
