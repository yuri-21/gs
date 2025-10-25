<?php
session_start();
include 'includes/header.php';

if (!isset($_SESSION['cart'])) {
  $_SESSION['cart'] = [];
}

// Удаление товара из корзины
if (isset($_GET['remove'])) {
  $key = $_GET['remove'];
  unset($_SESSION['cart'][$key]);
  header('Location: cart.php');
  exit;
}
?>

<div style="max-width:800px; margin:40px auto; background:#fff; padding:20px; border-radius:12px; box-shadow:0 4px 10px rgba(0,0,0,.1);">
  <h2 style="font-family:'Rouge Script', cursive; font-size:48px; color:#b76e79; margin-bottom:20px;">Корзина</h2>

  <?php if (empty($_SESSION['cart'])): ?>
    <p style="font-size:18px;">Корзина пуста.</p>
  <?php else: ?>
    <table style="width:100%; border-collapse:collapse;">
      <tr style="background:#fff3f5;">
        <th style="padding:10px;">Товар</th>
        <th style="padding:10px;">Количество</th>
        <th style="padding:10px;">Удалить</th>
      </tr>
      <?php foreach ($_SESSION['cart'] as $key => $item): ?>
        <tr>
          <td style="padding:10px;"><?= htmlspecialchars($item['name']) ?></td>
          <td style="padding:10px;"><?= intval($item['qty']) ?></td>
          <td style="padding:10px;"><a href="cart.php?remove=<?= $key ?>" style="color:#b76e79;">✖</a></td>
        </tr>
      <?php endforeach; ?>
    </table>
  <?php endif; ?>

  <div style="margin-top:30px;">
    <a href="/" style="color:#b76e79;">← Вернуться к покупкам</a>
  </div>
</div>

<?php
include 'includes/footer.php';
?>