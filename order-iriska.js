// ========== ЗАКАЗ ИРИСОК ==========

function changeQuantityIriska(delta) {
    const input = document.getElementById('qty-iriska');
    let value = parseInt(input.value) || 1;
    value += delta;
    
    if (value < 1) value = 1;
    if (value > 99) value = 99;
    
    input.value = value;
}

function addToCartIriska() {
    const quantity = parseInt(document.getElementById('qty-iriska').value);
    
    // Временная заглушка
    alert('Добавлено в корзину:\nИриски сливочные 200 г. (стакан крафт)\nКоличество: ' + quantity);
    
    // Здесь будет реальная логика добавления в корзину
}