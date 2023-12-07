from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='inicio_app_api'),
    path('create_producto/', views.create_producto, name=('create_producto_app_api')),
    path('read_producto/', views.read_producto, name='read_producto_app_api'),
    path('update_producto/', views.update_producto, name='update_producto_app_api'),
    path('delete_product/', views.delete_product, name='delete_product_app_api'),
    path('show_menu/', views.show_menu, name='show_menu_app_api'),

]