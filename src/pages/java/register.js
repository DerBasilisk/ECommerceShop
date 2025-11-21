document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        //dar valor a las constantes en el formulario
        const data = {
            nombre: form.querySelector("input[placeholder='Juan* ']").value,
            apellido: form.querySelector("input[placeholder='Perez*']").value,
            edad: form.querySelector("input[placeholder='XX']").value,
            correo: form.querySelector("input[type='email']").value,
            telefono: form.querySelector("input[placeholder='XXX XXXX XXXX']").value,
            passwords: form.querySelectorAll("input[type='password']")[0].value
        };

        //POST de los datos
        const response = await fetch("http://localhost:8081/api/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        //Exito al crear cuenta
        if (response.ok) {
            alert("Usuario registrado con éxito");
            //Redirigir A Productos Papu
             setTimeout(()=>window.location.href='login.html',600)
        } else {
            alert(result.message);
        }
    });

});
