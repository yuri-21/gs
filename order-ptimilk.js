// order-ptimilk.js
document.addEventListener('DOMContentLoaded', () => {
  // Цены за коробку разных объемов
  const prices = {9: 790, 16: 1350};

  // Стандартное количество конфет каждого вкуса для каждого объема
  const defaultCounts = {
    9: {cocoaCount: 3, strawberryCount: 2, coconutCount: 2, pistachioCount: 2},
    16: {cocoaCount: 4, strawberryCount: 4, coconutCount: 4, pistachioCount: 4}
  };

  const root = document.getElementById('order-ptimilk-root');

  // Форматируем сумму для отображения с разделением тысяч и знаком рубля
  function formatSum(value) {
    return (value || 0).toLocaleString('ru-RU') + ' ₽';
  }

  // Создаем начальное состояние набора с заданным объемом коробки
  function createInitialSet(boxVolume) {
    const counts = Object.assign({}, defaultCounts[boxVolume]);
    return {
      boxVolume,
      cocoaCount: counts.cocoaCount,
      strawberryCount: counts.strawberryCount,
      coconutCount: counts.coconutCount,
      pistachioCount: counts.pistachioCount,
      boxCount: 1
    };
  }

  // Создаем HTML-блок для одного набора
  function createSetBlock(setState, idx) {
    const totalCandies = setState.cocoaCount + setState.strawberryCount + setState.coconutCount + setState.pistachioCount;
    const candiesDifference = setState.boxVolume - totalCandies;

    // Формируем предупреждение, если выбрано меньше или больше конфет, чем нужно
    let warningHTML = '';
    if (candiesDifference > 0) {
      warningHTML = `<span class="order-warn">Вы выбрали ${totalCandies}, добавьте еще ${candiesDifference}</span>`;
    } else if (candiesDifference < 0) {
      warningHTML = `<span class="order-warn">Вы выбрали ${totalCandies}, уберите ${-candiesDifference}</span>`;
    }

    const el = document.createElement('div');
    el.className = 'order-block';

    el.innerHTML = `
      <div class="order-row order-top">
        <span class="order-value" data-boxcount>${setState.boxCount}</span> коробок по
        <span class="order-value" data-boxvolume>${setState.boxVolume}</span> конфет, состав:
        <span class="order-action" data-remove style="display:${idx === 0 ? 'none' : 'inline'}; margin-left: 16px;">удалить набор</span>
      </div>
      <div class="order-flavor-row">
        <img src="cocoa.jpg" class="order-flavor-img" alt="какао" /> какао <span class="order-value" data-cocoa>${setState.cocoaCount}</span>
      </div>
      <div class="order-flavor-row">
        <img src="strawberry.jpg" class="order-flavor-img" alt="клубника" /> клубника <span class="order-value" data-strawberry>${setState.strawberryCount}</span>
      </div>
      <div class="order-flavor-row">
        <img src="coconut.jpg" class="order-flavor-img" alt="кокос" /> кокос <span class="order-value" data-coconut>${setState.coconutCount}</span>
      </div>
      <div class="order-flavor-row">
        <img src="pistachio.jpg" class="order-flavor-img" alt="фисташка" /> фисташка <span class="order-value" data-pistachio>${setState.pistachioCount}</span>
      </div>
      <div class="order-row order-sum">${warningHTML}</div>
    `;
    return el;
  }

  // Показываем число для изменения (конфеты или кол-во коробок)
  function showInput(el, key, sets, idx, minValue) {
    const span = el.querySelector(`[data-${key.toLowerCase()}]`);
    const value = sets[idx][key];
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'order-input';
    input.value = value;
    input.min = minValue;
    input.max = 99;

    span.style.display = 'none';
    span.parentNode.insertBefore(input, span);

    input.focus();
    input.select();

    input.onblur = finishInput;
    input.onkeydown = e => { if (e.key === 'Enter') input.blur(); };

    function finishInput() {
      let v = parseInt(input.value, 10);
      if (isNaN(v) || v < minValue) v = minValue;
      sets[idx][key] = v;
      input.remove();
      span.style.display = 'inline-block';
      render(sets);
    }
  }

  // Показываем селект для изменения объема коробки
  function showSelect(el, key, options, sets, idx) {
    const span = el.querySelector(`[data-${key.toLowerCase()}]`);
    const currentVal = sets[idx][key];
    const select = document.createElement('select');
    select.className = 'order-input';

    options.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o;
      opt.textContent = o;
      if (o === currentVal) opt.selected = true;
      select.append(opt);
    });

    span.style.display = 'none';
    span.parentNode.insertBefore(select, span);

    select.focus();
    select.onblur = finishSelect;
    select.onchange = finishSelect;

    function finishSelect() {
      let v = parseInt(select.value, 10);
      sets[idx][key] = v;
      Object.assign(sets[idx], defaultCounts[v]);
      sets[idx].boxCount = 1;
      select.remove();
      span.style.display = 'inline-block';
      render(sets);
    }
  }

  // Главная функция отрисовки и обновления конструктора
  function render(sets) {
    root.innerHTML = '<div class="order-blocks"></div>';
    const container = root.querySelector('.order-blocks');

    let hasWarning = false; // флаг наличия предупреждений

    sets.forEach((set, idx) => {
      const el = createSetBlock(set, idx);
      container.append(el);

      if (el.querySelector('.order-warn')) {
        hasWarning = true;
      }

      // Навешиваем обработчики клика для изменения чисел и удаления набора
      el.querySelector('[data-boxcount]').onclick = () => showInput(el, 'boxCount', sets, idx, 1);
      el.querySelector('[data-boxvolume]').onclick = () => showSelect(el, 'boxVolume', [9, 16], sets, idx);
      el.querySelector('[data-cocoa]').onclick = () => showInput(el, 'cocoaCount', sets, idx, 0);
      el.querySelector('[data-strawberry]').onclick = () => showInput(el, 'strawberryCount', sets, idx, 0);
      el.querySelector('[data-coconut]').onclick = () => showInput(el, 'coconutCount', sets, idx, 0);
      el.querySelector('[data-pistachio]').onclick = () => showInput(el, 'pistachioCount', sets, idx, 0);
      el.querySelector('[data-remove]').onclick = () => {
        sets.splice(idx, 1);
        render(sets);
      };
    });

    // Кнопка добавления нового набора
    const addRow = document.createElement('div');
    addRow.className = 'order-row';
    addRow.innerHTML = '<span class="order-action" data-add>добавить набор</span>';
    root.append(addRow);
    addRow.querySelector('[data-add]').onclick = () => {
      sets.push(createInitialSet(9));
      render(sets);
    };

    // Подсчеты общего количества коробок и суммы заказа
    const totalBoxes = sets.reduce((sum, set) => sum + set.boxCount, 0);
    const totalSum = sets.reduce((sum, set) => sum + set.boxCount * prices[set.boxVolume], 0);

    // Отображение суммы и количества коробок
    const summary = document.createElement('div');
    summary.className = 'order-summary';
    summary.innerHTML = `Всего коробок ${totalBoxes} на сумму ${formatSum(totalSum)}`;
    root.append(summary);

    // Отображение глобального предупреждения и блокировка кнопки оформления заказа
    const existingWarn = root.querySelector('.order-warn-global');
    if (existingWarn) existingWarn.remove();

    if (hasWarning) {
      const warnBlock = document.createElement('div');
      warnBlock.className = 'order-warn order-warn-global';
      warnBlock.innerText = 'Внимание: есть блоки с незавершенным составом!';
      root.append(warnBlock);

      const orderButton = document.getElementById('order-submit');
      if (orderButton) orderButton.disabled = true;
    } else {
      const orderButton = document.getElementById('order-submit');
      if (orderButton) orderButton.disabled = false;
    }
  }

  // Инициализация с одним набором по умолчанию
  render([Object.assign(createInitialSet(9), { boxCount: 1 })]);
});
