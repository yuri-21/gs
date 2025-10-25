<link rel="stylesheet" href="order-iriska.css">

<div class="order-block order-iriska">
    <h3>Оформить заказ</h3>
    
    <div class="product-variant">
        <p class="variant-name">Ириски сливочные 200 г. (стакан крафт)</p>
    </div>

    <div class="quantity-selector">
        <button class="qty-btn" onclick="changeQuantityIriska(-1)">−</button>
        <input type="number" id="qty-iriska" value="1" min="1" max="99" readonly>
        <button class="qty-btn" onclick="changeQuantityIriska(1)">+</button>
    </div>

    <button class="order-btn" onclick="addToCartIriska()">Добавить в корзину</button>
</div>

<script src="order-iriska.js"></script>