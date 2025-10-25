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

    <div id="ptimilk-order-list">
        <!-- Первый блок коробки напрямую в HTML для простоты -->
        <div class="ptimilk-box" data-box-index="0">
            <label>
                Выберите коробку:
                <select class="box-size-select">
                    <option value="3">3 конфеты</option>
                    <option value="9" selected>9 конфет</option>
                    <option value="16">16 конфет</option>
                </select>
            </label>

            <div class="flavors-row">
                <div class="flavor-item" data-flavor-id="cocoa">
                    <img src="cocoa.jpg" alt="Cocoa" title="Cocoa" />
                    <label>
                        <button type="button" class="flavor-minus">×</button>
                        <input type="number" min="0" max="9" value="3" class="flavor-qty-input" />
                    </label>
                </div>
                <div class="flavor-item" data-flavor-id="strawberry">
                    <img src="strawberry.jpg" alt="Strawberry" title="Strawberry" />
                    <label>
                        <button type="button" class="flavor-minus">×</button>
                        <input type="number" min="0" max="9" value="2" class="flavor-qty-input" />
                    </label>
                </div>
                <div class="flavor-item" data-flavor-id="coconut">
                    <img src="coconut.jpg" alt="Coconut" title="Coconut" />
                    <label>
                        <button type="button" class="flavor-minus">×</button>
                        <input type="number" min="0" max="9" value="2" class="flavor-qty-input" />
                    </label>
                </div>
                <div class="flavor-item" data-flavor-id="pistachio">
                    <img src="pistachio.jpg" alt="Pistachio" title="Pistachio" />
                    <label>
                        <button type="button" class="flavor-minus">×</button>
                        <input type="number" min="0" max="9" value="2" class="flavor-qty-input" />
                    </label>
                </div>
            </div>

            <label>
                Количество коробок:
                <input type="number" class="box-count-input" min="1" value="1" />
            </label>

            <div class="box-price">Цена: <span class="price-value">790</span> ₽</div>
            <button type="button" class="remove-box-btn" style="display:none;">Удалить коробку</button>
        </div>
    </div>

    <button id="add-box-btn" type="button">Добавить коробку</button>

    <div id="total-price-container">Общая сумма: <span id="total-price">790</span> ₽</div>

    <button id="submit-order" type="button" disabled>Добавить в корзину</button>
</div>

<script src="order-ptimilk.js"></script>