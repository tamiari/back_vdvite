const API_SERVER = 'http://127.0.0.1:8000';

// Función para realizar la petición fetch
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(url, options);
    return await response.json();
}

async function fetchDataWithFile(url, method, formData) {
    const options = {
        method: method,
        body: formData,
    };

    const response = await fetch(url, options);
    return await response.json();
}

document.getElementById('btn-add-product').addEventListener('click', async function () {
    const idProduct = document.querySelector('#id_product');
    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    const precio = document.querySelector('#precio').value;
    const bannerFileInput = document.querySelector('#banner-form');
    const banner = bannerFileInput.files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('precio', precio);
    formData.append('banner', banner);
    let result = null;
    if(idProduct.value!==""){
      result = await fetchDataWithFile(`${API_SERVER}/api/update_product/${idProduct.value}/`, 'PUT', formData);
    }else{
      result = await fetchDataWithFile(`${API_SERVER}/api/create_product/`, 'POST', formData);
    }
    const formProduct = document.querySelector('#form-product');
    idProduct.value=''
    formProduct.reset();
    alert(result.message);

    showProductsTable();
});

  /**
   * Funcion que permite crear un elemento <tr> para la tabla de peliculas
   * por medio del uso de template string de JS.
   */
  async function showProductsTable(){
    let products =  await fetchData(API_SERVER+'/api/products/', 'GET');
    const tableProducts = document.querySelector('#list-table-products tbody');
    tableProducts.innerHTML='';
    products.forEach((product, index) => {
      let tr = `<tr>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.precio}</td>
                    <td>
                        <img src="${API_SERVER+product.banner}" width="30%">
                    </td>
                    <td>
                        <button class="btn-cac" onclick='updateProduct(${product.id})'><i class="fa fa-pencil" ></button></i>
                        <button class="btn-cac" onclick='deleteProduct(${product.id})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tableProducts.insertAdjacentHTML("beforeend",tr);
    });
  }
  
  /**
   * Function que permite eliminar una pelicula del array del localstorage
   * de acuedo al indice del mismo
   * @param {number} id posición del array que se va a eliminar
   */
  async function deleteProduct(id){
    let response = await fetchData(`${API_SERVER}/api/delete_product/${id}/`, 'DELETE');
    console.log(response);
    showProductsTable();
  }

  /**
   * Function que permite eliminar una pelicula del array del localstorage
   * de acuedo al indice del mismo
   * @param {number} id posición del array que se va a eliminar
   */
  async function updateProduct(id){
    let response = await fetchData(`${API_SERVER}/api/products/${id}/`, 'GET');
    const idProduct = document.querySelector('#id_product');
    const name = document.querySelector('#name');
    const descriptiom = document.querySelector('#description');
    const precio = document.querySelector('#precio');
    
    idProduct.value = response.id;
    name.value = response.name;
    description.value = response.description;
    precio = response.precio;
  }

  showProductsTable();
  