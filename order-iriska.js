document.addEventListener('DOMContentLoaded', () => {
    const widget = document.querySelector('.order-iriska .quantity-order-widget');
    if (!widget) return;

    const minusBtn = widget.querySelector('.minus-btn');
    const plusBtn = widget.querySelector('.plus-btn');
    const qtyInput = widget.querySelector('.qty-input');
    const orderBtn = widget.querySelector('.order-btn .order-text');

    const unitPrice = 450;
    const baseText = `Добавить | ${unitPrice} ₽`;

    function updateButtonText(quantity) {
        if (quantity < 1) {
            orderBtn.textContent = baseText;
        } else {
            const total = quantity * unitPrice;
            const formattedTotal = total.toLocaleString('ru-RU'); // разделитель тысяч
            orderBtn.textContent = `В заказе ${quantity} шт | ${formattedTotal} ₽`;
        }
    }

    minusBtn.addEventListener('click', () => {
        let qty = parseInt(qtyInput.value, 10) || 1;
        qty = Math.max(0, qty - 1);
        qtyInput.value = qty;
        updateButtonText(qty);
    });

    plusBtn.addEventListener('click', () => {
        let qty = parseInt(qtyInput.value, 10) || 1;
        qty = Math.min(99, qty + 1);
        qtyInput.value = qty;
        updateButtonText(qty);
    });

    qtyInput.addEventListener('input', () => {
        let val = parseInt(qtyInput.value.replace(/\D/g, ''), 10);
        if (isNaN(val) || val < 0) val = 0;
        if (val > 99) val = 99;
        qtyInput.value = val;
        updateButtonText(val);
    });

    orderBtn.closest('.order-btn').addEventListener('click', () => {
        let qty = parseInt(qtyInput.value, 10);
        if (!qty || qty < 1) {
            alert('Введите количество больше 0');
            return;
        }
        // TODO: логика добавления в корзину с qty
        alert(`Добавлено в корзину: ${qty} шт Ириски сливочные\nСумма: ${qty * unitPrice} ₽`);
    });

    // Инициалный текст
    updateButtonText(1);
});
