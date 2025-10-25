document.addEventListener('DOMContentLoaded', () => {
  const prices = {3: 350, 9: 790, 16: 1350};
  const container = document.querySelector('.boxes-area');
  const btnAdd = document.getElementById('add-box-btn');
  const totalSpan = document.getElementById('total-price');
  const btnOrder = document.getElementById('order-submit');

  let boxCount = 0;
  let totalSum = 0;

  // Функция подсчёта стоимости
  function updateSummary() {
    let total = 0;
    document.querySelectorAll('.box-group').forEach(box => {
      const price = parseInt(box.querySelector('.price-display').dataset.price);
      total += price;
    });
    totalSpan.textContent = total.toLocaleString('ru-RU');
  }

  function createBox() {
    boxCount++;
    const box = document.createElement('div');
    box.className = 'box-group';
    box.dataset.index = boxCount;

    // HTML блока
    box.innerHTML = `
      <button type="button" class="btn-delete">Удалить</button>
      <div class="box-inner">
        <div>
          <img src="ptimilk3.jpg" class="box-image" data-type="3" title="3 конфеты" />
        </div>
        <div class="flavors">
          <div class="flavor" data-flavor="cocoa">
            <img src="cocoa.jpg" alt="Какао" />
            <div class="qty-control">
              <button type="button" class="qty-minus">−</button>
              <input type="number" min="0" max="16" value="0" class="flavor-qty" />
              <button type="button" class="qty-plus">+</button>
            </div>
          </div>
          <!-- повтор для клубники, кокоса, фисташки -->
          <div class="flavor" data-flavor="strawberry">
            <img src="strawberry.jpg" alt="Клубника" />
            <div class="qty-control">
              <button type="button" class="qty-minus">−</button>
              <input type="number" min="0" max="16" value="0" class="flavor-qty" />
              <button type="button" class="qty-plus">+</button>
            </div>
          </div>
          <div class="flavor" data-flavor="coconut">
            <img src="coconut.jpg" alt="Кокос" />
            <div class="qty-control">
              <button type="button" class="qty-minus">−</button>
              <input type="number" min="0" max="16" value="0" class="flavor-qty" />
              <button type="button" class="qty-plus">+</button>
            </div>
          </div>
          <div class="flavor" data-flavor="pistachio">
            <img src="pistachio.jpg" alt="Фисташка" />
            <div class="qty-control">
              <button type="button" class="qty-minus">−</button>
              <input type="number" min="0" max="16" value="0" class="flavor-qty" />
              <button type="button" class="qty-plus">+</button>
            </div>
          </div>
        </div>
        <label>
          Кол-во коробок:
          <input type="number" min="1" value="1" class="box-count" />
        </label>
        <div class="price-display" data-price="0">0 ₽</div>
      </div>
    `;

    // обработка кнопок удаления
    const btnDel = box.querySelector('.btn-delete');
    btnDel.onclick = () => {
      box.remove();
      recalcTotal();
    };

    // обработка +/- в вкусах
    box.querySelectorAll('.qty-minus').forEach(b => {
      b.onclick = () => changeFlavorQty(b, -1);
    });
    box.querySelectorAll('.qty-plus').forEach(b => {
      b.onclick = () => changeFlavorQty(b, 1);
    });

    // обработка ввода в вкусах
    box.querySelectorAll('.flavor-qty').forEach(input => {
      input.oninput = () => {
        const val = parseInt(input.value) || 0;
        input.value = Math.max(0, Math.min(val, 16));
        recomputeBoxPrice(box);
      };
    });

    // обработка количества коробки
    box.querySelector('.box-number').oninput = () => {
      recomputeBoxPrice(box);
    };

    // обработка смены картинки коробки
    box.querySelector('.box-image').onclick = () => {
      // вызываем выпадающий список или меняем картинку
    };

    // выводим в контейнер
    document.querySelector('.boxes-area').appendChild(box);
    recalcBoxPrice(box);
    recalcTotal();
  }

  function changeFlavorQty(btn, delta) {
    const input = btn.closest('.qty-control').querySelector('.flavor-qty');
    let val = parseInt(input.value) || 0;
    val += delta;
    val = Math.max(0, Math.min(val, 16));
    input.value = val;
    // пересчитываем цену
    recalcBoxPrice(btn.closest('.box-group'));
  }

  function recomputeBoxPrice(box) {
    const size = Number(box.querySelector('.box-size-select').value);
    let sumFlavors = 0;
    box.querySelectorAll('.flavor').forEach(f => {
      const val = parseInt(f.querySelector('.flavor-qty').value) || 0;
      sumFlavors += val;
    });
    // исправляем если сумма больше размера
    if (sumFlavors > size) {
      // уменьшаем самые последние вкусы
      let excess = sumFlavors - size;
      const flavors = Array.from(box.querySelectorAll('.flavor')).reverse();
      for (let f of flavors) {
        let val = parseInt(f.querySelector('.flavor-qty').value) || 0;
        const reduceBy = Math.min(val, excess);
        val -= reduceBy;
        excess -= reduceBy;
        f.querySelector('.flavor-qty').value = val;
        if (excess <= 0) break;
      }
    } else if (sumFlavors < size) {
      // увеличиваем первый вкус
      const firstFlavor = box.querySelector('.flavor');
      const val = parseInt(firstFlavor.querySelector('.flavor-qty').value) || 0;
      firstFlavor.querySelector('.flavor-qty').value = val + (size - sumFlavors);
    }
    // пересчет цены
    const boxCount = parseInt(box.querySelector('.box-number').value) || 1;
    const price = boxCount * prices[size];
    box.querySelector('.price-display').textContent = price.toLocaleString('ru-RU') + ' ₽';
    box.querySelector('.price-display').dataset.price = price;
    recalcTotal();
  }

  function recalcTotal() {
    let total = 0;
    document.querySelectorAll('.box-group').forEach(b => {
      total += parseInt(b.querySelector('.price-display').dataset.price);
    });
    document.getElementById('total-price').textContent = total.toLocaleString('ru-RU');
    // проверка кнопки
    document.getElementById('order-submit').disabled = total === 0;
  }

  document.querySelectorAll('.box-image').forEach(img => {
    img.onclick = () => {
      // меняем картинку на список коробок, или вызываем список
    };
  });

  document.getElementById('add-box-btn').onclick = () => createBox();

  // инициализация
  createBox();

  document.getElementById('order-ptimilk').onclick = () => {
    // собрать все данные и отправить
  };
});
