<style>
  .number-input-wrapper {
    display: inline-block;
    position: relative;
    font-family: Arial, sans-serif;
  }
  .number-display {
    cursor: pointer;
    color: #0073e6;
    text-decoration: underline;
    user-select: none;
  }
  .number-input {
    display: none;
    width: 60px;
    font-size: 16px;
    padding: 3px 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>

<div class="number-input-wrapper">
  <span class="number-display">5</span>
  <input type="number" class="number-input" min="0" max="99" value="5" />
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.number-input-wrapper');
    const display = wrapper.querySelector('.number-display');
    const input = wrapper.querySelector('.number-input');

    // Показать input при клике на текст
    display.addEventListener('click', () => {
      display.style.display = 'none';
      input.style.display = 'inline-block';
      input.focus();
      input.select();
    });

    // Скрыть input и обновить display после потери фокуса
    input.addEventListener('blur', () => {
      let val = input.value;
      if (val === '') val = 0;
      input.value = val;
      display.textContent = val;
      input.style.display = 'none';
      display.style.display = 'inline';
    });

    // Опционально: можно обновлять display при input
    input.addEventListener('input', () => {
      if(input.value === '') {
        display.textContent = '0';
      } else {
        display.textContent = input.value;
      }
    });
  });
</script>
