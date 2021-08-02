from django.urls import path

from . import views

urlpatterns = [
    path('thingspeak/', views.thingspeak),
    path('', views.thingspeakGrafico, name='thingspeak-grafico'),
]
