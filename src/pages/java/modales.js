// ---------------------------
// MODAL EDITAR PERFIL
// ---------------------------

const modalEditar = document.getElementById("modal-editar-perfil");
const btnEditar = document.getElementById("btn-editar-perfil");
const btnCancelarEditar = document.getElementById("cancelar-editar");

btnEditar.addEventListener("click", () => {
    modalEditar.classList.remove("hidden");

    // Rellenar inputs con datos actuales
    document.getElementById("edit-nombre").value = usuario.nombre;
    document.getElementById("edit-apellido").value = usuario.apellido;
    document.getElementById("edit-correo").value = usuario.correo;
    document.getElementById("edit-telefono").value = usuario.telefono;
    document.getElementById("edit-edad").value = usuario.edad;
});

btnCancelarEditar.addEventListener("click", () => {
    modalEditar.classList.add("hidden");
});


// ---------------------------
// MODAL ELIMINAR CUENTA
// ---------------------------

const modalEliminar = document.getElementById("modal-eliminar-cuenta");
const btnEliminar = document.getElementById("btn-borrar-cuenta");
const btnCancelarEliminar = document.getElementById("cancelar-eliminar");

btnEliminar.addEventListener("click", () => {
    modalEliminar.classList.remove("hidden");
});

btnCancelarEliminar.addEventListener("click", () => {
    modalEliminar.classList.add("hidden");
});
