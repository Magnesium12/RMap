from rest_framework import serializers
from .models import Vertex

class VertexSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vertex
        fields = ('x', 'y', 'name')
