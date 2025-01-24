const bodyArticulos = document.querySelector('#articulos tbody');
const form = document.getElementById('form_crear');

let categorias;
let storageCategories = [];
let articulos = [];

async function cargarCategorias() {
  try {
    const response = await fetch('http://localhost:3000/api/categoria'); 
    if (!response.ok) {
      throw new Error('Fallo http: ' + response.status);
    }

    categorias = await response.json();
    cargarCategoriasAlmacenadas();
    //cargarArticulos();
  } catch (e) {
    console.error('Error en el fetch de categorias: ' + e);
  }
}

async function cargarArticulos() {
  try {
    const response =  await fetch('http://localhost:3000/api/articulo');

    if (!response.ok) {
      throw new Error('Fallo http');
    }
    const articulos = await response.json();
    
    articulos.forEach(articulo => {
      renderArticulo(articulo);
    });
  } catch (e) {
    console.error('Error en el fetch: ' + e);
  }
}

function renderArticulo(articulo) {
  const tr = document.createElement('tr');
      
  let td = document.createElement('td');
  td.textContent = articulo.id;
  tr.append(td);

  td = document.createElement('td');
  td.textContent = categorias.filter(c => c.id==articulo.id_categoria)[0].nombre
  tr.append(td);

  td = document.createElement('td');
  td.textContent = articulo.usuario;
  tr.append(td);

  td = document.createElement('td');
  td.textContent = articulo.fecha;
  tr.append(td);

  td = document.createElement('td');
  td.textContent = articulo.titulo;
  tr.append(td);

  tr.addEventListener('click', () => alert(articulo.cuerpo));

  bodyArticulos.append(tr);
}
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const articulo = {
    "usuario": localStorage.user,
    "password": sessionStorage.password,
    "titulo": form.titulo.value,
    "cuerpo": form.cuerpo.value
  }

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(articulo)
  } 
  console.log(options); 
  try {
    const response = await fetch('http://localhost:3000/api/categoria/'+form.categoria.value+'/articulo_secure', options);
    if (!response.ok) {
      throw new Error('Fallo http en el crear: ' + response.status);
    }
    const articulo = await response.json(); 
    renderArticulo(articulo);
  } catch (e) {
    console.error('Error en el fetch de crear: ' + e);
  }
})

cargarCategorias();

async function cargarCategoriasAlmacenadas() {
  if (localStorage.categories) {
    storageCategories = JSON.parse(localStorage.categories);
  }
  //storageCategories.forEach(id => await cargarArticulosDeCategoria(id));
  for (let i=0; i<storageCategories.length; i++) {
    await cargarArticulosDeCategoria(storageCategories[i]);
  }
  articulos.forEach(articulo => {
    renderArticulo(articulo);
  });
}

async function cargarArticulosDeCategoria(id) {
  let res = await fetch('http://localhost:3000/api/categoria/'+id+'/articulo');
  articulosNuevos = await(res.json());
  articulosNuevos.forEach(a => articulos.push(a));
}