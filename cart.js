const CART_KEY = 'my_shop_cart';

function loadCart() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderCart() {
  const root = document.getElementById('cart-root');
  const cart = loadCart();

  root.innerHTML = '';
  if (cart.length === 0) {
    root.innerHTML = `
      <div class="cart-empty">
        <p>Ваша корзина пуста</p>
        <a href="/" class="btn-primary">Перейти к продуктам</a>
      </div>`;
    return;
  }

  let totalSum = 0;

  cart.forEach((product, i) => {
    const price = product.price || 0;
    totalSum += price;

    const el = document.createElement('div');
    el.className = 'cart-item';

    el.innerHTML = `
      <h3>${product.id}</h3>
      <pre>${JSON.stringify(product.config, null, 2)}</pre>
      <p>Цена: ${price.toLocaleString('ru-RU')} ₽</p>
      <button data-remove="${i}">Удалить</button>
    `;

    el.querySelector(`[data-remove="${i}"]`).onclick = () => {
      removeFromCart(i);
    };

    root.appendChild(el);
  });

  const sumEl = document.createElement('div');
  sumEl.className = 'cart-total';
  sumEl.innerText = `Итого: ${totalSum.toLocaleString('ru-RU')} ₽`;
  root.appendChild(sumEl);

  const orderButton = document.createElement('button');
  orderButton.className = 'btn-primary btn-full-width';
  orderButton.innerText = 'Оформить заказ';
  orderButton.onclick = () => {
    checkout();
  };
  root.appendChild(orderButton);
}

function removeFromCart(index) {
  const cart = loadCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

// Функция добавления товара из конфигуратора в корзину
function addToCart(product) {
  const cart = loadCart();
  cart.push(product);
  saveCart(cart);
  alert('Товар добавлен в корзину');
}

// Функция оформления (заглушка)
function checkout() {
  alert('Функция оформления в разработке');
}

window.cartModule = {
  addToCart,
  renderCart
};

document.addEventListener('DOMContentLoaded', renderCart);
