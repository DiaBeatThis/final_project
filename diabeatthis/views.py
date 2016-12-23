from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Profile, Nutrition, Meals
from .models import PhysicalActivity, Insulin, BloodSugar, Water
from .serializers import UserSerializer, ProfileSerializer, PhysicalActivitySerializer
from .serializers import NutritionSerializer, MealsSerializer, InsulinSerializer
from .serializers import BloodSugarSerializer, WaterSerializer


def index(request):
    return HttpResponse("Welcome to diabeatthis app")


class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class PhysicalActivityViewSet(viewsets.ModelViewSet):
    queryset = PhysicalActivity.objects.all()
    serializer_class = PhysicalActivitySerializer


class NutritionViewSet(viewsets.ModelViewSet):
    queryset = Nutrition.objects.all()
    serializer_class = NutritionSerializer


class MealsViewSet(viewsets.ModelViewSet):
    queryset = Meals.objects.all()
    serializer_class = MealsSerializer


class InsulinViewSet(viewsets.ModelViewSet):
    queryset = Insulin.objects.all()
    serializer_class = InsulinSerializer


class BloodSugarViewSet(viewsets.ModelViewSet):
    queryset = BloodSugar.objects.all()
    serializer_class = BloodSugarSerializer


class WaterViewSet(viewsets.ModelViewSet):
    queryset = Water.objects.all()
    serializer_class = WaterSerializer
