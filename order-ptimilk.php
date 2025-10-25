<!-- Заглушка
<div class="order-block">
    <h3>Оформить заказ</h3>
    <p>Конфеты Птимилк — выберите количество и оформите заказ</p>
    <button class="order-btn" onclick="orderProduct('ptimilk')">Заказать</button>
</div>
-->

<!-- order-ptimilk.php -->
<link rel="stylesheet" href="order-ptimilk.css">

<div class="order-block order-ptimilk">
    <h3>Оформить заказ "Птимилк"</h3>

    <div id="ptimilk-configurator">
        <label>Размер коробки:
            <select id="box-size-select">
                <option value="3">3 шт</option>
                <option value="9" selected>9 шт</option>
                <option value="16">16 шт</option>
            </select>
        </label>

        <div class="flavors-container">
            <div class="flavor-item" data-flavor="cocoa">
                <img src="cocoa.jpg" alt="Cocoa">
                <label>Cocoa:
                    <input type="number" min="0" value="0" class="flavor-qty">
                </label>
            </div>
            <div class="flavor-item" data-flavor="strawberry">
                <img src="strawberry.jpg" alt="Strawberry">
                <label>Strawberry:
                    <input type="number" min="0" value="0" class="flavor-qty">
                </label>
            </div>
            <div class="flavor-item" data-flavor="coconut">
                <img src="coconut.jpg" alt="Coconut">
                <label>Coconut:
                    <input type="number" min="0" value="0" class="flavor-qty">
                </label>
            </div>
            <div class="flavor-item" data-flavor="pistachio">
                <img src="pistachio.jpg" alt="Pistachio">
                <label>Pistachio:
                    <input type="number" min="0" value="0" class="flavor-qty">
                </label>
            </div>
        </div>

        <div class="validation-message" aria-live="polite"></div>

        <button id="add-to-cart-btn" disabled>Добавить в корзину</button>
    </div>
</div>

<script src="order-ptimilk.js"></script>
