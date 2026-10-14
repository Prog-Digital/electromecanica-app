import { supabase } from './supabaseClient.js';

async function cargarContenido() {
    const contenedor = document.getElementById('contenedor-tarjetas') || document.querySelector('main');
    
    let { data: items, error } = await supabase
        .from('contenido')
        .select('*');

    if (error) {
        contenedor.innerHTML = `<p>Error al cargar datos: ${error.message}</p>`;
        return;
    }

    contenedor.innerHTML = ''; 

    items.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.style.border = "1px solid #ccc";
        tarjeta.style.padding = "15px";
        tarjeta.style.margin = "10px 0";
        tarjeta.style.borderRadius = "8px";
        tarjeta.innerHTML = `
            <span style="background: #e2e8f0; padding: 3px 8px; font-size: 12px; border-radius: 4px;">${item.categoria}</span>
            <h3 style="margin-top: 10px;">${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <small style="color: #666;">Fuente: ${item.fuente}</small>
        `;
        contenedor.appendChild(tarjeta);
    });
}

cargarContenido();