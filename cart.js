// cart.js - локальная корзина на базе localStorage

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
    root.innerHTML = '<p>Корзина пуста</p>';
    return;
  }

  let totalSum = 0;

  cart.forEach((product, i) => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    const price = product.price || 0;
    totalSum += price;

    el.innerHTML = `
      <h3>${product.id}</h3>
      <pre>${JSON.stringify(product.config, null, 2)}</pre>
      <p>Цена: ${price.toLocaleString('ru-RU')} ₽</p>
      <button data-remove="${i}">Удалить</button>
    `;

    el.querySelector(`[data-remove="${i}"]`).onclick = () => {
      removeFromCart(i);
    };
    root.append(el);
  });

  const sumEl = document.createElement('div');
  sumEl.className = 'cart-total';
  sumEl.innerText = `Общая сумма: ${totalSum.toLocaleString('ru-RU')} ₽`;
  root.append(sumEl);
}

function removeFromCart(index) {
  const cart = loadCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function addToCart(product) {
  const cart = loadCart();
  cart.push(product);
  saveCart(cart);
}

// Экспортируем функцию подключения к кнопке добавления товара:
window.cartModule = {
  addToCart,
  renderCart
};

// Автоматически отрисовываем корзину, если есть корень
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-root')) {
    renderCart();
  }
});
