// order-ptimilk.js

document.addEventListener('DOMContentLoaded', () => {
  const prices = {3: 350, 9: 790, 16: 1350};
  const defaults = {
    3: {K: 1, L: 1, M: 1, N: 0},
    9: {K: 3, L: 2, M: 2, N: 2},
    16: {K: 4, L: 4, M: 4, N: 4}
  };
  const root = document.getElementById('order-ptimilk-root');

  function formatSum(val) {
    return (val || 0).toLocaleString('ru-RU') + ' ₽';
  }

  function createBlock(state, idx) {
    const el = document.createElement('div');
    el.className = 'order-row';

    // HTML: одна строка, все взаимодействие через .order-value (числа) и .order-action (добавить/удалить)
    el.innerHTML = `
    Коробка на <span class="order-value" data-x>${state.X}</span> конфет,
    в том числе:
    <img src="cocoa.jpg" alt="шоколадный" class="order-flavor-img" /><span class="order-value" data-k>${state.K}</span>,
    <img src="strawberry.jpg" alt="клубничный" class="order-flavor-img" /><span class="order-value" data-l>${state.L}</span>,
    <img src="coconut.jpg" alt="кокосовый" class="order-flavor-img" /><span class="order-value" data-m>${state.M}</span>,
    <img src="pistachio.jpg" alt="фисташковый" class="order-flavor-img" /><span class="order-value" data-n>${state.N}</span>.
    Всего коробок — <span class="order-value" data-o>${state.O}</span>
    на сумму <span class="order-value" data-w>${formatSum(state.W)}</span>
    <span class="order-action" data-remove style="display:${idx===0?'none':'inline'}">удалить набор</span>
    <span class="order-warn" style="display:none;"></span>
    `;
    return el;
  }

  function stateForSize(size) {
    const vals = Object.assign({}, defaults[size]);
    return {X: size, K: vals.K, L: vals.L, M: vals.M, N: vals.N, O: 1, W: prices[size]};
  }

  function render(blocks) {
    root.innerHTML = '<div class="order-blocks"></div>';
    const blocksWrap = root.querySelector('.order-blocks');
    blocks.forEach((state, idx) => {
      const el = createBlock(state, idx);
      blocksWrap.append(el);

      // Подключаем логику поля-ссылки и редактирования
      el.querySelector('[data-x]').onclick = () => showSelect(el, 'X', [3,9,16], blocks, idx);
      el.querySelector('[data-k]').onclick = () => showInput(el, 'K', blocks, idx, 0);
      el.querySelector('[data-l]').onclick = () => showInput(el, 'L', blocks, idx, 0);
      el.querySelector('[data-m]').onclick = () => showInput(el, 'M', blocks, idx, 0);
      el.querySelector('[data-n]').onclick = () => showInput(el, 'N', blocks, idx, 0);
      el.querySelector('[data-o]').onclick = () => showInput(el, 'O', blocks, idx, 1);

      el.querySelector('[data-remove]').onclick = () => {
        blocks.splice(idx,1);
        render(blocks);
      };
    });

    // Итоги и возможность добавить набор
    let totalBoxes = blocks.reduce((s,b)=>s+b.O,0);
    let totalSum = blocks.reduce((s,b)=>s+b.O*prices[b.X],0);

    const sumK = blocks.reduce((s,b)=>s+b.K,0);
    const sumL = blocks.reduce((s,b)=>s+b.L,0);
    const sumM = blocks.reduce((s,b)=>s+b.M,0);
    const sumN = blocks.reduce((s,b)=>s+b.N,0);
    const sumX = blocks.reduce((s,b)=>s+b.X,0);

    // Итоговый ряд
    const summary = document.createElement('div');
    summary.className = 'order-summary';
    summary.innerHTML = `Всего коробок ${totalBoxes} на сумму ${formatSum(totalSum)}<span class="order-action" data-add>добавить набор</span>`;

    root.append(summary);

    summary.querySelector('[data-add]').onclick = () => {
      blocks.push(stateForSize(9));
      render(blocks);
    };

    // Итоговая валидация
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
      summary.append(warnBlock);
      document.getElementById('order-submit').disabled = true;
    }
    else {
      document.getElementById('order-submit').disabled = false;
    }

    // Кнопка оформить
    if (!root.querySelector('#order-submit')) {
      const submit = document.createElement('button');
      submit.id = 'order-submit';
      submit.type = 'button';
      submit.innerText = 'Оформить';
      submit.disabled = !!warn;
      root.append(submit);
    }
  }

  // UI для ввода числа
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
    input.onkeydown = e => { if(e.key==='Enter'){ input.blur(); }};
    function finishInput() {
      let v = parseInt(input.value,10);
      if (isNaN(v) || v < minValue) v = minValue;
      blocks[idx][key] = v;
      input.remove();
      span.style.display = 'inline-block';
      render(blocks);
    }
  }

  // UI для выбора размера коробки
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
      let v = parseInt(select.value,10);
      blocks[idx][key] = v;
      // Сбросить вкусы и О по дефолту для коробки
      Object.assign(blocks[idx], defaults[v]);
      blocks[idx].O = 1;
      select.remove();
      span.style.display = 'inline-block';
      render(blocks);
    }
  }

  // Инициализация
  render([stateForSize(9)]);
});
