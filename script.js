
let darkmode = localStorage.getItem('darkmode');
const themeStich = document.getElementById('theme-switch');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode','active');

}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode',null)
}

if(darkmode === "active") enableDarkMode();

themeStich.addEventListener("click",() => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkMode() : disableDarkMode()
})



// array de productos 
const productos = [
    {
        id: 1,
        nombre: "t-shirt shit-off",
        imagenes: ["../public/images/products/t-shirt-1.webp","../public/images/products/t-shirt-1-back.webp"] ,
        precio: 37000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 2,
        nombre: "t-shirt beamer",
        imagenes: [ "../public/images/products/t-shirt-2.webp", "../public/images/products/t-shirt-2-back.webp"] ,
        precio: 32000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 3,
        nombre: "jacket casablanca",
        imagenes: [
            "../public/images/products/jacket-1.webp",
            "../public/images/products/jacket-1-back.webp"
        ] ,
        precio: 107000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 4,
        nombre: "t-shirt anti social",
        imagenes: [
            "../public/images/products/t-shirt-3.webp",
            "../public/images/products/t-shirt-3-back.webp"
        ] ,
        precio: 47000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 5,
        nombre: "jean trasher",
        imagenes: [
            "../public/images/products/jean.webp",
            "../public/images/products/jean-model.webp"
        ] ,
        precio: 87000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 6,
        nombre: "jacket off-white",
        imagenes: [
            "../public/images/products/jacket-2.webp",
            "../public/images/products/jacket-2-model.webp"
        ] ,
        precio: 120000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 7,
        nombre: "t-shirt chelsea",
        imagenes: [
            "../public/images/products/t-shirt-4.webp",
            "../public/images/products/t-shirt-4-model.webp"
        ] ,
        precio: 50000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    }
];

// Variables globales
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para actualizar la cantidad en el ícono del carrito
function actualizarCantidadCarrito() {
    const cantidadTotal = carrito.reduce((acc, producto) => acc + (producto.cantidad || 1), 0);
    const cartBag = document.getElementById("cart-shopping-amount");

    if (cartBag) {
        cartBag.textContent = cantidadTotal;
    }
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    const cartTotals = document.querySelectorAll(".cart-total");
    const shippingCostElement = document.getElementById("shipping-cost");

    const subtotal = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
    const shippingCost = carrito.length > 0 ? 30 : 0; // Agrega el costo solo si hay productos en el carrito
    const total = subtotal + shippingCost;

    if (cartTotals.length > 0) {
        cartTotals[0].textContent = `$${subtotal.toLocaleString()}`; // Subtotal
        cartTotals[1].textContent = `$${total.toLocaleString()}`;    // Total con envío
    }

    if (shippingCostElement) {
        shippingCostElement.textContent = `$${shippingCost}`;
    }
}


// Función para renderizar el carrito
function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    const cartTotalContainer = document.getElementById("cart-total-container");

    if (!cartContainer || !cartTotalContainer) return;

    if (carrito.length === 0) {
        cartContainer.innerHTML = '<p style="color:red; margin-top: 0.7rem; text-align: center; font-size: 1rem; ;">Tu carrito está vacío</p>';
        cartTotalContainer.style.display = "none"; // Oculta la sección de total y botones
    } else {
        cartContainer.innerHTML = carrito.map((producto, index) => `
            <div class="cart__container">
                <div class="cart__title">
                    <h3>${producto.nombre}</h3>
                    <a href="#" class="close__btn" data-index="${index}">
                        <img src="public/images/icons/xmark-solid.svg" alt="Eliminar">
                    </a>
                </div>
                <div class="cart__img">
                    <img src="${producto.imagenes[0]}" alt="${producto.nombre}">
                </div>
                <div class="cart__price">
                    <p>$${producto.precio.toLocaleString()} x 
                    <input class="cart-quantity" type="number" value="${producto.cantidad || 1}" min="1" data-index="${index}">
                    </p>
                </div>
            </div>
        `).join("");

        cartTotalContainer.style.display = "block"; // Muestra la sección de total si hay productos
    }

    // Eventos para eliminar productos
    document.querySelectorAll(".close__btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const index = e.target.closest(".close__btn").dataset.index;
            carrito.splice(index, 1);
            guardarCarrito();
            renderCart();
            actualizarCantidadCarrito();
        });
    });

    // Eventos para actualizar cantidad
    document.querySelectorAll(".cart-quantity").forEach(input => {
        input.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            let nuevaCantidad = parseInt(e.target.value);

            if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
                nuevaCantidad = 1;
                e.target.value = nuevaCantidad;
            }

            carrito[index].cantidad = nuevaCantidad;
            guardarCarrito();
            actualizarTotal();
            actualizarCantidadCarrito();
        });
    });

    actualizarTotal();
}


