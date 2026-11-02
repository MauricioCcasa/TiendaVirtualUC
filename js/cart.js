// ========================================
// FUNCIONES DEL CARRITO DE COMPRAS
// ========================================

import { productos } from "./products.js";

let carrito = [];

export function obtenerCarrito() {
    return carrito;
}

export function agregarAlCarrito(id, boton = null) {
    const producto = productos.find(item => item.id === Number(id));
    if (!producto) return;

    const productoExistente = carrito.find(item => item.id === Number(id));

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    actualizarCarrito();

    if (boton) {
        const textoOriginal = boton.innerHTML;

        boton.innerHTML = `
            <i class="bi bi-check-circle-fill"></i>
            ¡Agregado!`;

        boton.classList.add("btn-agregado", "animacion-agregado");
        boton.disabled = true;

        setTimeout(() => {
            boton.innerHTML = textoOriginal;
            boton.classList.remove("btn-agregado", "animacion-agregado");
            boton.disabled = false;
        }, 1000);
    }
}

export function actualizarCarrito() {
    const contenidoCarrito = document.getElementById("contenidoCarrito");
    const contadorCarrito = document.getElementById("contadorCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    if (!contenidoCarrito || !contadorCarrito || !totalCarrito) return;

    contenidoCarrito.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = `
            <p class="text-center text-muted">
                <i class="bi bi-cart-x display-5"></i><br>
                Tu carrito está vacío.
            </p>`;
    }

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;
        cantidadTotal += producto.cantidad;

        contenidoCarrito.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h6>${producto.nombre}</h6>
                    <small class="text-muted">
                        S/ ${producto.precio.toFixed(2)} x ${producto.cantidad}
                    </small>
                </div>

                <div class="text-end">
                    <strong>S/ ${subtotal.toFixed(2)}</strong><br>
                    <button
                        class="btn btn-sm btn-outline-danger mt-1"
                        onclick="eliminarDelCarrito(${producto.id})">
                        <i class="bi bi-trash"></i>
                        Eliminar
                    </button>
                </div>
            </div>
            <hr>`;
    });

    contadorCarrito.textContent = cantidadTotal;
    totalCarrito.textContent = total.toFixed(2);
}

export function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== Number(id));
    actualizarCarrito();
}

export function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

export function calcularTotal() {
    return carrito.reduce(
        (suma, producto) => suma + producto.precio * producto.cantidad,
        0
    );
}

export function calcularCantidad() {
    return carrito.reduce(
        (suma, producto) => suma + producto.cantidad,
        0
    );
}
