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

// Function to create the overlay canvas and handle drawing
function activatePencilTool() {
  // Check if the overlay canvas already exists
  if (!document.getElementById('unique-overlayCanvas')) {
    // Create the overlay canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'unique-overlayCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'auto'; // Ensure the canvas captures mouse events
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas, ctx);

    let painting = false;

    function startPosition(e) {
      painting = true;
      draw(e);
    }

    function endPosition() {
      painting = false;
      ctx.beginPath();
    }

    function draw(e) {
      if (!painting) return;

      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'black'; // Change color if needed

      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    // Add cleanup logic when exiting the panel or switching tools
    document.getElementById('unique-exit').addEventListener('click', () => {
      const dialog = document.getElementById('unique-dialog');
      dialog.innerHTML = "";
      dialog.parentNode.removeChild(dialog);
      document.body.removeChild(canvas);
    });

    // Resize canvas when window is resized
    window.addEventListener('resize', () => resizeCanvas(canvas, ctx));
  }
}

// Helper function to resize canvas
function resizeCanvas(canvas, ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
}

// Add event listener to the pen button
document.querySelector('button img[alt="Pencil"]').parentElement.addEventListener('click', activatePencilTool);

//handling button click
function handleOnClickUnique(clickedButton) {
  const buttons = document.querySelectorAll('.my-unique-button');
  console.log(buttons);

  // Remove 'selected' class from all buttons
  buttons.forEach(button => {
      button.classList.remove('selected');
  });

  // Add 'selected' class to the clicked button
  clickedButton.classList.add('selected');
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