// Función para inicializar la página de productos
function inicializarPaginaProducto() {
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = parseInt(urlParams.get('id'));
    const producto = productos.find(p => p.id === productoId);

    if (!producto) {
        console.log("Producto no encontrado.");
        return;
    }

    const imagenProducto = document.getElementById('product-imagen');
    const productTitle = document.getElementById("product-title");
    const productPrice = document.getElementById("product-price");
    const listaCaracteristicas = document.getElementById("product-details");
    const addToCartBtn = document.getElementById("add-to-cart-btn");

    if (imagenProducto && productTitle && productPrice && listaCaracteristicas && addToCartBtn) {
        productTitle.textContent = producto.nombre;
        imagenProducto.src = producto.imagenes[0];
        productPrice.textContent = `$${producto.precio.toLocaleString()}`;
        listaCaracteristicas.innerHTML = producto.caracteristicas.map(car => `<li>${car}</li>`).join("");

        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const existingProductIndex = carrito.findIndex(p => p.id === producto.id);

            if (existingProductIndex !== -1) {
                carrito[existingProductIndex].cantidad += 1;

                
            } else {
                producto.cantidad = 1;
                carrito.push(producto);
            }
            addToCartBtn.textContent = "¡Añadido al carrito!";
            setTimeout(() => {
                addToCartBtn.textContent = "Agregar al carrito";
            }, 2000)

            guardarCarrito();
            actualizarCantidadCarrito();
            console.log("Producto añadido:", producto);
        });
    }

    // Cambiar la imagen del producto
    const botonImagen1 = document.getElementById('boton-imagen-1');
    const botonImagen2 = document.getElementById('boton-imagen-2');

    if (botonImagen1 && botonImagen2) {
        botonImagen1.addEventListener("click", () => {
            imagenProducto.src = producto.imagenes[0];
            botonImagen1.classList.add("activeBtn");
            botonImagen2.classList.remove("activeBtn");
        });

        botonImagen2.addEventListener("click", () => {
            imagenProducto.src = producto.imagenes[1];
            botonImagen1.classList.remove("activeBtn");
            botonImagen2.classList.add("activeBtn");
        });
    }
}




function renderCheckout() {
    const checkoutContainer = document.querySelector(".checkout__product");
    if (!checkoutContainer) return;

    checkoutContainer.innerHTML = "";


    carrito.forEach(producto => {
        const productoHTML = `
            <div class="product__info">
            <p class="product-title">${producto.nombre}</p>
            <div class="product__img__amount">       
            <img src="${producto.imagenes[0]}" alt="${producto.nombre}">
                <div class="product__amount">
                    <p id="article-cart-price">$${producto.precio.toLocaleString()}</p>
                    <p id="article-cart-amount">x ${producto.cantidad || 1}</p>
                </div>
                </div> 
            </div>
        `;

        checkoutContainer.innerHTML += productoHTML;
    });
}


// Inicializar la página
document.addEventListener("DOMContentLoaded", function () {
    inicializarPaginaProducto();
    renderCart();
    actualizarCantidadCarrito();
    renderCheckout();
});

