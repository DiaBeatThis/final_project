from .models import Profile
from django.contrib.auth.models import User
from django import forms
from django.forms import extras


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('email', 'password')


class ProfileForm(forms.ModelForm):
    dob = forms.DateField(widget=extras.SelectDateWidget(years=range(1920, 2017)))

    class Meta:
        model = Profile
        fields = ('height', 'weight', 'sex', 'dob', 'race')
