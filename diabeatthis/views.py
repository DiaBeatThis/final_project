from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Profile, Nutrition, Meals
from .models import PhysicalActivity, Insulin, BloodSugar, Water
from .serializers import UserSerializer, ProfileSerializer, PhysicalActivitySerializer
from .serializers import NutritionSerializer, MealsSerializer, InsulinSerializer
from .serializers import BloodSugarSerializer, WaterSerializer
from .forms import UserForm, ProfileForm
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login


def index(request):
    return render(request, 'index.html')


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

#
# def register(request):
#     registered = False
#     if request.method == 'POST':
#         user_form = UserForm(data=request.POST)
#         profile_form = ProfileForm(request.POST, request.FILES)
#         if user_form.is_valid() and profile_form.is_valid():
#             user = user_form.save()
#             user.username = user.email
#             user.set_password(user.password)
#             user.save()
#             profile = profile_form.save(commit=False)
#             profile.user = user
#             profile.save()
#             registered = True
#         else:
#             print(user_form.errors, profile_form.errors)
#     else:
#         user_form = UserForm()
#         profile_form = ProfileForm()
#     return render(request,
#             'registration/register.html',
#             {'user_form': user_form, 'profile_form': profile_form, 'registered': registered} )


def register(request):
    registered = False
    if request.method == 'POST':
        print("trying post")
        user_form = UserForm(data=request.POST)
        profile_form = ProfileForm(request.POST, request.FILES)
        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.username = user.email
            user.set_password(user.password)
            user.save()
            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()
            registered = True
        else:
            print(user_form.errors, profile_form.errors)
    else:
        print("not post")
        user_form = UserForm()
        profile_form = ProfileForm()
    return render(request,
            'registration/register.html',
            {'user_form': user_form, 'profile_form': profile_form, 'registered': registered} )


def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/home/')
            else:
                return HttpResponse("Your account is disabled.")
        else:
            print("Invalid login details: {0}, {1}").format(username, password)
            return HttpResponse("Invalid login details supplied.")
    else:
        return render(request, 'registration/login.html', {})
