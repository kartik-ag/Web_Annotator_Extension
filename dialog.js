function setupSliders() {
  let sliders = document.querySelectorAll('.slider-input');
  let values = document.querySelectorAll('.value');
  sliders.forEach((slider, index) => {
    slider.addEventListener('input', (e) => {
      values[index].textContent = e.target.value + '%';
    });
  });
}

setupSliders();