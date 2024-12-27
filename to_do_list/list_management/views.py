from django.views import generic
from .models import List

class IndexView(generic.ListView):
    model = List
