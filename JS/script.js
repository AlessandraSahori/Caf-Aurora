/* =================================
   FILTRO DEL MENÚ
================================= */

function filtrarMenu(categoria) {

    const productos =
        document.querySelectorAll(".producto");


    productos.forEach(function(producto) {

        if (categoria === "todos") {

            producto.style.display = "block";

        } else {

            if (producto.classList.contains(categoria)) {

                producto.style.display = "block";

            } else {

                producto.style.display = "none";

            }

        }

    });

}


/* =================================
   MOSTRAR PRODUCTO
================================= */

function mostrarProducto(nombre, precio) {

    alert(
        nombre +
        "\nPrecio: $" +
        precio
    );

}


/* =================================
   FORMULARIO DE CONTACTO
================================= */

const formulario =
    document.getElementById("formularioContacto");


if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();


        const nombre =
            document.getElementById("nombre").value.trim();


        const correo =
            document.getElementById("correo").value.trim();


        const mensaje =
            document.getElementById("mensaje").value.trim();


        if (
            nombre === "" ||
            correo === "" ||
            mensaje === ""
        ) {

            alert(
                "Por favor completa todos los campos."
            );

            return;

        }


        document
            .getElementById("mensajeExito")
            .classList.remove("d-none");


        formulario.reset();

    });

}