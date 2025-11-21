// ✅ VERSIÓN CORREGIDA - Compatible con tu estructura MongoDB
// Tu BD usa: nombre, apellido, edad, telefono, correo, passwords
document.addEventListener("DOMContentLoaded", async () => {
    console.log("🔍 [DEBUG] Iniciando perfil.js");

    // 1. Validaciones iniciales
    const sesionActiva = localStorage.getItem("sesionActiva");
    const contenedor = document.getElementById("user-menu-container");

    console.log("📦 [DEBUG] Contenedor encontrado:", contenedor);
    console.log("🔐 [DEBUG] Sesión activa:", sesionActiva);

    if (!contenedor) {
        console.warn("⚠️ [DEBUG] No se encontró #user-menu-container en esta página");
        return;
    }
0
    if (!sesionActiva) {
        console.log("ℹ️ [DEBUG] No hay sesión activa");
        return;
    }

    const perfil = JSON.parse(localStorage.getItem("usuario"));
    
    if (!perfil || (!perfil.correo && !perfil.email)) {
        console.error("❌ [DEBUG] Datos de usuario inválidos en localStorage");
        console.log("Datos recibidos:", perfil);
        return;
    }

    const emailUsuario = perfil.correo || perfil.email;
    console.log("📧 [DEBUG] Email a usar:", emailUsuario);

    let usuario = null;

    // 2. OBTENER PERFIL DEL BACKEND
    try {
        console.log("📡 [DEBUG] Solicitando perfil al backend...");
        
        const res = await fetch("http://localhost:8081/api/perfil/obtener", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // ✅ CAMBIO: Enviar "correo" en lugar de "email"
            body: JSON.stringify({ email: emailUsuario })
        });

        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();
        usuario = data.usuario;
        
        console.log("✅ [DEBUG] Perfil obtenido correctamente:", usuario);

    } catch (err) {
        console.error("❌ [DEBUG] Error al obtener el perfil:", err);

        // Mostrar mensaje al usuario antes de cerrar sesión
        alert("No se pudo cargar tu perfil. Por favor, inicia sesión nuevamente.");
        
        localStorage.clear();
        window.location.href = "../pages/login.html";
        return;
    }

    // 3. OCULTAR BOTÓN DE LOGIN
    const loginBtn = document.getElementById("login");
    if (loginBtn) {
        loginBtn.classList.add("hidden");
        console.log("👁️ [DEBUG] Botón de login ocultado");
    }

    // 4. CREAR MENÚ DEL USUARIO
    contenedor.innerHTML = `
        <div class="relative">
            <button id="user-menu-btn" 
                class="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md hover:scale-105 transition-transform">
                <span id="user-avatar"></span>
            </button>

            <div id="user-dropdown"
                class="hidden absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 
                       transition-all duration-200 ease-out overflow-hidden transform origin-top scale-95 opacity-0">

                <div class="px-4 py-3 border-b border-gray-200">
                    <p class="text-sm font-semibold text-gray-900" id="user-name"></p>
                    <p class="text-xs text-gray-500" id="user-email"></p>
                </div>

                <a href="../pages/perfil.html"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 
                           hover:bg-blue-100 hover:text-blue-800 
                           active:bg-blue-200 transition-all duration-150 rounded-md cursor-pointer">
                    Mi Perfil
                </a>

                <button id="logout-btn"
                    class="flex items-center w-full px-4 py-3 text-sm text-gray-600
                           hover:bg-blue-100 hover:text-blue-800 
                           active:bg-blue-200 transition-all duration-150 rounded-md cursor-pointer">
                    Cerrar sesión
                </button>
            </div>
        </div>
    `;

    console.log("🎨 [DEBUG] Menú de usuario creado");

    // 5. INSERTAR DATOS DEL USUARIO
    document.getElementById("user-name").textContent =
        `${usuario.nombre} ${usuario.apellido}`;

    document.getElementById("user-email").textContent = usuario.correo;

    const avatar = `${usuario.nombre[0]}${usuario.apellido[0]}`.toUpperCase();
    document.getElementById("user-avatar").textContent = avatar;

    console.log("📝 [DEBUG] Datos de usuario insertados en el DOM");

    // 6. ABRIR / CERRAR MENÚ
    document.getElementById("user-menu-btn").addEventListener("click", () => {
        const drop = document.getElementById("user-dropdown");

        if (drop.classList.contains("hidden")) {
            drop.classList.remove("hidden");

            setTimeout(() => {
                drop.classList.remove("opacity-0", "scale-95");
                drop.classList.add("opacity-100", "scale-100");
            }, 20);

        } else {
            drop.classList.remove("opacity-100", "scale-100");
            drop.classList.add("opacity-0", "scale-95");

            setTimeout(() => drop.classList.add("hidden"), 150);
        }
    });

    // 7. CERRAR SESIÓN + TOAST (Movido dentro del DOMContentLoaded)
    document.addEventListener("click", (e) => {
        if (e.target.id === "logout-btn") {
            console.log("🚪 [DEBUG] Cerrando sesión...");

            localStorage.clear();
            const toast = document.getElementById("logout-toast");

            if (toast) {
                toast.classList.remove("hidden");
                setTimeout(() => toast.classList.add("opacity-100"), 20);

                setTimeout(() => {
                    toast.classList.remove("opacity-100");
                    setTimeout(() => {
                        window.location.href = "../pages/login.html";
                    }, 500);
                }, 1800);
            } else {
                // Si no hay toast, redirigir inmediatamente
                window.location.href = "../pages/login.html";
            }
        }
    });

    console.log("✅ [DEBUG] perfil.js cargado completamente");
});