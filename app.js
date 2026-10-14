const todosLosDatos = [
    { id: 1, titulo: "¿Qué es la electromecánica?", categoria: "Investigación", descripcion: "Área que integra conocimientos de electricidad y mecánica para desarrollar y mantener sistemas.", fuente: "Fuente académica" },
    { id: 2, titulo: "Historia de la electromecánica", categoria: "Investigación", descripcion: "Evolución de la electromecánica y sus principales avances tecnológicos.", fuente: "Fuente académica" },
    { id: 3, titulo: "Importancia de la electromecánica", categoria: "Investigación", descripcion: "Importancia de la electromecánica en la industria y en los sistemas tecnológicos.", fuente: "Fuente académica" },
    { id: 4, titulo: "Motores eléctricos", categoria: "Componentes", descripcion: "Dispositivos que convierten energía eléctrica en movimiento mecánico.", fuente: "Fuente académica" },
    { id: 5, titulo: "Sensores", categoria: "Componentes", descripcion: "Elementos que detectan cambios físicos y proporcionan información a un sistema de control.", fuente: "Fuente académica" },
    { id: 6, titulo: "Actuadores", categoria: "Componentes", descripcion: "Dispositivos que convierten una señal de control en una acción o movimiento.", fuente: "Fuente académica" },
    { id: 7, titulo: "Controladores", categoria: "Componentes", descripcion: "Dispositivos encargados de procesar información y controlar sistemas electromecánicos.", fuente: "Fuente académica" },
    { id: 8, titulo: "Automatización industrial", categoria: "Aplicaciones", descripcion: "Uso de sistemas de control para realizar procesos industriales de forma automática.", fuente: "Fuente académica" },
    { id: 9, titulo: "Robótica", categoria: "Aplicaciones", descripcion: "Integración de sistemas mecánicos, eléctricos y de control para desarrollar sistemas robóticos.", fuente: "Fuente académica" },
    { id: 10, titulo: "Transporte", categoria: "Aplicaciones", descripcion: "Aplicación de sistemas electromecánicos en vehículos, trenes y otros medios de transporte.", fuente: "Fuente académica" },
    { id: 11, titulo: "Electromecánica en el hogar", categoria: "Aplicaciones", descripcion: "Uso de componentes electromecánicos en equipos y dispositivos de uso cotidiano.", fuente: "Fuente académica" },
    { id: 12, titulo: "Ventajas", categoria: "Ventajas y limitaciones", descripcion: "La electromecánica permite automatizar procesos, mejorar la productividad y combinar sistemas eléctricos y mecánicos.", fuente: "Fuente académica" },
    { id: 13, titulo: "Limitaciones", categoria: "Ventajas y limitaciones", descripcion: "Algunos sistemas requieren mantenimiento, conocimientos técnicos y una inversión inicial.", fuente: "Fuente académica" },
    { id: 14, titulo: "Ejemplo: banda transportadora", categoria: "Ejemplos reales", descripcion: "Sistema que utiliza motores, sensores y controladores para transportar materiales automáticamente.", fuente: "Fuente académica" },
    { id: 15, titulo: "Ejemplo: brazo robótico", categoria: "Ejemplos reales", descripcion: "Sistema electromecánico utilizado para realizar movimientos programados en procesos industriales.", fuente: "Fuente académica" },
    { id: 16, titulo: "Ejemplo: sistema de bombeo", categoria: "Ejemplos reales", descripcion: "Sistema que utiliza motores y controles para mover líquidos de manera automatizada.", fuente: "Fuente académica" },
    { id: 17, titulo: "Mantenimiento electromecánico", categoria: "Mantenimiento", descripcion: "Actividades preventivas y correctivas para conservar los sistemas electromecánicos en buen estado.", fuente: "Fuente académica" },
    { id: 18, titulo: "Seguridad", categoria: "Seguridad", descripcion: "Importancia de aplicar medidas de seguridad al trabajar con sistemas eléctricos y mecánicos.", fuente: "Fuente académica" },
    { id: 19, titulo: "Innovación tecnológica", categoria: "Tecnología", descripcion: "Nuevas tecnologías que permiten desarrollar sistemas electromecánicos más eficientes y automatizados.", fuente: "Fuente académica" },
    { id: 20, titulo: "Fuentes de información", categoria: "Fuentes", descripcion: "Referencias utilizadas para respaldar la información presentada en la aplicación.", fuente: "Fuentes académicas" }
];

function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function mostrarTarjetas(items) {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '';

    if (items.length === 0) {
        contenedor.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: #64748b; font-size: 1.1rem; padding: 2rem;">No se encontraron resultados. Intenta con otra palabra clave.</p>';
        return;
    }

    items.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <span class="categoria">${item.categoria}</span>
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <small>Fuente: ${item.fuente}</small>
        `;
        
        // Al hacer clic en una tarjeta, abre la vista detallada interactiva
        tarjeta.addEventListener('click', () => abrirDetalle(item));
        contenedor.appendChild(tarjeta);
    });
}

function abrirDetalle(item) {
    document.getElementById('vista-catalogo').style.display = 'none';
    document.querySelector('.carrusel-container').style.display = 'none';
    
    document.getElementById('detalle-categoria').innerText = item.categoria;
    document.getElementById('detalle-titulo').innerText = item.titulo;
    document.getElementById('detalle-descripcion').innerText = item.descripcion;
    document.getElementById('detalle-fuente').innerText = item.fuente;
    
    document.getElementById('vista-detalle').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('btn-cerrar').addEventListener('click', () => {
    document.getElementById('vista-detalle').style.display = 'none';
    document.getElementById('vista-catalogo').style.display = 'block';
    document.querySelector('.carrusel-container').style.display = 'block';
});

// Buscador en tiempo real y acción al presionar ENTER
const inputBuscador = document.getElementById('buscador');
inputBuscador.addEventListener('input', (e) => {
    const textoBusqueda = normalizar(e.target.value.trim());
    if (textoBusqueda === "") {
        mostrarTarjetas(todosLosDatos);
        return;
    }
    const filtrados = todosLosDatos.filter(item => 
        normalizar(item.titulo).includes(textoBusqueda) || 
        normalizar(item.descripcion).includes(textoBusqueda) ||
        normalizar(item.categoria).includes(textoBusqueda)
    );
    mostrarTarjetas(filtrados);
});

inputBuscador.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const textoBusqueda = normalizar(inputBuscador.value.trim());
        const encontrado = todosLosDatos.find(item => 
            normalizar(item.titulo).includes(textoBusqueda) || 
            normalizar(item.descripcion).includes(textoBusqueda)
        );
        if (encontrado) {
            abrirDetalle(encontrado);
        }
    }
});

// Carrusel automático
let slideIndex = 0;
function mostrarCarrusel() {
    let slides = document.getElementsByClassName("carrusel-slide");
    if (slides.length === 0) return;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(mostrarCarrusel, 3500);
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarTarjetas(todosLosDatos);
    mostrarCarrusel();
});