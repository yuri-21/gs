// cart.js
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('cart-root');
  const CART_KEY = 'gs_cart';

  function loadCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  }

  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  function formatSum(val) {
    return (val || 0).toLocaleString('ru-RU') + ' ₽';
  }

  function render() {
    const items = loadCart();
    root.innerHTML = '';

    if (items.length === 0) {
      root.innerHTML = '<div class="cart-empty">Корзина пуста</div>';
      return;
    }

    const list = document.createElement('div');
    list.className = 'cart-list';

    let total = 0;
    items.forEach((item, i) => {
      const sum = item.price * item.qty;
      total += sum;
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-details">
          <span>${item.qty} × ${formatSum(item.price)}</span>
          <span class="cart-item-sum">${formatSum(sum)}</span>
        </div>
        <span class="cart-remove" data-rm="${i}">удалить</span>
      `;
      list.append(el);
    });
    root.append(list);

    const totalEl = document.createElement('div');
    totalEl.className = 'cart-total';
    totalEl.innerHTML = `Итого: ${formatSum(total)}`;
    root.append(totalEl);

    root.querySelectorAll('[data-rm]').forEach(btn => {
      btn.onclick = e => {
        const idx = +e.target.dataset.rm;
        const items = loadCart();
        items.splice(idx, 1);
        saveCart(items);
        render();
      };
    });
  }

  // Экспорт функции для добавления в корзину
  window.Cart = {
    add(item) {
      const items = loadCart();
      items.push(item);
      saveCart(items);
      alert('Товар добавлен в корзину!');
      render();
    },
    render
  };

  render();
});
