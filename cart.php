<?php
session_start();
include 'header.php';
?>

<main>
  <div class="cart-page">
    <div class="cart-content">
      <h2>Корзина</h2>

      <div id="cart-root">
        <!-- Тут JS отрисует корзину: товары, итоги, кнопки -->
      </div>

      <a href="/" class="back-link">← Продолжить покупки</a>
    </div>
  </div>
</main>

<script src="/cart.js"></script>

<?php include 'footer.php'; ?>