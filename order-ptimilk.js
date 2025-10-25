document.addEventListener('DOMContentLoaded', () => {
  const prices = {3: 350, 9: 790, 16: 1350};
  const container = document.querySelector('.boxes-area');
  const addBoxBtn = document.getElementById('add-box-btn');
  const totalPriceElem = document.getElementById('total-price');
  const submitOrderBtn = document.getElementById('submit-order');
  const boxImages = document.querySelectorAll('.box-selection .box-image');

  function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll('.ptimilk-box').forEach(box => {
      const priceText = box.querySelector('.price-value').textContent.replace(/\s/g, '');
      total += Number(priceText);
    });
    totalPriceElem.textContent = total.toLocaleString('ru-RU');
    submitOrderBtn.disabled = total === 0;
  }

  function updateBoxPrice(box) {
    const sizeSelect = box.querySelector('.box-size-select');
    const flavorQtyInputs = box.querySelectorAll('.flavor-qty-input');
    const boxCountInput = box.querySelector('.box-count-input');
    const priceElem = box.querySelector('.price-value');

    const boxSize = Number(sizeSelect.value);
    let flavorSum = 0;
    flavorQtyInputs.forEach(input => {
      const val = Number(input.value);
      if (!isNaN(val)) flavorSum += val;
    });

    // Автоматическая корректировка при превышении результата
    if (flavorSum > boxSize) {
      let excess = flavorSum - boxSize;
      for (let input of flavorQtyInputs) {
        let val = Number(input.value);
        let reduce = Math.min(val, excess);
        val -= reduce;
        input.value = val;
        excess -= reduce;
        if (excess <= 0) break;
      }
      flavorSum = boxSize;
    } else if (flavorSum < boxSize) {
      // Добавить разницу первому вкусу
      const firstInput = flavorQtyInputs[0];
      const val = Number(firstInput.value);
      firstInput.value = val + (boxSize - flavorSum);
      flavorSum = boxSize;
    }
    // Обновление max в инпутах
    flavorQtyInputs.forEach(input => {
      const maxVal = boxSize - (flavorSum - Number(input.value));
      input.max = maxVal;
    });

    let boxCount = Number(boxCountInput.value);
    if (boxCount < 1 || isNaN(boxCount)) {
      boxCount = 1;
      boxCountInput.value = 1;
    }

    const boxPrice = prices[boxSize] || 0;
    const finalPrice = boxCount * boxPrice;
    priceElem.textContent = finalPrice.toLocaleString('ru-RU') + ' ₽';

    updateTotalPrice();
  }

  function attachEvents(box) {
    const sizeSelect = box.querySelector('.box-size-select');
    const flavorQtyInputs = box.querySelectorAll('.flavor-qty-input');
    const boxCountInput = box.querySelector('.box-count-input');
    const removeBtn = box.querySelector('.remove-box-btn');

    sizeSelect.addEventListener('change', () => {
      const size = Number(sizeSelect.value);
      const defaults = {
        3: [1, 1, 1, 0],
        9: [3, 2, 2, 2],
        16: [4, 4, 4, 4]
      };
      flavorQtyInputs.forEach((input, i) => {
        input.value = defaults[size][i] || 0;
        input.max = size;
      });
      boxCountInput.value = 1;
      updateBoxPrice(box);
    });

    flavorQtyInputs.forEach(input => {
      input.addEventListener('input', () => {
        let val = Number(input.value);
        if (isNaN(val) || val < 0) val = 0;
        if (val > Number(input.max)) val = Number(input.max);
        input.value = val;
        updateBoxPrice(box);
      });
    });

    boxCountInput.addEventListener('input', () => {
      let val = Number(boxCountInput.value);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 99) val = 99;
      boxCountInput.value = val;
      updateBoxPrice(box);
    });

    removeBtn.addEventListener('click', () => {
      box.remove();
      updateTotalPrice();
    });
  }

  // Инициируем первый блок
  const firstBox = document.querySelector('.ptimilk-box');
  attachEvents(firstBox);
  updateBoxPrice(firstBox);

  // Инициализируем выбор коробки сверху
  boxImages.forEach(img => {
    img.addEventListener('click', () => {
      boxImages.forEach(i => i.classList.remove('active'));
      img.classList.add('active');

      const type = img.dataset.boxType;
      const box = document.querySelector('.ptimilk-box');
      if (!box) return;

      const select = box.querySelector('.box-size-select');
      if (select.value !== type) {
        select.value = type;
        select.dispatchEvent(new Event('change'));
      }
    });
  });

  // Добавить новую коробку
  document.getElementById('add-box-btn').addEventListener('click', () => {
    const clone = firstBox.cloneNode(true);
    clone.dataset.boxIndex = document.querySelectorAll('.ptimilk-box').length;
    clone.querySelector('.remove-box-btn').style.display = 'block';

    // Добавляем к ней событийные слушатели
    attachEvents(clone);

    document.querySelector('.boxes-area').appendChild(clone);

    // Обновляем цену
    updateBoxPrice(clone);
  });

  // Кнопка оформления
  submitOrderBtn.addEventListener('click', () => {
    if (submitOrderBtn.disabled) return;
    // Сбор данных для отправки

    const boxes = [];
    document.querySelectorAll('.ptimilk-box').forEach(box => {
      const size = Number(box.querySelector('.box-size-select').value);
      const count = Number(box.querySelector('.box-count-input').value);
      const flavors = {};
      box.querySelectorAll('.flavor-qty-input').forEach((input, i) => {
        const flavor = ['cocoa', 'strawberry', 'coconut', 'pistachio'][i];
        flavors[flavor] = Number(input.value) || 0;
      });
      boxes.push({size, count, flavors});
    });

    console.log('Заказ:', boxes);
    alert('Заказ отправлен! Проверь консоль для деталей.');

    // TODO: отправить на сервер через AJAX или форму
  });
});
