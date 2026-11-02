// ========================================
// PRODUCTOS, CATÁLOGO, BÚSQUEDA Y DETALLES
// ========================================

export const productos = [
    {
        id: 1,
        nombre: "Laptop Lenovo IdeaPad 3",
        categoria: "laptops",
        precio: 2299,
        descripcion: "Laptop ideal para estudiantes, profesionales y trabajo diario.",
        imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        especificaciones: [
            "Procesador: Intel Core i5",
            "Memoria RAM: 8 GB",
            "Almacenamiento: SSD 512 GB",
            "Pantalla: 15.6 pulgadas",
            "Sistema operativo: Windows 11"
        ]
    },
    {
        id: 2,
        nombre: "Laptop HP Pavilion",
        categoria: "laptops",
        precio: 2899,
        descripcion: "Diseño moderno y rendimiento para productividad.",
        imagen: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
        especificaciones: [
            "Procesador: Intel Core i5",
            "Memoria RAM: 16 GB",
            "Almacenamiento: SSD 512 GB",
            "Pantalla: 15.6 pulgadas",
            "Sistema operativo: Windows 11"
        ]
    },
    {
        id: 3,
        nombre: "Laptop Gaming ASUS",
        categoria: "laptops",
        precio: 4599,
        descripcion: "Potencia y rendimiento para videojuegos y programas exigentes.",
        imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
        especificaciones: [
            "Procesador: Intel Core i7",
            "Memoria RAM: 16 GB",
            "Almacenamiento: SSD 1 TB",
            "Tarjeta gráfica: NVIDIA GeForce RTX",
            "Pantalla: 15.6 pulgadas"
        ]
    },
    {
        id: 4,
        nombre: "PC Gamer RGB",
        categoria: "computadoras",
        precio: 3899,
        descripcion: "Computadora de escritorio diseñada para gaming.",
        imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500",
        especificaciones: [
            "Procesador: AMD Ryzen 5",
            "Memoria RAM: 16 GB",
            "Almacenamiento: SSD 1 TB",
            "Tarjeta gráfica: NVIDIA GeForce",
            "Iluminación: RGB"
        ]
    },
    {
        id: 5,
        nombre: "PC de Escritorio Profesional",
        categoria: "computadoras",
        precio: 3199,
        descripcion: "Equipo ideal para oficina, estudios y productividad.",
        imagen: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500",
        especificaciones: [
            "Procesador: Intel Core i5",
            "Memoria RAM: 16 GB",
            "Almacenamiento: SSD 512 GB",
            "Monitor: 24 pulgadas",
            "Conectividad: Wi-Fi y Bluetooth"
        ]
    },
    {
        id: 6,
        nombre: "Teclado Mecánico RGB",
        categoria: "accesorios",
        precio: 189,
        descripcion: "Teclado mecánico con iluminación para gaming.",
        imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        especificaciones: [
            "Tipo: Mecánico",
            "Conexión: USB",
            "Iluminación: RGB",
            "Distribución: Español",
            "Compatibilidad: Windows y Mac"
        ]
    },
    {
        id: 7,
        nombre: "Mouse Gamer",
        categoria: "accesorios",
        precio: 99,
        descripcion: "Mouse ergonómico de alta precisión.",
        imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
        especificaciones: [
            "Tipo: Óptico",
            "Conexión: USB",
            "Diseño: Ergonómico",
            "Botones: 6",
            "Uso: Gaming y oficina"
        ]
    },
    {
        id: 8,
        nombre: "Audífonos Gamer",
        categoria: "accesorios",
        precio: 249,
        descripcion: "Audífonos cómodos con sonido envolvente.",
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        especificaciones: [
            "Tipo: Diadema",
            "Conexión: Cableada",
            "Micrófono: Integrado",
            "Sonido: Estéreo",
            "Compatibilidad: PC y laptop"
        ]
    }
];

export function mostrarProductos(lista = productos) {
    const contenedor = document.getElementById("listaProductos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-search display-4 text-muted"></i>
                <h4 class="mt-3">No se encontraron productos</h4>
                <p>Intenta con otra búsqueda.</p>
            </div>`;
        return;
    }

    lista.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "col-md-6 col-lg-3";

        tarjeta.innerHTML = `
            <div class="product-card">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    class="product-image"
                    loading="lazy">

                <div class="product-info">
                    <h5>${producto.nombre}</h5>
                    <p>${producto.descripcion}</p>

                    <div class="product-price">
                        S/ ${producto.precio.toFixed(2)}
                    </div>

                    <button
                        class="btn btn-outline-primary btn-detalles"
                        onclick="verDetalles(${producto.id})">
                        <i class="bi bi-eye"></i>
                        Ver detalles
                    </button>

                    <button
                        class="btn btn-primary btn-agregar"
                        onclick="agregarAlCarrito(${producto.id}, this)">
                        <i class="bi bi-cart-plus"></i>
                        Agregar al carrito
                    </button>
                </div>
            </div>`;

        contenedor.appendChild(tarjeta);
    });
}

export function verDetalles(id) {
    const producto = productos.find(item => item.id === Number(id));
    if (!producto) return;

    document.getElementById("detalleImagen").src = producto.imagen;
    document.getElementById("detalleImagen").alt = producto.nombre;
    document.getElementById("detalleNombre").textContent = producto.nombre;
    document.getElementById("detalleDescripcion").textContent = producto.descripcion;
    document.getElementById("detallePrecio").textContent =
        `S/ ${producto.precio.toFixed(2)}`;

    const listaEspecificaciones =
        document.getElementById("detalleEspecificaciones");

    listaEspecificaciones.innerHTML = "";

    producto.especificaciones.forEach(especificacion => {
        const elemento = document.createElement("li");
        elemento.textContent = especificacion;
        listaEspecificaciones.appendChild(elemento);
    });

    document.getElementById("botonDetalleComprar").onclick = () => {
        // La función se registra en window desde app.js para mantener
        // compatibles los eventos onclick del HTML existente.
        window.agregarAlCarrito(producto.id);

        bootstrap.Modal.getOrCreateInstance(
            document.getElementById("modalDetalles")
        ).hide();
    };

    bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalDetalles")
    ).show();
}

export function buscarProductos() {
    const texto = document.getElementById("buscador").value.toLowerCase().trim();
    const categoria = document.getElementById("filtroCategoria").value;

    const resultados = productos.filter(producto => {
        const coincideNombre = producto.nombre.toLowerCase().includes(texto);
        const coincideDescripcion = producto.descripcion.toLowerCase().includes(texto);
        const coincideCategoria =
            categoria === "todos" || producto.categoria === categoria;

        return (coincideNombre || coincideDescripcion) && coincideCategoria;
    });

    mostrarProductos(resultados);
}

export function filtrarProductos(categoria) {
    document.getElementById("filtroCategoria").value = categoria;
    document.getElementById("buscador").value = "";
    buscarProductos();

    document.getElementById("productos").scrollIntoView({
        behavior: "smooth"
    });
}
