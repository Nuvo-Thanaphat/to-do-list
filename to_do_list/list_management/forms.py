from django import forms
from .models import List, Task

class ListForm(forms.ModelForm):
    class Meta:
        model = List
        fields = ['name']

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['description', 'due_date']

class TaskStatusForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['completed']

class TaskUpdateForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['description', 'due_date']
