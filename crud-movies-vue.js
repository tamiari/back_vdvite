
const { createApp } = Vue;
createApp({
  data() {
    return {
        products : [],
        api_server:"http://127.0.0.1:8000",
        id_product:'',
        name:'',
        description:'',
        precio:'',
        banner:null
    };
  },
  methods: {
    sendFormData(url, formData,method) {
        fetch(url, {
          method: method,
          body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            alert("Registro creado:");
            this.getProduct(`${this.api_server}/api/products`);
        })
        .catch((error) => {
            console.error("Error al enviar el formulario:", error);
        });
    },
    onFileChange(event) {
        // Manejar el cambio en el input de tipo file
        this.banner = event.target.files[0];
    },
    getProducts() {
      fetch(`${this.api_server}/api/products`)
        .then((response) => response.json())
        .then((data) => {
          this.products = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    getProduct(id_product) {
        fetch(`${this.api_server}/api/products/${id_product}/`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            this.id_product = data.id;
            this.name = data.name;
            this.descriptiom = data.description,
            this.precio = data.precio
            console.log(data);
        })
        .catch((error) => {
            console.error("Error al enviar el formulario:", error);
        });
    },
   
    saveProduct() {
        const formData = new FormData();
        formData.append('name', this.name);
        formData.append('description', this.description);
        formData.append('precio', this.precio);
       
        if(this.id_product){
            this.sendFormData(`${this.api_server}/api/update_product/${this.id_product}/`, formData,'PUT');
        }else{
            this.sendFormData(`${this.api_server}/api/create_product/`, formData,'POST');
        }
    },
    deleteProduct(id_product) {
        console.log('teasd');
        fetch(`${this.api_server}/api/delete_product/${id_product}/`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            alert("Registro Eliminado");
            this.getProducts(`${this.api_server}/api/product`);
        })
        .catch((error) => {
            console.error("Error al eliminar", error);
        });
    },
  },
  created() {
    this.getProducts();
  },
}).mount("#app");
