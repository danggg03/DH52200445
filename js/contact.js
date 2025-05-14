document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    function validateContactForm() {
        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");
        const emailInput = document.getElementById("email");
        const subjectInput = document.getElementById("subject");
        const messageInput = document.getElementById("message");

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        let isValid = true;

        // Xóa các thông báo lỗi cũ nếu có
        document.querySelectorAll(".contact-error-message").forEach(e => e.remove());

        // Hàm tạo và hiển thị thông báo lỗi
        function showError(inputElement, message) {
            const error = document.createElement("div");
            error.className = "contact-error-message";
            error.style.color = "red";
            error.style.fontSize = "1.2rem";
            error.textContent = message;
            inputElement.parentNode.appendChild(error);
        }

        if (name === "") {
            console.log("Tên không hợp lệ");
            showError(nameInput, "Vui lòng nhập tên của bạn.");
            isValid = false;
        }

        if (phone === "") {
            console.log("Số điện thoại không hợp lệ");
            showError(phoneInput, "Vui lòng nhập số điện thoại của bạn.");
            isValid = false;
        }

        if (email === "" || !validateEmail(email)) {
            console.log("Email không hợp lệ");
            showError(emailInput, "Vui lòng nhập một địa chỉ email hợp lệ.");
            isValid = false;
        }

        if (subject === "") {
            console.log("Tiêu đề không hợp lệ");
            showError(subjectInput, "Vui lòng nhập tiêu đề.");
            isValid = false;
        }

        if (message === "") {
            console.log("Lời nhắn không hợp lệ");
            showError(messageInput, "Vui lòng nhập lời nhắn.");
            isValid = false;
        }

        if (isValid) {
            console.log("Gửi lời nhắn thành công!");
            alert("Gửi lời nhắn thành công!");
            contactForm.reset();
        }
    }

    function validateEmail(email) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }

    // Gắn hàm xử lý submit
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Đang kiểm tra form...");
        validateContactForm();
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".menu .nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});

// Back to Top Button
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

  // Xử lý resize window
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
  });

  // Xử lý menu toggle
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Xử lý dropdown categories
  categories.addEventListener('click', (e) => {
    if (isMobile) {
      e.preventDefault();
      const content = categories.querySelector(".categories-content");
      content.classList.toggle("active");
    }
  });

  // Đóng dropdown khi click ra ngoài
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
    // 🔄 Lấy giỏ hàng từ localStorage nếu có
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
        const productBox = button.closest('.div-box, .div-box-1');
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

        saveCart(); // 🔒 Lưu lại vào localStorage
        updateCartCount();
        updateCartDropdown();
        cartDropdown.style.display = 'block';
    }

    // Gắn sự kiện cho nút thêm vào giỏ
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

    // Lúc load trang cũng phải cập nhật lại
    updateCartCount();
    updateCartDropdown();
});

