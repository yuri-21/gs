// order-ptimilk.js

document.addEventListener('DOMContentLoaded', () => {
    const boxSizeSelect = document.getElementById('box-size-select');
    const flavorQtyInputs = document.querySelectorAll('.flavor-qty');
    const validationMessage = document.querySelector('.validation-message');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    function updateValidation() {
        const boxSize = parseInt(boxSizeSelect.value);
        let totalQty = 0;
        flavorQtyInputs.forEach(input => {
            const val = parseInt(input.value);
            if (!isNaN(val)) totalQty += val;
        });
        if (totalQty === boxSize) {
            validationMessage.textContent = '';
            addToCartBtn.disabled = false;
        } else if (totalQty > boxSize) {
            validationMessage.textContent = `Выбранное количество начинок превышает размер коробки (${boxSize})`;
            addToCartBtn.disabled = true;
        } else {
            validationMessage.textContent = `Выберите начинок ровно на ${boxSize} шт`;
            addToCartBtn.disabled = true;
        }
    }

    // Обновляем при изменениях
    boxSizeSelect.addEventListener('change', () => {
        // Сбрасываем начинки при смене размера
        flavorQtyInputs.forEach(input => input.value = 0);
        updateValidation();
    });

    flavorQtyInputs.forEach(input => {
        input.addEventListener('input', () => {
            // Ограничим ввод от 0 до 99
            let val = parseInt(input.value);
            if (isNaN(val) || val < 0) val = 0;
            if (val > 99) val = 99;
            input.value = val;
            updateValidation();
        });
    });

    addToCartBtn.addEventListener('click', () => {
        if (addToCartBtn.disabled) return;

        const boxSize = parseInt(boxSizeSelect.value);
        const flavors = {};
        flavorQtyInputs.forEach(input => {
            flavors[input.dataset.flavor] = parseInt(input.value) || 0;
        });

        // Собираем заказ
        alert('Добавлен заказ:\n' +
            `Размер коробки: ${boxSize} шт\n` +
            `Наполнение:\n` +
            Object.entries(flavors).map(([flavor, qty]) => `${flavor}: ${qty} шт`).join('\n')
        );

        // TODO: здесь добавить логику добавления в корзину, возможно AJAX
    });

    // Предварительный вызов для инициализации
    updateValidation();
});
