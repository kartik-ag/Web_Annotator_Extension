function setupSliders() {
  let sliders = document.querySelectorAll('.unique-slider-input');
  let values = document.querySelectorAll('.unique-value');
  sliders.forEach((slider, index) => {
    slider.addEventListener('input', (e) => {
      values[index].textContent = e.target.value + '%';
    });
  });
}

setupSliders();
 


//handling button click
function handleOnClickUnique(clickedButton) {
  const buttons = document.querySelectorAll('.my-unique-button');
  const isSelected = clickedButton.classList.contains('selected');
  const isArrow = clickedButton.classList.contains('my-arrow');
  const isLine = clickedButton.classList.contains('my-line');
  buttons.forEach(button => {
      button.classList.remove('selected');
  });
  if (!isSelected) {
      clickedButton.classList.add('selected');
  }
  else{
    clickedButton.classList.remove('selected');
  }
  if (isArrow && !isSelected) {
    document.getElementById('my-canvas').style.display = 'none';
  }
  if (isArrow && isSelected) {
    document.getElementById('my-canvas').style.display = 'block';
  }
  if (isLine && !isSelected) {
    activateLineTool();
  }
  if (isLine && isSelected) {
    deactivateLineTool();
  }
  if (!isLine){
    deactivateLineTool();
  }
}



document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.my-unique-button');

  // Add click event listener to each button
  buttons.forEach(button => {
      button.addEventListener('click', function() {
          handleOnClickUnique(button);
      });
  });
});


//line drawing
if (typeof mousedownHandler === 'undefined') {
  var mousedownHandler;
}

if (typeof mouseupHandler === 'undefined') {
  var mouseupHandler;
}
function activateLineTool() {
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');
  let startX;
  let startY;
  let isDrawing = false;

  mousedownHandler = (e) => {
    isDrawing = true;
    startX = e.clientX;
    startY = e.clientY;
    canvas.style.cursor = 'crosshair';
  };

  mouseupHandler = (e) => {
    if (isDrawing) {
      drawLine(ctx, startX, startY, e.clientX, e.clientY);
      isDrawing = false;
      canvas.style.cursor = 'default';
    }
  };
  canvas.addEventListener('mousedown', mousedownHandler);
  canvas.addEventListener('mouseup', mouseupHandler);
  
}

function deactivateLineTool() {
  const canvas = document.getElementById('my-canvas');
  //remove all event listeners
  canvas.removeEventListener('mousedown', mousedownHandler);
  canvas.removeEventListener('mouseup', mouseupHandler);
  console.log('deactivated');
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

