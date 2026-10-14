import { supabase } from './supabaseClient.js';

let todosLosDatos = [];

async function cargarContenido() {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '<p style="color: white; text-align: center;">Cargando información desde Supabase...</p>';
    
    let { data: items, error } = await supabase
        .from('contenido')
        .select('*');

    if (error) {
        contenedor.innerHTML = `<p style="color: red; text-align: center;">Error al conectar con la base de datos: ${error.message}</p>`;
        return;
    }

    todosLosDatos = items || [];
    mostrarTarjetas(todosLosDatos);
}

function mostrarTarjetas(items) {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '';

    if (items.length === 0) {
        contenedor.innerHTML = '<p style="color: white; text-align: center; grid-column: 1 / -1;">No se encontraron resultados.</p>';
        return;
    }

    items.forEach(item => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'card';
        tarjeta.innerHTML = `
            <span class="categoria">${item.categoria || 'General'}</span>
            <h3>${item.titulo || 'Sin título'}</h3>
            <p>${item.descripcion || 'Sin descripción'}</p>
            <small>Fuente: ${item.fuente || 'Académica'}</small>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Escuchar cambios en tiempo real mientras escribes
const inputBuscador = document.getElementById('buscador');
inputBuscador.addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase().trim();
    const filtrados = todosLosDatos.filter(item => 
        (item.titulo && item.titulo.toLowerCase().includes(texto)) || 
        (item.descripcion && item.descripcion.toLowerCase().includes(texto)) ||
        (item.categoria && item.categoria.toLowerCase().includes(texto))
    );
    mostrarTarjetas(filtrados);
});

// Evitar que la página se recargue al presionar Enter y filtrar
inputBuscador.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

mostrarTarjetas(todosLosDatos);