from django.urls import path
from .views import *

urlpatterns = [
    path('todo/', TodoItem , name='todo'),
    path('todo/<int:id>/', TodoDetails, name='todo_item')
]
