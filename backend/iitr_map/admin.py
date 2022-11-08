from django.contrib import admin
from .models import Vertex

class VertexAdmin(admin.ModelAdmin):
    list_display = ('name', 'x', 'y','is_prominent')
    search_fields = ['name', 'id']

# Register your models here.
admin.site.register(Vertex, VertexAdmin)