const divCategories = document.getElementById('categorias');
const buttonActualizar = document.getElementById('actualizar');

let storageCategories = [];

if (localStorage.categories) {
  storageCategories = JSON.parse(localStorage.categories)
}

fetch('http://localhost:3000/api/categoria')
.then(res => res.json())
.then(categories => categories.forEach(c => {
  renderInputCategory(c);  
}));

function renderInputCategory(category){
  let checked = storageCategories.includes(category.id) ? "checked" : "";
  divCategories.insertAdjacentHTML('beforeend', `
      <p>
        <input type="checkbox" 
              name="categories[]" 
              id="op${ category.id }" 
              value="${ category.id }"
              ${checked}
              >
        <label for="op${ category.id }">${ category.nombre }</label>
      </p>
    `)
}

buttonActualizar.addEventListener('click', () => {
  let checkboxes = document.querySelectorAll("[name='categories[]']");
  let checkeds = [...checkboxes].filter(c => c.checked);
  let category_ids = checkeds.map(c => parseInt(c.value));
  console.log(category_ids);
  localStorage.categories = JSON.stringify(category_ids);
})