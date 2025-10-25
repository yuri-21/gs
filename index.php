<?php
session_start();
include 'includes/header.php';
?>

<div class="products-grid">
    <a href="ptimilk.php" class="product-card">
        <img src="images/ptimilk.jpg" alt="Конфеты Птимилк">
        <h3>Конфеты Птимилк</h3>
    </a>

    <a href="iriska.php" class="product-card">
        <img src="images/iriska.jpg" alt="Ириски сливочные">
        <h3>Ириски сливочные</h3>
    </a>

    <a href="nuts.php" class="product-card">
        <img src="images/nuts.jpg" alt="Орешки со сгущенным молоком">
        <h3>Орешки со сгущенным молоком</h3>
    </a>

    <a href="halva.php" class="product-card">
        <img src="images/halva.jpg" alt="Халва натуральная">
        <h3>Халва натуральная</h3>
    </a>
</div>

<?php
include 'includes/footer.php';
?>