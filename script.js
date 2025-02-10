
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





// funcion para actualizar la cantidad del carrito
function actualizarCantidadCarrito(){
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidadTotal = carrito.reduce((acc,producto) => acc + (producto.cantidad || 1),0)
    const cartBag = document.getElementById("cart-shopping-amount");

    if(cartBag){
        cartBag.textContent = cantidadTotal;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = parseInt(urlParams.get('id'));

    const imagenProducto = document.getElementById('product-imagen');
    const productTitle = document.getElementById("product-title");
    const productPrice = document.getElementById("product-price")
    const listaCaracteristicas = document.getElementById("product-details");
    const addToCartBtn = document.getElementById("add-to-cart-btn");  // Elemento del botón
    
    const botonImagen1 = document.getElementById('boton-imagen-1');
    const botonImagen2 = document.getElementById('boton-imagen-2');
    // variable para hallar el producto     
    const producto = productos.find(p => p.id === productoId);


// FUNCION PARA ACTUALIZAR LA CANTIDAD DE ARTICULOS EN EL CARRITO 
  

    // Verificar que el botón exista
    if (addToCartBtn) {
        // Buscar el producto en el array

        if (producto) {
            // Actualizar el contenido de la página
            productTitle.textContent = producto.nombre;
            imagenProducto.src = producto.imagenes[0];
            productPrice.textContent = `$${producto.precio.toLocaleString()}`;

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
                const existingProductIndex = carrito.findIndex(p => p.id === producto.id);

                if(existingProductIndex !== -1){
                    carrito[existingProductIndex].cantidad += 1;
                }else{
                    producto.cantidad = 1;
                    carrito.push(producto);
                }
                localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda en localStorage
                console.log("Producto añadido:", producto);

                actualizarCantidadCarrito()
            }

        });
    } else {
        console.error("El botón 'agregar al carrito' no se encuentra.");
    }

    actualizarCantidadCarrito()

    // Cambiar la imagen del producto
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
});


document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-container");
    const cartTotal = document.getElementById("cart-total");
    
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function renderCart() {
        cartContainer.innerHTML = "";

        if (carrito.length === 0) {
            cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
            cartTotal.textContent = "$0.00";
            return;
        }

        carrito.forEach((producto, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart__container");

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
                    <p>${producto.precio.toLocaleString()} x 
                    <input class="cart-quantity" type="number" value="${producto.cantidad || 1}" min="1" data-index="${index}">
                    </p>
                </div>
            `;

            cartContainer.appendChild(cartItem);
        });

        actualizarTotal();

        // Eventos para eliminar productos
        document.querySelectorAll(".close__btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const index = e.target.closest(".close__btn").dataset.index;
                carrito.splice(index, 1);
                guardarCarrito();
                renderCart();
                actualizarCantidadCarrito(); // Actualizar el ícono del carrito

            });
        });

        // Eventos para actualizar cantidad y total en tiempo real
        document.querySelectorAll(".cart-quantity").forEach(input => {
            input.addEventListener("change", (e) => {
                const index = e.target.dataset.index;
                let nuevaCantidad = parseInt(e.target.value);

                // Validación para que la cantidad sea siempre mayor que 0
                if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
                    nuevaCantidad = 1; // Restablecer a 1 si el valor es inválido
                    e.target.value = nuevaCantidad; // Actualizar el valor en el input
                }

                carrito[index].cantidad = nuevaCantidad;
                guardarCarrito();
                actualizarTotal();
                actualizarCantidadCarrito(); // Actualizar el ícono del carrito

            });
        });
    }

    function actualizarTotal() {
        let total = carrito.reduce((acc, item) => acc + (item.precio * (item.cantidad || 1)), 0);
        cartTotal.textContent = `$${total.toLocaleString()}`;
    }

    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    renderCart();
});