class Carrito {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.subtotalElement = this.container.querySelector(".cart-subtotal");
        this.totalElement = this.container.querySelector(".cart-total");
        this.shippingElement = this.container.querySelector("#shipping-cost");
        this.taxElement = this.container.querySelector(".cart-taxes");

        this.carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        this.actualizar();
    }

    calcularTotales() {
        const subtotal = this.carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
        const shippingCost = this.carrito.length > 0 ? 30 : 0;
        const taxes = 0;
        const total = subtotal + shippingCost + taxes;

        return { subtotal, shippingCost, total };
    }

    actualizar() {
        if (!this.container) return;

        const { subtotal, shippingCost,  total } = this.calcularTotales();

        if (this.subtotalElement) this.subtotalElement.textContent = `$${subtotal.toLocaleString()}`;
        if (this.shippingElement) this.shippingElement.textContent = `$${shippingCost}`;
        if (this.taxElement) this.taxElement.textContent = `$0`;
        if (this.totalElement) this.totalElement.textContent = `$${total.toLocaleString()}`;
    }

    agregarProducto(producto) {
        const index = this.carrito.findIndex(item => item.id === producto.id);
        if (index !== -1) {
            this.carrito[index].cantidad += 1;
        } else {
            this.carrito.push({ ...producto, cantidad: 1 });
        }
        this.guardarCarrito();
    }

    eliminarProducto(id) {
        this.carrito = this.carrito.filter(item => item.id !== id);
        this.guardarCarrito();
    }

    guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(this.carrito));
        this.actualizar();
    }
}

// Inicializar la clase cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
    const carrito = new Carrito(".cart__value");
});




// checkout form code 
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado');

    const checkoutForm = document.getElementById('checkout-form');
    const checkoutButtons = document.querySelectorAll('.primary__button'); // Detecta ambos botones

    if (checkoutForm) {
        console.log('Formulario de checkout encontrado');

        checkoutButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault(); // Evita el envío predeterminado del formulario

                // Obtiene los valores del formulario
                const formData = {
                    firstName: document.getElementById('first-name')?.value.trim() || '',
                    lastName: document.getElementById('last-name')?.value.trim() || '',
                    country: document.getElementById('country')?.value || '',
                    address: document.getElementById('address')?.value.trim() || '',
                    city: document.getElementById('city')?.value.trim() || '',
                    zipCode: document.getElementById('zipCode')?.value.trim() || '',
                    number: document.getElementById('number')?.value.trim() || ''
                };

                // Verifica que todos los campos estén completos
                const isFormValid = Object.values(formData).every(value => value !== '');
                if (!isFormValid) {
                    console.log('Por favor, completa todos los campos antes de continuar');
                    alert('Por favor, completa todos los campos antes de continuar.');
                    return;
                }

                console.log('Datos del formulario:', formData);

                // Guarda los datos en localStorage
                localStorage.setItem('formData', JSON.stringify(formData));
                console.log('Datos almacenados en localStorage');

                // Redirige a la página de pago
                window.location.href = 'payment.html';
            });
        });
    } else {
        console.log('Formulario de checkout no encontrado');
    }

    // Recupera los datos almacenados para mostrarlos en la página de pago
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        console.log('Datos recuperados de localStorage:', formData);

        const checkoutShow = document.getElementById('checkout-show');

        if (checkoutShow) {
            checkoutShow.innerHTML = `
                <div class = "checkout__details">
                <p><strong>Full Name:</strong> ${formData.firstName} ${formData.lastName}</p>
                <p><strong>Country:</strong> ${formData.country}</p>
                <p><strong>Address:</strong> ${formData.address}</p>
                <p><strong>City:</strong> ${formData.city}</p>
                <p><strong>ZIP Code:</strong> ${formData.zipCode}</p>
                <p><strong>Phone Number:</strong> ${formData.number}</p>
                </div>
            `;
        } 
    } else {
        console.log('No hay datos en localStorage');
    }
});
