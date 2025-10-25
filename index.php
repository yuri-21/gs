<?php
session_start();
include 'includes/header.php';
?>

<div class="products-grid">
    <a href="ptimilk.php" class="product-card">
        <img src="ptimilk.jpg" alt="Конфеты Птимилк">
        <h3>Конфеты Птимилк</h3>
    </a>

    <a href="iriska.php" class="product-card">
        <img src="iriska.jpg" alt="Ириски сливочные">
        <h3>Ириски сливочные</h3>
    </a>

    <a href="nuts.php" class="product-card">
        <img src="nuts.jpg" alt="Орешки со сгущенным молоком">
        <h3>Орешки со сгущенным молоком</h3>
    </a>

    <a href="halva.php" class="product-card">
        <img src="halva.jpg" alt="Халва натуральная">
        <h3>Халва натуральная</h3>
    </a>
</div>

<?php
include 'includes/footer.php';
?>