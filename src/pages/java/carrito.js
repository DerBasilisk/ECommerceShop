// --- Cargar Carrito ---
function cargarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("tabla-cart"); 
    const subtotalHTML = document.getElementById("subto-compra");
    const totalHTML = document.getElementById("total-compra");

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p class='text-gray-600'>Tu carrito está vacío.</p>";
        subtotalHTML.textContent = "$0";
        totalHTML.textContent = "$0";
        return;
    }

    let subtotal = 0;

    carrito.forEach(producto => {
        subtotal += producto.precio * producto.cantidad;

        contenedor.innerHTML += `
            <div class="bg-white p-4 rounded-xl shadow mb-2">

                             <div class="image-cart grid grid-cols-3">
                                <div class="imagen-cart col-start-1 col-end-1">
                                    <img src="${producto.imagen}" class="h-30">
                                </div>

                            <div class="grid col-start-2 col-end-3 grid-cols-1 grid-rows-2 text-left">

                                <div class="datos-cart row-start-1 row-end-1">
                                    <h3 class="name-prod-cart font-bold">${producto.nombre}</h3>
                                    <p class="desc-prod-cart text-sm text-gray-800 mb-4">${producto.descripcion}</p>

                                </div>
                                
                                <div class="controles-cart row-start-2 row-end-2">
                                    <p class="id-prod-cart font-bold text-blue-600"><span class="text-black">Precio: </span> $${producto.precio}</p>
                                    <p class="cant-prod-cart font-bold text-blue-600"><span class="text-black">Cantidad: </span>${producto.cantidad}</p>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
    });

    subtotalHTML.textContent = "$" + subtotal;
    totalHTML.textContent = "$" + subtotal; // Envío gratis
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", cargarCarrito);
