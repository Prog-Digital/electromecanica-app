import { supabase } from './supabaseClient.js';

async function cargarContenido() {
    const contenedor = document.getElementById('contenedor-tarjetas');
    
    // Consulta a la tabla 'contenido'
    let { data: items, error } = await supabase
        .from('contenido')
        .select('*');

    if (error) {
        contenedor.innerHTML = `<p>Error al cargar datos: ${error.message}</p>`;
        return;
    }

    contenedor.innerHTML = ''; // Limpiar mensaje de carga

    items.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <span class="categoria">${item.categoria}</span>
            <h3>${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <small>Fuente: ${item.fuente}</small>
        `;
        contenedor.appendChild(tarjeta);
    });
}

cargarContenido();