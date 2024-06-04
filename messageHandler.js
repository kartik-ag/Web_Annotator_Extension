chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.screenshotUrl) {
      const img = document.createElement('img');
      img.src = request.screenshotUrl;
      document.body.appendChild(img); // Append the image to the body or handle it as needed
    }
  });
  