<!-- order-ptimilk.php -->
<link rel="stylesheet" href="order-ptimilk.css">

<div class="order-block order-ptimilk">
    <h3>Оформить заказ "Птимилк"</h3>

    <div id="ptimilk-order-list">
        <!-- Первый блок коробки -->
        <div class="ptimilk-box" data-box-index="0">
            <label>
                Выберите коробку:
                <select class="box-size-select">
                    <option value="3">3 конфеты</option>
                    <option value="9" selected>9 конфет</option>
                    <option value="16">16 конфет</option>
                </select>
            </label>

            <div class="flavors-inline">
                <?php
                $flavors = [
                    ['id' => 'cocoa', 'label' => 'Какао', 'img' => 'cocoa.jpg', 'default' => ['3' => 1, '9' => 3, '16' => 4]],
                    ['id' => 'strawberry', 'label' => 'Клубника', 'img' => 'strawberry.jpg', 'default' => ['3' => 1, '9' => 2, '16' => 4]],
                    ['id' => 'coconut', 'label' => 'Кокос', 'img' => 'coconut.jpg', 'default' => ['3' => 1, '9' => 2, '16' => 4]],
                    ['id' => 'pistachio', 'label' => 'Фисташка', 'img' => 'pistachio.jpg', 'default' => ['3' => 0, '9' => 2, '16' => 4]],
                ];

                foreach ($flavors as $flavor): ?>
                    <div class="flavor-inline" data-flavor-id="<?php echo $flavor['id']; ?>">
                        <img src="<?php echo $flavor['img']; ?>" alt="<?php echo $flavor['label']; ?>" title="<?php echo $flavor['label']; ?>" />
                        <input type="number" min="0" max="16"
                               value="<?php echo $flavor['default']['9']; ?>"
                               class="flavor-qty-input" />
                    </div>
                <?php endforeach; ?>
            </div>

            <label>
                Количество коробок:
                <input type="number" class="box-count-input" min="1" value="1" />
            </label>

            <div class="box-price">
                Цена: <span class="price-value">790</span> ₽
            </div>

            <button type="button" class="remove-box-btn" style="display:none;">Удалить коробку</button>
        </div>
    </div>

    <button id="add-box-btn" type="button">Добавить коробку</button>

    <div id="total-price-container">
        Общая сумма: <span id="total-price">790</span> ₽
    </div>

    <button id="submit-order" type="button" disabled>Добавить в корзину</button>
</div>

<script src="order-ptimilk.js"></script>
