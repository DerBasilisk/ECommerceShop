document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const toast = document.getElementById("creation-toast");
    const errorMessage = document.getElementById("form-error");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = form.querySelector("input[placeholder='Juan* ']").value.trim();
        const apellido = form.querySelector("input[placeholder='Perez*']").value.trim();
        const edad = form.querySelector("input[placeholder='XX']").value;
        const correo = form.querySelector("input[type='email']").value.trim();
        const telefono = form.querySelector("input[placeholder='XXX XXXX XXXX']").value.trim();

        const password = form.querySelectorAll("input[type='password']")[0].value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const termsAccepted = document.getElementById("aceptoTerminos").checked;

        // ==== VALIDACIONES ====

        if (password !== confirmPassword) {
            errorMessage.textContent = "Las contraseñas no coinciden.";
            errorMessage.classList.remove("hidden");
            return;
        }

        if (!termsAccepted) {
            errorMessage.textContent = "Debes aceptar los términos y condiciones.";
            errorMessage.classList.remove("hidden");
            return;
        }

        errorMessage.classList.add("hidden");

        const data = { nombre, apellido, edad, correo, telefono, passwords: password };

        const response = await fetch("http://localhost:8081/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {

            toast.classList.remove("hidden");
            setTimeout(() => toast.classList.add("opacity-100"), 10);

            setTimeout(() => {
                toast.classList.remove("opacity-100");
                setTimeout(() => toast.classList.add("hidden"), 500);
            }, 2500);

            setTimeout(() => {
                window.location.href = "login.html";
            }, 2600);

        } else {
            errorMessage.textContent = result.message || "Error al registrar usuario.";
            errorMessage.classList.remove("hidden");
        }
    });
});
