from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index (request):
    return HttpResponse('<h1>Hola, mundo!</h1>')

def create_producto(request):
    return HttpResponse ('<p>Listado de los productos</p>')


def read_producto(request):
    return HttpResponse('<p>Se registra un producto</p>')

def update_producto(request):
    return HttpResponse('<p>Se modifica un producto</p>')

def delete_product(request):
    return HttpResponse ('<p>Se elimina el producto</p>')

def show_menu (request):
    return HttpResponse('<p>Muestra el Menú</p>')
