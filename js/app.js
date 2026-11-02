// ========================================
// ARCHIVO PRINCIPAL: INICIALIZACIÓN
// ========================================

import {
    productos,
    mostrarProductos,
    verDetalles,
    buscarProductos,
    filtrarProductos
} from "./products.js";

import {
    agregarAlCarrito,
    actualizarCarrito,
    eliminarDelCarrito
} from "./cart.js";

import {
    finalizarCompra,
    procesarPago,
    configurarMetodoPago
} from "./payment.js";

// Compatibilidad con los onclick que ya existen en index.html.
// De esta manera no necesitamos reescribir todos los botones.
Object.assign(window, {
    verDetalles,
    filtrarProductos,
    agregarAlCarrito,
    eliminarDelCarrito,
    finalizarCompra,
    procesarPago
});

// Iniciar la tienda cuando el HTML ya está disponible.
document.addEventListener("DOMContentLoaded", () => {
    const buscador = document.getElementById("buscador");
    const filtroCategoria = document.getElementById("filtroCategoria");

    buscador.addEventListener("input", buscarProductos);
    filtroCategoria.addEventListener("change", buscarProductos);

    configurarMetodoPago();
    mostrarProductos(productos);
    actualizarCarrito();
});
