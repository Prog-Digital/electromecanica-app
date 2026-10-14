import { supabase } from './upabaseClient.js';

let todosLosDatos = [];

async function cargarContenido() {
    const contenedor = document.getElementById('contenedor-tarjetas');
    
    let { data: items, error } = await supabase
        .from('contenido')
        .select('*');

    if (error) {
        contenedor.innerHTML = `<p>Error al conectar con la base de datos: ${error.message}</p>`;
        return;
    }

    todosLosDatos = items;
    mostrarTarjetas(todosLosDatos);
}

function mostrarTarjetas(items) {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '';

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    items.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <span class="categoria">${item.categoria}</span>
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <small style="color: #64748b;">Fuente: ${item.fuente}</small>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Filtro de búsqueda en tiempo real
document.getElementById('buscador').addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = todosLosDatos.filter(item => 
        item.titulo.toLowerCase().includes(texto) || 
        item.descripcion.toLowerCase().includes(texto) ||
        item.categoria.toLowerCase().includes(texto)
    );
    mostrarTarjetas(filtrados);
});

cargarContenido();