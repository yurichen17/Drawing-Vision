const clearButton = document.querySelector('.clear');
const stroke_weight = document.querySelector('.stroke-weight');
const color_picker = document.querySelector('.color-picker');

const canvas = document.querySelector('canvas');
canvas.width=window.innerWidth-60;
canvas.height=600;
const ctx = canvas.getContext('2d');
let isDrawing = false;

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stop);

clearButton.addEventListener('click', clearCanvas);

function start (e) {
  isDrawing = true;
  draw(e);
}

function draw ({clientX: x, clientY: y}) {
  if (!isDrawing) return;
  ctx.lineWidth = stroke_weight.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = color_picker.value;

  ctx.lineTo(x-canvas.offsetLeft, y-canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x-canvas.offsetLeft, y-canvas.offsetTop);
}

function stop () {
  isDrawing = false;
  ctx.beginPath();
}

function clearCanvas () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/*
window.addEventListener('resize', resizeCanvas);
function resizeCanvas () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
*/
function download(){
  var can = document.getElementById("can");
  var img = can.toDataURL("image/png")
  var a=new Image();
  a.src=img;
  mobilenet.load().then(model => {
    // Classify the image.
    model.classify(a).then(predictions => {
      console.log('Predictions: ');
      console.log(predictions);
      var toPrint=document.getElementById("pred");
      //str=JSON.stringify(predictions)
      toPrint.textContent=predictions[0].className;
      var percent=document.getElementById("per");
      percent.textContent="with "+ predictions[0].probability +"% probability";
    });
  });
}