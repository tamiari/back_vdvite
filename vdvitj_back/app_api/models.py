from django.db import models

# Create your models here.
#La clase Product hereda de la clase Model.
class Product(models.Model):
    
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    price = models.DateField(null=True)
    #banner = models.ImageField(upload_to='imagenes/',null=True,verbose_name='Portada')
