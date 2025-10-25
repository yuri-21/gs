<!-- Заглушка
<div class="order-block">
    <h3>Оформить заказ</h3>
    <p>Конфеты Птимилк — выберите количество и оформите заказ</p>
    <button class="order-btn" onclick="orderProduct('ptimilk')">Заказать</button>
</div>
-->

<!-- order-ptimilk.php -->
<link rel="stylesheet" href="order-ptimilk.css">

<div class="order-ptimilk">
  <div class="order-row" data-box-index="0">

    <label class="box-size-label">
      Коробка:
      <select class="box-size-select">
        <option value="3">3 шт</option>
        <option value="9" selected>9 шт</option>
        <option value="16">16 шт</option>
      </select>
    </label>

    <div class="flavors-inline">
      <div class="flavor-inline" data-flavor-id="cocoa">
        <img src="cocoa.jpg" alt="Какао" title="Какао" />
        <button type="button" class="flavor-minus">×</button>
        <input type="number" min="0" max="16" value="3" class="flavor-qty-input" />
      </div>
      <div class="flavor-inline" data-flavor-id="strawberry">
        <img src="strawberry.jpg" alt="Клубника" title="Клубника" />
        <button type="button" class="flavor-minus">×</button>
        <input type="number" min="0" max="16" value="2" class="flavor-qty-input" />
      </div>
      <div class="flavor-inline" data-flavor-id="coconut">
        <img src="coconut.jpg" alt="Кокос" title="Кокос" />
        <button type="button" class="flavor-minus">×</button>
        <input type="number" min="0" max="16" value="2" class="flavor-qty-input" />
      </div>
      <div class="flavor-inline" data-flavor-id="pistachio">
        <img src="pistachio.jpg" alt="Фисташка" title="Фисташка" />
        <button type="button" class="flavor-minus">×</button>
        <input type="number" min="0" max="16" value="2" class="flavor-qty-input" />
      </div>
    </div>

    <label class="box-count-label">
      Кол-во:
      <input type="number" class="box-count-input" min="1" value="1">
    </label>

    <div class="box-price">Цена: <span class="price-value">790</span> ₽</div>

    <button type="button" class="remove-box-btn" style="display:none;">Удалить</button>
  </div>
</div>

<script src="order-ptimilk.js"></script>