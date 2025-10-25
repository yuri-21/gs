<?php
session_start();

if (!isset($_SESSION['cart'])) {
  $_SESSION['cart'] = [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_name'])) {
  $name = $_POST['product_name'];
  $qty = intval($_POST['qty']);

  // Проверим: если товар уже есть, увеличим количество
  $found = false;
  foreach ($_SESSION['cart'] as &$item) {
    if ($item['name'] === $name) {
      $item['qty'] += $qty;
      $found = true;
      break;
    }
  }
  unset($item);

  if (!$found) {
    $_SESSION['cart'][] = ['name' => $name, 'qty' => $qty];
  }
}

header('Location: cart.php');
exit;