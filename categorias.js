const divCategories = document.getElementById('categorias');

fetch('http://localhost:3000/api/categoria')
.then(res => res.json())
.then(categories => categories.forEach(c => {
  renderInputCategory(c);  
}));

function renderInputCategory(category){
  divCategories.insertAdjacentHTML('beforeend', `
      <p>
        <input type="checkbox" name="categories[]" id="op${ category.id }" value="${ category.id }">
        <label for="op${ category.id }">${ category.nombre }</label>
      </p>
    `)
}
