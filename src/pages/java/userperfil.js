document.addEventListener("DOMContentLoaded", async () => {
    console.log("🔍 [DEBUG] Iniciando userperfil.js");

    // Verificar sesión activa
    const sesionActiva = localStorage.getItem("sesionActiva");
    if (!sesionActiva) {
        window.location.href = "../pages/login.html";
        return;
    }

    const perfil = JSON.parse(localStorage.getItem("usuario"));
    const emailUsuario = perfil.correo || perfil.email;

    // Variables globales
    let usuarioActual = null;
    let modoEdicion = false;

    // Elementos del DOM
    const elementos = {
        avatar: document.getElementById("user-avat"),
        perfilNombre: document.getElementById("perfil-nombre"),
        perfilApellido: document.getElementById("perfil-apellido"),
        perfilCorreo: document.getElementById("perfil-correo"),
        userNombre: document.getElementById("user-nombre"),
        userApellido: document.getElementById("user-apellido"),
        userCorreo: document.getElementById("user-correo"),
        userTelefono: document.getElementById("user-telefono"),
        btnEditar: document.getElementById("btn-editar-perfil"),
        btnBorrar: document.getElementById("btn-borrar-cuenta"),
        btnCancelar: document.getElementById("btn-cancelar"),
        btnGuardar: document.getElementById("btn-guardar-perfil"),
        modalEditar: document.getElementById("modal-editar-perfil"),
        modalEliminar: document.getElementById("modal-eliminar-cuenta"),
        formEditar: document.getElementById("form-editar-perfil")
    };

    // Ocultar botones de cancelar y guardar inicialmente
    elementos.btnCancelar.classList.add("hidden");
    elementos.btnGuardar.classList.add("hidden");

    // ========== CARGAR PERFIL DEL USUARIO ==========
    async function cargarPerfil() {
        try {
            const res = await fetch("https://e-commerce-smlw.onrender.com/api/perfil/obtener", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailUsuario })
            });

            if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

            const data = await res.json();
            usuarioActual = data.usuario;

            mostrarDatosUsuario(usuarioActual);
            console.log("✅ Perfil cargado correctamente");

        } catch (error) {
            console.error("❌ Error al cargar perfil:", error);
            alert("No se pudo cargar tu perfil. Por favor, inicia sesión nuevamente.");
            localStorage.clear();
            window.location.href = "../pages/login.html";
        }
    }

    // ========== MOSTRAR DATOS EN LA PÁGINA ==========
    function mostrarDatosUsuario(usuario) {
        const avatar = `${usuario.nombre[0]}${usuario.apellido[0]}`.toUpperCase();
        
        elementos.avatar.textContent = avatar;
        elementos.perfilNombre.textContent = usuario.nombre;
        elementos.perfilApellido.textContent = usuario.apellido;
        elementos.perfilCorreo.textContent = usuario.correo;
        elementos.userNombre.textContent = usuario.nombre;
        elementos.userApellido.textContent = usuario.apellido;
        elementos.userCorreo.textContent = usuario.correo;
        elementos.userTelefono.textContent = usuario.telefono || "No especificado";
    }

    // ========== ACTIVAR MODO EDICIÓN ==========
    function activarModoEdicion() {
        modoEdicion = true;

        // Convertir textos en inputs editables
        elementos.userNombre.outerHTML = `<input type="text" id="user-nombre" value="${usuarioActual.nombre}" 
            class="border-2 border-blue-400 rounded-xl h-12 w-full p-2 bg-white text-lg font-medium text-gray-900 focus:ring-2 focus:ring-blue-500">`;
        
        elementos.userApellido.outerHTML = `<input type="text" id="user-apellido" value="${usuarioActual.apellido}" 
            class="border-2 border-blue-400 rounded-xl h-12 w-full p-2 bg-white text-lg font-medium text-gray-900 focus:ring-2 focus:ring-blue-500">`;
        
        elementos.userCorreo.outerHTML = `<input type="email" id="user-correo" value="${usuarioActual.correo}" 
            class="border-2 border-blue-400 rounded-xl h-12 w-full p-2 bg-white text-lg font-medium text-gray-900 focus:ring-2 focus:ring-blue-500">`;
        
        elementos.userTelefono.outerHTML = `<input type="text" id="user-telefono" value="${usuarioActual.telefono || ''}" 
            class="border-2 border-blue-400 rounded-xl h-12 w-full p-2 bg-white text-lg font-medium text-gray-900 focus:ring-2 focus:ring-blue-500">`;

        // Actualizar referencias (porque los elementos se reemplazaron)
        elementos.userNombre = document.getElementById("user-nombre");
        elementos.userApellido = document.getElementById("user-apellido");
        elementos.userCorreo = document.getElementById("user-correo");
        elementos.userTelefono = document.getElementById("user-telefono");

        // Mostrar botones de guardar/cancelar
        elementos.btnEditar.classList.add("hidden");
        elementos.btnBorrar.classList.add("hidden");
        elementos.btnCancelar.classList.remove("hidden");
        elementos.btnGuardar.classList.remove("hidden");

        console.log("✏️ Modo edición activado");
    }

    // ========== CANCELAR EDICIÓN ==========
    function cancelarEdicion() {
        modoEdicion = false;
        cargarPerfil(); // Recargar datos originales

        // Ocultar botones de guardar/cancelar
        elementos.btnCancelar.classList.add("hidden");
        elementos.btnGuardar.classList.add("hidden");
        elementos.btnEditar.classList.remove("hidden");
        elementos.btnBorrar.classList.remove("hidden");
        console.log("🚫 Edición cancelada");
    }

    // ========== GUARDAR CAMBIOS ==========
    async function guardarCambios() {
        try {
            const nuevosDatos = {
                nombre: elementos.userNombre.value.trim(),
                apellido: elementos.userApellido.value.trim(),
                correo: elementos.userCorreo.value.trim(),
                telefono: elementos.userTelefono.value.trim(),
                edad: usuarioActual.edad
            };
    
            const body = {
                emailOriginal: emailUsuario,
                datos: nuevosDatos
            };
    
            const res = await fetch("https://e-commerce-smlw.onrender.com/api/perfil/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
    
            const data = await res.json();
    
            if (!res.ok) throw new Error(data.message || "Error al actualizar");
    
            // Actualizar localStorage si cambia el correo
            if (nuevosDatos.correo !== emailUsuario) {
                const usuarioLS = JSON.parse(localStorage.getItem("usuario"));
                usuarioLS.correo = nuevosDatos.correo;
                localStorage.setItem("usuario", JSON.stringify(usuarioLS));
            }

            const toastup = document.getElementById("update-toast");
            if (toastup) {
                toastup.classList.remove("hidden");
                setTimeout(() => toastup.classList.add("opacity-100"), 20);

                setTimeout(() => {
                    toastup.classList.remove("opacity-100");
                    setTimeout(() => {
                        window.location.href = "../pages/login.html";
                    }, 500);
                }, 1800);
            } else {
                // Si no hay toast, redirigir inmediatamente
                window.location.href = "../pages/login.html";
            }
            await cargarPerfil();
            setTimeout(() => {
                location.reload();
            }, 2000); // 3000 ms = 3 segundos
    
        } catch (error) {
            console.error("❌ Error al guardar cambios:", error);
            alert(`Error: ${error.message}`);
        }
    }
    
    

    // ========== ELIMINAR CUENTA ==========
    async function eliminarCuenta(password) {
        try {
            const res = await fetch("https://e-commerce-smlw.onrender.com/api/perfil/borrar", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    email: emailUsuario,
                    passwords: password 
                })
            });
    
            const data = await res.json();
    
            if (!res.ok) {
                throw new Error(data.message || "Error al eliminar cuenta");
            }
    
            // Ocultar modal
            document.getElementById("modal-eliminar-cuenta").classList.add("hidden");
    
            // Mostrar toast de borrado
            const toastdel = document.getElementById("delete-toast");
            toastdel.classList.remove("hidden");
            setTimeout(() => toastdel.classList.add("opacity-100"), 20);
    
            setTimeout(() => {
                toastdel.classList.remove("opacity-100");
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = "../pages/login.html";
                }, 500);
            }, 1800);
            
    
        } catch (error) {
            console.error("❌ Error al eliminar cuenta:", error);
            alert(`Error: ${error.message}`);
        }
    }
    

    // ---- MODAL ELIMINAR CUENTA ----

document.getElementById("cancelar-eliminar").addEventListener("click", () => {
    document.getElementById("modal-eliminar-cuenta").classList.add("hidden");
});

// Cuando el usuario confirma
document.getElementById("confirmar-eliminar").addEventListener("click", async () => {
    const password = document.getElementById("confirm-password").value.trim();

    if (!password) {
        alert("Debes ingresar tu contraseña");
        return;
    }

    await eliminarCuenta(password);
});


    // ========== EVENT LISTENERS ==========
    elementos.btnEditar.addEventListener("click", activarModoEdicion);
    elementos.btnCancelar.addEventListener("click", cancelarEdicion);
    elementos.btnGuardar.addEventListener("click", guardarCambios);
    elementos.btnBorrar.addEventListener("click", () => {
        document.getElementById("modal-eliminar-cuenta").classList.remove("hidden");
    
    });

    // ========== INICIALIZAR ==========
    await cargarPerfil();

    console.log("✅ userperfil.js cargado completamente");
});