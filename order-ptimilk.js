// order-ptimilk.js

document.addEventListener('DOMContentLoaded', () => {
  const prices = {9: 790, 16: 1350};
  const defaults = {
    9: {K: 3, L: 2, M: 2, N: 2},
    16: {K: 4, L: 4, M: 4, N: 4}
  };
  const root = document.getElementById('order-ptimilk-root');

  function formatSum(val) {
    return (val || 0).toLocaleString('ru-RU') + ' ₽';
  }



function createBlock(state, idx) {
  const sum = state.K + state.L + state.M + state.N;
  const need = state.X - sum;

  let warn = '';
  if (need > 0) {
    warn = `<span class="order-warn">добавьте еще ${need}</span>`;
  } else if (need < 0) {
    warn = `<span class="order-warn">уберите ${-need}</span>`;
  }

  const el = document.createElement('div');
  el.className = 'order-block';

  el.innerHTML = `
    <div class="order-row order-top">
      <span class="order-value" data-o>${state.O}</span> коробок по
      <span class="order-value" data-x>${state.X}</span> конфет, состав:
      <span class="order-action" data-remove style="display:${idx === 0 ? 'none' : 'inline'}; margin-left: 16px;">удалить набор</span>
    </div>
    <div class="order-flavor-row">
      <img src="cocoa.jpg" class="order-flavor-img" alt="какао" /> какао <span class="order-value" data-k>${state.K}</span>
    </div>
    <div class="order-flavor-row">
      <img src="strawberry.jpg" class="order-flavor-img" alt="клубника" /> клубника <span class="order-value" data-l>${state.L}</span>
    </div>
    <div class="order-flavor-row">
      <img src="coconut.jpg" class="order-flavor-img" alt="кокос" /> кокос <span class="order-value" data-m>${state.M}</span>
    </div>
    <div class="order-flavor-row">
      <img src="pistachio.jpg" class="order-flavor-img" alt="фисташка" /> фисташка <span class="order-value" data-n>${state.N}</span>
    </div>
    <div class="order-row order-sum">${warn}</div>
  `;
  return el;
}

  function stateForSize(size) {
    const vals = Object.assign({}, defaults[size]);
    return {X: size, K: vals.K, L: vals.L, M: vals.M, N: vals.N, O: 1};
  }

  function render(blocks) {
    root.innerHTML = '<div class="order-blocks"></div>';
    const blocksWrap = root.querySelector('.order-blocks');
    blocks.forEach((state, idx) => {
      const el = createBlock(state, idx);
      blocksWrap.append(el);

      el.querySelector('[data-o]').onclick = () => showInput(el, 'O', blocks, idx, 1);
      el.querySelector('[data-x]').onclick = () => showSelect(el, 'X', [9, 16], blocks, idx);
      el.querySelector('[data-k]').onclick = () => showInput(el, 'K', blocks, idx, 0);
      el.querySelector('[data-l]').onclick = () => showInput(el, 'L', blocks, idx, 0);
      el.querySelector('[data-m]').onclick = () => showInput(el, 'M', blocks, idx, 0);
      el.querySelector('[data-n]').onclick = () => showInput(el, 'N', blocks, idx, 0);

      el.querySelector('[data-remove]').onclick = () => {
        blocks.splice(idx, 1);
        render(blocks);
      };
    });

    // новая отдельная строка "добавить набор"
    const addRow = document.createElement('div');
    addRow.className = 'order-row';
    addRow.innerHTML = '<span class="order-action" data-add>добавить набор</span>';
    root.append(addRow);
    addRow.querySelector('[data-add]').onclick = () => {
      blocks.push(stateForSize(9));
      render(blocks);
    };

    // Итоговые значения
    const totalBoxes = blocks.reduce((s, b) => s + b.O, 0);
    const totalSum = blocks.reduce((s, b) => s + b.O * prices[b.X], 0);
    const sumK = blocks.reduce((s, b) => s + b.K * b.O, 0);
    const sumL = blocks.reduce((s, b) => s + b.L * b.O, 0);
    const sumM = blocks.reduce((s, b) => s + b.M * b.O, 0);
    const sumN = blocks.reduce((s, b) => s + b.N * b.O, 0);
    const sumX = blocks.reduce((s, b) => s + b.X * b.O, 0);

    // Отрисовка итогового блока
    const summary = document.createElement('div');
    summary.className = 'order-summary';
    summary.innerHTML = `Всего коробок ${totalBoxes} на сумму ${formatSum(totalSum)}`;
    root.append(summary);

    // Проверка валидности заказа
    let warn = '';
    if (sumK + sumL + sumM + sumN !== sumX) {
      warn = 'не все наборы составлены';
    } else if (sumK + sumL + sumM + sumN < 9) {
      warn = 'минимальный заказ 9 конфет';
    }

    if (warn) {
      const warnBlock = document.createElement('div');
      warnBlock.className = 'order-warn';
      warnBlock.innerHTML = warn;
      root.append(warnBlock);
    }

    // Кнопка оформления заказа
    if (!root.querySelector('#order-submit')) {
      const submit = document.createElement('button');
      submit.id = 'order-submit';
      submit.type = 'button';
      submit.innerText = 'Оформить';
      submit.disabled = !!warn;
      root.append(submit);
    } else {
      document.getElementById('order-submit').disabled = !!warn;
    }
  }

  function showInput(el, key, blocks, idx, minValue) {
    const span = el.querySelector(`[data-${key.toLowerCase()}]`);
    const val = blocks[idx][key];
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'order-input';
    input.value = val;
    input.min = minValue;
    input.max = 99;

    span.style.display = 'none';
    span.parentNode.insertBefore(input, span);

    input.focus();
    input.select();

    input.onblur = () => finishInput();
    input.onkeydown = e => { if (e.key === 'Enter') { input.blur(); } };
    function finishInput() {
      let v = parseInt(input.value, 10);
      if (isNaN(v) || v < minValue) v = minValue;
      blocks[idx][key] = v;
      input.remove();
      span.style.display = 'inline-block';
      render(blocks);
    }
  }

  function showSelect(el, key, options, blocks, idx) {
    const span = el.querySelector(`[data-${key.toLowerCase()}]`);
    const cur = blocks[idx][key];
    const select = document.createElement('select');
    select.className = 'order-input';
    options.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o;
      opt.textContent = o;
      if (o === cur) opt.selected = true;
      select.append(opt);
    });

    span.style.display = 'none';
    span.parentNode.insertBefore(select, span);

    select.focus();

    select.onblur = () => finishSelect();
    select.onchange = () => finishSelect();
    function finishSelect() {
      let v = parseInt(select.value, 10);
      blocks[idx][key] = v;
      Object.assign(blocks[idx], defaults[v]);
      blocks[idx].O = 1;
      select.remove();
      span.style.display = 'inline-block';
      render(blocks);
    }
  }

  // Инициализация с дефолтным набором
  render([Object.assign(stateForSize(9), { O: 1 })]);
});
