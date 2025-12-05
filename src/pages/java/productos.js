// Función para cargar productos
async function cargarproductos() {
    try {
      const response = await fetch("http://localhost:8081/api/productos");
      const productos = await response.json();
  
      const grid = document.getElementById("products-grid");
      if (!grid) return; // <-- evita el error cuando no existe el grid
  
      grid.innerHTML = productos
        .map(
          (producto) => `
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 product-card"
             data-category="laptops"
             data-price="${producto.precio}"
             data-product-id="${producto.productId}">
          
          <div class="bg-linear-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center overflow-hidden">
            <img src="${producto.imagen}" 
                 alt="${producto.nombre}"
                 class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                 loading="lazy">
          </div>
  
          <div class="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -15%
          </div>
  
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-800">${producto.nombre}</h3>
            <p class="text-sm text-gray-800 mb-4">${producto.descripcion}</p>
  
            <div class="flex items-center justify-between mb-4">
              <div>
                <span class="text-2xl font-bold text-blue-600">
                  ${(producto.precio || 0).toLocaleString("es-CO")}
                </span>
              </div>
              <div class="flex text-yellow-600">⭐️⭐️⭐️⭐️⭐️</div>
            </div>
  
            <div class="flex space-x-2">
              <button class="ver-detalles-btn bg-linear-to-br from-green-500 to-green-600 text-white px-3 py-2 rounded-lg hover:from-green-900 hover:to-green-800 active:from-green-600 active:to-green-600  transition duration-300 flex-1 text-sm">
                Ver Detalles
              </button>
              <button class="add-to-cart bg-linear-to-br from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg hover:from-blue-800 hover:to-blue-900 active:from-blue-600 active:to-blue-600  transition duration-300 flex-1 text-sm"  data-id="${producto.productId}">
                Comprar
              </button>
            </div>
          </div>
        </div>
      `
        )
        .join("");
  
      console.log("✅ Productos cargados con éxito");
    } catch (error) {
      console.error("❌ Error al cargar los productos:", error);
    }
  }
  
// solo inicializa si existe el contenedor
if (document.getElementById("products-grid")) {
  cargarproductos();
  setInterval(cargarproductos, 5000);
}

//carrito conchetumare

function mostrarToastCarrito() {
  const toast = document.getElementById("cart-toast");

  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("opacity-100"), 10);

  // Ocultar después de 2.5 segundos
  setTimeout(() => {
      toast.classList.remove("opacity-100");
      setTimeout(() => toast.classList.add("hidden"), 500);
  }, 2500);
}


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
      const id = e.target.getAttribute("data-id");

      const productoCard = e.target.closest(".product-card");

      const producto = {
          id: id,
          nombre: productoCard.querySelector("h3").textContent,
          precio: Number(productoCard.dataset.price),
          imagen: productoCard.querySelector("img").src,
          descripcion: productoCard.querySelector("p").textContent
      };

      agregarAlCarrito(producto);
      mostrarToastCarrito();   // ✔ TOAST

      console.log("🛒 Producto agregado al carrito:", producto);
  }
});




function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find(item => item.id == producto.id);

  if (existente) {
      existente.cantidad++;
  } else {
      carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}
