<link rel="stylesheet" href="order-ptimilk.css">

<div class="order-ptimilk-container">
  <h3>Выберите коробку</h3>
  <div class="box-selection">
    <img src="ptimilk3.jpg" data-box-type="3" class="box-image" title="3 конфеты" />
    <img src="ptimilk9.jpg" data-box-type="9" class="box-image" title="9 конфет" />
    <img src="ptimilk16.jpg" data-box-type="16" class="box-image" title="16 конфет" />
  </div>
  
  <div class="boxes-area">
    <!-- сюда добавятся блоки коробок -->
  </div>
  
  <button id="add-box-btn">Добавить коробку</button>
  
  <div class="total-area">
    Итог: <span id="total-price">0</span> ₽
  </div>
  
  <button id="order-submit" disabled>Оформить</button>
</div>

<script src="order-ptimilk.js"></script>
