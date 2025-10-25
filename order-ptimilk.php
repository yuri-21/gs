<link rel="stylesheet" href="order-ptimilk.css">

<div class="order-ptimilk-container">
    <h3>Выберите коробку</h3>
    <div class="box-selection">
        <img src="ptimilk3.jpg" data-box-type="3" class="box-image" title="3 конфеты" />
        <div class="caption">3 конфеты</div>
        <img src="ptimilk9.jpg" data-box-type="9" class="box-image active" title="9 конфет" />
        <div class="caption">9 конфет</div>
        <img src="ptimilk16.jpg" data-box-type="16" class="box-image" title="16 конфет" />
        <div class="caption">16 конфет</div>
    </div>
    <div class="boxes-area">
        <div class="ptimilk-box" data-box-index="0">
            <label>Размер коробки:
                <select class="box-size-select">
                    <option value="3">3 конфеты</option>
                    <option value="9" selected>9 конфет</option>
                    <option value="16">16 конфет</option>
                </select>
            </label>

            <div class="flavors-inline">
                <div class="flavor-inline" data-flavor-id="cocoa">
                    <img src="cocoa.jpg" alt="Какао" title="Какао" />
                    <input type="number" min="0" max="9" value="3" class="flavor-qty-input" />
                </div>
                <div class="flavor-inline" data-flavor-id="strawberry">
                    <img src="strawberry.jpg" alt="Клубника" title="Клубника" />
                    <input type="number" min="0" max="9" value="2" class="flavor-qty-input" />
                </div>
                <div class="flavor-inline" data-flavor-id="coconut">
                    <img src="coconut.jpg" alt="Кокос" title="Кокос" />
                    <input type="number" min="0" max="9" value="2" class="flavor-qty-input" />
                </div>
                <div class="flavor-inline" data-flavor-id="pistachio">
                    <img src="pistachio.jpg" alt="Фисташка" title="Фисташка" />
                    <input type="number" min="0" max="9" value="2" class="flavor-qty-input" />
                </div>
            </div>

            <label>Количество коробок:
                <input type="number" class="box-count-input" min="1" value="1" />
            </label>

            <div class="box-price">Цена: <span class="price-value">790</span> ₽</div>
            <button type="button" class="remove-box-btn" style="display:none;">Удалить коробку</button>
        </div>
    </div>

    <button id="add-box-btn" type="button">Добавить коробку</button>

    <div id="total-price-container">Общая сумма: <span id="total-price">790</span> ₽</div>
    <button id="submit-order" type="button" disabled>Оформить</button>
</div>

<script src="order-ptimilk.js"></script>
