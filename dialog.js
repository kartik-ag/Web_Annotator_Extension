document.addEventListener('DOMContentLoaded', function() {
  setupSliders();
  setupButtonHandlers();
});

function setupSliders() {
  let sliders = document.querySelectorAll('.unique-slider-input');
  sliders.forEach((slider) => {
    slider.addEventListener('input', (e) => {
      let value = slider.parentElement.querySelector('.unique-value');
      value.textContent = e.target.value + '%';
    });
  });
}

function setupButtonHandlers() {
  const buttons = document.querySelectorAll('.my-unique-button');

  // Add click event listener to each button
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      handleOnClickUnique(button);
    });
  });
}

function handleOnClickUnique(clickedButton) {
  const buttons = document.querySelectorAll('.my-unique-button');
  const isSelected = clickedButton.classList.contains('selected');
  const isArrow = clickedButton.classList.contains('my-arrow');
  const isLine = clickedButton.classList.contains('my-line');
  const isPen = clickedButton.classList.contains('my-pen');
  const isErase = clickedButton.classList.contains('my-erase');
  const isRect = clickedButton.classList.contains('my-rect');
  const isCircle = clickedButton.classList.contains('my-circle');
  const isText = clickedButton.classList.contains('my-text');
  const isPolygon = clickedButton.classList.contains('my-polygon');
  buttons.forEach(button => {
    button.classList.remove('selected');
  });
  if (!isSelected) {
    clickedButton.classList.add('selected');
  } else {
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
  if (!isLine) {
    deactivateLineTool();
  }
  if (isPen && !isSelected) {
    activatePenTool();
  }
  if ((isPen && isSelected) || (!isPen)) {
    deactivatePenTool();
  }
  if (isErase && !isSelected) {
    activateEraseTool();
  }
  if ((isErase && isSelected) || (!isErase)) {
    deactivateEraseTool();
  }
  if (isRect && !isSelected) {
    activateRectTool();
  }
  if ((isRect && isSelected) || (!isRect)) {
    deactivateRectTool();
  }
  if (isCircle && !isSelected) {
    activateCircleTool();
  }
  if (isCircle && isSelected || (!isCircle)) {
    deactivateCircleTool();
  }
  // if (isText && !isSelected) {
  //   activateTextTool();
  // }
  // if (isText && isSelected) {
  //   deactivateTextTool();
  // }
  // if (isPolygon && !isSelected) {
  //   activatePolygonTool();
  // }
  // if (isPolygon && isSelected || (!isPolygon)) {
  //   deactivatePolygonTool();
  // }
}

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
  canvas.removeEventListener('mousedown', mousedownHandler);
  canvas.removeEventListener('mouseup', mouseupHandler);
}

