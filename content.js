// Check if the dialog is already present
if (!document.getElementById('my-dialog')) {
    // Create the dialog container
  const dialog = document.createElement('div');
  dialog.id = 'my-dialog';
  dialog.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    width: 173px !important;
    height: 710px !important;
    z-index: 10000;
    background-color: rgba(240,240,240,255);
    border: 1px solid black;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    border-radius: 5px;
    cursor: move;
    font-size: 16px; /* Set the font size */
    color: black; /* Set the text color */
  `;

  let mouseDown = false;
  let offsetX, offsetY;

  dialog.addEventListener('mousedown', (e) => {
    mouseDown = true;
    offsetX = dialog.offsetLeft - e.clientX;
    offsetY = dialog.offsetTop - e.clientY;
  });

document.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if (mouseDown) {
    dialog.style.left = e.clientX + offsetX + 'px';
    dialog.style.top = e.clientY + offsetY + 'px';
  }
});

document.addEventListener('mouseup', () => {
  mouseDown = false;
});

// Load the dialog HTML
fetch(chrome.runtime.getURL('dialog.html'))
  .then(response => response.text())
  .then(data => {
    dialog.innerHTML = data;
    console.log(data);
    document.body.appendChild(dialog);

    // Set the src attributes of the images
    const images = dialog.querySelectorAll('img');
    images.forEach(img => {
      let filename = img.src.split('/').pop();
      img.src = chrome.runtime.getURL(filename);
    });

    // Load the dialog CSS if it's not already loaded
// Remove the old dialog CSS if it's loaded
    let oldLink = document.querySelector('link[href="' + chrome.runtime.getURL('dialog.css') + '"]');
    if (oldLink) {
      oldLink.parentNode.removeChild(oldLink);
    }

    // Load the new dialog CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('dialog.css');
    document.head.appendChild(link);

    // Remove the old dialog JS if it's loaded
    let oldScript = document.querySelector('script[src="' + chrome.runtime.getURL('dialog.js') + '"]');
    if (oldScript) {
      oldScript.parentNode.removeChild(oldScript);
    }

    // Load the new dialog JS
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('dialog.js');
    document.body.appendChild(script);

    //create a canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'my-canvas';
    //the canvas should cover the wlhole screen
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
    `;
    document.body.appendChild(canvas);
    //get the canvas context
    const ctx = canvas.getContext('2d');
    //set the canvas size to the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
      });
    } else {
      // If the dialog is already present, remove it
      const dialog = document.getElementById('my-dialog');
      dialog.innerHTML = "";
      dialog.parentNode.removeChild(dialog);
      document.getElementById('my-canvas').remove();
    }
  