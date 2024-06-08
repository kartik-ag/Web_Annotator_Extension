setTimeout(() => {
  document.getElementById('unique-exit').addEventListener('click', function() {
    escape();
  });
  
  document.getElementById('unique-screenshot').addEventListener('click', function() {
    screenshooter();
  });
  
  document.getElementById('unique-delete').addEventListener('click', function() {
    deleteall();
  });
}, 1000);



if(typeof actions == 'undefined'){
  var actions = [];
}

// Create a global variable to store the slider value
if (typeof sliderValue === 'undefined') {
  var sliderValue;
}
function setupSlider() {
  let slider = document.querySelector('.unique-slider-input');
  let valueElement = document.querySelector('.unique-value');

  // Update the global variable with the initial value of the slider
  sliderValue = slider.value;
  sliderValue = sliderValue/10;
  slider.addEventListener('input', (e) => {
    valueElement.textContent = e.target.value + '%';

    // Update the global variable with the new value of the slider
    sliderValue = e.target.value/10;
    console.log(sliderValue);
  });
}


setupSlider();
  setupButtonHandlers();
setupColorInput();

setupTextSizeInput();


// Call the function to setup the slider
// setupSlider();


// Create a global variable to store the color
if (typeof colorValue === 'undefined') {
  var colorValue;
}

function setupColorInput() {
  let colorInput = document.querySelector('.unique-color-picker-input');

  // Update the global variable with the initial value of the color input
  colorValue = colorInput.value;

  colorInput.addEventListener('input', (e) => {
    // Update the global variable with the new value of the color input
    colorValue = e.target.value;
    console.log(colorValue);
  });
}

// Call the function to setup the color input
// setupColorInput();

// Create a global variable to store the text size
if (typeof textSize === 'undefined') {
  var textSize;
}

if (typeof Texts == 'undefined') {
  var Texts = [];
}

function setupTextSizeInput() {
  let textSizeInput = document.getElementById('text-size-input');
  console.log(textSizeInput);
  // Update the global variable with the initial value of the text size input
  textSize = textSizeInput.value;

  textSizeInput.addEventListener('change', (e) => {
    // Update the global variable with the new value of the text size input
    textSize = e.target.value;
    console.log(textSize);
  });
}

// Call the function to setup the text size input
// setupTextSizeInput();

function setupButtonHandlers() {
  const buttons = document.querySelectorAll('.my-unique-button');

  // Add click event listener to each button
  buttons.forEach((button, index) => {
    button.setAttribute('data-unique-id', index);
    button.addEventListener('click', function() {
      console.log('Button clicked', button, 'ID:', index);
      handleOnClickUnique(button);
    });
  });
}

