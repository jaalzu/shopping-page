
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
        imagenes: ["/public/images/products/t-shirt-1.webp","/public/images/products/t-shirt-1-back.webp"] ,
        precio: 37000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 2,
        nombre: "t-shirt beamer",
        imagenes: [
            "/public/images/products/t-shirt-2.webp",
            "/public/images/products/t-shirt-2-back.webp"
        ] ,
        precio: 32000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 3,
        nombre: "jacket casablanca",
        imagenes: [
            "/public/images/products/jacket-1.webp",
            "/public/images/products/jacket-1-back.webp"
        ] ,
        precio: 107000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 4,
        nombre: "t-shirt anti social",
        imagenes: [
            "/public/images/products/t-shirt-3.webp",
            "/public/images/products/t-shirt-3-back.webp"
        ] ,
        precio: 47000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 5,
        nombre: "jean trasher",
        imagenes: [
            "/public/images/products/jean.webp",
            "/public/images/products/jean-model.webp"
        ] ,
        precio: 87000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 6,
        nombre: "jacket off-white",
        imagenes: [
            "/public/images/products/jacket-2.webp",
            "/public/images/products/jacket-2-model.webp"
        ] ,
        precio: 120000,
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 7,
        nombre: "t-shirt chelsea",
        imagenes: [
            "/public/images/products/t-shirt-4.webp",
            "/public/images/products/t-shirt-4-model.webp"
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
    const cartTotalContainer = document.getElementById("cart-total-container")
    if (!cartContainer) return;
    
    
    cartContainer.innerHTML = carrito.length === 0
        ? '<p style="margin-top: 0.5rem; text-align: center; font-size: 1rem; color: #777;">Tu carrito está vacío</p>'
        : carrito.map((producto, index) => `
            <div class="cart__container">
                <div class="cart__title">
                    <h3>${producto.nombre}</h3>
                    <a href="#" class="close__btn" data-index="${index}">
                        <img src="/public/images/icons/xmark-solid.svg" alt="Eliminar">
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





