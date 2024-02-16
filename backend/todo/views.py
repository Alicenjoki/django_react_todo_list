from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
# Create your views here.

@api_view(['GET', 'POST'])
def TodoItem(request):
    if request.method == 'GET':
        todos = Todo.objects.all()
        serializer = TodoSerializers(todos, many=True)

        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TodoSerializers(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST )
    
@api_view(['GET', 'PUT','PATCH', 'DELETE' ])
def TodoDetails(request, id):
    todo = get_object_or_404(Todo, id=id)

    if request.method == 'GET':
            serializer = TodoSerializers(todo)
            return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = TodoSerializers(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PATCH':
        serializer = TodoSerializers(todo,data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




