from django.shortcuts import render
from django.http import HttpResponse, JsonResponse




def thingspeak(request):
    return HttpResponse('Hello world!');

def thingspeakGrafico(request):
    return render(request, 'thingspeak/thingspeak.html')


