// Check if the dialog is already present
if (!document.getElementById('my-dialog')) {
    // Create the dialog container
const dialog = document.createElement('div');
dialog.id = 'my-dialog';
dialog.style.position = 'fixed';
dialog.style.top = '10px'; // Adjust as needed
dialog.style.right = '10px'; // Adjust as needed
dialog.style.width = '100px'; // Adjust as needed
dialog.style.height = '500px'; // Adjust as needed
dialog.style.zIndex = '10000'; // Ensure it's on top
dialog.style.backgroundColor = 'rgba(240,240,240,255)';
dialog.style.border = '1px solid black';
dialog.style.padding = '20px';
dialog.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
dialog.style.borderRadius = '5px';
dialog.style.cursor = "move";

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
      });
    } else {
      // If the dialog is already present, remove it
      const dialog = document.getElementById('my-dialog');
      dialog.innerHTML = "";
      dialog.parentNode.removeChild(dialog);
    }
  