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
            "/public/images/products/t-shirt-2-back.webp"
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
            "/public/images/products/t-shirt-3.webp",
            "/public/images/products/t-shirt-3-back.webp"
        ] ,
        precio: "$87.000",
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 6,
        nombre: "jacket off-white",
        imagenes: [
            "/public/images/products/t-shirt-3.webp",
            "/public/images/products/t-shirt-3-back.webp"
        ] ,
        precio: "$120.000",
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    },
    {
        id: 7,
        nombre: "t-shirt chelsea",
        imagenes: [
            "/public/images/products/t-shirt-3.webp",
            "/public/images/products/t-shirt-3-back.webp"
        ] ,
        precio: "$50.000",
        caracteristicas: ["100% cotton", "1/1 piece", "made in france"]
    }
];

document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = parseInt(urlParams.get('id'));

    // Buscar el producto en el array
    const producto = productos.find(p => p.id === productoId);

    if (producto) {
        // Actualizar el contenido de la página
        document.getElementById("product-title").textContent = producto.nombre;
        document.getElementById("product-imagen").src = producto.imagen;
        document.getElementById("product-price").textContent = producto.precio;

        const listaCaracteristicas = document.getElementById("product-details");
        listaCaracteristicas.innerHTML = producto.caracteristicas.map(car => `<li>${car}</li>`).join("");
    } else {
        // Si no se encuentra el producto, mostrar un mensaje de error
        document.getElementById("product-title").textContent = "Producto no encontrado";
    }
});