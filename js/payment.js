// ========================================
// FINALIZACIÓN Y SIMULACIÓN DE PAGO
// ========================================

import {
    obtenerCarrito,
    actualizarCarrito,
    vaciarCarrito,
    calcularTotal,
    calcularCantidad
} from "./cart.js";

export function finalizarCompra() {
    if (obtenerCarrito().length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    document.getElementById("totalPago").textContent =
        calcularTotal().toFixed(2);

    const elementoCarrito = document.getElementById("modalCarrito");
    const elementoPago = document.getElementById("modalPago");

    const modalCarrito = bootstrap.Modal.getInstance(elementoCarrito);
    const modalPago = bootstrap.Modal.getOrCreateInstance(elementoPago);

    if (modalCarrito) {
        elementoCarrito.addEventListener(
            "hidden.bs.modal",
            () => modalPago.show(),
            { once: true }
        );

        modalCarrito.hide();
    } else {
        modalPago.show();
    }
}

export function configurarMetodoPago() {
    const selector = document.getElementById("metodoPago");

    selector.addEventListener("change", function () {
        const esTarjeta = this.value === "tarjeta";

        document.getElementById("formularioTarjeta").style.display =
            esTarjeta ? "block" : "none";

        document.getElementById("formularioYape").style.display =
            esTarjeta ? "none" : "block";
    });
}

export function procesarPago() {
    const metodo = document.getElementById("metodoPago").value;
    let valido = false;

    if (metodo === "tarjeta") {
        const nombre = document.getElementById("nombreTitular").value.trim();
        const numero = document.getElementById("numeroTarjeta").value.replace(/\s/g, "");
        const vencimiento = document.getElementById("vencimiento").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        valido =
            nombre.length >= 3 &&
            /^\d{16}$/.test(numero) &&
            /^(0[1-9]|1[0-2])\/\d{2}$/.test(vencimiento) &&
            /^\d{3,4}$/.test(cvv);
    }

    if (metodo === "yape") {
        const celular = document.getElementById("numeroYape").value.trim();
        const codigo = document.getElementById("codigoYape").value.trim();

        valido =
            /^\d{9}$/.test(celular.replace(/\s/g, "")) &&
            codigo.length >= 4;
    }

    if (!valido) {
        alert("Por favor, completa correctamente los campos.");
        return;
    }

    // Esta tienda realiza una simulación local; no procesa pagos reales.
    const total = calcularTotal();
    const cantidadProductos = calcularCantidad();
    const numeroPedido = "TS-" + Date.now().toString().slice(-8);

    document.getElementById("numeroPedido").textContent = numeroPedido;
    document.getElementById("cantidadPedido").textContent = cantidadProductos;
    document.getElementById("totalPedido").textContent = total.toFixed(2);
    document.getElementById("metodoPedido").textContent =
        metodo === "tarjeta" ? "Tarjeta bancaria" : "Yape";

    vaciarCarrito();

    const elementoPago = document.getElementById("modalPago");
    const elementoExito = document.getElementById("modalExito");

    const modalPago = bootstrap.Modal.getInstance(elementoPago);
    const modalExito = bootstrap.Modal.getOrCreateInstance(elementoExito);

    if (modalPago) {
        elementoPago.addEventListener(
            "hidden.bs.modal",
            () => modalExito.show(),
            { once: true }
        );

        modalPago.hide();
    } else {
        modalExito.show();
    }

    // Limpiar los campos de prueba.
    document.getElementById("nombreTitular").value = "";
    document.getElementById("numeroTarjeta").value = "";
    document.getElementById("vencimiento").value = "";
    document.getElementById("cvv").value = "";
    document.getElementById("numeroYape").value = "";
    document.getElementById("codigoYape").value = "";

    // Restablecer el método predeterminado.
    document.getElementById("metodoPago").value = "tarjeta";
    document.getElementById("formularioTarjeta").style.display = "block";
    document.getElementById("formularioYape").style.display = "none";

    actualizarCarrito();
}
