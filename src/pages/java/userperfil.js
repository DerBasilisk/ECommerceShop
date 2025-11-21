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

    

    console.log("🎨 [DEBUG] Menú de usuario creado");

    // 5. INSERTAR DATOS DEL USUARIO
    document.getElementById("perfil-nombre").textContent = usuario.nombre;
    document.getElementById("perfil-apellido").textContent = usuario.apellido;
    document.getElementById("perfil-correo").textContent = usuario.correo;
    document.getElementById("perfil-id").textContent = usuario.userId;
    document.getElementById("perfil-telefono").textContent = usuario.telefono;
    document.getElementById("perfil-passwords").textContent = "***********";
    document.getElementById("perfil-edad").textContent = usuario.edad;

    console.log("📝 [DEBUG] Datos de usuario insertados en el DOM");

    console.log("✅ [DEBUG] perfil.js cargado completamente");
});