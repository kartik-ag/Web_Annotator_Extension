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
  buttons.forEach(button => {
      button.classList.remove('selected');
  });
  if (!isSelected) {
      clickedButton.classList.add('selected');
  }
  else{
    clickedButton.classList.remove('selected');
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

