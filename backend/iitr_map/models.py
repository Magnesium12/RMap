from django.db import models

# Create your models here.
class Vertex(models.Model):
    x = models.IntegerField()
    y = models.IntegerField()
    name = models.CharField(max_length=50)
    is_prominent = models.BooleanField()
    neighbors = models.ManyToManyField("self", blank=True)

    def __str__(self) -> str:
        return f"{self.name}({self.x},{self.y})"

    def __lt__(self, other) -> bool:
        return self.name < other.name

    def __gt__(self, other) -> bool:
        return self.name > other.name

