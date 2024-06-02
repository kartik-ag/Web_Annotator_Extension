function handleOnClickOthers(clickedButton){
    const buttons = document.querySelectorAll('.my-other-button');
    const isSelected = clickedButton.classList.contains('selected');
    buttons.forEach(button => {
        button.classList.remove('selected');
      });
      if (!isSelected) {
        clickedButton.classList.add('selected');
      } else {
        clickedButton.classList.remove('selected');
      }
}

