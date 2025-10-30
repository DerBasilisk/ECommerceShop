document.addEventListener("DOMContentLoaded", () => {
    function loadComponent(selector, file) {
      fetch(file)
        .then(response => response.text())
        .then(data => {
          document.querySelector(selector).innerHTML = data;
        })
        .catch(error => console.error("Error cargando:", file, error));
    }
  
    loadComponent("header", "/src/pages/partials/header.html");
    loadComponent("footer", "/src/pages/partials/footer.html");
  });
  