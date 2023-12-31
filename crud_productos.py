# products = [
#     {
#         'id_product':7,
#         'name':'Vaca',
#         'description': 'Vaca color blanco y negro de 15 cm de alto`,
#         'precio': 12000,
#     }
# ]
import mysql.connector

def create_producto(products):
    mydb =mysql.connector.connect(
        host="localhost",
        user="root",
        database="verdevioleta"
    )
    mycursor = mydb.cursor()

    id_product = len(products) + 1
    name = input('Ingrese nombre del producto: ')
    description = input('Ingrese descripcion: ')
    precio = float(input('Ingrese el precio: '))
    
    product = {
        'id_product': id_product,
        'name': name,
        'description': description,
        'precio': precio,
    }
    sql = "INSERT INTO products (id_product, name, description, precio) VALUES (%s, %s, %s, %s)"
    val = (id_product, name, description, precio)
    mycursor.execute(sql, val)

    mydb.commit()

    print(f'Producto: {name} creado exitosamente.')
    
    #products.append(products)
    #print(f'Producto: {name} creado exitosamente.')

def read_productos(products):
    
    if len(products) == 0:
        print('No hay productos registrados')
    else:
        print("\nListado de productos:")
        for product in products:
            print(f"Id: {product['id_product']}, Nombre: {product['name']},Descripcion: {product['description']},Precio: {product['precio']}")

def update_producto(products):
    id_product = int(input('Ingrese el ID del producto a modificar: '))
    for product in productos:
        if product['id_product'] == id_product:
            product['name'] = input('Ingrese nuevo nombre del producto: ')
            product['description'] = int(input('Ingrese nueva descripcion: '))
            product['precio'] = input('Ingrese nuevo precio: ').split(',')
            print(f"Producto con Id {id_product} fue modificado con éxito.")
            return
        
    print(f'No se encontró producto con el Id {id_product}')

def delete_producto(productos):
    id_product = int(input('Ingrese el ID del producto a eliminar: '))
    for producto in productos:
        if producto['id_product'] == id_product:
            productos.remove(producto)
            print(f"Producto con Id {id_product} fue eliminado con éxito.")
            return
        
    print(f'No se encontró producto con el Id {id_product}')
        
def show_menu():
    print("\n --- Menú ---")
    print("1. Crear producto")
    print("2. Listar productos")
    print("3. Modificar producto")
    print("4. Eliminar producto")
    print("5. Salir")

productos = []
option = 0
while option != 5:
    show_menu()
    option = int(input('Ingrese la opción deseada (1-5): '))

    if option == 1:
        create_producto(productos)
    elif option == 2:
        read_productos(productos)
    elif option == 3:
        update_producto(productos)
    elif option == 4:
        delete_producto(productos)
    elif option == 5:
        print('Finalizó el programa!')
    else:
        print('Opción inválida. Por favor, ingrese una opción entre (1-5)')
    