// setupButtonHandlers();



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
  const isHighlight = clickedButton.classList.contains('my-highlight');

  buttons.forEach(button => {
    button.classList.remove('selected');
  });

  if (!isSelected) {
    clickedButton.classList.add('selected');
  } else {
    clickedButton.classList.remove('selected');
  }

  if (isArrow && !isSelected) {
    document.getElementById('my-canvas').style.visibility = 'hidden';
    document.body.style.overflow = 'visible';
  }
  if ((isArrow && isSelected) || (!isArrow)) {
    document.getElementById('my-canvas').style.visibility = 'visible';
    document.body.style.overflow = 'hidden';
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
  if (isText && !isSelected) {
    activateTextTool();
  }
  if ((isText && isSelected) || (!isText)) {
    deactivateTextTool();
  }
  if (isHighlight && !isSelected) {
    activateHighlightTool();
    document.getElementById('my-canvas').style.visibility = 'hidden';
    document.body.style.overflow = 'visible';
  }
  if ((isHighlight && isSelected) || (!isHighlight)) {
    deactivateHighlightTool();
  }
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
  ctx.linewidth = sliderValue;
  ctx.strokeStyle = colorValue;
  mousedownHandler = (e) => {
    isDrawing = true;
    startX = e.clientX;
    startY = e.clientY;
    canvas.style.cursor = 'crosshair';
  };

  mouseupHandler = (e) => {
    if (isDrawing) {
      ctx.lineWidth = sliderValue;
      ctx.strokeStyle = colorValue;
      actions.push({
        type: 'line',
        startX: startX,
        startY: startY,
        endX: e.clientX,
        endY: e.clientY,
        color: ctx.strokeStyle,
        lineWidth: ctx.lineWidth
      });
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
  ctx.linewidth = sliderValue;
  ctx.strokeStyle = colorValue;
  PendownHandler = (e) => {
    isDrawing = true;
    startX = e.clientX;
    startY = e.clientY;
  };

  PenmoveHandler = (e) => {
    if (isDrawing) {
      ctx.lineWidth = sliderValue;
      ctx.strokeStyle = colorValue;
      drawPen(ctx, startX, startY, e.clientX, e.clientY);
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

  
  console.log(actions);
}
function drawPen(ctx, x1, y1, x2, y2) {
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
    startX = e.clientX;
    startY = e.clientY;
    ctx.globalCompositeOperation = 'destination-out';
  };
  
  erasemoveHandler = (e) => {
    if (isDrawing) {
      ctx.lineWidth = sliderValue*5;
      drawErase(ctx, startX, startY, e.clientX, e.clientY);
      startX = e.clientX;
      startY = e.clientY;
    }
  };

  eraseupHandler = (e) => {
    if (isDrawing) {
      isDrawing = false;
      ctx.globalCompositeOperation = 'source-over';
    }
  };
  canvas.addEventListener('mousedown', erasedownHandler);
  canvas.addEventListener('mouseup', eraseupHandler);
  canvas.addEventListener('mousemove', erasemoveHandler);
}
function drawErase(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
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
      ctx.lineWidth = sliderValue;
      ctx.strokeStyle = colorValue;
      actions.push({
        type: 'rect',
        startX: startX,
        startY: startY,
        endX: e.clientX,
        endY: e.clientY,
        color: ctx.strokeStyle,
        lineWidth: ctx.lineWidth
      });
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

  
  console.log(actions);
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
  const rect = canvas.getBoundingClientRect();
  let startX;
  let startY;
  let isDrawing = false;

  circledownHandler = (e) => {
    isDrawing = true;
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
  };

  circlemoveHandler = (e) => {
    if (isDrawing) {
      // drawCircle(canvas,ctx, startX, startY, e.clientX, e.clientY);
    }
  };

  circleupHandler = (e) => {
    if (isDrawing) {
      ctx.lineWidth = sliderValue;
      ctx.strokeStyle = colorValue;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      actions.push({
        type: 'circle',
        startX: startX,
        startY: startY,
        endX: x,
        endY: y,
        color: ctx.strokeStyle,
        lineWidth: ctx.lineWidth
      });
      drawCircle(canvas,ctx, startX, startY, x, y);
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
  let radius = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
  ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
  ctx.stroke();

  
  console.log(actions);
}

if (typeof handleTextClick === 'undefined') {
  var handleTextClick;
}


function activateTextTool() {
  handleTextClick = (e) => {
      console.log('Text clicked', e);
      const text = document.createElement('div');
      text.style.position = 'absolute';
      text.style.top = e.clientY + 'px';
      text.style.left = e.clientX + 'px';
      text.style.color = colorValue;
      text.style.fontSize = textSize + 'px';
      //take input from user using a prompt
      var content = prompt('Enter your notes here:');
      if (content == null){
          return;
      }
      text.textContent = content;
      document.body.appendChild(text);
      actions.push({
        type: 'text',
        content: content,
        x: e.clientX,
        y: e.clientY,
        color: colorValue,
        size: textSize
      });
      Texts.push(text);
      console.log(Texts);
      console.log('Text added');
  }
  document.body.addEventListener('dblclick', handleTextClick);
}

function deactivateTextTool() {
  document.body.removeEventListener('dblclick', handleTextClick);
}




if (typeof highlightupHandler === 'undefined') {
  var highlightupHandler;
}
if (typeof highlightdownHandler === 'undefined') {
  var highlightdownHandler;
}
if (typeof highlightmoveHandler === 'undefined') {
  var highlightmoveHandler;
}
if (typeof ranges === 'undefined') {
  var ranges = [];
}

function activateHighlightTool() {
  const canvas = document.getElementById('my-canvas');
  canvas.style.display = 'none';
  let isMouseDown = false;
  let selectedText = '';
  highlightdownHandler = (e) => {
    isMouseDown = true;
  };

  highlightmoveHandler = (e) => {
    if (isMouseDown) {
      if (window.getSelection) {
        selectedText = window.getSelection().toString();
      } else if (document.selection && document.selection.type !== 'Control') {
        selectedText = document.selection.createRange().text;
      }
    }
  };

  highlightupHandler = (e) => {
    isMouseDown = false;
    if (selectedText) {
      let selection = window.getSelection();
      if (selection.rangeCount) {
        let range = selection.getRangeAt(0);
        // Check if the selection spans across multiple paragraphs
        if (range.startContainer.nodeType === Node.TEXT_NODE && 
          range.endContainer.nodeType === Node.TEXT_NODE &&
          range.startContainer.parentElement !== range.endContainer.parentElement) {
        alert('Please select text within the same paragraph');
        return;
      }
        let span = document.createElement('span');
        span.style.backgroundColor = colorValue;
        try {
          let content = range.extractContents();
          span.appendChild(content);
          range.insertNode(span);
          ranges.push({range: range, span: span}); // Store the range and the created span
        } catch (e) {
          console.error('Could not surround range: ' + e.message);
          alert('Please select text only and within the same paragraph');
        }
      }
    }
  };
  document.body.addEventListener('mousedown', highlightdownHandler);
  document.body.addEventListener('mouseup', highlightupHandler);
  document.body.addEventListener('mousemove', highlightmoveHandler);
}


function deactivateHighlightTool() {
  const canvas = document.getElementById('my-canvas');
  canvas.style.display = 'block';
  document.body.removeEventListener('mousedown', highlightdownHandler);
  document.body.removeEventListener('mouseup', highlightupHandler);
  document.body.removeEventListener('mousemove', highlightmoveHandler);
}

function screenshooter(){
  //use html2canvass to take a screenshot
  html2canvas(document.body).then(function(canvas) {
    var img = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    a.href = img;
    a.download = 'screenshot.png';
    a.click();
  });
}

function deleteall(){
  //delete all the elements on the screen
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  removeAllHighlights();
  actions = [];
}

function removeAllHighlights() {
  for (let {range, span} of ranges) {
    while (span.firstChild) {
      range.insertNode(span.firstChild); // Moves the content out of the span
    }
    span.parentNode.removeChild(span); // Removes the empty span
  }
  ranges = []; // Clear the ranges array
}


function escape(){
  const dialog = document.getElementById('my-dialog');
      dialog.remove();
      document.getElementById('my-canvas').remove();
      document.body.style.overflow = 'auto';
}