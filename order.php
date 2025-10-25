<?php
// Определяем текущую страницу
$current_page = basename($_SERVER['PHP_SELF'], '.php');

// Карта соответствия страниц и модулей заказа
$order_modules = [
    'ptimilk' => 'order-ptimilk.php',
    'iriska' => 'order-iriska.php',
    'nuts' => 'order-nuts.php',
    'halva' => 'order-halva.php'
];

// Подключаем нужный модуль
if (array_key_exists($current_page, $order_modules) && file_exists($order_modules[$current_page])) {
    include $order_modules[$current_page];
} else {
    echo '<div class="order-block"><p>Модуль заказа недоступен</p></div>';
}
?>