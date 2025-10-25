// order-ptimilk.js

document.addEventListener('DOMContentLoaded', () => {
    const prices = {3: 350, 9: 790, 16: 1350};

    const container = document.getElementById('ptimilk-order-list');
    const addBoxBtn = document.getElementById('add-box-btn');
    const totalPriceElem = document.getElementById('total-price');
    const submitOrderBtn = document.getElementById('submit-order');

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

        // Автовалидация сумм вкусов с размером коробки
        if (flavorSum > boxSize) {
            flavorQtyInputs.forEach((input, idx) => {
                if (idx > 0) input.value = 0; // простой приоритет: оставляем 1-й, остальные обнуляем
            });
            flavorSum = Number(flavorQtyInputs[0].value);
        }

        // Если суммы вкусов меньше размера - корректируем самый первый вкус
        if (flavorSum < boxSize) {
            const diff = boxSize - flavorSum;
            flavorQtyInputs[0].value = Number(flavorQtyInputs[0].value) + diff;
            flavorSum = boxSize;
        }

        // Обновляем максимум для input-ов (чтобы не вводили лишнего)
        flavorQtyInputs.forEach(input => {
            const maxAllowed = boxSize - (flavorSum - Number(input.value));
            input.max = maxAllowed;
        });

        const boxCount = Number(boxCountInput.value);
        if (isNaN(boxCount) || boxCount < 1) boxCountInput.value = 1;

        const boxPrice = prices[boxSize] || 0;
        priceElem.textContent = boxCount * boxPrice;

        updateTotalPrice();
        validateForm();
    }

    function updateTotalPrice() {
        let total = 0;
        const boxes = container.querySelectorAll('.ptimilk-box');
        boxes.forEach(box => {
            const priceText = box.querySelector('.price-value').textContent.replace(/\s/g, '');
            const price = Number(priceText);
            if (!isNaN(price)) total += price;
        });
        totalPriceElem.textContent = total.toLocaleString('ru-RU');
    }

    function validateForm() {
        let valid = true;
        const boxes = container.querySelectorAll('.ptimilk-box');
        boxes.forEach(box => {
            const sizeSelect = box.querySelector('.box-size-select');
            const boxSize = Number(sizeSelect.value);
            let flavorSum = 0;
            const flavorQtyInputs = box.querySelectorAll('.flavor-qty-input');
            flavorQtyInputs.forEach(input => {
                flavorSum += Number(input.value);
            });
            if (flavorSum !== boxSize) valid = false;
        });
        submitOrderBtn.disabled = !valid || container.children.length === 0;
    }

    function addBox(index = null) {
        if (index === null) index = container.children.length;

        // Создадим копию первого блока и обновим все индексы и события
        const firstBox = container.querySelector('.ptimilk-box');
        const clone = firstBox.cloneNode(true);
        clone.dataset.boxIndex = index;

        // Обновляем id и value по дефолту в зависимости от размера
        const sizeSelect = clone.querySelector('.box-size-select');
        sizeSelect.value = "9";

        const defaults = {
            3: [1,1,1,0],
            9: [3,2,2,2],
            16: [4,4,4,4]
        };

        const flavorQtyInputs = clone.querySelectorAll('.flavor-qty-input');
        flavorQtyInputs.forEach((input, idx) => {
            input.value = defaults[9][idx]; // значение по умолчанию для 9 шт
        });

        clone.querySelector('.box-count-input').value = 1;
        clone.querySelector('.price-value').textContent = prices[9];

        // Покажем кнопку удалить (для всех кроме первого)
        clone.querySelector('.remove-box-btn').style.display = 'block';

        container.appendChild(clone);

        attachBoxEvents(clone);
        updateBoxPrice(clone);
    }

    function attachBoxEvents(box) {
        const sizeSelect = box.querySelector('.box-size-select');
        const flavorQtyInputs = box.querySelectorAll('.flavor-qty-input');
        const boxCountInput = box.querySelector('.box-count-input');
        const removeBtn = box.querySelector('.remove-box-btn');

        sizeSelect.addEventListener('change', () => {
            const size = Number(sizeSelect.value);
            const defaults = {
                3: [1,1,1,0],
                9: [3,2,2,2],
                16: [4,4,4,4]
            };
            flavorQtyInputs.forEach((input, idx) => {
                input.value = defaults[size][idx] || 0;
                input.max = defaults[size].reduce((a,b) => a+b, 0);
            });
            updateBoxPrice(box);
        });

        flavorQtyInputs.forEach(input => {
            input.addEventListener('input', () => {
                let val = parseInt(input.value, 10);
                if (isNaN(val) || val < 0) val = 0;
                if (val > 99) val = 99;
                input.value = val;
                updateBoxPrice(box);
            });
        });

        boxCountInput.addEventListener('input', () => {
            let val = parseInt(boxCountInput.value, 10);
            if (isNaN(val) || val < 1) val = 1;
            if (val > 99) val = 99;
            boxCountInput.value = val;
            updateBoxPrice(box);
        });

        removeBtn.addEventListener('click', () => {
            box.remove();
            updateTotalPrice();
            validateForm();
        });
    }

    // Инициализация: 
    // навешиваем события на первый блок и кнопку добавления коробки
    const firstBox = container.querySelector('.ptimilk-box');
    attachBoxEvents(firstBox);
    updateBoxPrice(firstBox);

    addBoxBtn.addEventListener('click', () => {
        addBox();
    });

    submitOrderBtn.addEventListener('click', () => {
        if (submitOrderBtn.disabled) return;

        // Собираем все данные для отправки на сервер
        const boxes = [];
        container.querySelectorAll('.ptimilk-box').forEach(box => {
            const size = box.querySelector('.box-size-select').value;
            const count = box.querySelector('.box-count-input').value;
            const flavors = {};
            box.querySelectorAll('.flavor-qty-input').forEach(input => {
                const flavor = input.closest('.flavor-item').dataset.flavorId;
                flavors[flavor] = parseInt(input.value, 10) || 0;
            });
            boxes.push({size: parseInt(size,10), count: parseInt(count,10), flavors: flavors});
        });

        console.log('Отправляем заказ:', boxes);
        alert('Заказ принят! Подробности в консоли.');

        // TODO: отправить boxes через AJAX или форму на сервер
    });

    // Запуск проверки, подсчёта итого
    updateTotalPrice();
    validateForm();
});
