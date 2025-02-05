const productos = [
    {
        id: 1,nombre: "t-shirt shit-off",imagenes: ["/public/images/products/t-shirt-1.webp","/public/images/products/t-shirt-1-back.webp"] ,precio: "$37.000",caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 2,
        nombre: "t-shirt beamer",
        imagenes: [
            "/public/images/products/t-shirt-2.webp",
            "/public/images/products/t-shirt-2-back.webp"
        ] ,
        precio: "$32.000",
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 3,
        nombre: "jacket casablanca",
        imagenes: [
            "/public/images/products/jacket-1.webp",
            "/public/images/products/jacket-1-back.webp"
        ] ,
        precio: "$107.000",
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 4,
        nombre: "t-shirt anti social",
        imagenes: [
            "/public/images/products/t-shirt-3.webp",
            "/public/images/products/t-shirt-3-back.webp"
        ] ,
        precio: "$47.000",
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 5,
        nombre: "jean trasher",
        imagenes: [
            "/public/images/products/jean.webp",
            "/public/images/products/jean-model.webp"
        ] ,
        precio: "$87.000",
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 6,
        nombre: "jacket off-white",
        imagenes: [
            "/public/images/products/jacket-2.webp",
            "/public/images/products/jacket-2-model.webp"
        ] ,
        precio: "$120.000",
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 7,
        nombre: "t-shirt chelsea",
        imagenes: [
            "/public/images/products/t-shirt-4.webp",
            "/public/images/products/t-shirt-4-model.webp"
        ] ,
        precio: "$50.000",
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    }
];


document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = parseInt(urlParams.get('id'));

    const imagenProducto = document.getElementById('product-imagen');
    const productTitle = document.getElementById("product-title");
    const productPrice = document.getElementById("product-price")
    const listaCaracteristicas = document.getElementById("product-details");


    const addToCartBtn = document.getElementById("add-to-cart-btn");  // Elemento del botón

    // Verificar que el botón exista
    if (addToCartBtn) {
        // Buscar el producto en el array
        const producto = productos.find(p => p.id === productoId);

        if (producto) {
            // Actualizar el contenido de la página
            productTitle.textContent = producto.nombre;
            imagenProducto.src = producto.imagenes[0];
            productPrice.textContent = producto.precio;

            listaCaracteristicas.innerHTML = producto.caracteristicas.map(car => `<li>${car}</li>`).join("");
        } else {
            // Si no se encuentra el producto, mostrar un mensaje de error
            console.log("Producto no encontrado.");
        }

      // Obtener o inicializar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


        // Función para agregar el producto al carrito
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace redirija
            if (producto) {
                carrito.push(producto); // Agrega el producto al array del carrito
                localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda en localStorage
                console.log("Producto añadido:", producto);
            }
        });
    } else {
        console.error("El botón 'agregar al carrito' no se encuentra.");
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

    // Seleccionar tamaño
    const sizes = document.querySelectorAll('.showcase__sizes .sizes');

    sizes.forEach(size => {
        size.addEventListener('click', function () {
            sizes.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });

    if (sizes.length > 0) {
        sizes[0].classList.add('active');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-container");
    const cartTotal = document.getElementById("cart-total");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function renderCart() {
        cartContainer.innerHTML = ""; // Limpiar contenido previo

        if (carrito.length === 0) {
            cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
            cartTotal.textContent = "$0";
            return;
        }

        let total = 0;

        carrito.forEach((producto, index) => {
            total += producto.precio;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart__item");
            cartItem.innerHTML = `
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
                    <p>${producto.precio} x <input type="number" value="1" min="1" class="cart-quantity" data-index="${index}"></p>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;

        // Agregar eventos para eliminar productos
        document.querySelectorAll(".close__btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const index = e.target.closest(".close__btn").dataset.index;
                carrito.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(carrito));
                renderCart();
            });
        });

        // Actualizar total cuando se cambie la cantidad
        document.querySelectorAll(".cart-quantity").forEach(input => {
            input.addEventListener("input", () => {
                let newTotal = 0;
                document.querySelectorAll(".cart-quantity").forEach((input, i) => {
                    newTotal += carrito[i].precio * parseInt(input.value);
                });
                cartTotal.textContent = `$${newTotal.toFixed(2)}`;
            });
        });
    }

    renderCart();
});