if (typeof PendownHandler === 'undefined') {
  var PendownHandler;
}
if (typeof PenmoveHandler === 'undefined') {
  var PenmoveHandler;
}
if (typeof PenupHandler === 'undefined') {
  var PenupHandler;
}
function activatePenTool() {
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');
  let startX;
  let startY;
  let isDrawing = false;

  PendownHandler = (e) => {
    isDrawing = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  PenmoveHandler = (e) => {
    if (isDrawing) {
      drawLine(ctx, startX, startY, e.clientX, e.clientY);
      startX = e.clientX;
      startY = e.clientY;
    }
  };

  PenupHandler = (e) => {
    if (isDrawing) {
      isDrawing = false;
    }
  };
  canvas.addEventListener('mousedown', PendownHandler);
  canvas.addEventListener('mouseup', PenupHandler);
  canvas.addEventListener('mousemove', PenmoveHandler);
}

function deactivatePenTool() {
  const canvas = document.getElementById('my-canvas');
  canvas.removeEventListener('mousedown', PendownHandler);
  canvas.removeEventListener('mouseup', PenupHandler);
  canvas.removeEventListener('mousemove', PenmoveHandler);
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

if (typeof eraseupHandler === 'undefined') {
  var eraseupHandler;
}
if (typeof erasedownHandler === 'undefined') {
  var erasedownHandler;
}
if (typeof erasemoveHandler === 'undefined') {
  var erasemoveHandler;
}
function activateEraseTool() {
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');
  let startX;
  let startY;
  let isDrawing = false;
  
  erasedownHandler = (e) => {
    isDrawing = true;
    ctx.lineWidth = 20;
    startX = e.clientX;
    startY = e.clientY;
    ctx.globalCompositeOperation = 'destination-out';
  };

  erasemoveHandler = (e) => {
    if (isDrawing) {
      drawLine(ctx, startX, startY, e.clientX, e.clientY);
      startX = e.clientX;
      startY = e.clientY;
    }
  };

  eraseupHandler = (e) => {
    if (isDrawing) {
      isDrawing = false;
      ctx.lineWidth = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
  };
  canvas.addEventListener('mousedown', erasedownHandler);
  canvas.addEventListener('mouseup', eraseupHandler);
  canvas.addEventListener('mousemove', erasemoveHandler);
}

function deactivateEraseTool() {
  const canvas = document.getElementById('my-canvas');
  canvas.removeEventListener('mousedown', erasedownHandler);
  canvas.removeEventListener('mouseup', eraseupHandler);
  canvas.removeEventListener('mousemove', erasemoveHandler);
}

if (typeof rectdownHandler === 'undefined') {
  var rectdownHandler;
}
if (typeof rectmoveHandler === 'undefined') {
  var rectmoveHandler;
}
if (typeof rectupHandler === 'undefined') {
  var rectupHandler;
}

function activateRectTool() {
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');
  let startX;
  let startY;
  let isDrawing = false;

  rectdownHandler = (e) => {
    isDrawing = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  rectmoveHandler = (e) => {
    if (isDrawing) {
      // drawRect(ctx, startX, startY, e.clientX, e.clientY);
    }
  };

  rectupHandler = (e) => {
    if (isDrawing) {
      drawRect(ctx, startX, startY, e.clientX, e.clientY);
      isDrawing = false;
    }
  };
  canvas.addEventListener('mousedown', rectdownHandler);
  canvas.addEventListener('mouseup', rectupHandler);
  canvas.addEventListener('mousemove', rectmoveHandler);
}

function deactivateRectTool() {
  const canvas = document.getElementById('my-canvas');
  canvas.removeEventListener('mousedown', rectdownHandler);
  canvas.removeEventListener('mouseup', rectupHandler);
  canvas.removeEventListener('mousemove', rectmoveHandler);
  // console.log('deactivateRectTool');
}

function drawRect(ctx, x1, y1, x2, y2) {
  const canvas = document.getElementById('my-canvas');
  ctx.beginPath();
  ctx.rect(x1, y1, x2 - x1, y2 - y1);
  ctx.stroke();
}

if (typeof circledownHandler === 'undefined') {
  var circledownHandler;
}
if (typeof circlemoveHandler === 'undefined') {
  var circlemoveHandler;
}
if (typeof circleupHandler === 'undefined') {
  var circleupHandler;
}

function activateCircleTool() {
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');
  let startX;
  let startY;
  let isDrawing = false;

  circledownHandler = (e) => {
    isDrawing = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  circlemoveHandler = (e) => {
    if (isDrawing) {
      // drawCircle(canvas,ctx, startX, startY, e.clientX, e.clientY);
    }
  };

  circleupHandler = (e) => {
    if (isDrawing) {
      drawCircle(canvas,ctx, startX, startY, e.clientX, e.clientY);
      isDrawing = false;
    }
  };
  canvas.addEventListener('mousedown', circledownHandler);
  canvas.addEventListener('mouseup', circleupHandler);
  canvas.addEventListener('mousemove', circlemoveHandler);
}

function deactivateCircleTool() {
  const canvas = document.getElementById('my-canvas');
  canvas.removeEventListener('mousedown', circledownHandler);
  canvas.removeEventListener('mouseup', circleupHandler);
  canvas.removeEventListener('mousemove', circlemoveHandler);
  // console.log('deactivateCircleTool');
}

function drawCircle(canvas,ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  let radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
  ctx.stroke();
}


