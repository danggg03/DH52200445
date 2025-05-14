document.querySelectorAll('.div-box-2').forEach(box => {
  const id = box.getAttribute('data-id');
  if (id) {
    box.style.cursor = 'pointer';
    box.addEventListener('click', () => {
      window.location.href = `product-detail.html?id=${id}`;
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".menu .nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});

const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelector(".categories");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".menu .nav");
  let isMobile = window.innerWidth <= 768;

  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
  });


  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });


  categories.addEventListener('click', (e) => {
    if (isMobile) {
      e.preventDefault();
      const content = categories.querySelector(".categories-content");
      content.classList.toggle("active");
    }
  });

  document.addEventListener('click', (e) => {
    if (!categories.contains(e.target)) {
      categories.querySelector(".categories-content").classList.remove("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".menu .nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});


document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartCount = document.getElementById('cart-count');
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = total;
    }

    function updateCartDropdown() {
        cartItems.innerHTML = '';
        let totalAmount = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="padding: 10px;">Giỏ hàng của bạn trống.</p>';
            totalPrice.textContent = 'Tổng cộng: 0₫';
            return;
        }

        cart.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('cart-item');
            listItem.setAttribute('data-id', item.id);

            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <span class="cart-item-title">${item.title}</span>
                    <span class="cart-item-price">${item.price} x ${item.quantity}</span>
                    <div class="quantity-controls">
                        <button class="decrease" data-id="${item.id}">−</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}" title="Xóa"><i class="fa fa-trash"></i></button>
            `;

            cartItems.appendChild(listItem);

            totalAmount += parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity;
        });

        totalPrice.textContent = `Tổng cộng: ${totalAmount.toLocaleString('vi-VN')}₫`;
    }

    function addToCart(button) {
        const productBox = button.closest('.div-box-2');
        const productId = productBox.getAttribute('data-id');
        const productTitle = productBox.querySelector('.product-title')?.innerText || "Không rõ tên";
        const productPrice = productBox.querySelector('.price')?.innerText || "0";
        const productImage = productBox.querySelector('img')?.getAttribute('src') || "";

        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                id: String(productId),
                title: productTitle,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
        }

        saveCart();
        updateCartCount();
        updateCartDropdown();
        cartDropdown.style.display = 'block';
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            addToCart(this);
        });
    });

    cartButton.addEventListener('click', () => {
        updateCartDropdown();
        cartDropdown.style.display = 'block';
    });

    const closeCartButton = document.getElementById('close-cart');
    closeCartButton.addEventListener('click', () => {
        cartDropdown.style.display = 'none';
    });

    cartItems.addEventListener('click', function (e) {
        const target = e.target;
        const productId = target.getAttribute('data-id') || target.closest('[data-id]')?.getAttribute('data-id');
        if (!productId) return;

        if (target.classList.contains('increase')) {
            const item = cart.find(i => String(i.id) === String(productId));
            if (item) {
                item.quantity += 1;
                saveCart();
                updateCartCount();
                updateCartDropdown();
            }
        } else if (target.classList.contains('decrease')) {
            const item = cart.find(i => String(i.id) === String(productId));

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                   cart = cart.filter(i => String(i.id) !== String(productId));

                }
                saveCart();
                updateCartCount();
                updateCartDropdown();
            }
        } else if (target.classList.contains('remove-item') || target.closest('.remove-item')) {
            cart = cart.filter(i => String(i.id) !== String(productId));

            saveCart();
            updateCartCount();
            updateCartDropdown();
        }
    });

    updateCartCount();
    updateCartDropdown();
});
