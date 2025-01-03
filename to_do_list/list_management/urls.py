from django.urls import path
from . import views

app_name = 'list_management' # Application URL namespace
urlpatterns = [
    path('list/<int:pk>/', views.ListDetailView.as_view(), name='list-detail'),
    path('', views.ListIndex.as_view(), name='index'),
]