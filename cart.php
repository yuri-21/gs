<!--/*
<?php
session_start();

// Инициализация корзины
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

include 'header.php';
?>

<main>
    <div class="cart-page">
        <div class="cart-content">
            <h2>Корзина</h2>

            <?php if (empty($_SESSION['cart'])): ?>
                <div class="cart-empty">
                    <p>Ваша корзина пуста</p>
                    <a href="/" class="btn-primary">Перейти к продуктам</a>
                </div>
            <?php else: ?>
                <div class="cart-items">
                    <!-- Здесь будут товары из корзины --><!--/*
                    <p>Функционал корзины в разработке</p>
                    <p>Добавленные товары отобразятся здесь</p>
                </div>

                <div class="cart-summary">
                    <h3>Итого</h3>
                    <p class="cart-total">0 ₽</p>
                    <button class="btn-primary btn-full-width" onclick="checkout()">Оформить заказ</button>
                </div>

                <a href="/" class="back-link">← Продолжить покупки</a>
            <?php endif; ?>
        </div>
    </div>
</main>

<?php include 'footer.php'; ?>

*/-->

<?php include 'header.php'; ?>

<?php
// cart.php - минимальная страница корзины

?>
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<title>Корзина</title>
<link rel="stylesheet" href="/order-ptimilk.css" />
</head>
<body>
<h1>Ваша корзина</h1>
<div id="cart-root"></div>
<script src="/cart.js"></script>
</body>
</html>

<?php include 'footer.php'; ?>