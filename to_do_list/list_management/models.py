from django.db import models
 
class List(models.Model):
   name = models.CharField(max_length=255)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
 
   def __str__(self):
       return self.name
 
class Task(models.Model):
   list = models.ForeignKey(List, on_delete=models.CASCADE)
   description = models.CharField(max_length=255)
   due_date = models.DateField(null=True, blank=True)
   completed = models.BooleanField(default=False)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)
 
   def __str__(self):
       return self.description
 