const productos = [
    {
        id: 1,
        nombre: "t-shirt shit-off",
        imagenes: [
            "/public/images/products/t-shirt-1.webp",
            "/public/images/products/t-shirt-1-back.webp"
        ] ,
        precio: "$37.000",
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
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
       productTitle.textContent = "Producto no encontrado";
    }


 // funcion para cambiar la imagen del producto
    const botonImagen1 = document.getElementById('boton-imagen-1');
    const botonImagen2 = document.getElementById('boton-imagen-2');

    botonImagen1.addEventListener("click",() => {
        imagenProducto.src = producto.imagenes[0];
        botonImagen1.classList.add("activeBtn");
        botonImagen2.classList.remove("activeBtn");
    })
    botonImagen2.addEventListener("click",() => {
        imagenProducto.src = producto.imagenes[1];
        botonImagen1.classList.remove("activeBtn");
        botonImagen2.classList.add("activeBtn");

    })
});



const sizes = document.querySelectorAll('.showcase__sizes .sizes');

sizes.forEach(size => {
    size.addEventListener('click', function() {
        sizes.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
    });
});

// Opcional: Seleccionar el primer tamaño por defecto
sizes[0].classList.add('active');