document.getElementById('close-button').addEventListener('click', () => {
  const dialog = document.getElementById('my-dialog');
  dialog.parentNode.removeChild(dialog);
  });
  