// Check if the dialog is already present
if (!document.getElementById('my-dialog')) {
    // Create the dialog container
    const dialog = document.createElement('div');
    dialog.id = 'my-dialog';
    dialog.style.position = 'fixed';
    dialog.style.top = '50%';
    dialog.style.left = '50%';
    dialog.style.transform = 'translate(-50%, -50%)';
    dialog.style.zIndex = '10000'; // Ensure it's on top
    dialog.style.backgroundColor = 'white';
    dialog.style.border = '1px solid black';
    dialog.style.padding = '20px';
    dialog.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    
    // Load the dialog HTML
    fetch(chrome.runtime.getURL('dialog.html'))
      .then(response => response.text())
      .then(data => {
        dialog.innerHTML = data;
        document.body.appendChild(dialog);
  
        // Load the dialog CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = chrome.runtime.getURL('dialog.css');
        document.head.appendChild(link);
  
        // Load the dialog JS
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('dialog.js');
        document.body.appendChild(script);
      });
  } else {
    // If the dialog is already present, toggle its visibility
    const dialog = document.getElementById('my-dialog');
    dialog.style.display = dialog.style.display === 'none' ? 'block' : 'none';
  }
  