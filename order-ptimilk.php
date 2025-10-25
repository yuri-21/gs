<link rel="stylesheet" href="order-ptimilk.css">

<div class="order-ptimilk-container">
  <h3>Выберите коробку</h3>

  <div class="box-selection">
    <div class="box-item" data-box-type="3">
      <img src="ptimilk3.jpg" alt="3 конфеты" title="3 конфеты"/>
      <div class="caption">3 конфеты</div>
    </div>
    <div class="box-item active" data-box-type="9">
      <img src="ptimilk9.jpg" alt="9 конфет" title="9 конфет"/>
      <div class="caption">9 конфет</div>
    </div>
    <div class="box-item" data-box-type="16">
      <img src="ptimilk16.jpg" alt="16 конфет" title="16 конфет"/>
      <div class="caption">16 конфет</div>
    </div>
  </div>

  <div class="boxes-area">
    <div class="ptimilk-box" data-box-index="0">
      <div class="box-content">
        <div class="box-image-wrap">
          <img src="ptimilk9.jpg" alt="9 конфет" class="selected-box-image" />
          <select class="box-size-select">
            <option value="3">3 конфеты</option>
            <option value="9" selected>9 конфет</option>
            <option value="16">16 конфет</option>
          </select>
        </div>

        <div class="flavors-group">
          <div class="flavor-row">
            <div class="flavor-item" data-flavor="cocoa">
              <img src="cocoa.jpg" alt="Какао" title="Какао"/>
              <input type="number" class="flavor-qty-input" min="0" max="9" value="3">
            </div>
            <div class="flavor-item" data-flavor="strawberry">
              <img src="strawberry.jpg" alt="Клубника" title="Клубника"/>
              <input type="number" class="flavor-qty-input" min="0" max="9" value="2">
            </div>
          </div>
          <div class="flavor-row">
            <div class="flavor-item" data-flavor="coconut">
              <img src="coconut.jpg" alt="Кокос" title="Кокос"/>
              <input type="number" class="flavor-qty-input" min="0" max="9" value="2">
            </div>
            <div class="flavor-item" data-flavor="pistachio">
              <img src="pistachio.jpg" alt="Фисташка" title="Фисташка"/>
              <input type="number" class="flavor-qty-input" min="0" max="9" value="2">
            </div>
          </div>
        </div>

        <div class="box-controls">
          <label>
            Количество коробок:
            <input type="number" min="1" max="99" class="box-count-input" value="1" />
          </label>
          <div class="box-price">Цена: <span class="price-value">790</span> ₽</div>
        </div>
      </div>

      <button class="remove-box-btn" style="display:none;">Удалить коробку</button>
    </div>
  </div>

  <button id="add-box-btn">Добавить коробку</button>

  <div class="total-area">Итоговая цена: <span id="total-price">790</span> ₽</div>

  <button id="order-submit" disabled>Оформить заказ</button>
</div>

<script src="order-ptimilk.js"></script>
